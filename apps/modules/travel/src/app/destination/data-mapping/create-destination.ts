import { CreateDestinationRequest } from '../dto/create-destination.model';
import { TravelDestination } from '../models/destination.model';
import { plainToClass } from 'class-transformer';

export class CreateDestinationMapper {
	static toEntity(dto: CreateDestinationRequest): TravelDestination {
		return plainToClass(TravelDestination, dto);
	}
}
