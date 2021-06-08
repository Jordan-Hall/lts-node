import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField, NodeSchema} from '@ultimate-backend/core';
import { OutputBlockDataModel } from '@lts/editorjs-outputdata';

@ObjectType('ExperienceSchema')
export class ExperienceSchema extends NodeSchema<string> {

	@FilterableField()
	@Field()
	id: string;

	@FilterableField()
	@Field()
	name: string;

	@Field()
	slug: string;

	@Field()
	description: OutputBlockDataModel;

	@FilterableField((returns) => ExperienceSchema)
	@Field((type) => ExperienceSchema)
	parentId: ExperienceSchema;

}