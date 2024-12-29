import { getAuth } from '@repo/bridge/src';
import { Test } from '@repo/ui/src/components/molecules/test';

export default async function Home() {
  const user = await getAuth();

  return (
    <main>
      <h1 className="text-red-500">Hello {user?.user?.name} from Web</h1>
      <Test />
    </main>
  );
}
