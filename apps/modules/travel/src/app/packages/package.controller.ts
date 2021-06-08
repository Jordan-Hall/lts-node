import { Controller, Get, Post, Delete, Put, Param, Body, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePackageRequest } from './dto/create-package.model';
import { PackageService } from './package.service';
import { TravelPackages } from './models/packages.model';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('packages')
@Controller('packages')
@ApiBearerAuth()
@Controller()
export class PackageController {

	constructor(private packageService: PackageService) {}

	@Post()
	createPackage(@Body() body: CreatePackageRequest): Promise<TravelPackages> {
		return this.packageService.create(body)
	}

	@Get()
	getAll(
		@Query() dtoQuery?: TravelPackages,
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit= 10,
	): Promise<Pagination<TravelPackages>> {
		return this.packageService.findAll({
			limit,
			page,
			route: '/api/v1/packages',
			routingLabels: {
				limitLabel: 'limit',
				pageLabel: 'page'
			}
		});
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<TravelPackages> {
		return this.packageService.findOne(id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() body: Partial<CreatePackageRequest>) {
		return this.packageService.update(id, body);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.packageService.remove(id);
	}
}
