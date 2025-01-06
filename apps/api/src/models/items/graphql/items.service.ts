import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { CreateItemInput } from './dtos/create-item.input';
import { FindManyItemArgs, FindUniqueItemArgs } from './dtos/find.args';
import { UpdateItemInput } from './dtos/update-item.input';
import { Item } from './entity/item.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemInput: CreateItemInput, uid: string) {
    return this.prisma.item.create({
      data: { ...createItemInput, user: { connect: { uid } } },
    });
  }

  async findAll(args: FindManyItemArgs) {
    return this.prisma.item.findMany(args);
  }

  async findOne(args: FindUniqueItemArgs) {
    return this.prisma.item.findUnique(args);
  }

  async getItemByOwner(itemId: number, uid: string): Promise<Item> {
    const item = await this.prisma.item.findUnique({ where: { id: itemId } });
    if (item?.uid !== uid) {
      throw new ForbiddenException();
    }

    return item;
  }

  async remove(args: FindUniqueItemArgs) {
    return this.prisma.item.delete(args);
  }

  async update(updateItemInput: UpdateItemInput) {
    const { id, ...data } = updateItemInput;

    return this.prisma.item.update({
      where: { id },
      data: data,
    });
  }
}
