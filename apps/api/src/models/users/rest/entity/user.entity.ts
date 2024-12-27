import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class UserEntity implements RestrictProperties<UserEntity, User> {
  createdAt: Date;

  @ApiProperty({ nullable: true })
  @IsOptional()
  image: null | string;

  @IsOptional()
  name: null | string;

  @IsNotEmpty()
  sub: string;

  updatedAt: Date;
}
