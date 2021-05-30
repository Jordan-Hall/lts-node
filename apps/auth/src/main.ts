/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { enableKillGracefully } from '@ultimate-backend/common';
import { NestFactory } from "@nestjs/core";

import { AuthModule } from "./app/auth.module";
import { UBServiceFactory } from "@ultimate-backend/core";


async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  enableKillGracefully(app);
  await UBServiceFactory.create(app)
    .withSwagger()
    .withGrpc()
    .withPoweredBy()
    .withPrefix("api")
    .start();
}

(async () => await bootstrap())();

