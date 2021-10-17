import { OutputData } from '@lts/editorjs-outputdata';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { ItineraryItemInputRequest } from './itinerary-item-input.model';

/**
 * @description This is the overview input request type
 *
 */
@InputType('ItineraryInput', {
	description: 'This is the itinerary input type',
})
export class ItineraryInputRequest {
	/**
	 * @description Identify code
	 */
	@Field({
		description: 'A code to reference itinerary',
	})
	@ApiProperty()
	tripCode: string;

	/**
	 * @description Editor JS details to outlinee the itinerary overview
	 */
	@Field({
		description: 'Editor JS details to outlinee the itinerary overview.',
		nullable: true,
	})
	@ApiProperty()
	outline?: OutputData;

	/**
	 * @description This is the the itinerary List
	 */
	@Field({
		description: 'This is the the itinerary List.',
	})
	@ApiProperty()
	itineraries: ItineraryItemInputRequest[]
}
