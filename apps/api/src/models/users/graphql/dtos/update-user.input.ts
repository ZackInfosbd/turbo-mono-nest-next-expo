import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { User } from '../entity/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(
  PickType(User, ['name', 'image']),
) {
  uid: User['uid'];
}
