import { NestFactory } from "@nestjs/core";
import { UBServiceFactory } from '@ultimate-backend/core';
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = [
    'http://localhost:3000',
    'http://localhost:4000',
    'http://localhost:4200',
    'http://localhost:80',
    'http://localhost:8080',
  ]
  app.enableCors({
    origin: whitelist
  });
  await UBServiceFactory.create(app)
    .withGrpc()
    .withValidation({
      skipMissingProperties: false,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      enableDebugMessages: true,
    })
    .withSession(true)
    .withPoweredBy()
    .withPrefix('api/v1')
    .withSwagger()
    .start();
}

(async () => await bootstrap())();