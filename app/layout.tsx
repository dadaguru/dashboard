import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {    
    default: 'Dadabadi Dashboard',
    template: 'Dadabadi | %s',
  },
  description: 'The Website app containing information and details of all the dadabadis around the world. It is dedicated to all the Jain and Jains around the world of Khartar Gachha sect, Dada Jin Datta suri, Jin Chandra Suri, Jin Kushal Suri, Jin Chandra suri',
  metadataBase: new URL('https://dadabadi.dadaguru.in'),
  authors : [
    {
      name : 'Yatindra Jain',
      url : 'https://www.dadaguru.in'
    },
    {
      name : 'Dadaguru',
      url : 'https://dadabadi.dadaguru.in'
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="nSHcjlNDWc7y86YZpjJUaHlDGpZQZYcoA0aFj5IMXBk" />
      <body className={`${inter.className} antialiased bg-amber-50`}>{children}</body>
    </html>
  );
}
