import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { createOpenApiAndYaml } from './open-api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  Logger.log('Set up helmet OK');
  app.setGlobalPrefix('api');
  Logger.log('Set up GlobalPrefix /api OK');
  app.enableCors();
  Logger.log('Set up enableCors OK');

  // TODO:開発以外の時は立ち上げない
  // OpenAPIローカルサーバー立ち上げyamlファイル出力
  createOpenApiAndYaml(app);
  Logger.log('This server is listening on port 3000');
  await app.listen(3000);
}
bootstrap();
