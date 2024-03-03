import DadabadiLogo from '@/app/ui/dadabadi-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { eczar } from '@/app/ui/fonts';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dadabadi : Directory',
  description: 'Dadabari'
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-24 shrink-0 items-end rounded-lg bg-gradient-to-r from-keshar-saffronRedDark to-keshar-saffronRedLight p-4 md:h-32">
        <DadabadiLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-amber-500 px-6 py-10 md:w-2/5 md:px-20">
          
          <p className={`${eczar} text-xl text-keshar-saffronRedDark md:text-3xl md:leading-normal`}>
            <strong>Welcome to Dadabadi Directory.</strong> Brought to you by {' '}
            <a href="https://www.dadaguru.in" className="text-keshar-rose">
              www.dadaguru.in
            </a>            
          </p>
          <Link
            href="/dadabadis"
            className="flex items-center gap-5 self-start rounded-lg bg-keshar-saffronRedDark px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-keshar-saffronRedLight md:text-base"
          >
            <span>Go to Dadabadi Directory</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-keshar-saffronRedDark px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-keshar-saffronRedLight md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/images/landingpage.jpg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/images/landingpage.jpg"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
