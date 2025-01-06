import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  $Enums,
  UserStatus,
  User as UserType,
  UserType as UserTypeEnum,
} from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType($Enums.AuthProviderType, {
  name: 'AuthProviderType',
});

registerEnumType($Enums.UserType, {
  name: 'UserTypeEnum',
});

registerEnumType($Enums.UserStatus, {
  name: 'UserStatusEnum',
});

@ObjectType()
export class User implements RestrictProperties<User, UserType> {
  createdAt: Date;

  @Field({ nullable: true })
  image: null | string;

  @Field({ nullable: true })
  name: null | string;

  @Field({ nullable: true })
  socketId: null | string;

  @Field(() => $Enums.UserStatus)
  status: UserStatus;

  @Field(() => $Enums.UserType)
  type: UserTypeEnum;

  uid: string;

  updatedAt: Date;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}

@ObjectType()
export class AuthOutput {
  // @Field()
  // accessToken: string;

  // @Field()
  // refreshToken: string;

  token: string;
  user: User;
}
