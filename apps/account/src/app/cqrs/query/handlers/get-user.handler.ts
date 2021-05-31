import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl/get-user.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../repository/user.entity';


@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
	logger = new Logger(this.constructor.name);
	constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

	async execute(query: GetUserQuery): Promise<UserEntity> {
		this.logger.log(query);
		const { where } = query;

		if (!where) {
			throw Error('Missing get inputs');
		}
		return this.userRepository.findOne(query);
	}
}