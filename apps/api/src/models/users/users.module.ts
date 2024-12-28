import jwtConfig from '@/common/config/jwt.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { UsersResolver } from './graphql/users.resolver';
import { UsersService } from './graphql/users.service';
import { UsersController } from './rest/users.controller';

@Module({
  providers: [UsersResolver, UsersService, JwtService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class UsersModule {}
