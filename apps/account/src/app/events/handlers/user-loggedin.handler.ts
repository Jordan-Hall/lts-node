import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserLoggedInEvent } from '../impl/user-loggedin.event';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInHandler implements IEventHandler<UserLoggedInEvent> {
	handle(event: UserLoggedInEvent): any {
		Logger.log(event, 'UserLoggedInHandler');
	}
}