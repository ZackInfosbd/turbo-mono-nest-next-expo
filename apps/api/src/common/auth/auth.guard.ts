import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Role } from 'src/common/types';

interface RequestWithUser {
  headers: {
    authorization?: string;
  };
  user?: {
    roles?: Role[];
    sub: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
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
      const user = await this.jwtService.verify(token);
      req.user = user;
    } catch (err: unknown) {
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
    const userRoles = await this.getUserRoles(req.user?.sub ?? '');
    if (req.user) {
      req.user.roles = userRoles;
    }

    const requiredRoles = this.getMetadata('roles', context);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.some((role: Role) => userRoles.includes(role));
  }

  private getMetadata(key: string, context: ExecutionContext) {
    return this.reflector.getAllAndOverride(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private async getUserRoles(sub: string): Promise<Role[]> {
    const rolePromises = [
      this.prisma.admin.findUnique({ where: { uid: sub } }),
      // Add promises for other role models here
    ];

    const roles: Role[] = [];

    const [admin] = await Promise.all(rolePromises);

    if (admin) roles.push('admin');

    return roles;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req: RequestWithUser = ctx.getContext().req;

    await this.authenticateUser(req);

    return this.authorizeUser(req, context);
  }
}
