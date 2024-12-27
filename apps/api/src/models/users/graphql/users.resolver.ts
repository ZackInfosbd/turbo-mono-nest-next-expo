import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetUserType } from 'src/common/types';

import { CreateUserInput } from './dtos/create-user.input';
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args';
import { UpdateUserInput } from './dtos/update-user.input';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') args: CreateUserInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.sub);

    return this.usersService.create(args);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(@Args() args: FindManyUserArgs) {
    return this.usersService.findAll(args);
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args() args: FindUniqueUserArgs) {
    return this.usersService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async removeUser(
    @Args() args: FindUniqueUserArgs,
    @GetUser() userData: GetUserType,
  ) {
    const user = await this.prisma.user.findUnique(args);
    checkRowLevelPermission(userData, user?.sub);

    return this.usersService.remove(args);
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') args: UpdateUserInput,
    @GetUser() userData: GetUserType,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { sub: args.sub },
    });
    checkRowLevelPermission(userData, user?.sub);

    return this.usersService.update(args);
  }
}
