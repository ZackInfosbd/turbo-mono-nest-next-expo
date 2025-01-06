import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, RequestWithUser, Role } from '@repo/utility';
import { PrismaService } from 'src/common/prisma/prisma.service';

import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(AuthGuard.name);

  private async authenticateUser(req: RequestWithUser): Promise<void> {
    const bearerHeader = req.headers.authorization;
    // Bearer eylskfdjlsdf309
    const token = bearerHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    try {
      const user = await this.jwtService.verifyAsync<JwtPayload>(
        token as unknown as string,
        {
          secret: this.jwtConfiguration.secret,
        },
      );
      req.user = user;
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message);
      }
    }

    if (!req.user) {
      throw new UnauthorizedException('Invalid token.');
    }
  }

  private async authorizeUser(
    req: RequestWithUser,
    context: ExecutionContext,
  ): Promise<boolean> {
    if (!req.user?.uid) return false;

    const uid: string = req.user.uid;

    const requiredRoles = this.getMetadata('roles', context);

    const userRoles = await this.getUserRoles(uid);

    if (req.user) req.user.roles = userRoles;

    if (!requiredRoles || requiredRoles.length === 0) return true;

    return userRoles.some((userRole: Role) =>
      requiredRoles.every((requiredRole: Role) => requiredRole === userRole),
    );
  }

  private bypassWithApiSecret(req: RequestWithUser) {
    const apiSecret = req.headers['x-api-secret'];
    if (!apiSecret) {
      return false;
    }

    if (apiSecret === process.env.JWT_SECRET) {
      req.user = {
        uid: 'internal_admin',
        roles: ['superAdmin', 'admin'],
      };

      return true;
    } else {
      throw new ForbiddenException('Nope.');
    }
  }

  private getMetadata(key: string, context: ExecutionContext) {
    return this.reflector.getAllAndOverride(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private async getUserRoles(uid: string): Promise<Role[]> {
    const rolePromises = [
      this.prisma.admin.findUnique({ where: { uid } }),
      //   this.prisma.manager.findUnique({ where: { uid } }),
      // Add promises for other role models here
    ];

    const roles: Role[] = [];

    const [
      admin,
      //   manager
    ] = await Promise.all(rolePromises);
    if (admin) roles.push('admin');
    // manager && roles.push('manager');

    return roles;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as RequestWithUser;

    // Look for an internal API secret.
    if (this.bypassWithApiSecret(req)) {
      //  The auth check bypassed.
      return true;
    }

    await this.authenticateUser(req);

    return this.authorizeUser(req, context);
  }
}
