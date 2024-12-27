import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetUserType } from 'src/common/types';

import { CreateUser } from './dtos/create.dto';
import { UserQueryDto } from './dtos/query.dto';
import { UpdateUser } from './dtos/update.dto';
import { UserEntity } from './entity/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  @Post()
  async create(
    @Body() createUserDto: CreateUser,
    @GetUser() user: GetUserType,
  ) {
    // checkRowLevelPermission(user, createUserDto.sub as string);

    return this.prisma.user.create({ data: createUserDto });
  }

  @ApiOkResponse({ type: [UserEntity] })
  @Get()
  async findAll(@Query() { skip, take, order, sortBy }: UserQueryDto) {
    return this.prisma.user.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order ?? 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.user.findUnique({ where: { sub: id } });
  }

  @AllowAuthenticated()
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() userData: GetUserType) {
    const user = await this.prisma.user.findUnique({ where: { sub: id } });
    checkRowLevelPermission(userData, user?.sub);

    return this.prisma.user.delete({ where: { sub: id } });
  }

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUser,
    @GetUser() userData: GetUserType,
  ) {
    const user = await this.prisma.user.findUnique({ where: { sub: id } });
    checkRowLevelPermission(userData, user?.sub);

    return this.prisma.user.update({
      where: { sub: id },
      data: updateUserDto,
    });
  }
}
