import { Item } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class ItemEntity implements RestrictProperties<ItemEntity, Item> {
  createdAt: Date;
  id: number;
  @IsOptional()
  image: string;
  name: string;
  uid: string;
  updatedAt: Date;
}
