import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { dump } from 'js-yaml';

const config = new DocumentBuilder()
  .setTitle('Title')
  .setDescription('The API Description')
  .setVersion('1.0.0')
  .setExternalDoc('外部API設計書などのURL', 'url: string')
  .build();

/**
 * OpenAPIローカルサーバ立ち上げ
 * /docsにyamlファイル出力
 */
const createOpenApiAndYaml = (app: INestApplication) => {
  // 開発以外の時は立ち上げないようにする
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
  //
  fs.writeFileSync('src/docs/swagger-spec.yaml', dump(document, {}));
  Logger.log(
    'Create Open API Server. Check this URL http://localhost:3000/api-doc',
  );
};
export { createOpenApiAndYaml };
