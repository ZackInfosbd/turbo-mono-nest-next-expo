import { GetUserType } from '@/common/types';
import { Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from 'src/models/users/graphql/entity/user.entity';

import { CreateItemInput } from './dtos/create-item.input';
import { FindManyItemArgs, FindUniqueItemArgs } from './dtos/find.args';
import { UpdateItemInput } from './dtos/update-item.input';
import { Item } from './entity/item.entity';
import { ItemsService } from './items.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(ItemsResolver.name);

  @AllowAuthenticated()
  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') args: CreateItemInput,
    @GetUser() user: GetUserType,
  ) {
    this.logger.debug(`Creating item for user ${user.sub}`);

    return this.itemsService.create(args, user.sub);
  }

  // @AllowAuthenticated('admin')
  @Query(() => [Item], { name: 'items' })
  async findAll(@Args() args: FindManyItemArgs) {
    return this.itemsService.findAll(args);
  }

  @AllowAuthenticated()
  @Query(() => Item, { name: 'item' })
  async findOne(
    @Args() args: FindUniqueItemArgs,
    @GetUser() user: GetUserType,
  ) {
    return this.itemsService.getItemByOwner(args.where.id, user.sub);
  }

  @AllowAuthenticated()
  @Query(() => [Item], { name: 'myItems' })
  async myItems(@Args() args: FindManyItemArgs, @GetUser() user: GetUserType) {
    this.logger.debug(`Finding items for user:  ${JSON.stringify(user)}`);

    return this.itemsService.findAll({
      ...args,
      where: { ...args.where, uid: { equals: user.sub } },
    });
  }

  @AllowAuthenticated()
  @Mutation(() => Item)
  async removeItem(
    @Args() args: FindUniqueItemArgs,
    @GetUser() user: GetUserType,
  ) {
    await this.itemsService.getItemByOwner(args.where.id, user.sub);

    return this.itemsService.remove(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Item)
  async updateItem(
    @Args('updateItemInput') args: UpdateItemInput,
    @GetUser() user: GetUserType,
  ) {
    await this.itemsService.getItemByOwner(args.id, user.sub);

    return this.itemsService.update(args);
  }

  @ResolveField(() => User)
  async user(@Parent() parent: Item) {
    return this.prisma.user.findUnique({ where: { sub: parent.uid } });
  }
}
