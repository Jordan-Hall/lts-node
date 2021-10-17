import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined } from 'class-validator';
import { DownloadInputRequest } from './create-package/download-input.model';
import { FaqItemInputRequest } from './create-package/faq-item-input.mode';
import { GalleryInputRequest } from './create-package/gallery-input.model';
import { IncludesAndExcludesInputRequest } from './create-package/includes-and-excludes-input.model';
import { ItineraryInputRequest } from './create-package/itinerary-input.model';
import { OverviewInputRequest } from './create-package/overview-input.model';

/**
 * @description This is the input or data transfer object for creating an package
 *
 */
@InputType('CreatePackage', {
	description: 'This is the input or data transfer object for creating an account',
})
export class CreatePackageRequest {
	/**
	 * @description Package overview information
	 */
	@Field({
		description: 'Package overview information',
		nullable: false,
	})
	@ApiProperty()
	@IsDefined()
	overview: OverviewInputRequest;

	/**
	 * @description What does the package include and excludes
	 */
	@Field({
		description: 'What does the package include and excludes',
		nullable: false,
	})
	@ApiProperty()
	includeExcludes: IncludesAndExcludesInputRequest;


	/**
	 * @description What are the fequently asked questions
	 */
	@Field({
		description: 'What are the fequently asked questions',
		nullable: true,
	})
	@ApiProperty()
	@IsDefined()
	@IsArray()
	faqs: FaqItemInputRequest[];


	/**
	 * @description All the images related to the package
	 */
	@Field({
		description: 'All images for package',
		nullable: true,
	})
	@ApiProperty()
	@IsDefined()
	@IsArray()
	gallery: GalleryInputRequest[];

	/**
	 * @description All the images related to the package
	 */
	@Field({
		description: 'All downloads for package',
		nullable: true,
	})
	@ApiProperty()
	@IsDefined()
	@IsArray()
	download: DownloadInputRequest[];


	/**
	 * @description What will happen when you are away
	 */
	@Field({
		description: 'What will happen when you are away',
		nullable: true,
	})
	@ApiProperty()
	@IsDefined()
	itinerary: ItineraryInputRequest;
}