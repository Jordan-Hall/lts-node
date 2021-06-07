import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/ban-types
export type BlockToolData<T extends object = any> = T;

@InputType('OutputBlockDataInput', {
    description: 'EditorJs interface OutputBlockData',
})
export class OutputBlockData {

    @Field({
        description: 'Too type',
    })
    @ApiProperty()
    type: string;


    @Field({
        description: 'Saved Block data',
    })
    @ApiProperty()
    data: BlockToolData;
}

@InputType('OutputDataInput', {
    description: 'EditorJs interface',
})
export class OutputData {

    @Field({
        description: 'Title of the package and will be used for the slug',
        nullable: true,
    })
    @ApiProperty()
    version?: string;


    @Field({
        description: 'Title of the package and will be used for the slug',
        nullable: true,
    })
    @ApiProperty()
    time?: number;

    /**
     * Saved Blocks
     */
    blocks: OutputBlockData[];
}
