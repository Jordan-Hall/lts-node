import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FilterableField, NodeSchema } from '@ultimate-backend/core';
import { FAQSSchema } from './faqs.schema';
import { IncludeExcludeSchema } from './includes-and-excludes.schema';
import { ItinerarySchema } from './Itinerary.schema';
import { OverviewSchema } from './overview.schema';

@ObjectType('Package')
export class PackageSchema extends NodeSchema<number> {

	@Field((type) => Int)
	id: number;

	@FilterableField((returns) => OverviewSchema)
	@Field((type) => OverviewSchema)
	overview: OverviewSchema;

	@FilterableField((returns) => IncludeExcludeSchema)
	@Field((type) => IncludeExcludeSchema)
	includeExcludes: IncludeExcludeSchema;

	@FilterableField((returns) => FAQSSchema)
	@Field((type) => [FAQSSchema])
	faqs: FAQSSchema[];


	@FilterableField((returns) => ItinerarySchema)
	@Field((type) => ItinerarySchema)
	itinerary: ItinerarySchema;

}