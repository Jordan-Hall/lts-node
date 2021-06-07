
import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceResolver } from './experience.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceController } from './experience.controller';

import { ConfigModule } from '@ultimate-backend/config';
import {
	TravelExperience
} from './models/experience.model';

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([
			TravelExperience
		]),
	],
	providers: [ExperienceService, ExperienceResolver],
	controllers: [ExperienceController],
})
export class ExperienceModule { }