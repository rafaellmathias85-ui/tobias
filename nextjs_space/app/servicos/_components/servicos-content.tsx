"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { Home, MapPin, Shield, Camera, Heart, Stethoscope, Phone, Check, PawPrint } from "lucide-react";

const mainServices = [
  {
    icon: Home,
    title: "Pousadinha / Hotelzinho",
    desc: "Hospedagem em ambiente familiar e acolhedor para cães e gatos. Seu pet fica em um lar, não em um canil.",
    features: ["Acompanhamento 24 horas", "Espaços separados por porte", "Alimentação personalizada", "Fotos e vídeos diários", "Ambiente climatizado", "Passeios supervisionados"],
    image: "/images/family-dog-sofa.jpg",
  },
  {
    icon: MapPin,
    title: "Pet Sitter (Domicílio)",
    desc: "Cuidamos do seu pet no conforto da sua própria casa. Ideal para animais que preferem ficar no ambiente conhecido.",
    features: ["Visitas diárias ou pernoite", "Alimentação e água", "Passeios e brincadeiras", "Administração de medicamentos", "Atendimento para cães, gatos, roedores, aves e peixes", "Relatório diário com fotos"],
    image: "/images/pet-sitter-caring.jpg",
  },
];

const extras = [
  { icon: Shield, title: "Segurança 24h", desc: "Monitoramento constante do bem-estar de todos os hóspedes." },
  { icon: Camera, title: "Fotos Diárias", desc: "Acompanhe seu pet em tempo real através de fotos e vídeos." },
  { icon: Heart, title: "Carinho Individual", desc: "Cada pet recebe atenção personalizada de acordo com suas necessidades." },
  { icon: Stethoscope, title: "Cuidados Especiais", desc: "Administramos medicamentos e seguimos dietas especiais." },
];

export function ServicosContent() {
  return (
    <>
      <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <PawPrint className="w-8 h-8 text-[#E5A4CB] mx-auto mb-3" />
              <h1 className="font-display text-4xl md:text-5xl font-bold text-[#5C3D2E] tracking-tight">Nossos Serviços</h1>
              <p className="text-[#5C3D2E]/60 mt-4 text-lg">Cuidados completos para cães, gatos e outros animais domésticos com responsabilidade e segurança.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {mainServices?.map((service: any, i: number) => (
        <section key={i} className={i % 2 === 0 ? "py-16 bg-white" : "py-16 bg-pink-50/30"}>
          <div className="max-w-[1200px] mx-auto px-4">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
              <AnimatedSection className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image src={service?.image ?? ""} alt={service?.title ?? "Serviço"} fill className="object-cover" />
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2} className={i % 2 !== 0 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#E5A4CB]/10 p-3 rounded-xl">
                    <service.icon className="w-7 h-7 text-[#E5A4CB]" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-[#5C3D2E] tracking-tight">{service?.title ?? ""}</h2>
                </div>
                <p className="text-[#5C3D2E]/70 leading-relaxed">{service?.desc ?? ""}</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(service?.features ?? [])?.map((f: string, j: number) => (
                    <div key={j} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#E5A4CB] flex-shrink-0" />
                      <span className="text-sm text-[#5C3D2E]/70">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 mt-6 bg-[#E5A4CB] hover:bg-[#d48dba] text-white font-semibold px-5 py-2.5 rounded-full transition-colors"
                >
                  Solicitar Orçamento
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-[#5C3D2E] tracking-tight">Diferenciais</h2>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extras?.map((e: any, i: number) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-pink-50/50 rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="bg-[#E5A4CB]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <e.icon className="w-7 h-7 text-[#E5A4CB]" />
                  </div>
                  <h3 className="font-display font-bold text-[#5C3D2E]">{e?.title ?? ""}</h3>
                  <p className="text-sm text-[#5C3D2E]/60 mt-2">{e?.desc ?? ""}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#5C3D2E]">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">Quer saber mais?</h2>
            <p className="text-white/70 mt-3 max-w-md mx-auto">Entre em contato pelo WhatsApp ou faça uma reserva online.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/contato" className="bg-[#E5A4CB] hover:bg-[#d48dba] text-white font-semibold px-6 py-3 rounded-full transition-colors">
                Faça uma Reserva
              </Link>
              <a href="https://wa.me/5511988341796" target="_blank" rel="noopener noreferrer" className="bg-white text-[#5C3D2E] hover:bg-white/90 font-semibold px-6 py-3 rounded-full transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
