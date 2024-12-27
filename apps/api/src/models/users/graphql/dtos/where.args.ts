import { InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';

@InputType()
export class UserWhereUniqueInput {
  sub: string;
}

@InputType()
export class UserWhereInputStrict
  implements
    RestrictProperties<
      UserWhereInputStrict,
      Omit<
        Prisma.UserWhereInput,
        'Admin' | 'AuthProvider' | 'Credentials' | 'image' | 'Item' | 'Manager' // include the item
      >
    >
{
  AND: UserWhereInput[];
  createdAt: DateTimeFilter;
  name: StringFilter;
  NOT: UserWhereInput[];
  OR: UserWhereInput[];
  sub: StringFilter;
  updatedAt: DateTimeFilter;
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)
}

@InputType()
export class UserWhereInput extends PartialType(UserWhereInputStrict) {}

@InputType()
export class UserListRelationFilter {
  every?: UserWhereInput;
  none?: UserWhereInput;
  some?: UserWhereInput;
}

@InputType()
export class UserRelationFilter {
  is?: UserWhereInput;
  isNot?: UserWhereInput;
}
