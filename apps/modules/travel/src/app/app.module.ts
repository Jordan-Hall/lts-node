
import { Module } from '@nestjs/common';
// import { CloudModule } from '@ultimate-backend/cloud';
import { RedisModule } from '@ultimate-backend/redis';
// import { ConsulModule } from '@ultimate-backend/consul';
// import { ClientModule } from '@ultimate-backend/client';
// import { LoadBalancerModule } from '@ultimate-backend/loadbalancer';
// import { BrakesModule } from '@ultimate-backend/brakes';
// import { GraphQLModule } from '@nestjs/graphql';
import { BootstrapModule } from '@ultimate-backend/bootstrap';
// import { EtcdModule } from '@ultimate-backend/etcd';

import { ConfigModule, ConfigSource } from '@ultimate-backend/config';
// import { PermissionsModule } from '@ultimate-backend/permissions';
import * as path from 'path';
import { PackageModule } from './packages/packages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseTypeOrmService } from './database/database.service';
import { DatabaseResolverModule } from './database/database.module';
import { ExperienceModule } from './experience/experience.module';
import { DestinationModule } from './destination/destination.module';

@Module({
  imports: [
    PackageModule,
    DestinationModule,
    ExperienceModule,
    BootstrapModule.forRoot({
      enableEnv: true,
      filePath: path.resolve(__dirname, './assets/bootstrap.yaml'),
    }),
    ConfigModule.forRoot({
      global: true,
      load: [
        {
          source: ConfigSource.File,
          filePath: path.resolve(__dirname, './assets/config.yaml'),
          enableCache: true,
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseResolverModule],
      useExisting: DatabaseTypeOrmService,
    }),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true,
    // }),
    // PermissionsModule.forRoot({
    //   polars: {
    //     polar: path.resolve(__dirname, './assets/example.polar'),
    //     file: true,
    //   },
    // }),
    // CloudModule.forRoot({
    //   registry: {
    //     discoverer: 'consul',
    //     service: {
    //       id: 'adv-example',
    //       port: 3332,
    //       address: 'localhost',
    //       name: 'adv-example',
    //     },
    //   },
    // }),
    // ConfigModule.forRoot({
    //   load: [
    //     {
    //       source: ConfigSource.Consul,
    //       key: 'ultimate-backend-config',
    //     },
    //   ],
    // }),
    // ConsulModule.forRoot({
    //   host: 'localhost',
    //   port: '8500',
    //   debug: true,
    // } as any),
    RedisModule.forRoot({
      redisOptions: {
        host: 'localhost',
        port: 6379,
        db: 0,
      },
    }),
    // ClientModule.forRoot(),
    // EtcdModule.forRoot({
    //   etcdOptions: {
    //     hosts: 'localhost:2379',
    //   },
    // }),
    // LoadBalancerModule.forRoot({
    //   services: [{ strategy: 'RoundRobinStrategy', name: 'example' }],
    // }),
    // BrakesModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
