import Link from 'next/link';
import NavLinks from '@/app/components/nav-links-public';
import DadabadiLogo from '@/app/ui/dadabadi-logo';
import { ArrowRightIcon, PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <DadabadiLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <Link
          href="/login"
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>        
      </div>
    </div>
  );
}


