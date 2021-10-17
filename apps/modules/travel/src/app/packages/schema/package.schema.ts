import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FilterableField, NodeSchema } from '@ultimate-backend/core';
import { DownloadSchema } from './download.schema';
import { FAQSSchema } from './faqs.schema';
import { GallerySchema } from './gallery.schema';
import { IncludeExcludeSchema } from './includes-and-excludes.schema';
import { ItinerarySchema } from './Itinerary.schema';
import { OverviewSchema } from './overview.schema';

@ObjectType('Package')
export class PackageSchema extends NodeSchema<string> {

	@Field(() => Int)
	id: string;

	@FilterableField(() => OverviewSchema)
	@Field(() => OverviewSchema)
	overview: OverviewSchema;

	@FilterableField(() => IncludeExcludeSchema)
	@Field(() => IncludeExcludeSchema)
	includeExcludes: IncludeExcludeSchema;

	@FilterableField(() => FAQSSchema)
	@Field(() => [FAQSSchema])
	faqs: FAQSSchema[];

	@FilterableField(() => DownloadSchema)
	@Field(() => [DownloadSchema])
	download: DownloadSchema[];

	@FilterableField(() => GallerySchema)
	@Field(() => [GallerySchema])
	gallery: GallerySchema[];

	@FilterableField(() => ItinerarySchema)
	@Field(() => ItinerarySchema)
	itinerary: ItinerarySchema;

}