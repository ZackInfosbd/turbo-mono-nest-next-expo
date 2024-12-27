import { Prisma } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class UserQueryDto extends BaseQueryDto {
  @IsIn(Object.values(Prisma.UserScalarFieldEnum))
  @IsOptional()
  searchBy?: string;

  @IsIn(Object.values(Prisma.UserScalarFieldEnum))
  @IsOptional()
  sortBy?: string;
}
