import { Button } from '@repo/ui/src/components/ui/button';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Home({ children }: Props): React.JSX.Element {
  return (
    <React.Fragment>
      <h1 className="w-5 h-20 bg-red-700 text-red-50 text-4xl">hi</h1>
      <Button variant="destructive">Click me</Button>

      {children}
    </React.Fragment>
  );
}
