import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SobreContent } from "./_components/sobre-content";

export const metadata = {
  title: "Sobre Nós - Nossa História de Amor pelos Animais",
  description: "Conheça a Turma do Tobias Pet Sitter e Pousadinha. Desde 2016 cuidando de cães e gatos com atendimento humanizado, segurança 24h e muito carinho em São Paulo. Ambiente familiar preparado para o bem-estar do seu pet.",
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
