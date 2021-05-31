
import { Module } from '@nestjs/common';

import { EventStoreBrokerTypes, EventStoreModule } from '@ultimate-backend/event-store';
import { AccountModule } from './account.module';

@Module({
	imports: [
		EventStoreModule.forRoot({
			broker: {
				type: EventStoreBrokerTypes.EventStore,
				connectionSettings: {
					endpoint: 'localhost:2113',
				},
				defaultUserCredentials: {
					password: 'admin',
					username: 'changeit',
				},
				channelCredentials: {
					insecure: true,
				},
			},
		}),
		AccountModule,
	],
})
export class AppModule { }