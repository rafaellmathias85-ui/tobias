import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServicosContent } from "./_components/servicos-content";

export const metadata = {
  title: "Serviços | Turma do Tobias",
  description: "Conheça nossos serviços de hospedagem, pet sitter e cuidados para seu pet.",
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
