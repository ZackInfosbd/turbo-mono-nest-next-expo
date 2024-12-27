import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { CreateUserInput } from './dtos/create-user.input';
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args';
import { UpdateUserInput } from './dtos/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: createUserInput,
    });
  }

  async findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args);
  }

  async findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args);
  }

  async remove(args: FindUniqueUserArgs) {
    return this.prisma.user.delete(args);
  }

  async update(updateUserInput: UpdateUserInput) {
    const { sub, ...data } = updateUserInput;

    return this.prisma.user.update({
      where: { sub },
      data: data,
    });
  }
}
