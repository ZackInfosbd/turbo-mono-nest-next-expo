export type Role = 'admin';

export interface GetUserType {
  roles: Role[];
  uid: string;
}
