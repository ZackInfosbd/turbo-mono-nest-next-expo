import { BadRequestException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetUserType } from 'src/common/types';

import {
  LoginInput,
  RegisterWithCredentialsInput,
  RegisterWithProviderInput,
} from './dtos/create-user.input';
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args';
import { UpdateUserInput } from './dtos/update-user.input';
import { AuthOutput, User } from './entity/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(UsersResolver.name);

  @AllowAuthenticated()
  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args() args: FindManyUserArgs,
    @GetUser() userData: GetUserType,
  ) {
    this.logger.debug(
      `User ${userData.roles} with id #${userData.sub} is fetching all users`,
    );

    return this.usersService.findAll(args);
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args() args: FindUniqueUserArgs) {
    return this.usersService.findOne(args);
  }

  @Mutation(() => AuthOutput)
  async login(
    @Args('loginInput')
    args: LoginInput,
  ) {
    try {
      return await this.usersService.login(args);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  @Mutation(() => AuthOutput)
  async registerWithCredentials(
    @Args('RegisterWithCredentialsInput') args: RegisterWithCredentialsInput,
  ): Promise<AuthOutput> {
    try {
      const token = await this.usersService.createWithCredentials(args);

      this.logger.debug(`User created with credentials - email: ${args.email}`);

      return token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unknown error occurred');
    }
  }

  @Mutation(() => AuthOutput)
  async registerWithProviders(
    @Args('RegisterWithProviderInput') args: RegisterWithProviderInput,
  ): Promise<AuthOutput> {
    try {
      const token = await this.usersService.createWithProvider(args);

      this.logger.debug(`User created with provider: ${args.type}`);

      return token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unknown error occurred');
    }
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async removeUser(@Args() args: FindUniqueUserArgs) {
    const user = await this.prisma.user.findUnique(args);

    if (!user) {
      throw new BadRequestException('User not found');
    }

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
