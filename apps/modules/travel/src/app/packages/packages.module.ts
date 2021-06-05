
import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageResolver } from './package.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageController } from './package.controller';
import { DatabaseTypeOrmService } from '../database/database.service';
import { DatabaseResolverModule } from '../database/database.module';
import { ConfigModule } from '@ultimate-backend/config';

@Module({
	providers: [PackageService, PackageResolver],
	controllers: [PackageController],
	imports: [
		ConfigModule,
		TypeOrmModule.forRootAsync({
			imports: [DatabaseResolverModule],
			useExisting: DatabaseTypeOrmService,
		})
	]
})
export class PacakageModule { }