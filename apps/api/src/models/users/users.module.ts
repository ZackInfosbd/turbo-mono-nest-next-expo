import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UsersResolver } from './graphql/users.resolver';
import { UsersService } from './graphql/users.service';
import { UsersController } from './rest/users.controller';

@Module({
  providers: [UsersResolver, UsersService, JwtService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [ConfigModule.forRoot()],
})
export class UsersModule {}
