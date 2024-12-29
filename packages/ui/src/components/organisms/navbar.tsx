import Link from 'next/link';
import { Brand } from '../molecules/brand';
import { UserInfos } from '../molecules/userInfos';
import { SheetClose, SheetFooter, SheetHeader } from '../atoms/sheet';

import { LibrarySquare } from 'lucide-react';
import { Sidebar } from '../organisms/sidebar';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full h-12 bg-white/40 backdrop-blur backdrop-filter">
      <div className="flex items-center justify-between">
        <Brand />
        <div>
          <Sidebar>
            <SheetHeader>
              <UserInfos />
            </SheetHeader>

            <div className="flex flex-col gap-2 mt-4 mb-8">
              <Link href="/my-items">
                <div className="flex items-center gap-2">
                  <LibrarySquare className="w-4 h-4" /> My Items
                </div>
              </Link>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Link href="/api/auth/signout">Signout</Link>
              </SheetClose>
            </SheetFooter>
          </Sidebar>
        </div>
      </div>
    </nav>
  );
};
