import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import SideNavPublic from '@/app/components/sidenavpublic';

export const metadata: Metadata = {
  title: {
    template: '%s | Dadabadi',
    default: 'Dadabadi Dashboard',
  },
  description: 'The Website app containing information and details of all the dadabadis around the world. It is dedicated to all the Jain and Jains around the world of Khartar Gachha sect, Dada Jin Datta suri, Jin Chandra Suri, Jin Kushal Suri, Jin Chandra suri',
  metadataBase: new URL('https://dadabadi.dadaguru.in'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNavPublic />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}


