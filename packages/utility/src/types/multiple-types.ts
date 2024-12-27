export type Role = 'admin' | 'user' | 'vendor';

export interface RequestWithUser {
  headers: {
    authorization?: string;
  };
  user?: {
    roles?: Role[];
    sub: string;
  };
}
