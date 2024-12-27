import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const apolloExplorerUrl =
    'http://studio.apollographql.com/sandbox/explorer' +
    '?endpoint=http://localhost:3000/graphql&document=query items{items{id}}';

  const config = new DocumentBuilder()
    .setTitle('turborepo template | zackinfosbd@gmail.com')
    .setDescription(
      [
        'Looking for the graphql api?',
        '<br/>',
        'Go to <a href="/graphql" target="_blank">/graphql</a>.',
        'Or,',
        `You might also need to use the <a target="_blank" href="${apolloExplorerUrl}">`,
        'Apollo explorer</a> for a greater experience.',
      ].join('\n'),
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app as INestApplication,
    config,
  );

  SwaggerModule.setup('api', app as INestApplication, document);

  const port = process.env.PORT ?? 3000;
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
