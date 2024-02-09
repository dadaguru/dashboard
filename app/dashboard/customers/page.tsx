import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { Suspense } from 'react';
import { CustomersTableSkeleton  } from '@/app/ui/skeletons';
import Table from '@/app/ui/customers/table';
import Pagination from '@/app/ui/dadabadis/pagination';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    //page?: string;
  };
}) {
  const query = searchParams?.query || '';
  //const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchFilteredCustomers(query);
  const customers = await fetchFilteredCustomers(query);

  return <div className="w-full">    
    <Suspense key={query} fallback={<CustomersTableSkeleton />}>
      <Table customers={customers} />
    </Suspense>
    
  </div>;
}