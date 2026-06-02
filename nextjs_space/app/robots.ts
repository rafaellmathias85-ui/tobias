import { MetadataRoute } from 'next';


export default function robots(): MetadataRoute.Robots {
  const host = process.env.NEXTAUTH_URL ?? 'https://turmadotobias.com';
  const baseUrl = host.startsWith('http') ? host : `https://${host}`;
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
