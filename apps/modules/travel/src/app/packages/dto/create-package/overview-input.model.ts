import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
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
