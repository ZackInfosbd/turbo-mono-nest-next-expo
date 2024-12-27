import { Test } from '@repo/ui/src/components/molecules/test';
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <main>
        <h1 className="text-blue-900">Hello from Dashboard</h1>
        <Test />
      </main>
    </React.Fragment>
  );
}
