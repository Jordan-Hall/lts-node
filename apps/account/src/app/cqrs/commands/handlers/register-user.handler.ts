import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../impl/register-user.command';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisteredEvent } from '../../../events/impl/user-registered.event';
import { CreateResponse } from '../../../interfaces/account';
import { UserEntity } from '../../../repository/user.entity';
import { generateVerificationCode } from '../../../utils/verification-code-generator';
/**
 * @implements {ICommandHandler<RegisterUserCommand>}
 * @classdesc CQRS command to register new user
 * @class
 */
@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
	implements ICommandHandler<RegisterUserCommand> {
	logger = new Logger(this.constructor.name);

	/**
	 * @constructor
	 * @param userRepository
	 * @param eventBus
	 * @param jwtService
	 * @param roleClient
	 * @param billingClient
	 */
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly eventBus: EventBus,
		private readonly jwtService: JwtService,
	) { }

	/**
	 * @description This method is called by the CQRS module
	 * @param command
	 * @return {CreateResponse} This response contains registration token
	 */
	async execute(command: RegisterUserCommand): Promise<CreateResponse> {
		this.logger.log(`Async ${command.constructor.name}...`);
		const { cmd } = command;

		try {
			/** Check if user exist with email */
			const userExist = await this.userRepository.findOne({
				where: {
					'emails.address': cmd.email,
				}
			});

			if (userExist) {
				throw new Error(
					'Email is not available, please try another email',
				);
			}

			let activationLink: string = null;
			let user: UserEntity = null;


				/** Standard password registration */
				/** Generate verification pin code for our user */
				const pincode = generateVerificationCode(6, { type: 'string' });

				/** Initialize the user entity with required props */
				// @ts-ignore
				user = {
					firstname: cmd.firstname,
					lastname: cmd.lastname,
					emails: [
						{
							address: cmd.email,
							primary: true,
							verified: false,
							verificationCode: pincode,
						},
					],
					services: {
						password: {
							hashed: cmd.password,
						},
					},
				};

				/** Encode user email and send it back as response to user.
				 *  This token expires after 1h
				 */
				const payload = { email: cmd.email, pincode };
				const jwtCode = this.jwtService.sign(payload, { expiresIn: '1h' });
				activationLink = `${jwtCode}`;


			/** Persist initialized user entity to store */
			const newUser = this.userRepository.create(user);

			// const [, customer] = await Promise.all([
			// 	this.roleClient.svc
			// 		.addUserToRole({
			// 			domain: '*',
			// 			userId: result.id.toString(),
			// 			actor: 'user',
			// 			role: 'customer',
			// 		})
			// 		.toPromise(),
			// 	this.billingClient.svc
			// 		.createCustomer({
			// 			currency: '',
			// 			number: '',
			// 			name: `${result.firstname} ${result.lastname}`,
			// 			email: result.emails.reduce(
			// 				(previousValue) =>
			// 					previousValue.primary === true && previousValue,
			// 			).address,
			// 		})
			// 		.toPromise(),
			// ]);


			/** Attach the activation link for the event. This is important for the
			 * notification service to properly send activation e-mail.
			 */
			// newUser.activationLink = activationLink;
			// newUser.service = activationLink ? 'local' : 'social';

			/** Publish user created event */
			this.eventBus.publish(new UserRegisteredEvent(newUser));

			return { activationLink };
		} catch (error) {
			this.logger.log(error);
			throw new Error(error);
		}
	}
}