import { BaseComponent } from '@repo/types';

export const Container = ({ children, className }: BaseComponent) => (
  <div className={`container px-2 mx-auto ${className}`}>{children}</div>
);
