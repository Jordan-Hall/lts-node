
import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageResolver } from './package.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageController } from './package.controller';

import { ConfigModule } from '@ultimate-backend/config';
import {
	OutputData,
	Overview,
	IncludesAndExcludes,
	FaqItem,
	ItineraryItem,
	Itinerary,
	TravelPackages
} from './models/packages.model';

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([
			OutputData,
			Overview,
			IncludesAndExcludes,
			FaqItem,
			ItineraryItem,
			Itinerary,
			TravelPackages
		]),
	],
	providers: [PackageService, PackageResolver],
	controllers: [PackageController],
})
export class PacakageModule { }