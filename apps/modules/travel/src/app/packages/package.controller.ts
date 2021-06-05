import { Controller, Get, Post, Delete, Put, Body  } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePackageRequest } from './dto/create-package.model';

@ApiTags('packages')
@Controller('packages')
@ApiBearerAuth()
@Controller()
export class PackageController {
	@Post()
	createPackage(@Body() body: CreatePackageRequest) {
		console.log(body);
		debugger;
	}
}