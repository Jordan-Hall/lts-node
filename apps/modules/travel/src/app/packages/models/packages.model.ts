import { Entity, ObjectID, ObjectIdColumn, Column,  } from "typeorm";

export type BlockToolData<T extends object = any> = T;

export class OutputBlockData {
	type: string;
	data: BlockToolData;
}

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
}