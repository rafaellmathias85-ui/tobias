import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SobreContent } from "./_components/sobre-content";

export const metadata = {
  title: "Sobre Nós | Turma do Tobias",
  description: "Conheça a história da Turma do Tobias Pet Sitter e Pousadinha.",
};

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <SobreContent />
      </main>
      <SiteFooter />
    </div>
  );
}
