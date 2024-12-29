import Link from 'next/link';
import { BaseComponent } from '@repo/types';
import { cn } from '../../lib/utils';
import { DeveloperInfos } from './developerInfos';

export interface IBrandProps extends BaseComponent {
  name?: string;
}

export const Brand = ({ children }: IBrandProps) => {
  return (
    <div>
      <Link
        href="/"
        className={cn('hover:underline font-medium underline-offset-4')}
      >
        Turborepo Template
      </Link>
      <DeveloperInfos />
      {children}
    </div>
  );
};
export default Brand;
