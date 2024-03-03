import Pagination from '@/app/ui/dadabadis/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/dadabadis/table';
import { UploadDadabadi } from '@/app/ui/dadabadis/buttons';
import { mukta } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchDadabadisPages } from '@/app/lib/dadabadidata';
import { Metadata } from 'next';

import ExcelImport  from '@/app/ui/dadabadis/excel-import';

export const metadata: Metadata = {
  title: 'Upload Admin',
  description: 'Dadabari'
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
        <h1 className={`${mukta.className} text-2xl text-keshar-saffronRedDark`}>Upload Dadabadis Data</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <ExcelImport />
      </div>
      <div>
        
      </div>
    </div>
  );
}