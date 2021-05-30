
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ForgotPasswordCommand } from './cqrs/commands/impl/forgot-password.command';
import { GetUserQuery } from './cqrs/query/impl/get-user.query'
import { LoginUserCommand } from './cqrs/commands/impl/login-user.command';
import { RegisterUserCommand } from './cqrs/commands/impl/register-user.command';

import { CreateRequest, CreateResponse, ForgotPasswordRequest, ForgotPasswordResponse, LoginRequest, LoginResponse, LogoutRequest, LogoutResponse, ReadRequest, ReadResponse, User } from './interfaces/account';
@Injectable()
export class AccountService {
	constructor(private commandBus: CommandBus, private readonly queryBus: QueryBus) { }

	forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
		return this.commandBus.execute(new ForgotPasswordCommand(request));
	}

	async read(request: ReadRequest): Promise<ReadResponse> {
		if (!request.query) {
			throw new Error('Missing query params');
		}
		const user = (await this.queryBus.execute(
			new GetUserQuery(JSON.parse(request.query)),
		)) as User;
		return {
			user,
		};
	}

	logout(request: LogoutRequest): Promise<LogoutResponse> {
		return undefined;
	}

	login(request: LoginRequest): Promise<LoginResponse> {
		return this.commandBus.execute(new LoginUserCommand(request));
	}

	create(request: CreateRequest): Promise<CreateResponse> {
		return this.commandBus.execute(new RegisterUserCommand(request));
	}

}