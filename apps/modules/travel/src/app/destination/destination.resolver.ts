
import { Resolver } from '@nestjs/graphql';
import { DestinationSchema } from './schema/destination.schema';

@Resolver((of) => DestinationSchema)
export class DestinationResolver { }