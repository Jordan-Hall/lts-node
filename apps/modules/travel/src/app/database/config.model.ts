import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DatastoreConfig {
	databaseName: string;

	databaseUrl: string;
	username: string;
	password: string;

	redisUrl: string;
	@Field()
	retryAttempts?: number;
	@Field()
	retryDelays?: number;
}