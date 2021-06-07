import { Injectable } from '@nestjs/common';
import { InjectRepository,  } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelExperience } from './models/experience.model';
import { CreateExperienceRequest } from './dto/create-experience.model';
import { CreateExperienceMapper } from './data-mapping/create-experience';
import {
	paginate,
	Pagination,
	IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ExperienceService {
	constructor(
		@InjectRepository(TravelExperience) private readonly travelExperienceRepository: Repository<TravelExperience>,
	) { }

	async findAll(options: IPaginationOptions): Promise<Pagination<TravelExperience>> {
		return paginate(this.travelExperienceRepository, options);
	}

	findOne(id: string): Promise<TravelExperience> {
		return this.travelExperienceRepository.findOne(id);
	}

	async remove(id: string): Promise<void> {
		await this.travelExperienceRepository.delete(id);
	}

	create(createExperienceRequest: CreateExperienceRequest): Promise<TravelExperience> {
		const newExperience = CreateExperienceMapper.toEntity(createExperienceRequest)
		return this.travelExperienceRepository.save(newExperience);
	}

	update(id: string, data: Partial<TravelExperience>) {
		return this.travelExperienceRepository.update(id, data);
	}
}