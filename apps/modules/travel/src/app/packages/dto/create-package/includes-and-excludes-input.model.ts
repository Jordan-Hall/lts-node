import { OutputData } from '@lts/editorjs-outputdata';
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

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
