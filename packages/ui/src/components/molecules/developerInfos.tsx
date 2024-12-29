import Link from 'next/link';

import { BaseComponent } from '@repo/types';
import { cn } from '../../lib/utils';

export const DeveloperInfos = ({ className }: BaseComponent) => {
  return (
    <Link
      href="https://www.google.com"
      target="_blank"
      className={cn('text-xs group ', className)}
    >
      <div className="flex items-center gap-1 group-hover:underline underline-offset-4">
        Made by zackinfosbd@gmail.com
      </div>
    </Link>
  );
};
