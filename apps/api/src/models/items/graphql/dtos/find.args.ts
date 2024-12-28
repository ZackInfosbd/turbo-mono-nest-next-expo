import {
  ArgsType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

import { ItemOrderByWithRelationInput } from './order-by.args';
import { ItemWhereInput, ItemWhereUniqueInput } from './where.args';

registerEnumType(Prisma.ItemScalarFieldEnum, {
  name: 'ItemScalarFieldEnum',
});

@ArgsType()
class FindManyItemArgsStrict
  implements
    RestrictProperties<
      FindManyItemArgsStrict,
      Omit<Prisma.ItemFindManyArgs, 'include' | 'select'>
    >
{
  cursor: ItemWhereUniqueInput;
  @Field(() => [Prisma.ItemScalarFieldEnum])
  distinct: Prisma.ItemScalarFieldEnum[];
  orderBy: ItemOrderByWithRelationInput[];
  skip: number;
  take: number;
  where: ItemWhereInput;
}

@ArgsType()
export class FindManyItemArgs extends PartialType(FindManyItemArgsStrict) {}

@ArgsType()
export class FindUniqueItemArgs {
  where: ItemWhereUniqueInput;
}
