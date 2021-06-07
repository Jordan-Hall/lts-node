import {
	Injectable,
	Logger
} from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigStore, ConfigValue } from '@ultimate-backend/config';
import { DatastoreConfig } from './config.model';
import { environment } from '../../environments/environment';

import {
	OutputData,
	Overview,
	IncludesAndExcludes,
	FaqItem,
	ItineraryItem,
	Itinerary,
	TravelPackages
} from '../packages/models/packages.model';
import { TravelDestination } from '../destination/models/destination.model';
import { TravelExperience } from '../experience/models/experience.model';

@Injectable()
export class DatabaseTypeOrmService implements TypeOrmOptionsFactory  {
	logger = new Logger(DatabaseTypeOrmService.name);

	@ConfigValue('datastore', {})
	public config: DatastoreConfig;

	constructor(private readonly store: ConfigStore) {}

	createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
		const config = (this.config ?? this.store.get('datastore') ?? environment) as DatastoreConfig;
		return {
			type: 'mongodb',
			url: config.databaseUrl.replace('{{datastore.dbName}}', config.databaseName),
			useNewUrlParser: true,
			autoLoadEntities: true,
			retryAttempts: config.retryAttempts,
			retryDelay: config.retryDelays,
			entities: [
				OutputData,
				Overview,
				IncludesAndExcludes,
				FaqItem,
				ItineraryItem,
				Itinerary,
				TravelPackages,
				TravelDestination,
				TravelExperience
			],
			synchronize: true,
			useUnifiedTopology: true,
		};
	}
}
