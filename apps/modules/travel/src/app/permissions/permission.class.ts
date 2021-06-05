import { OsoClass } from '@ultimate-backend/permissions';

@OsoClass({ name: 'Permission' })
export class PermissionClass {
	canRead: boolean;
	userId: string;
	description: string;

	constructor(canRead: boolean, userId: string, description: string) {
		this.canRead = canRead;
		this.userId = userId;
		this.description = description;
	}
}