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
  { id: "g1", imageUrl: "/images/hero-dogs-cats-together.jpg", caption: "Nossos hóspedes curtindo juntos!", category: "hospedagem", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g2", imageUrl: "/images/family-dog-sofa.jpg", caption: "Conforto de casa para seu pet", category: "ambiente", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g3", imageUrl: "/images/cat-being-groomed.jpg", caption: "Cuidados especiais com muito carinho", category: "cuidados", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g4", imageUrl: "/images/small-dog-happy.jpg", caption: "Felicidade que contagia!", category: "hospedagem", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g5", imageUrl: "/images/group-pets-playing.jpg", caption: "Hora da brincadeira supervisionada", category: "brincadeiras", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g6", imageUrl: "/images/pet-sitter-caring.jpg", caption: "Atendimento humanizado e carinhoso", category: "cuidados", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g7", imageUrl: "/images/cat-relaxing-home.jpg", caption: "Cantinho especial para os felinos", category: "ambiente", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g8", imageUrl: "/images/dog-relaxed-lying.jpg", caption: "Relaxando depois de muita diversão", category: "hospedagem", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g9", imageUrl: "/images/puppy-playing-toy.jpg", caption: "Brincando com os brinquedos favoritos", category: "brincadeiras", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g10", imageUrl: "/images/dog-cat-cuddling.jpg", caption: "Cães e gatos convivendo em harmonia", category: "hospedagem", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g11", imageUrl: "/images/person-petting-dog.jpg", caption: "Cada pet recebe atenção individual", category: "cuidados", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "g12", imageUrl: "/images/cats-resting-together.jpg", caption: "Gatinhos descansando tranquilos", category: "ambiente", createdAt: "2026-01-01T00:00:00.000Z" },
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
