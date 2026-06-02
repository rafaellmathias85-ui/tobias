import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GaleriaContent } from "./_components/galeria-content";
import { prisma } from "@/lib/db";
import { PawPrint } from "lucide-react";


export const metadata = {
  title: "Galeria de Fotos - Pets Felizes na Hospedagem",
  description: "Galeria de fotos dos cães e gatos hospedados na Turma do Tobias. Veja nossos hóspedes felizes e bem cuidados em um ambiente familiar e acolhedor.",
};

export default async function GaleriaPage() {
  let images: any[] = [];
  try {
    images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

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
