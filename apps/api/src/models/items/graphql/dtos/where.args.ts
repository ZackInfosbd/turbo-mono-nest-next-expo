import { InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { UserRelationFilter } from 'src/models/users/graphql/dtos/where.args';

@InputType()
export class ItemWhereUniqueInput {
  id: number;
}

@InputType()
export class ItemWhereInputStrict
  implements RestrictProperties<ItemWhereInputStrict, Prisma.ItemWhereInput>
{
  AND: ItemWhereInput[];
  createdAt: DateTimeFilter;
  id: IntFilter;
  image: string;
  name: StringFilter;
  NOT: ItemWhereInput[];

  OR: ItemWhereInput[];

  uid: StringFilter;
  updatedAt: DateTimeFilter;
  user: UserRelationFilter;
}

@InputType()
export class ItemWhereInput extends PartialType(ItemWhereInputStrict) {}

@InputType()
export class ItemListRelationFilter {
  every?: ItemWhereInput;
  none?: ItemWhereInput;
  some?: ItemWhereInput;
}

@InputType()
export class ItemRelationFilter {
  is?: ItemWhereInput;
  isNot?: ItemWhereInput;
}
