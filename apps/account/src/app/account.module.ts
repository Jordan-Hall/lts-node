import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
	EventStoreBrokerTypes,
	EventStoreModule,
	EventStoreSubscriptionType,
} from '@ultimate-backend/event-store';
import { AccountController } from './account.controller';
import { AccountSagas } from './sagas/account.sagas';
import { ForgotPasswordSentHandler } from './events/handlers/forgot-password-sent.handler';
import { UserLoggedInHandler } from './events/handlers/user-loggedin.handler';
import { UserRegisteredHandler } from './events/handlers/user-registered.handler';
import { ForgotPasswordHandler } from './cqrs/commands/handlers/forgot-password.handler';
import { LoginUserHandler } from './cqrs/commands/handlers/login-user.handler';
import { RegisterUserHandler } from './cqrs/commands/handlers/register-user.handler';
import { UserLoggedInEvent } from './events/impl/user-loggedin.event';
import { UserRegisteredEvent } from './events/impl/user-registered.event';
import { ForgotPasswordSentEvent } from './events/impl/forgot-password-sent.event';

export const CommandHandlers = [ForgotPasswordHandler, LoginUserHandler, RegisterUserHandler];
export const EventHandlers = [ForgotPasswordSentHandler, UserLoggedInHandler, UserRegisteredHandler];

@Module({
	imports: [
		CqrsModule,
		EventStoreModule.forFeature({
			subscriptions: [
				{
					type: EventStoreSubscriptionType.Standard,
					streamName: '$et-user',
				},
			],
			type: EventStoreBrokerTypes.EventStore,
			streamName: '$et-user',
			eventHandlers: {
				UserLoggedInEvent: (data) => new UserLoggedInEvent(data),
				UserRegisteredEvent: (data) => new UserRegisteredEvent(data),
				ForgotPasswordSentEvent: (data) => new ForgotPasswordSentEvent(data),
			},
		}),
	],
	controllers: [AccountController],
	providers: [
		...CommandHandlers,
		...EventHandlers,
		AccountSagas,
	],
})
export class AccountModule { }