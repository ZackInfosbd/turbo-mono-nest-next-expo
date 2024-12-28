import { Module } from '@nestjs/common';

import { ItemsResolver } from './graphql/items.resolver';
import { ItemsService } from './graphql/items.service';
import { ItemsController } from './rest/items.controller';

@Module({
  providers: [ItemsResolver, ItemsService],
  exports: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
