import { IQuery } from '@nestjs/cqrs';
import { FindConditions } from 'typeorm';
import { UserEntity } from '../../../repository/user.entity';

export class GetUserQuery implements IQuery {
	constructor(public readonly where: FindConditions<UserEntity>) { }
}