
export class BaseDto {
	id: string | number;
	createdAt: Date | string;
	updatedAt: Date | string;

	constructor(entity: any) {
		this.id = entity.id;
		this.createdAt = entity.createdAt;
		this.updatedAt = entity.updatedAt;
	}
}