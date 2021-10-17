import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description Package Images
 *
 */
@InputType('GalleryInput', {
	description: 'Gallery',
})
export class GalleryInputRequest {
	/**
	 * @description what is the image description
	 */
	@Field({
		description: 'Description of the image',
		nullable: false,
	})
	@ApiProperty()
	description: string;

	/**
	 * @description Reference to the Image
	 */
	@Field({
		description: 'Image reference',
		nullable: false,
	})
	@ApiProperty()
	imageId: string | number;
}