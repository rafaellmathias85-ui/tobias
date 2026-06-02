import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { BlogPostContent } from "./_components/blog-post-content";
import type { Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return (posts ?? []).map((post: any) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let post: any = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug: params?.slug ?? "" } });
  } catch {}
  if (!post) return { title: "Post não encontrado" };
  return {
    title: post.title,
    description: post.excerpt || (post.content ?? "").substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || (post.content ?? "").substring(0, 160),
      type: "article",
      ...(post.imageUrl ? { images: [post.imageUrl] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: any = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug: params?.slug ?? "" } });
  } catch {}

  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <BlogPostContent post={JSON.parse(JSON.stringify(post))} />
      </main>
      <SiteFooter />
    </div>
  );
}
