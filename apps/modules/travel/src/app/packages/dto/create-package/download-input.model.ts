import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description Package download files
 *
 */
@InputType('DownloadInput', {
	description: 'File information',
})
export class DownloadInputRequest {
	/**
	 * @description what is the file description
	 */
	@Field({
		description: 'Description of the file',
		nullable: false,
	})
	@ApiProperty()
	description: string;

	/**
	 * @description Reference to the file
	 */
	@Field({
		description: 'file reference',
		nullable: false,
	})
	@ApiProperty()
	fileId: string | number;
}