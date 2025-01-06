import { Request } from 'express';

export type Role = 'superAdmin' | 'admin' | 'user' | 'vendor';

export interface RequestWithUser extends Request {
  user?: JwtPayload;
}

export interface JwtPayload {
  [key: string]: unknown;
  uid: string;
}
