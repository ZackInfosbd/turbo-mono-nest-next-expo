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
import { AllowAuthenticated } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { CreateItem } from './dtos/create.dto';
import { ItemQueryDto } from './dtos/query.dto';
import { UpdateItem } from './dtos/update.dto';
import { ItemEntity } from './entity/item.entity';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ItemEntity })
  @Post()
  async create(@Body() createItemDto: CreateItem) {
    return this.prisma.item.create({ data: createItemDto });
  }

  @ApiOkResponse({ type: [ItemEntity] })
  @Get()
  async findAll(@Query() { skip, take, order, sortBy }: ItemQueryDto) {
    return this.prisma.item.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order ?? 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: ItemEntity })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.prisma.item.findUnique({ where: { id } });
  }

  @AllowAuthenticated()
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.prisma.item.delete({ where: { id } });
  }

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateItemDto: UpdateItem) {
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }
}
