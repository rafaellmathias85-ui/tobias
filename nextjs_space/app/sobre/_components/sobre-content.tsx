"use client";
import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section";
import { Heart, Shield, Clock, Users, PawPrint, Star } from "lucide-react";

const values = [
  { icon: Heart, title: "Amor e Carinho", desc: "Cada pet é tratado como membro da família, com atenção individualizada." },
  { icon: Shield, title: "Responsabilidade", desc: "Segurança e cuidado em cada detalhe do nosso dia a dia." },
  { icon: Clock, title: "Acompanhamento 24h", desc: "Monitoramento constante, para sua tranquilidade." },
  { icon: Users, title: "Transparência", desc: "Fotos, vídeos e atualizações diárias para você acompanhar tudo." },
];

export function SobreContent() {
  return (
    <>
      <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <PawPrint className="w-8 h-8 text-[#E5A4CB] mx-auto mb-3" />
              <h1 className="font-display text-4xl md:text-5xl font-bold text-[#5C3D2E] tracking-tight">Nossa História</h1>
              <p className="text-[#5C3D2E]/60 mt-4 text-lg">Um hotelzinho que nasceu do amor pelos animais.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/person-petting-dog.jpg" alt="Cuidando com carinho" fill className="object-cover" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="font-display text-3xl font-bold text-[#5C3D2E] tracking-tight">Desde 2016, cuidando com amor</h2>
              <p className="mt-4 text-[#5C3D2E]/70 leading-relaxed">
                A Turma do Tobias Pet Sitter e Pousadinha nasceu de uma paixão genuina pelos animais. O que começou como um cuidado informal entre amigos e vizinhos, se transformou em um serviço profissional de hospedagem e pet sitting com atendimento humanizado.
              </p>
              <p className="mt-3 text-[#5C3D2E]/70 leading-relaxed">
                Dr. Tobias, nosso CEO (Chief Executive Dog!), foi quem inspirou tudo isso. Desde o início, nossa missão é oferecer um ambiente familiar, seguro e cheio de carinho para cães, gatos, roedores, aves e peixes.
              </p>
              <p className="mt-3 text-[#5C3D2E]/70 leading-relaxed">
                Acreditamos que cada animal é único e merece atenção personalizada. Por isso, mantemos um número limitado de hóspedes para garantir que todos recebam o melhor cuidado possível.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-pink-50/50">
        <div className="max-w-[1200px] mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-[#5C3D2E] tracking-tight">Nossos Valores</h2>
              <p className="text-[#5C3D2E]/60 mt-3">O que guia nosso trabalho todos os dias.</p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values?.map((v: any, i: number) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="bg-[#E5A4CB]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-[#E5A4CB]" />
                  </div>
                  <h3 className="font-display font-bold text-[#5C3D2E]">{v?.title ?? ""}</h3>
                  <p className="text-sm text-[#5C3D2E]/60 mt-2">{v?.desc ?? ""}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold text-[#5C3D2E] tracking-tight">Nosso espaço</h2>
              <p className="mt-4 text-[#5C3D2E]/70 leading-relaxed">
                Nosso ambiente foi cuidadosamente preparado para oferecer conforto e segurança. Os espaços são arejados, limpos e organizados para que cada pet se sinta em casa.
              </p>
              <div className="mt-6 space-y-3">
                {["Áreas separadas para cães e gatos", "Espaço para brincadeiras supervisionadas", "Ambiente climatizado", "Alimentação personalizada"]?.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-[#E5A4CB] flex-shrink-0" />
                    <span className="text-[#5C3D2E]/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/group-pets-playing.jpg" alt="Pets brincando no espaço" fill className="object-cover" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
