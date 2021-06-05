import { Field, ObjectType, } from '@nestjs/graphql';

@ObjectType('IncludeExclude')
export class IncludeExcludeSchema {
	@Field({ nullable: true })
	includes?: Record<string, any>

	@Field({ nullable: true })
	excludes?: Record<string, any>
}