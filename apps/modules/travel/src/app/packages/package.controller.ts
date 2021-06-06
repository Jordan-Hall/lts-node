import { Controller, Get, Post, Delete, Param, Body  } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePackageRequest } from './dto/create-package.model';
import { PackageService } from './package.service';
import { TravelPackages } from './models/packages.model';

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
	getAll(): Promise<TravelPackages[]> {
		return this.packageService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<TravelPackages> {
		return this.packageService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.packageService.remove(id);
	}
}