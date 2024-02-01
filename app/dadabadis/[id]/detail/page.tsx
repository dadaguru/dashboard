import Form from '@/app/ui/dadabadis/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchDadabadiById, fetchIndiaStates } from '@/app/lib/dadabadidata';
import { notFound } from 'next/navigation';
import DadabadiDetail from '@/app/components/dadabadi-detail';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [dadabadi] = await Promise.all([
    fetchDadabadiById(id),    
  ]);

  if (!dadabadi) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dadabadis', href: '/dadabadis' },
          {
            label: `${dadabadi.title}`,
            href: `#`,
            active: true,
          },
        ]}
      />      
      {/* <Form dadabadi={dadabadi} indiastates={indiastates} /> */}
      <DadabadiDetail dadabadi={dadabadi}/>

    </main>
  );
}