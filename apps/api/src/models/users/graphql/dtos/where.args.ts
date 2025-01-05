import { ItemListRelationFilter } from '@/models/items/graphql/dtos/where.args';
import { InputType, PartialType } from '@nestjs/graphql';
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
        | 'Security'
        | 'SecurityLogs'
        | 'Sessions'
      >
    >
{
  AND: UserWhereInput[];
  createdAt: DateTimeFilter;

  Item: ItemListRelationFilter;
  name: StringFilter;
  NOT: UserWhereInput[];
  OR: UserWhereInput[];
  Roles: Prisma.UserRoleAssignmentsListRelationFilter;

  // socketId: null | Prisma.StringNullableFilter<'User'> | string;
  socketId: StringFilter;
  status: $Enums.UserStatus | Prisma.EnumUserStatusFilter<'User'>;
  type: $Enums.UserType | Prisma.EnumUserTypeFilter<'User'>;
  uid: StringFilter;
  updatedAt: DateTimeFilter;
  UpdatedPermissions: Prisma.PermissionsListRelationFilter;
  UpdatedRoles: Prisma.RolesListRelationFilter;

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
