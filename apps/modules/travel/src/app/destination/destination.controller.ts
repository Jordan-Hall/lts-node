import { Controller, Get, Post, Delete, Put, Param, Body, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDestinationRequest } from './dto/create-destination.model';
import { DestinationService } from './destination.service';
import { TravelDestination } from './models/destination.model';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('destination')
@Controller('destination')
@ApiBearerAuth()
@Controller()
export class DestinationController {

	constructor(private destinationService: DestinationService) {}

	@Post()
	createDestination(@Body() body: CreateDestinationRequest): Promise<TravelDestination> {
		return this.destinationService.create(body)
	}

	@Get()
	getAll(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit= 10,
	): Promise<Pagination<TravelDestination>> {
		return this.destinationService.findAll({
			limit,
			page,
			route: 'http://localhost:5002/api/v1/destinations',
			routingLabels: {
				limitLabel: 'limit',
				pageLabel: 'page'
			}
		});
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<TravelDestination> {
		return this.destinationService.findOne(id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() body: Partial<TravelDestination>) {
		return this.destinationService.update(id, body);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.destinationService.remove(id);
	}
}
