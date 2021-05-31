
import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { LoginUserCommand } from '../impl/login-user.command';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from '../../../repository/user.entity';
import { NotFoundError } from '@ultimate-backend/core';
import { UserLoggedInEvent } from '../../../events/impl/user-loggedin.event';
import { LoginResponse, LoginServiceTypes, LoginRequest } from '../../../interfaces/account';
import { validPassword } from '../../../utils/encryption.util'


/**
 * @implements {ICommandHandler<LoginUserCommand>}
 * @classdesc CQRS command to login user
 * @class
 */
@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
	logger = new Logger(this.constructor.name);

	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly eventBus: EventBus,
	) { }

	async execute(command: LoginUserCommand): Promise<LoginResponse> {
		this.logger.log(`Async ${command.constructor.name}...`);
		const { cmd } = command;

		this.logger.log(cmd);
		try {
			const condition = getLoginQuery(cmd);

			const user: UserEntity = await this.userRepository.findOne(condition);
			if (!user) {
				throw new NotFoundError('Your login credentials is incorrect');
			}

			if (cmd.service === LoginServiceTypes.Password) {
				if (
					!validPassword(cmd.params.password, user.services.password.hashed)
				) {
					throw new Error('Your login credentials is incorrect');
				}

				// Check if user is verified
				const userEmail = user.emails.reduce(
					(previousValue) => previousValue.primary === true && previousValue,
				);
				if (!userEmail.verified) {
					throw new Error('Please verify your email address');
				}
			}

			this.eventBus.publish(new UserLoggedInEvent(user));

			return {
				// @ts-ignore
				user: user as Account.User,
				session: undefined,
			};
		} catch (error) {
			this.logger.log(error);
			throw new RpcException(error.message);
		}
	}
}

function getLoginQuery(cmd: LoginRequest): FindOneOptions<UserEntity> {
	if (cmd.service === LoginServiceTypes.Password) {
		return {
			where: {
				emails: { address: cmd.params.email, primary: true }
			}
		};
	} else {
		return {
			where: {
				emails: { address: cmd.params.email, primary: true }
			}
		};
	}
}