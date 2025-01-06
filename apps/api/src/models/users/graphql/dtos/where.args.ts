import { ItemListRelationFilter } from '@/models/items/graphql/dtos/where.args';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { $Enums, Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';

@InputType()
export class UserWhereUniqueInput {
  uid: string;
}

@InputType()
export class EnumUserStatusFilter {
  @Field(() => $Enums.UserStatus, { nullable: true })
  equals?: $Enums.UserStatus;
  @Field(() => [$Enums.UserStatus], { nullable: true })
  in?: $Enums.UserStatus[];
  @Field(() => $Enums.UserStatus, { nullable: true })
  not?: $Enums.UserStatus;
  @Field(() => [$Enums.UserStatus], { nullable: true })
  notIn?: $Enums.UserStatus[];
}
@InputType()
export class EnumUserTypeFilter {
  @Field(() => $Enums.UserType, { nullable: true })
  equals?: $Enums.UserType;
  @Field(() => [$Enums.UserType], { nullable: true })
  in?: $Enums.UserType[];
  @Field(() => $Enums.UserType, { nullable: true })
  not?: $Enums.UserType;
  @Field(() => [$Enums.UserType], { nullable: true })
  notIn?: $Enums.UserType[];
}

@InputType()
export class UserWhereInputStrict
  implements
    RestrictProperties<
      UserWhereInputStrict,
      Omit<
        Prisma.UserWhereInput,
        | 'Admin'
        | 'AssignedPermissions'
        | 'AssignedRoles'
        | 'AuthProvider'
        | 'CreatedPermissions'
        | 'CreatedRoles'
        | 'Credentials'
        | 'DeletedPermissions'
        | 'DeletedRoles'
        | 'Files'
        | 'image'
        | 'Manager'
        | 'Preferences'
        | 'Profile'
        | 'Roles'
        | 'Security'
        | 'SecurityLogs'
        | 'Sessions'
        | 'socketId'
        | 'UpdatedPermissions'
        | 'UpdatedRoles'
      >
    >
{
  AND: UserWhereInput[];
  createdAt: DateTimeFilter;

  Item: ItemListRelationFilter;
  name: StringFilter;
  NOT: UserWhereInput[];
  OR: UserWhereInput[];

  status: EnumUserStatusFilter;
  type: EnumUserTypeFilter;
  uid: StringFilter;
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
