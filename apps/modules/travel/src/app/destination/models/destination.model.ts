import { Entity, ObjectID, ObjectIdColumn, Column, ManyToOne, JoinTable } from "typeorm";
import { OutputBlockDataModel } from '@lts/editorjs-outputdata';

@Entity()
export class TravelDestination {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	name: string;

	@Column()
	slug: string;

	@Column()
	destination: OutputBlockDataModel;

	@ManyToOne(() => TravelDestination, dest => dest.id)
	@JoinTable()
	parentId: TravelDestination;
}