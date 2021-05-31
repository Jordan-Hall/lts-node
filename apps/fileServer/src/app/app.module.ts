import { Module } from "@nestjs/common";
import { BootstrapModule } from '@ultimate-backend/bootstrap';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesController } from "./file.controller";
import { FilesService } from "./file.service";
import { BullModule } from '@nestjs/bull';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisModule } from '@ultimate-backend/redis';
import * as path from 'path';
import { BullConfig } from './bull.config';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';

@Module({
  imports: [
    BootstrapModule.forRoot({
      enableEnv: true,
      filePath: path.resolve(__dirname, './assets/bootstrap.yaml'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/files_db'),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    RedisModule.forRoot({ useCluster: false }),
    ThrottlerModule.forRoot({
      ttl: 60000,
      limit: 3,
    }),
    BullModule.forRootAsync({
      useClass: BullConfig,
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, GridFsMulterConfigService],
})
export class AppModule {}
