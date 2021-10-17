import { OutputData } from '@lts/editorjs-outputdata';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

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