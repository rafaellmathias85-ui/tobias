import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogList } from "./_components/blog-list";
import { prisma } from "@/lib/db";
import { PawPrint } from "lucide-react";
import staticPosts from "@/content/blog.json";

export const metadata = {
  title: "Blog - Dicas de Cuidados com Cães e Gatos",
  description: "Artigos e dicas sobre cuidados com pets, hospedagem animal, saúde e bem-estar de cães e gatos. Conteúdo educativo da Turma do Tobias para tutores que amam seus animais.",
};

export default async function BlogPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let posts: any[] = [];
  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    if (dbPosts && dbPosts.length > 0) posts = dbPosts;
  } catch {}
  if (!posts || posts.length === 0) posts = staticPosts;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 py-16">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <PawPrint className="w-8 h-8 text-[#E5A4CB] mx-auto mb-3" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#5C3D2E] tracking-tight">Blog</h1>
            <p className="text-[#5C3D2E]/60 mt-4 text-lg">Novidades, dicas e histórias da Turma do Tobias.</p>
          </div>
        </section>
        <BlogList posts={JSON.parse(JSON.stringify(posts ?? []))} />
      </main>
      <SiteFooter />
    </div>
  );
}
