import { IEvent } from '@nestjs/cqrs';

export class ForgotPasswordSentEvent implements IEvent {
	constructor(
		public readonly user: any & { resetPasswordLink?: string },
	) { }
}

