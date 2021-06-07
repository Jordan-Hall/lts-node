 type BlockToolData<T extends object = any> = T;

export class OutputBlockDataModel {
	type: string;
	data: BlockToolData;
}