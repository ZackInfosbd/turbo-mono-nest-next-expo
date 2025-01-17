import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateUser } from './create.dto';

export class UpdateUser extends PartialType(OmitType(CreateUser, ['uid'])) {}
