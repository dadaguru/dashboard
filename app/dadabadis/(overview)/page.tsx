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
        <h1 className={`${lusitana.className} text-2xl`}>Dbbds</h1>
      </div>
      <div className="mt-4 mb-8 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Dadabadis..." />        
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