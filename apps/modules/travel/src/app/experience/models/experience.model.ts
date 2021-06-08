import { Entity, ObjectID, ObjectIdColumn, Column, ManyToOne, JoinTable } from "typeorm";
import { OutputBlockDataModel } from '@lts/editorjs-outputdata';

@Entity()
export class TravelExperience {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	name: string;

	@Column()
	slug: string;

	@Column()
	description: OutputBlockDataModel;

	@ManyToOne(() => TravelExperience, dest => dest.id)
	@JoinTable()
	parentId: TravelExperience;
}