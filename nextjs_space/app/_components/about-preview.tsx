"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { PawPrint, ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/family-dog-sofa.jpg" alt="Ambiente familiar acolhedor" fill className="object-cover" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-2 mb-3">
              <PawPrint className="w-5 h-5 text-[#E5A4CB]" />
              <span className="text-sm font-medium text-[#E5A4CB] uppercase tracking-wide">Quem Somos</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5C3D2E] tracking-tight">
              Um lar longe de casa para o seu pet
            </h2>
            <p className="mt-4 text-[#5C3D2E]/70 leading-relaxed">
              A Turma do Tobias nasceu do amor pelos animais. Somos um hotelzinho familiar onde cada pet recebe atenção personalizada, carinho e cuidados como se estivesse na própria casa.
            </p>
            <p className="mt-3 text-[#5C3D2E]/70 leading-relaxed">
              Nosso ambiente foi preparado para oferecer segurança, conforto e diversão para cães, gatos, roedores, aves e peixes — em domicílio ou no nosso hotelzinho.
            </p>
            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 mt-6 bg-[#5C3D2E] hover:bg-[#4a3125] text-white font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Conheça nossa história <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
