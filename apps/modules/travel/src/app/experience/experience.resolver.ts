
import { Resolver } from '@nestjs/graphql';
import { ExperienceSchema } from './schema/experience.schema';

@Resolver((of) => ExperienceSchema)
export class ExperienceResolver { }