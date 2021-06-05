
import { Resolver } from '@nestjs/graphql';
import { PackageSchema } from './schema/package.schema';

@Resolver((of) => PackageSchema)
export class PackageResolver { }