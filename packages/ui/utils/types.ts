// TODO: Extract util folder into own shared package

export type Role = 'admin' | 'user';

export type GetUserType = {
  sub: string;
  roles: Role[];
};

export type BaseComponent = {
  children?: React.ReactNode;
  className?: string;
};
