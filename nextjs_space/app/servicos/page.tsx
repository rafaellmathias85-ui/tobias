import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServicosContent } from "./_components/servicos-content";

export const metadata = {
  title: "Serviços - Hospedagem Pet e Pet Sitter a Domicílio em SP",
  description: "Serviços de hospedagem para cães e gatos com monitoramento 24h e pet sitter a domicílio em São Paulo. Atendimento humanizado, fotos diárias, alimentação personalizada. Agende pelo WhatsApp (11) 98834-1796.",
};

export default function ServicosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ServicosContent />
      </main>
      <SiteFooter />
    </div>
  );
}
