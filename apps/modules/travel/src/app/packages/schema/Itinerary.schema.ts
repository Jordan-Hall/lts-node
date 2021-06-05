import { Field, ObjectType, } from '@nestjs/graphql';
import { FilterableField } from '@ultimate-backend/core';

@ObjectType('ItineraryItem')
export class ItineraryItemInputSchema {

	@FilterableField()
	@Field()
	title: string;

	@Field({ nullable: true })
	description?: Record<string, any>;

	@Field({ nullable: true })
	dateTime?: Date | string;
}

@ObjectType('Itinerary')
export class ItinerarySchema {

	@FilterableField()
	@Field({ nullable: true })
	tripCode?: Record<string, any>

	@Field({ nullable: true })
	outline?: Record<string, any>

	@FilterableField((returns) => ItineraryItemInputSchema)
	@Field((type) => [ItineraryItemInputSchema])
	itineraries: ItineraryItemInputSchema[];

}