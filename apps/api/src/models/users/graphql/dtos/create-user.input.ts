import { Field, InputType, PickType } from '@nestjs/graphql';
import { AuthProviderType } from '@prisma/client';

import { User } from '../entity/user.entity';

@InputType()
export class CreateUserInput extends PickType(
  User,
  ['sub', 'name', 'image'],
  InputType,
) {}

@InputType()
export class RegisterWithProviderInput extends PickType(
  User,
  ['sub', 'name', 'image'],
  InputType,
) {
  @Field(() => AuthProviderType)
  type: AuthProviderType;
}

@InputType()
export class RegisterWithCredentialsInput extends PickType(
  User,
  ['image', 'name'],
  InputType,
) {
  email: string;
  password: string;
}

@InputType()
export class LoginInput {
  email: string;
  password: string;
}
