'use client';

import { Button } from '../atoms/button';
import { signOut } from 'next-auth/react';

export const Test = () => {
  return (
    <div className="m-4 w-[100px] bg-gray-100">
      <Button
        className="text-blue-300 font-bold"
        variant={'outline'}
        onClick={async () => signOut()}
      >
        Sign Out
      </Button>
    </div>
  );
};
