import { Injectable } from '@nestjs/common';
import { InjectRepository,  } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelDestination } from './models/destination.model';
import { CreateDestinationRequest } from './dto/create-destination.model';
import { CreateDestinationMapper } from './data-mapping/create-destination';
import {
	paginate,
	Pagination,
	IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class DestinationService {
	constructor(
		@InjectRepository(TravelDestination) private readonly travelDestinationRepository: Repository<TravelDestination>,
	) { }

	async findAll(options: IPaginationOptions): Promise<Pagination<TravelDestination>> {
		return paginate(this.travelDestinationRepository, options);
	}

	findOne(id: string): Promise<TravelDestination> {
		return this.travelDestinationRepository.findOne(id);
	}

	async remove(id: string): Promise<void> {
		await this.travelDestinationRepository.delete(id);
	}

	create(createDestinationRequest: CreateDestinationRequest): Promise<TravelDestination> {
		const newDestination = CreateDestinationMapper.toEntity(createDestinationRequest)
		return this.travelDestinationRepository.save(newDestination);
	}

	update(id: string, data: Partial<TravelDestination>) {
		return this.travelDestinationRepository.update(id, data);
	}
}