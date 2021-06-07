import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { OutputData } from '@lts/editorjs-outputdata';
/**
 * @description This is the overview input request type
 *
 */
@InputType('OverviewInput', {
	description: 'This is the overview input type',
})
export class OverviewInputRequest {
	/**
	 * @description Title of the package and will be used for the slug
	 */
	@Field({
		description: 'Title of the package and will be used for the slug',
	})
	@ApiProperty()
	title: string;

	/**
	 * @description the from price of the package
	 */
	@Field({
		description: 'The from price for the package',
	})
	@ApiProperty()
	fromPrice: number;

	/**
	 * @description What is the Experiences this package contains
	 */
	@Field({
		description: 'What is the Experiences this package contains',
	})
	@ApiProperty()
	linkExperiences: string[]


	/**
	 * @description What is the Destination this package contains
	 */
	@Field({
		description: 'What is the Destination this package contains',
	})
	@ApiProperty()
	linkDestinations: string[]

	/**
	 * @description This is the description. Currently we use EditorJs output
	 */
	@Field({
		description: 'This is the unknown from Editor JS.',
		nullable: true,
	})
	@ApiProperty()
	description: OutputData
}


/**
 * @description Includes & Excludes editorJs Data
 *
 */
@InputType('IncludesAndExcludesInput', {
	description: 'Includes & Excludes editorJs Data',
})
export class IncludesAndExcludesInputRequest {
	/**
	 * @description What does the package includes using EditorJs Data
	 */
	@Field({
		description: 'What does the package includes using EditorJs Data.',
		nullable: true,
	})
	@ApiProperty()
	includes?: OutputData

	/**
	 * @description What does the package includes using EditorJs Data
	 */
	@Field({
		description: 'What does the package excludes using EditorJs Data.',
		nullable: true,
	})
	@ApiProperty()
	excludes?: OutputData
}


/**
 * @description Commonly asked question
 *
 */
@InputType('FaqItemInput', {
	description: 'F&Q',
})
export class FaqItemInputRequest {
	/**
	 * @description What does the package includes using EditorJs Data
	 */
	@Field({
		description: 'The question to the commonly asked question',
		nullable: false,
	})
	@ApiProperty()
	question: OutputData;

	/**
	 * @description The answer to the commonly asked question.
	 */
	@Field({
		description: 'The answer to the commonly asked question.',
		nullable: false,
	})
	@ApiProperty()
	answer: OutputData;
}

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


/**
 * @description This is the input or data transfer object for creating an package
 *
 */
@InputType('CreatePackage', {
	description: 'This is the input or data transfer object for creating an account',
})
export class CreatePackageRequest {
	/**
	 * @description Package overview information
	 */
	@Field({
		description: 'Package overview information',
		nullable: false,
	})
	@ApiProperty()
	@IsDefined()
	overview: OverviewInputRequest;

	/**
	 * @description What does the package include and excludes
	 */
	@Field({
		description: 'What does the package include and excludes',
		nullable: false,
	})
	@ApiProperty()

	includeExcludes: IncludesAndExcludesInputRequest;


	/**
	 * @description What are the fequently asked questions
	 */
	@Field({
		description: 'What are the fequently asked questions',
		nullable: true,
	})
	@ApiProperty()
	@IsDefined()
	faqs: FaqItemInputRequest[];


	/**
	 * @description What will happen when you are away
	 */
	@Field({
		description: 'What will happen when you are away',
		nullable: true,
	})
	@ApiProperty()
	@IsDefined()
	itinerary: ItineraryInputRequest;
}