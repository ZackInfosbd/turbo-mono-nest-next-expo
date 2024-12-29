import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { PrismaModule } from './common/prisma/prisma.module';
import { ItemsModule } from './models/items/items.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      fieldResolverEnhancers: ['guards'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ItemsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
