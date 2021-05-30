import { IEvent } from '@nestjs/cqrs';

export class UserRegisteredEvent implements IEvent {
	constructor(
		public readonly user: any & {
			activationLink?: string;
			service?: 'local';
		},
	) { }
}