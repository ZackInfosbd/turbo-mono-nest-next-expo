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
  AssignedPermissions: Prisma.UserRolePermissionAssigmentsOrderByRelationAggregateInput;
  AssignedRoles: Prisma.UserRoleAssignmentsOrderByRelationAggregateInput;
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  CreatedPermissions: Prisma.PermissionsOrderByRelationAggregateInput;
  CreatedRoles: Prisma.RolesOrderByRelationAggregateInput;
  DeletedPermissions: Prisma.PermissionsOrderByRelationAggregateInput;
  DeletedRoles: Prisma.RolesOrderByRelationAggregateInput;
  Files: Prisma.UserFilesOrderByRelationAggregateInput;
  Item: ItemOrderByRelationAggregateInput;
  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder;
  Preferences: Prisma.UserPreferencesOrderByWithRelationInput;
  Profile: Prisma.ProfileOrderByWithRelationInput;
  Roles: Prisma.UserRoleAssignmentsOrderByRelationAggregateInput;
  Security: Prisma.UserSecurityOrderByWithRelationInput;
  SecurityLogs: Prisma.SecurityLogOrderByRelationAggregateInput;
  Sessions: Prisma.SessionOrderByRelationAggregateInput;
  socketId: Prisma.SortOrder | Prisma.SortOrderInput;
  status: Prisma.SortOrder;
  type: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  uid: Prisma.SortOrder;

  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;

  UpdatedPermissions: Prisma.PermissionsOrderByRelationAggregateInput;

  UpdatedRoles: Prisma.RolesOrderByRelationAggregateInput;
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
