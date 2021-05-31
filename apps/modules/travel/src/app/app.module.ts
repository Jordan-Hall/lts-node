import { Module } from "@nestjs/common";

import { ConfigModule, ConfigSource } from '@ultimate-backend/config';
import { PermissionsModule } from '@ultimate-backend/permissions';
import { CloudModule } from '@ultimate-backend/cloud';
import { RedisModule } from '@ultimate-backend/redis';
import { ConsulModule } from '@ultimate-backend/consul';
import { ClientModule } from '@ultimate-backend/client';
import { LoadBalancerModule } from '@ultimate-backend/loadbalancer';
import { BrakesModule } from '@ultimate-backend/brakes';
import { GraphQLModule } from '@nestjs/graphql';
import { BootstrapModule } from '@ultimate-backend/bootstrap';
import { EtcdModule } from '@ultimate-backend/etcd';
import * as path from 'path';
@Module({
  imports: [
    BootstrapModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    PermissionsModule.forRoot({
      polars: {
        polar: path.resolve(__dirname, 'assets/example.polar'),
        file: true,
      },
    }),
    CloudModule.forRoot({
      registry: {
        discoverer: 'consul',
        service: {
          id: 'adv-travel',
          port: 3332,
          address: 'ec2-35-179-94-174.eu-west-2.compute.amazonaws.com',
          name: 'adv-example',
        },
      },
    }),
    ConfigModule.forRoot({
      load: [
        {
          source: ConfigSource.Consul,
          key: 'ultimate-backend-config',
        },
      ],
    }),
    ConsulModule.forRoot({
      host: 'ec2-35-179-94-174.eu-west-2.compute.amazonaws.com',
      port: '8500',
      debug: true,
    } as any),
    RedisModule.forRoot({
      redisOptions: {
        host: 'ec2-18-130-245-149.eu-west-2.compute.amazonaws.com',
        port: 6379,
        db: 0,
      },
    }),
    ClientModule.forRoot(),
    EtcdModule.forRoot({
      etcdOptions: {
        hosts: 'ec2-3-8-138-223.eu-west-2.compute.amazonaws.com:2379',
      },
    }),
    LoadBalancerModule.forRoot({
      services: [{ strategy: 'RoundRobinStrategy', name: 'travel' }],
    }),
    BrakesModule.forRoot(),
  ]
})
export class AppModule {}
