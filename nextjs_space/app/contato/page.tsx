import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContatoForm } from "./_components/contato-form";
import { PawPrint, Phone, Instagram, Facebook, MapPin } from "lucide-react";

export const metadata = {
  title: "Contato e Reservas - Agende a Hospedagem do Seu Pet",
  description: "Faça sua reserva de hospedagem para cães e gatos na Turma do Tobias. Atendimento pelo WhatsApp (11) 98834-1796. Orçamento online rápido, check-in flexível e acompanhamento 24h.",
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 py-16">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <PawPrint className="w-8 h-8 text-[#E5A4CB] mx-auto mb-3" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#5C3D2E] tracking-tight">Contato e Reservas</h1>
            <p className="text-[#5C3D2E]/60 mt-4 text-lg">Faça sua reserva ou tire suas dúvidas. Estamos aqui para ajudar!</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <ContatoForm />
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="font-display font-bold text-[#5C3D2E] text-lg mb-4">Informações de Contato</h3>
                  <div className="space-y-4">
                    <a href="https://wa.me/5511988341796" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#5C3D2E]/70 hover:text-[#E5A4CB] transition-colors">
                      <div className="bg-[#E5A4CB]/10 p-2 rounded-lg"><Phone className="w-5 h-5 text-[#E5A4CB]" /></div>
                      <div><p className="text-xs text-[#5C3D2E]/50">WhatsApp</p><p className="font-medium text-sm">(11) 98834-1796</p></div>
                    </a>
                    <a href="https://instagram.com/turmadotobias" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#5C3D2E]/70 hover:text-[#E5A4CB] transition-colors">
                      <div className="bg-[#E5A4CB]/10 p-2 rounded-lg"><Instagram className="w-5 h-5 text-[#E5A4CB]" /></div>
                      <div><p className="text-xs text-[#5C3D2E]/50">Instagram</p><p className="font-medium text-sm">@turmadotobias</p></div>
                    </a>
                    <a href="https://facebook.com/turmadotobias" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#5C3D2E]/70 hover:text-[#E5A4CB] transition-colors">
                      <div className="bg-[#E5A4CB]/10 p-2 rounded-lg"><Facebook className="w-5 h-5 text-[#E5A4CB]" /></div>
                      <div><p className="text-xs text-[#5C3D2E]/50">Facebook</p><p className="font-medium text-sm">@turmadotobias</p></div>
                    </a>
                  </div>
                </div>
                <div className="bg-[#5C3D2E] rounded-xl shadow-md p-6 text-white">
                  <h3 className="font-display font-bold text-lg mb-3">Horário de Atendimento</h3>
                  <div className="space-y-2 text-sm text-white/70">
                    <p>Check-in e Check-out: 8h às 20h</p>
                    <p>Atendimento por WhatsApp: 8h às 22h</p>
                    <p className="text-[#E5A4CB] font-medium pt-2">Acompanhamento dos hóspedes: 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
