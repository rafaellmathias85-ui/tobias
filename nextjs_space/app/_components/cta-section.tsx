"use client";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { Phone, Heart } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#E5A4CB] to-[#d48dba]">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <AnimatedSection>
          <Heart className="w-10 h-10 text-white/80 mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
            Pronto para deixar seu pet em boas mãos?
          </h2>
          <p className="text-white/80 mt-3 max-w-lg mx-auto">
            Entre em contato e garanta a reserva. Seu pet vai amar a Turma do Tobias!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/contato"
              className="bg-white text-[#E5A4CB] hover:bg-white/90 font-semibold px-6 py-3 rounded-full shadow-lg transition-colors"
            >
              Faça uma Reserva
            </Link>
            <a
              href="https://wa.me/5511988341796"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5C3D2E] hover:bg-[#4a3125] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
