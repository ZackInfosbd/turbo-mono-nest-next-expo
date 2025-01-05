import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class UserEntity implements RestrictProperties<UserEntity, User> {
  createdAt: Date;
  @ApiProperty({ nullable: true })
  @IsOptional()
  image: null | string;
  @IsOptional()
  name: null | string;
  socketId: null | string;

  status: $Enums.UserStatus;

  type: $Enums.UserType;

  @IsNotEmpty()
  uid: string;

  updatedAt: Date;
}
