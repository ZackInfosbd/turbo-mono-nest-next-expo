import { Prisma } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class ItemQueryDto extends BaseQueryDto {
  @IsIn(Object.values(Prisma.ItemScalarFieldEnum))
  @IsOptional()
  sortBy?: string;
}
