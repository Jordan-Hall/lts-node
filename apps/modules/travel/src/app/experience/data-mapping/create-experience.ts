import { CreateExperienceRequest } from '../dto/create-experience.model';
import { TravelExperience } from '../models/experience.model';
import { plainToClass } from 'class-transformer';

export class CreateExperienceMapper {
	static toEntity(dto: CreateExperienceRequest): TravelExperience {
		return plainToClass(TravelExperience, dto);
	}
}
