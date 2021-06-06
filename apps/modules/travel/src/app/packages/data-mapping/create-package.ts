import { CreatePackageRequest } from '../dto/create-package.model';
import { TravelPackages } from '../models/packages.model';
import { plainToClass } from 'class-transformer';

export class CreatePackageMapper {
	static toEntity(dto: CreatePackageRequest): TravelPackages {
		return plainToClass(TravelPackages, dto)
	}
}