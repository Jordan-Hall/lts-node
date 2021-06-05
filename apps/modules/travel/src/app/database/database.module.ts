import { Module } from '@nestjs/common';
import { DatabaseTypeOrmService } from './database.service'
import { ConfigModule } from '@ultimate-backend/config';

@Module({
	imports: [ConfigModule],
	providers: [
		DatabaseTypeOrmService,
	],
	exports: [DatabaseTypeOrmService]
})
export class DatabaseResolverModule { }