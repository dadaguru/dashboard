//https://www.youtube.com/watch?v=3P9hrS23jXI
import { MetadataRoute } from 'next';
import { fetchAllDadabadisSEO } from '@/app/lib/dadabadidata';

export const revalidate = 60;

const BASE_URL = process.env.VERCEL_URL
  ? `${process.env.VERCEL_URL}`
  : "";

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const dadabadisRaw = await fetchAllDadabadisSEO();
  const dadabadis:MetadataRoute.Sitemap =  dadabadisRaw.map((dadabadisRaw) => ({
    url: `${BASE_URL}/dadabadis/${dadabadisRaw.id}/detail`,
    lastModified: new Date(dadabadisRaw.created_at),
    changeFrequency : "monthly",
    priority: 0.5,
  }));

  return [
    {
      url: 'https://dadaguru.in',
      //lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://www.dadaguru.in',
      //lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://dadabadi.dadaguru.in/dadabadis',
      //lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://dadabadi.dadaguru.in/dadabadis/contact',
      //lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...dadabadis
  ]
}

/* type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: number
}>
 */