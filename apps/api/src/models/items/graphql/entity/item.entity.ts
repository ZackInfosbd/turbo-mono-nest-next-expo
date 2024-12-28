import { Field, ObjectType } from '@nestjs/graphql';
import { Item as ItemType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Item implements RestrictProperties<Item, ItemType> {
  createdAt: Date;

  id: number;

  @Field({ nullable: true })
  image: null | string;

  name: string;

  uid: string;

  updatedAt: Date;
}
