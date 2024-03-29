import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { OutputData } from '@lts/editorjs-outputdata';
import { ObjectID } from 'typeorm';
import { DestinationType } from '../enums/destination-type';


/**
 * @description This is the input or data transfer object for creating an package
 *
 */
@InputType('CreateDestination', {
	description: 'This is the input or data transfer object for creating an destination',
})
export class CreateDestinationRequest {

	/**
	 * @description Where is this destination?
	 */
	@Field({
		description: 'Where is this destination?',
		nullable: false,
	})
	@ApiProperty()
	name: string;


	/**
	 * @description What is the URl slug for this destination
	 */
	@Field({
		description: 'What is the URl slug for this destination',
	})
	@ApiProperty()
	@IsDefined()
	slug: string;

	/**
	 * @description is they a parentId
	 */
	@Field({
		description: 'Does this destination have a parent destination',
	})
	@ApiProperty()
	parentId?: ObjectID;


	/**
	 * @description is they a parentId
	 */
	@Field({
		description: 'Does this destination have a parent destination',
	})
	@ApiProperty({
		enum: DestinationType
	})
	@IsDefined()
	type: DestinationType


	/**
	 * @description Whats the destination description
	 */
	@Field({
		description: 'Whats the destination description',
	})
	@ApiProperty()
	@IsDefined()
	description?: OutputData;

	/**
	 * @description Whats the destination Image ID
	 */
	@Field({
		description: 'Whats the destination image ID',
	})
	@ApiProperty()
	@IsDefined()
	imageId?: string | number;
}