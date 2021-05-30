
import { Controller } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from './account.service';
import { CreateRequest, CreateResponse, ForgotPasswordRequest, ForgotPasswordResponse, LoginRequest, LoginResponse, LogoutRequest, LogoutResponse, ReadRequest, ReadResponse } from './interfaces/account';

@Controller('accounts')
export class AccountController {
	constructor(
		private readonly accountService: AccountService,

		private readonly jwtService: JwtService,
	) { }

	async create(request: CreateRequest): Promise<CreateResponse> {
		return await this.accountService.create(request);
	}


	async login(request: LoginRequest): Promise<LoginResponse> {
		return await this.accountService.login(request);
	}

	logout(request: LogoutRequest): Promise<LogoutResponse> {
		return this.accountService.logout(request);
	}


	async read(request: ReadRequest): Promise<ReadResponse> {
		return this.accountService.read(request);
	}

	async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
		return await this.accountService.forgotPassword(request);
	}
}