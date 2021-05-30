import { IEvent } from '@nestjs/cqrs';

export class UserLoggedInEvent implements IEvent {
	constructor(public readonly user: any) { }
}