import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/dadabadis/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { CreateDadabadi } from '@/app/ui/dadabadis/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchDadabadisPages } from '@/app/lib/dadabadidata';
import { Metadata } from 'next';
import CardWrapper from '@/app/components/cards';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { BedDouble, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
   
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchDadabadisPages(query);
  return (
    <main>     
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Dadabadis</h1>
      </div>
      <div className="mt-4 mb-8 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Dadabadis..." />
      </div>
      <div className="mt-4 mb-6 flex items-center justify-end gap-0 md:mt-8">
        <Utensils className="h-6 w-6 bg-gray-200 text-gray-700 p-1 rounded-md border-2 border-gray-600" />
          <p className="text-xs ml-2">Food Facility</p> 
        <BedDouble className="h-6 w-6 ml-4 bg-gray-200 text-gray-700 p-1 rounded-md border-2 border-gray-600"/> 
          <p className="text-xs ml-2">Stay Facility</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper query={query} currentPage={currentPage} />
        </Suspense>
      </div>       
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
      
    </main>
  );
}