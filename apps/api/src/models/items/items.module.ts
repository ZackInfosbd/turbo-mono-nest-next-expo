import jwtConfig from '@/common/config/jwt.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { ItemsResolver } from './graphql/items.resolver';
import { ItemsService } from './graphql/items.service';
import { ItemsController } from './rest/items.controller';

@Module({
  providers: [ItemsResolver, ItemsService],
  exports: [ItemsService],
  controllers: [ItemsController],
  imports: [JwtModule, ConfigModule.forFeature(jwtConfig)],
})
export class ItemsModule {}
