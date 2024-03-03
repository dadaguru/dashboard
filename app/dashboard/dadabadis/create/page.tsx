import Form from '@/app/ui/dadabadis/create-form';
import Breadcrumbs from '@/app/ui/dadabadis/breadcrumbs';
import { fetchIndiaStates } from '@/app/lib/dadabadidata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Admin',
  description: 'Dadabari'
};

export default async function Page() {
  const indiastates = await fetchIndiaStates();
 
  return (
    <main>
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
      <Form indiastates={indiastates} whichPage ='create' />
    </main>
  );
}