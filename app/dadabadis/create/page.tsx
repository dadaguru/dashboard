import { mukta } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { Suspense } from 'react';

//import Form from '@/app/ui/dadabadis/create-form';
import Breadcrumbs from '@/app/ui/dadabadis/breadcrumbs';
import { fetchIndiaStates } from '@/app/lib/dadabadidata';

import { Metadata } from 'next';
import CreateDadabadiEmailForm from '@/app/ui/dadabadis/create-dadabadi-email-form';

export const metadata: Metadata = {
  title: 'Create',
  description: 'Dadabari'
};

export default async function Page() {
  const indiastates = await fetchIndiaStates();

  return <div className="w-full">    
    <p className='text-xl text-keshar-saffronRedDark'>Submit Dadabadi Page</p>
    
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dadabadis', href: '/dashboard/dadabadis' },
          {
            label: 'Create Dadabadi',
            href: '/dashboard/dadabadis/create',
            active: true,
          },
        ]}
      />      
      <CreateDadabadiEmailForm indiastates={indiastates}></CreateDadabadiEmailForm>
    
  </div>;
}

