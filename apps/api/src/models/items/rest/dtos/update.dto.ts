import { PartialType } from '@nestjs/swagger';
import { Item } from '@prisma/client';

import { CreateItem } from './create.dto';

export class UpdateItem extends PartialType(CreateItem) {
  id: Item['id'];
}
