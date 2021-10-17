import { Resolver } from '@nestjs/graphql';
import { PackageSchema } from './schema/package.schema';

@Resolver(() => PackageSchema)
export class PackageResolver { }