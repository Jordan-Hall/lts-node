import { Field, ObjectType, } from '@nestjs/graphql';

@ObjectType('Gallery')
export class GallerySchema {
	@Field({ nullable: false })
	description: string

	@Field({ nullable: true })
	imageId: string | number
}