import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GaleriaContent } from "./_components/galeria-content";
import { prisma } from "@/lib/db";
import { PawPrint } from "lucide-react";


export const metadata = {
  title: "Galeria de Fotos - Pets Felizes na Hospedagem",
  description: "Galeria de fotos dos cães e gatos hospedados na Turma do Tobias. Veja nossos hóspedes felizes e bem cuidados em um ambiente familiar e acolhedor.",
};

const STATIC_IMAGES = [
  // Hospedagem
  { id: "g1",  imageUrl: "/images/hero-dogs-cats-together.jpg", caption: "Cães e gatos convivendo em harmonia", category: "cães", createdAt: "2026-05-20T10:00:00.000Z" },
  { id: "g2",  imageUrl: "/images/small-dog-happy.jpg",         caption: "Rex chegando cheio de energia!", category: "cães", createdAt: "2026-05-18T10:00:00.000Z" },
  { id: "g3",  imageUrl: "/images/dog-relaxed-lying.jpg",       caption: "Bolt descansando depois de brincar muito", category: "cães", createdAt: "2026-05-15T10:00:00.000Z" },
  { id: "g4",  imageUrl: "/images/puppy-playing-toy.jpg",       caption: "Mel brincando com o brinquedo favorito", category: "cães", createdAt: "2026-05-12T10:00:00.000Z" },
  { id: "g5",  imageUrl: "/images/family-dog-sofa.jpg",         caption: "Thor se sentindo em casa no sofá", category: "cães", createdAt: "2026-05-10T10:00:00.000Z" },
  { id: "g6",  imageUrl: "/images/dog-cat-cuddling.jpg",        caption: "Luke e Mia, os melhores amigos da pousadinha", category: "cães", createdAt: "2026-05-08T10:00:00.000Z" },
  // Gatos
  { id: "g7",  imageUrl: "/images/cat-relaxing-home.jpg",       caption: "Nala encontrou seu cantinho preferido", category: "gatos", createdAt: "2026-05-05T10:00:00.000Z" },
  { id: "g8",  imageUrl: "/images/cats-resting-together.jpg",   caption: "Luna e Simba descansando juntos", category: "gatos", createdAt: "2026-05-02T10:00:00.000Z" },
  { id: "g9",  imageUrl: "/images/cat-being-groomed.jpg",       caption: "Hora do trato — Cleo adorou!", category: "gatos", createdAt: "2026-04-28T10:00:00.000Z" },
  { id: "g10", imageUrl: "/images/hero-dogs-cats-together.jpg", caption: "Mimi fazendo amizades com os cachorros", category: "gatos", createdAt: "2026-04-25T10:00:00.000Z" },
  // Brincadeiras
  { id: "g11", imageUrl: "/images/group-pets-playing.jpg",      caption: "Recreio da tarde — todo mundo animado!", category: "brincadeiras", createdAt: "2026-04-22T10:00:00.000Z" },
  { id: "g12", imageUrl: "/images/puppy-playing-toy.jpg",       caption: "Frisbee, bolinha e muita diversão", category: "brincadeiras", createdAt: "2026-04-18T10:00:00.000Z" },
  { id: "g13", imageUrl: "/images/small-dog-happy.jpg",         caption: "Quem disse que segunda-feira é chata?", category: "brincadeiras", createdAt: "2026-04-15T10:00:00.000Z" },
  { id: "g14", imageUrl: "/images/dog-cat-cuddling.jpg",        caption: "Rivalidade? Aqui só tem amizade!", category: "brincadeiras", createdAt: "2026-04-12T10:00:00.000Z" },
  // Cuidados
  { id: "g15", imageUrl: "/images/person-petting-dog.jpg",      caption: "Atenção individualizada para cada hóspede", category: "cuidados", createdAt: "2026-04-10T10:00:00.000Z" },
  { id: "g16", imageUrl: "/images/pet-sitter-caring.jpg",       caption: "Pet Sitter em ação: carinho de verdade", category: "cuidados", createdAt: "2026-04-07T10:00:00.000Z" },
  { id: "g17", imageUrl: "/images/cat-being-groomed.jpg",       caption: "Higiene em dia — sempre com cuidado", category: "cuidados", createdAt: "2026-04-03T10:00:00.000Z" },
  { id: "g18", imageUrl: "/images/person-petting-dog.jpg",      caption: "Cada pet tem sua hora especial de carinho", category: "cuidados", createdAt: "2026-03-30T10:00:00.000Z" },
  // Ambiente
  { id: "g19", imageUrl: "/images/family-dog-sofa.jpg",         caption: "Ambiente aconchegante como se fosse a sua casa", category: "ambiente", createdAt: "2026-03-25T10:00:00.000Z" },
  { id: "g20", imageUrl: "/images/cat-relaxing-home.jpg",       caption: "Espaço especial e seguro para os felinos", category: "ambiente", createdAt: "2026-03-20T10:00:00.000Z" },
  { id: "g21", imageUrl: "/images/cats-resting-together.jpg",   caption: "Cantinho dos gatinhos: tranquilo e acolhedor", category: "ambiente", createdAt: "2026-03-15T10:00:00.000Z" },
  { id: "g22", imageUrl: "/images/dog-relaxed-lying.jpg",       caption: "Caminhas quentinhas para noites tranquilas", category: "ambiente", createdAt: "2026-03-10T10:00:00.000Z" },
  // Depoimentos de tutores
  { id: "g23", imageUrl: "/images/testimonial-1.jpg",           caption: "Família Oliveira: 'O Tobias voltou feliz e saudável!'", category: "tutores", createdAt: "2026-03-05T10:00:00.000Z" },
  { id: "g24", imageUrl: "/images/testimonial-2.jpg",           caption: "Ana Paula: 'Nunca vi minha gata tão tranquila após a hospedagem!'", category: "tutores", createdAt: "2026-03-01T10:00:00.000Z" },
];

export default async function GaleriaPage() {
  let images: any[] = [];
  try {
    images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}
  if (!images || images.length === 0) images = STATIC_IMAGES;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 py-16">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <PawPrint className="w-8 h-8 text-[#E5A4CB] mx-auto mb-3" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#5C3D2E] tracking-tight">Galeria</h1>
            <p className="text-[#5C3D2E]/60 mt-4 text-lg">Momentos especiais dos nossos hóspedes.</p>
          </div>
        </section>
        <GaleriaContent images={JSON.parse(JSON.stringify(images ?? []))} />
      </main>
      <SiteFooter />
    </div>
  );
}
