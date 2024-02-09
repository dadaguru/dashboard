import Form from '@/app/ui/dadabadis/edit-form';
import Breadcrumbs from '@/app/ui/dadabadis/breadcrumbs';
import { fetchDadabadiById, fetchIndiaStates } from '@/app/lib/dadabadidata';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [dadabadi, indiastates] = await Promise.all([
    fetchDadabadiById(id),
    fetchIndiaStates(),
  ]);

  if (!dadabadi) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dadabadis', href: '/dashboard/dadabadis' },
          {
            label: 'Edit Dadabadi',
            href: `/dashboard/dadabadis/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form dadabadi={dadabadi} indiastates={indiastates} />
    </main>
  );
}