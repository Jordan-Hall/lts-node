import {
	Injectable,
	Logger
} from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigStore, ConfigValue } from '@ultimate-backend/config';
import { DatastoreConfig } from './config.model';
import { environment } from '../../environments/environment';


@Injectable()
export class DatabaseTypeOrmService implements TypeOrmOptionsFactory  {
	logger = new Logger(DatabaseTypeOrmService.name);

	@ConfigValue('datastore', {})
	public config: DatastoreConfig;

	constructor(private readonly store: ConfigStore) {}

	createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
		console.log('config', this.config);
		console.log('store', this.store);
		const config = (this.config ?? this.store.get('datastore') ?? environment) as DatastoreConfig;
		return {
			type: 'mongodb',
			url: config.databaseUrl,
			useNewUrlParser: true,
			autoLoadEntities: true,
			retryAttempts: config.retryAttempts,
			retryDelay: config.retryDelays,
			entities: [],
			synchronize: true,
			useUnifiedTopology: true
		};
	}
}
