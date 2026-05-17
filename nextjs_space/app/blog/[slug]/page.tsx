import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { BlogPostContent } from "./_components/blog-post-content";

export const dynamic = "force-dynamic";

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
