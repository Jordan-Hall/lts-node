import { Entity, ObjectID, ObjectIdColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn  } from "typeorm";
import { OutputBlockData } from '@lts/editorjs-outputdata';
@Entity()
export class OutputData {
	@ObjectIdColumn()
	id?: ObjectID;

	@Column()
	version?: string;

	@Column()
	time?: number;

	@Column("simple-json")
	blocks: OutputBlockData[];
}

@Entity()
export class Overview {
	@ObjectIdColumn()
	id?: ObjectID;

	@Column()
	title: string;

	@Column()
	fromPrice: number;

	@Column()
	linkExperiences: string[]
	@Column()
	linkDestinations: string[]

	@Column(() => OutputData)
	description: OutputData
}

@Entity()
export class IncludesAndExcludes {
	@ObjectIdColumn()
	id?: ObjectID;

	@Column(() => OutputData)
	includes?: OutputData

	@Column(() => OutputData)
	excludes?: OutputData
}

@Entity()
export class FaqItem {
	@ObjectIdColumn()
	id?: ObjectID;

	@Column(() => OutputData)
	question: OutputData;

	@Column(() => OutputData)
	answer: OutputData;
}

@Entity()
export class ItineraryItem {
	@ObjectIdColumn()
	id?: ObjectID;

	@Column()
	title: string;

	@Column(() => OutputData)
	description?: OutputData;

	@Column()
	dateTime?: Date;
}

@Entity()
export class Itinerary {
	@ObjectIdColumn()
	id?: ObjectID;

	@Column()
	tripCode: string;

	@Column(() => OutputData)
	outline?: OutputData;

	@Column(() => ItineraryItem)
	itineraries: ItineraryItem[]
}

@Entity()
export class TravelPackages {
	@ObjectIdColumn()
	id?: ObjectID;

	@Column(() => Overview)
	overview: Overview;

	@Column(() => IncludesAndExcludes)
	includeExcludes: IncludesAndExcludes;

	@Column(() => FaqItem)
	faqs: FaqItem[];

	@Column(() => Itinerary)
	itinerary: Itinerary;

	@CreateDateColumn()
	created!: Date;

	@UpdateDateColumn()
	updated!: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}