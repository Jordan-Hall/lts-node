import { Field, ObjectType, } from '@nestjs/graphql';

@ObjectType('Download')
export class DownloadSchema {
	@Field({ nullable: false })
	description: string

	@Field({ nullable: true })
	fileId: string | number
}