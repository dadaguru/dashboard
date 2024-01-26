import Form from '@/app/ui/dadabadis/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchIndiaStates } from '@/app/lib/dadabadidata';
 
export default async function Page() {
  const indiastates = await fetchIndiaStates();
 
  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: 'Dadabadis', href: '/dashboard/dadabadis' },
          {
            label: 'Create Invoice',
            href: '/dashboard/dadabadis/create',
            active: true,
          },
        ]}
      /> */}
      <Form indiastates={indiastates} />
    </main>
  );
}