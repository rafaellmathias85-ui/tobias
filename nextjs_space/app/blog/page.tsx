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
  {
    id: "s1",
    title: "Dicas para preparar seu pet para a primeira hospedagem",
    slug: "dicas-primeira-hospedagem",
    excerpt: "A primeira hospedagem pode gerar ansiedade para tutor e pet. Com essas dicas simples, a experiência será muito mais tranquila para todos.",
    imageUrl: "/images/small-dog-happy.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-05-20T10:00:00.000Z",
  },
  {
    id: "s2",
    title: "Monitoramento 24h: por que isso faz toda a diferença",
    slug: "monitoramento-24h-diferenca",
    excerpt: "Deixar seu pet em boa mãos significa ter a certeza de que alguém cuida dele a noite toda. Saiba como funciona nosso acompanhamento contínuo.",
    imageUrl: "/images/dog-relaxed-lying.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-05-10T10:00:00.000Z",
  },
  {
    id: "s3",
    title: "Cuidados especiais com gatos na hospedagem",
    slug: "cuidados-especiais-gatos",
    excerpt: "Felinos precisam de atenção diferenciada: ambiente separado, caixas de areia limpas e cantinhos para se esconder. Veja como tratamos os gatinhos.",
    imageUrl: "/images/cat-relaxing-home.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-04-28T10:00:00.000Z",
  },
  {
    id: "s4",
    title: "Pet Sitter a domicílio: seu pet em casa, sem estresse",
    slug: "pet-sitter-domicilio",
    excerpt: "Nem todo pet se adapta a ambientes novos — e tudo bem! O Pet Sitter da Turma do Tobias vai até a sua casa cuidar do bichinho no conforto do lar.",
    imageUrl: "/images/pet-sitter-caring.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-04-15T10:00:00.000Z",
  },
  {
    id: "s5",
    title: "Como escolher o melhor hotel para o seu pet",
    slug: "como-escolher-hotel-pet",
    excerpt: "Visita ao local, higiene, rotina e comunicação com o tutor. Confira os critérios essenciais na hora de decidir onde hospedar seu companheiro.",
    imageUrl: "/images/group-pets-playing.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-04-02T10:00:00.000Z",
  },
  {
    id: "s6",
    title: "Alimentação na pousadinha: respeitamos cada rotina",
    slug: "alimentacao-pousadinha-rotina",
    excerpt: "Ração especial, horários específicos, petiscos permitidos — tudo é anotado e seguido à risca para que seu pet mantenha a rotina mesmo fora de casa.",
    imageUrl: "/images/cat-being-groomed.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-03-20T10:00:00.000Z",
  },
  {
    id: "s7",
    title: "Vacinas obrigatórias antes da hospedagem: o guia completo",
    slug: "vacinas-obrigatorias-hospedagem",
    excerpt: "Quais vacinas seu cão ou gato precisa ter em dia para ser aceito na pousadinha? Tire todas as dúvidas e garanta uma estadia segura para todos.",
    imageUrl: "/images/hero-dogs-cats-together.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-03-08T10:00:00.000Z",
  },
  {
    id: "s8",
    title: "O que trazer na mochila do seu pet para a pousadinha",
    slug: "o-que-trazer-mochila-pet",
    excerpt: "Caminha favorita, brinquedo, ração, documentos e mais. Monte a mochila ideal para que seu pet se sinta em casa mesmo durante a viagem.",
    imageUrl: "/images/family-dog-sofa.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-02-22T10:00:00.000Z",
  },
  {
    id: "s9",
    title: "Cães idosos merecem cuidado redobrado — e nós sabemos disso",
    slug: "caes-idosos-cuidado-redobrado",
    excerpt: "Pets de maior idade têm necessidades específicas de conforto, mobilidade e saúde. Conheça os cuidados especiais que oferecemos para os veteranos.",
    imageUrl: "/images/dog-cat-cuddling.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-02-10T10:00:00.000Z",
  },
  {
    id: "s10",
    title: "Socialização canina: por que é importante e como praticamos",
    slug: "socializacao-canina-importancia",
    excerpt: "Conviver com outros cães de forma supervisionada traz benefícios emocionais e comportamentais. Veja como organizamos as interações na Turma do Tobias.",
    imageUrl: "/images/group-pets-playing.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-01-28T10:00:00.000Z",
  },
  {
    id: "s11",
    title: "Filhotes na pousadinha: tudo que você precisa saber",
    slug: "filhotes-pousadinha-guia",
    excerpt: "Filhotes precisam de atenção extra, reforço de rotinas e muito carinho. Saiba como preparamos o ambiente para receber os pequeninos hóspedes.",
    imageUrl: "/images/puppy-playing-toy.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-01-15T10:00:00.000Z",
  },
  {
    id: "s12",
    title: "Medicamentos: como administramos os remédios dos hóspedes",
    slug: "medicamentos-hospedes-como-administramos",
    excerpt: "Seu pet toma remédio controlado? Não se preocupe. Temos rotina rigorosa de administração, anotações e comunicação diária com o tutor.",
    imageUrl: "/images/person-petting-dog.jpg",
    published: true,
    authorName: "Turma do Tobias",
    createdAt: "2026-01-05T10:00:00.000Z",
  },
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
