import { Entity, ObjectID, ObjectIdColumn, Column, ManyToOne, JoinTable } from "typeorm";
import { OutputBlockDataModel } from '@lts/editorjs-outputdata';
import { DestinationType } from "../enums/destination-type";

@Entity()
export class TravelDestination {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	name: string;

	@Column()
	slug: string;

	@Column()
	description: OutputBlockDataModel;

	@Column()
	type: DestinationType

	@ManyToOne(() => TravelDestination, dest => dest.id)
	@JoinTable()
	parentId: TravelDestination;
}