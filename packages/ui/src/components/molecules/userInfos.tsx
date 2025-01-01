import Image from 'next/image';
import { getAuth } from '@repo/bridge/src';

export const UserInfos = async () => {
  const session = await getAuth();

  if (!session?.user) {
    return null;
  }

  return (
    <div>
      {session?.user?.image ? (
        <Image
          className="w-16 h-16 rounded-full aspect-square"
          width={600}
          height={600}
          src={session?.user?.image || ''}
          alt={''}
        />
      ) : (
        <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-3xl font-semibold text-white bg-black border rounded-full">
          {session?.user?.name?.charAt(0)}
        </div>
      )}
      <div className={`text-xl font-light capitalize`}>
        {session?.user?.name}
      </div>
      <div className="text-xs text-gray-500">{session?.user?.sub}</div>
    </div>
  );
};