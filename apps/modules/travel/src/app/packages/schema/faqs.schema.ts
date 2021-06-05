import { Field, ObjectType, } from '@nestjs/graphql';

@ObjectType('FAQS')
export class FAQSSchema {
	@Field({ nullable: false })
	question: Record<string, any>

	@Field({ nullable: true })
	answer: false
}