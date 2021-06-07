
import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationResolver } from './destination.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationController } from './destination.controller';

import { ConfigModule } from '@ultimate-backend/config';
import {
	TravelDestination
} from './models/destination.model';

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([
			TravelDestination
		]),
	],
	providers: [DestinationService, DestinationResolver],
	controllers: [DestinationController],
})
export class DestinationModule { }