import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogList } from "./_components/blog-list";
import { prisma } from "@/lib/db";
import { PawPrint } from "lucide-react";


export const metadata = {
  title: "Blog - Dicas de Cuidados com Cães e Gatos",
  description: "Artigos e dicas sobre cuidados com pets, hospedagem animal, saúde e bem-estar de cães e gatos. Conteúdo educativo da Turma do Tobias para tutores que amam seus animais.",
};

const STATIC_POSTS = [
  { id: "s1", title: "Dicas para preparar seu pet para a primeira hospedagem", slug: "dicas-primeira-hospedagem", excerpt: "Confira nossas dicas para que a primeira hospedagem do seu pet seja tranquila e acolhedora.", imageUrl: "/images/small-dog-happy.jpg", published: true, authorName: "Turma do Tobias", createdAt: "2026-05-10T10:00:00.000Z" },
  { id: "s2", title: "A importância do acompanhamento 24h na hospedagem pet", slug: "importancia-acompanhamento-24h", excerpt: "Saiba como o monitoramento constante garante a segurança e bem-estar do seu pet durante a hospedagem.", imageUrl: "/images/dog-relaxed-lying.jpg", published: true, authorName: "Turma do Tobias", createdAt: "2026-04-20T10:00:00.000Z" },
  { id: "s3", title: "Cuidados especiais com gatos na hospedagem", slug: "cuidados-especiais-gatos", excerpt: "Descubra como cuidamos dos felinos com atenção especial na Turma do Tobias.", imageUrl: "/images/cat-relaxing-home.jpg", published: true, authorName: "Turma do Tobias", createdAt: "2026-03-15T10:00:00.000Z" },
  { id: "s4", title: "Pet Sitter: a opção perfeita para pets que preferem ficar em casa", slug: "pet-sitter-domicilio", excerpt: "Conheça nosso serviço de Pet Sitter a domicílio para pets que preferem o conforto de casa.", imageUrl: "/images/pet-sitter-caring.jpg", published: true, authorName: "Turma do Tobias", createdAt: "2026-02-28T10:00:00.000Z" },
  { id: "s5", title: "Como escolher o melhor hotel para seu pet", slug: "como-escolher-hotel-pet", excerpt: "Guia prático com dicas essenciais para escolher o hotel ideal para o seu pet.", imageUrl: "/images/group-pets-playing.jpg", published: true, authorName: "Turma do Tobias", createdAt: "2026-02-10T10:00:00.000Z" },
  { id: "s6", title: "Nossos hóspedes adoram a hora do lanche!", slug: "hospedes-hora-lanche", excerpt: "A alimentação é personalizada para cada hóspede na Turma do Tobias.", imageUrl: "/images/cat-being-groomed.jpg", published: true, authorName: "Turma do Tobias", createdAt: "2026-01-20T10:00:00.000Z" },
];

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {}
  if (!posts || posts.length === 0) posts = STATIC_POSTS;

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
