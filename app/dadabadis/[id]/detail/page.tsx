import Form from '@/app/ui/dadabadis/edit-form';
import Breadcrumbs from '@/app/ui/dadabadis/breadcrumbs';
import { fetchDadabadiById, fetchIndiaStates, fetchFilteredDadabadis } from '@/app/lib/dadabadidata';
import { notFound } from 'next/navigation';
import DadabadiDetail from '@/app/components/dadabadi-detail';
import { Metadata } from 'next';
import { cache } from 'react';

///// below code is to pre render dadabadi detail pages for some ids, means these pages will be generated and build time
// and served instantly , here we are doing it for all the dadabadi ids, but as we have pagination of 6, only 6 dadabadi details are cached
/// however we can limit it by return dadabadis.map(({id}) => id).slice(0,5), this will generate only first 5 dadabadi details
// others will be cached only when some user requests for it
/// so only first user will see loading, for other users it will be cached automatically becasue of below function
export async function generateStaticParams() {
  const dadabadis = await fetchFilteredDadabadis('', 1); 
  return dadabadis.map(({id}) => id);
};

///// using below function to deduplicate the same call twice, now it will be called once
// and share same data in both the function calls below
/// if we would use fetch() then nextjs would do it automatically
const getDadabadibyId = cache(async ( id: string) => {  
  const [dadabadi] = await Promise.all([fetchDadabadiById(id)]);
  return dadabadi;
})

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata>{
   const id = params.id;
  /*const [dadabadi] = await Promise.all([fetchDadabadiById(id)]); */
  const dadabadi = await getDadabadibyId(id);
  return{
    title : dadabadi.title,
    description : dadabadi.description,
    openGraph: {
      images : [
        {
          url : dadabadi.image1
        }
      ]
    }
  }
}
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  /* const [dadabadi] = await Promise.all([
    fetchDadabadiById(id),    
  ]); */
  const dadabadi = await getDadabadibyId(id);

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