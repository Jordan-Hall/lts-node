import { NestFactory } from "@nestjs/core";
import { UBServiceFactory } from '@ultimate-backend/core';
import { AppModule } from "./app/app.module";
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { Express } from 'express';
import * as serverless from 'serverless-http';
import { APIGatewayProxyEvent, APIGatewayProxyEventV2, Context } from "aws-lambda";

let cachedServer: Express.Application;

async function bootstrap(expressApp?: Express) {
  let app: INestApplication

  if (expressApp) {
    app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  } else {
    app = await NestFactory.create(AppModule);
  }

  const whitelist = [
    'http://localhost:3000',
    'http://localhost:4000',
    'http://localhost:4200',
    'http://localhost:80',
    'http://localhost:8080',
    'https://lts.sh',
    'http://lts.sh',
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
  return app;
}

(async () => await bootstrap())();



export async function handler(event: APIGatewayProxyEvent | APIGatewayProxyEventV2, context: Context) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return serverless(cachedServer)(event, context)
}