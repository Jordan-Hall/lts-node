import { Controller, Get, Post, Delete, Put, Param, Body, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateExperienceRequest } from './dto/create-experience.model';
import { ExperienceService } from './experience.service';
import { TravelExperience } from './models/experience.model';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('experience')
@Controller('experience')
@ApiBearerAuth()
@Controller()
export class ExperienceController {

	constructor(private experienceService: ExperienceService) {}

	@Post()
	createExperience(@Body() body: CreateExperienceRequest): Promise<TravelExperience> {
		return this.experienceService.create(body)
	}

	@Get()
	getAll(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit= 10,
	): Promise<Pagination<TravelExperience>> {
		return this.experienceService.findAll({
			limit,
			page,
			route: 'http://localhost:5002/api/v1/experiences',
			routingLabels: {
				limitLabel: 'limit',
				pageLabel: 'page'
			}
		});
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<TravelExperience> {
		return this.experienceService.findOne(id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() body: Partial<TravelExperience>) {
		return this.experienceService.update(id, body);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.experienceService.remove(id);
	}
}
