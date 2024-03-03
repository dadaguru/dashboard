//https://www.youtube.com/watch?v=wTGVHLyV09M
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ["/admin","/privacy"],
    },
    sitemap: `${process.env.VERCEL_URL}/sitemap.xml`,
  }
}