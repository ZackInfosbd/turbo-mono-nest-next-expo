import { InputType, PartialType } from '@nestjs/graphql';
import { Item } from '@prisma/client';

import { CreateItemInput } from './create-item.input';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  id: Item['id'];
}
