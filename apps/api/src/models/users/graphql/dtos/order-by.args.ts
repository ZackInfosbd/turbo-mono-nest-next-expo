import { ItemOrderByRelationAggregateInput } from '@/models/items/graphql/dtos/order-by.args';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@InputType()
export class UserOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      UserOrderByWithRelationInputStrict,
      Omit<
        Prisma.UserOrderByWithRelationInput,
        'Admin' | 'AuthProvider' | 'Credentials' | 'image'
      >
    >
{
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  Item: ItemOrderByRelationAggregateInput;

  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder;

  @Field(() => Prisma.SortOrder)
  sub: Prisma.SortOrder;

  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class UserOrderByWithRelationInput extends PartialType(
  UserOrderByWithRelationInputStrict,
) {}

@InputType()
export class UserOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
