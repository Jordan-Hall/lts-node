import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField, NodeSchema} from '@ultimate-backend/core';
import { OutputBlockDataModel } from '@lts/editorjs-outputdata';
import { DestinationType } from '../enums/destination-type';

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
	description: OutputBlockDataModel;

	@FilterableField()
	@Field()
	type: DestinationType;

	@FilterableField((returns) => DestinationSchema)
	@Field((type) => DestinationSchema)
	parentId: DestinationSchema;

}