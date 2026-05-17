"use client";
import { AnimatedSection } from "@/components/animated-section";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Paula M.",
    pet: "Mel (Golden Retriever)",
    text: "A Mel adora ficar na Turma do Tobias! Sempre que busco, ela está feliz e bem cuidada. O carinho que eles têm é incrível.",
  },
  {
    name: "Carlos R.",
    pet: "Mimi (Gata Persa)",
    text: "Confio plenamente na equipe. Minha gatinha é muito arredia mas lá ela fica super tranquila. As fotos diárias me deixam em paz.",
  },
  {
    name: "Fernanda L.",
    pet: "Thor e Pipoca",
    text: "Já uso o serviço há 3 anos e nunca me decepcionou. O atendimento é humanizado de verdade, parece que estou deixando na casa de família.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-[#E5A4CB] uppercase tracking-wide">Depoimentos</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5C3D2E] tracking-tight mt-2">
              O que dizem sobre nós
            </h2>
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials?.map((t: any, i: number) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="bg-pink-50/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow relative">
                <Quote className="w-8 h-8 text-[#E5A4CB]/30 absolute top-4 right-4" />
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5]?.map((s: number) => (
                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[#5C3D2E]/70 text-sm leading-relaxed italic">"{t?.text ?? ""}"</p>
                <div className="mt-4 pt-4 border-t border-pink-100">
                  <p className="font-semibold text-[#5C3D2E] text-sm">{t?.name ?? ""}</p>
                  <p className="text-xs text-[#E5A4CB]">{t?.pet ?? ""}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
