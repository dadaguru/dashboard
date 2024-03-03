import Pagination from '@/app/ui/dadabadis/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/dadabadis/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { CreateDadabadi } from '@/app/ui/dadabadis/buttons';
import { mukta } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchDadabadisPages } from '@/app/lib/dadabadidata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Admin',
  description: 'Dadabari',
  robots: {
    index : false,  // don't index on search engines as it is admin page
    follow: true  // but include links on this page in search indexes so links on the page will be crawled
  }
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
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${mukta.className} text-2xl text-keshar-saffronRedDark`}>Dadabadis</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Dadabadis..." />
        <CreateDadabadi />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}