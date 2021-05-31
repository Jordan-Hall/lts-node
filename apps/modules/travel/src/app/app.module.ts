import { Module } from "@nestjs/common";

import { ConfigModule, ConfigSource } from '@ultimate-backend/config';
import { PermissionsModule } from '@ultimate-backend/permissions';
import { CloudModule } from '@ultimate-backend/cloud';
import { RedisModule } from '@ultimate-backend/redis';
import { ConsulModule } from '@ultimate-backend/consul';
import { ConsulModuleOptions } from '@ultimate-backend/consul/src/lib/consul-module.options';
import { CONSUL_CONFIG_OPTIONS } from '@ultimate-backend/consul/src/lib/consul.constant';
import { ClientModule } from '@ultimate-backend/client';
import { LoadBalancerModule } from '@ultimate-backend/loadbalancer';
import { BrakesModule } from '@ultimate-backend/brakes';
import { GraphQLModule } from '@nestjs/graphql';
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
    // CloudModule.forRoot({
    //   registry: {
    //     discoverer: 'consul',
    //     service: {
    //       id: 'adv-travel',
    //       port: 3332,
    //       address: 'https://consul-cluster.consul.6d7be6b7-7f0a-4d38-b0f9-2b545f2c4e05.aws.hashicorp.cloud',
    //       name: 'adv-travel',
    //     },
    //   },
    // }),
    // ConfigModule.forRoot({
    //   load: [
    //     {
    //       source: ConfigSource.Consul,
    //       key: 'consul-cluster',
    //     },
    //   ],
    // }),
    // ConsulModule.forRoot({
    //   host: 'https://consul-cluster.consul.6d7be6b7-7f0a-4d38-b0f9-2b545f2c4e05.aws.hashicorp.cloud',
    //   port: '8500',
    //   debug: true,
    //   aclToken: 'b3cd3358-ee51-3b22-98e5-ea5537aa5f24'
    // } as ConsulModuleOptions),
    RedisModule.forRoot({
      redisOptions: {
        host: '35.178.212.41',
        port: 6379,
        db: 0,
      },
    }),
    // ClientModule.forRoot(),
    EtcdModule.forRoot({
      etcdOptions: {
        hosts: '18.134.241.48:2379',
      },
    }),
    // LoadBalancerModule.forRoot({
    //   services: [{ strategy: 'RoundRobinStrategy', name: 'travel' }],
    // }),
    BrakesModule.forRoot(),
  ],
})
export class AppModule {}
