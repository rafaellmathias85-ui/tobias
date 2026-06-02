import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXTAUTH_URL ?? 'https://turmadotobias.com';
  const baseUrl = host.startsWith('http') ? host : `https://${host}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/servicos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/galeria`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Add blog posts dynamically
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = (posts ?? []).map((post: any) => ({
      url: `${baseUrl}/blog/${post?.slug ?? ''}`,
      lastModified: post?.updatedAt ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {}

  return [...staticRoutes, ...blogRoutes];
}
