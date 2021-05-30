import { ICommand } from '@nestjs/cqrs';

export class RegisterUserCommand implements ICommand {
	constructor(public readonly cmd: any) { }
}