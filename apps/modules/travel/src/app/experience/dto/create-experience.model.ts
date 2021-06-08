import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { OutputData } from '@lts/editorjs-outputdata';
import { ObjectID } from 'typeorm';

/**
 * @description This is the input or data transfer object for creating an package
 *
 */
@InputType('CreateExperience', {
	description: 'This is the input or data transfer object for creating an experience',
})
export class CreateExperienceRequest {

	/**
	 * @description Where is this experience?
	 */
	@Field({
		description: 'Where is this experience?',
		nullable: false,
	})
	@ApiProperty()
	name: string;


	/**
	 * @description What is the URl slug for this experience
	 */
	@Field({
		description: 'What is the URl slug for this experience',
	})
	@ApiProperty()
	@IsDefined()
	slug: string;

	/**
	 * @description is they a parentId
	 */
	@Field({
		description: 'Does this experience have a parent experience',
	})
	@ApiProperty()
	@IsDefined()
	parentId?: ObjectID;

	/**
	 * @description Whats the experience description
	 */
	@Field({
		description: 'Whats the experience description',
	})
	@ApiProperty()
	@IsDefined()
	description?: OutputData;
}