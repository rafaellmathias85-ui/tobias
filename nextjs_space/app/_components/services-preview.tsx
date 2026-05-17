"use client";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { Home, MapPin, Shield, Camera, Heart, Stethoscope } from "lucide-react";

const services = [
  { icon: Home, title: "Pousadinha", desc: "Hospedagem em ambiente familiar com carinho e acompanhamento 24 horas por dia." },
  { icon: MapPin, title: "Pet Sitter", desc: "Cuidamos do seu pet no conforto da sua casa, com atenção individual." },
  { icon: Shield, title: "Segurança 24h", desc: "Monitoramento constante para que você viaje tranquilo(a)." },
  { icon: Camera, title: "Fotos Diárias", desc: "Receba atualizações com fotos e vídeos do seu pet todos os dias." },
  { icon: Heart, title: "Carinho Especial", desc: "Tratamento humanizado e individual para cada pet que chega aqui." },
  { icon: Stethoscope, title: "Cuidados Especiais", desc: "Administração de medicamentos e atenção a necessidades especiais." },
];

export function ServicesPreview() {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50/50 to-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-[#E5A4CB] uppercase tracking-wide">Serviços</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5C3D2E] tracking-tight mt-2">
              Tudo que seu pet precisa
            </h2>
            <p className="text-[#5C3D2E]/60 mt-3 max-w-lg mx-auto">Oferecemos cuidados completos com responsabilidade e segurança.</p>
          </div>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((s: any, i: number) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group">
                <div className="bg-[#E5A4CB]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#E5A4CB]/20 transition-colors">
                  <s.icon className="w-6 h-6 text-[#E5A4CB]" />
                </div>
                <h3 className="font-display font-bold text-[#5C3D2E] text-lg">{s?.title ?? ""}</h3>
                <p className="text-sm text-[#5C3D2E]/60 mt-2 leading-relaxed">{s?.desc ?? ""}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/servicos"
            className="inline-flex bg-[#E5A4CB] hover:bg-[#d48dba] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
          >
            Ver todos os serviços
          </Link>
        </div>
      </div>
    </section>
  );
}
