import {
  ArgsType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

import { UserOrderByWithRelationInput } from './order-by.args';
import { UserWhereInput, UserWhereUniqueInput } from './where.args';

registerEnumType(Prisma.UserScalarFieldEnum, {
  name: 'UserScalarFieldEnum',
});

@ArgsType()
class FindManyUserArgsStrict
  implements
    RestrictProperties<
      FindManyUserArgsStrict,
      Omit<Prisma.UserFindManyArgs, 'include' | 'select'>
    >
{
  cursor: UserWhereUniqueInput;
  @Field(() => [Prisma.UserScalarFieldEnum])
  distinct: Prisma.UserScalarFieldEnum[];
  orderBy: UserOrderByWithRelationInput[];
  skip: number;
  take: number;
  where: UserWhereInput;
}

@ArgsType()
export class FindManyUserArgs extends PartialType(FindManyUserArgsStrict) {}

@ArgsType()
export class FindUniqueUserArgs {
  where: UserWhereUniqueInput;
}
