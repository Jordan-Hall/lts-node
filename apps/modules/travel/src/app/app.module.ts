import { Module } from "@nestjs/common";
import { PermissionsModule } from '@ultimate-backend/permissions';
import { RedisModule } from '@ultimate-backend/redis';
import { BrakesModule } from '@ultimate-backend/brakes';
import { BootstrapModule } from '@ultimate-backend/bootstrap';
import { EtcdModule } from '@ultimate-backend/etcd';
import * as path from 'path';
@Module({
  imports: [
    BootstrapModule.forRoot({
      enableEnv: true,
      filePath: path.resolve(__dirname, './assets/bootstrap.yaml'),
    }),
    PermissionsModule.forRoot({
      polars: {
        polar: path.resolve(__dirname, './assets/example.polar'),
        file: true,
      },
    }),
    RedisModule.forRoot({
      redisOptions: {
        host: '35.178.212.41',
        port: 6379,
        db: 0,
      },
    }),
    EtcdModule.forRoot({
      etcdOptions: {
        hosts: '18.134.241.48:2379',
      },
    }),
    BrakesModule.forRoot(),
  ],
})
export class AppModule {}
