export type Role = 'admin';

export interface GetUserType {
  roles: Role[];
  sub: string;
}
