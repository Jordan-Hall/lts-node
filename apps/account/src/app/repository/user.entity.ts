import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';
import { IsArray, IsString, Min, MinLength } from 'class-validator';
import { LocalAuth } from './embeded/auth';
import { UserResponseDto } from '../dtos/user.response';
import { hash } from 'bcrypt';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number

	@MinLength(2)
	@MinLength(20)
	@IsString()
	firstname: string;

	@MinLength(2)
	@MinLength(20)
	@IsString()
	lastname: string;

	@MinLength(2)
	@MinLength(20)
	@IsString()
	username?: string;

	@Column()
	@Min(8)
	password: string;

	deactivated?: boolean = false;

	@IsArray()
	emails?: [
		{
			address: string;
			verified: boolean;
			primary: boolean;
			verificationCode: string | number;
		},
	];

	services!: AuthServicesTypes;

	settings!: SettingsEmbed;

	toDtoClass?: new (entity: BaseEntity, options?: any) => UserResponseDto;

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 10);
	}
}

export class AuthServicesTypes {
	password?: LocalAuth;
}

class SettingsEmbed {}