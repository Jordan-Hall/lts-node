import { OutputData } from '@lts/editorjs-outputdata';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description This is the overview input request type
 *
 */
@InputType('ItineraryItemInput', {
	description: 'This is the itinerary item input type',
})
export class ItineraryItemInputRequest {
	/**
	 * @description title ove the itinerary item
	 */
	@Field({
		description: 'Title ove the itinerary item',
	})
	@ApiProperty()
	title: string;

	/**
	 * @description Editor JS details to description the itinerary overview
	 */
	@Field({
		description: 'The itinerary details.',
		nullable: true,
	})
	@ApiProperty()
	description?: OutputData;


	/**
	 * @description When will this take place
	 */
	@Field({
		description: 'When will this take place?',
		nullable: false,
	})
	@ApiProperty()
	dateTime?: Date | string;
}
