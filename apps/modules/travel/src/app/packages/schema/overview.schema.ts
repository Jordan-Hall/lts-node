import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ultimate-backend/core';

@ObjectType('Overview')
export class OverviewSchema {

	@FilterableField()
	@Field()
	title: string;

	@FilterableField()
	@Field((type) => Int)
	fromPrice: string;

	@Field({ nullable: true })
	description?: Record<string, any>

}