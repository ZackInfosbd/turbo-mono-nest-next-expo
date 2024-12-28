import jwtConfig from '@/common/config/jwt.config';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthProviderType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

import {
  LoginInput,
  RegisterWithCredentialsInput,
  RegisterWithProviderInput,
} from './dtos/create-user.input';
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args';
import { UpdateUserInput } from './dtos/update-user.input';
import { AuthOutput, User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  private async generateToken(user: User) {
    const payload = { sub: user.sub };

    const token = await this.jwtService.signAsync(
      {
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
      },
    );

    this.logger.debug(`Token generated : ${token}`);

    return {
      token,
      user,
    };
  }

  async createWithCredentials({
    email,
    name,
    password,
    image,
  }: RegisterWithCredentialsInput): Promise<AuthOutput> {
    const existingUser = await this.prisma.credentials.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User already exists with this email.');
    }

    // Hash the password
    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    const uid = uuid();

    // Create the user and credentials
    const user = await this.prisma.user.create({
      data: {
        name,
        sub: uid,
        image,
        Credentials: {
          create: {
            email,
            password: passwordHash,
          },
        },
        AuthProvider: {
          create: {
            type: AuthProviderType.CREDENTIALS,
          },
        },
      },
    });

    const token = await this.generateToken(user);

    return token;
  }

  async createWithProvider(
    args: RegisterWithProviderInput,
  ): Promise<AuthOutput> {
    const { type, ...data } = args;

    const user = await this.prisma.user.create({
      data: {
        ...data,
        AuthProvider: {
          create: {
            type,
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('User not created');
    }

    const token = this.generateToken(user);

    return token;
  }

  async findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args);
  }

  async findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args);
  }

  async login({ email, password }: LoginInput): Promise<AuthOutput> {
    const credentials = await this.prisma.credentials.findUnique({
      where: { email },
      include: { User: true },
    });

    if (
      !credentials ||
      !credentials.password ||
      !bcrypt.compareSync(password, credentials.password)
    ) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.generateToken(credentials.User);

    return token;
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
