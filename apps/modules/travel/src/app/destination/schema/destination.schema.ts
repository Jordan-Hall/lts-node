import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField, NodeSchema} from '@ultimate-backend/core';
import { OutputBlockDataModel } from '@lts/editorjs-outputdata';

@ObjectType('DestinationSchema')
export class DestinationSchema extends NodeSchema<string> {

	@FilterableField()
	@Field()
	id: string;

	@FilterableField()
	@Field()
	name: string;

	@Field()
	slug: string;

	@Field()
	destination: OutputBlockDataModel;

	@FilterableField()
	@Field()
	type: 'Continent' | 'Country' | 'City'

	@FilterableField((returns) => DestinationSchema)
	@Field((type) => DestinationSchema)
	parentId: DestinationSchema;

}