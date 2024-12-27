import { User } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class UserEntity implements RestrictProperties<UserEntity, User> {
  createdAt: Date;
  image: null | string;
  name: null | string;
  sub: string;
  updatedAt: Date;
}
