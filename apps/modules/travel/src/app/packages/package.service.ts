import { Injectable } from '@nestjs/common';
import { InjectRepository,  } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPackages } from './models/packages.model';
import { CreatePackageRequest } from './dto/create-package.model';
import { CreatePackageMapper } from './data-mapping/create-package';
import {
	paginate,
	Pagination,
	IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PackageService {
	constructor(
		@InjectRepository(TravelPackages) private readonly travelPackagesRepository: Repository<TravelPackages>,
	) { }

	async findAll(options: IPaginationOptions): Promise<Pagination<TravelPackages>> {
		return paginate(this.travelPackagesRepository, options);
	}

	findOne(id: string): Promise<TravelPackages> {
		return this.travelPackagesRepository.findOne(id);
	}

	async remove(id: string): Promise<void> {
		await this.travelPackagesRepository.delete(id);
	}

	create(createPackageRequest: CreatePackageRequest): Promise<TravelPackages> {
		const newPackage = CreatePackageMapper.toEntity(createPackageRequest)
		return this.travelPackagesRepository.save(newPackage);
	}

	update(id: string, createPackageRequest: Partial<CreatePackageRequest>) {
		return  this.travelPackagesRepository.update(id, createPackageRequest);
	}
}