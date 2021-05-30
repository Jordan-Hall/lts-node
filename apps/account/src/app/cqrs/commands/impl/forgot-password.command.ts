import { ICommand } from '@nestjs/cqrs';
import { ForgotPasswordRequest } from '../../../interfaces/account';
export class ForgotPasswordCommand implements ICommand {
	constructor(public readonly cmd: Partial<ForgotPasswordRequest>) { }
}