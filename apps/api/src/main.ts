import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  type OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

const APOLLO_BASE_URL = 'http://studio.apollographql.com/sandbox/explorer';
const DEFAULT_PORT = 3000;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const apolloUrl = new URL(APOLLO_BASE_URL);
  apolloUrl.searchParams.set('endpoint', 'http://localhost:3000/graphql');
  apolloUrl.searchParams.set('document', 'query items{items{id}}');

  const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('turborepo template | zackinfosbd@gmail.com')
    .setDescription(
      [
        'Looking for the graphql api?',
        '<br/>',
        'Go to <a href="/graphql" target="_blank">/graphql</a>.',
        'Or,',
        `You might also need to use the <a target="_blank" href="${apolloUrl.toString()}">`,
        'Apollo explorer</a> for a greater experience.',
      ].join('\n'),
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app as unknown as INestApplication,
    swaggerConfig,
  );
  SwaggerModule.setup('api', app as unknown as INestApplication, document);

  const port = Number(process.env.PORT) || DEFAULT_PORT;
  await app.listen(port);
}

void bootstrap();

// bootstrap().catch((err) => {
//   console.error('Failed to start application:', err);
//   process.exit(1);
// });

// (async () => {
//   try {
//     const app = await NestFactory.create(AppModule);
//     await app.listen(process.env.PORT ?? 3000);
//   } catch (err) {
//     console.error('Failed to start application:', err);
//     process.exit(1);
//   }
// })();
