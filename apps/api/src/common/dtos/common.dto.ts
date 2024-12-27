import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class BaseQueryDto {
  @IsIn(['asc', 'desc'])
  @IsOptional()
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  search?: string;

  @IsNumberString()
  @IsOptional()
  skip?: number;

  @IsNumberString()
  @IsOptional()
  take?: number;
}
