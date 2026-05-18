"use client";
import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Paula M.",
    pet: "Mel (Golden Retriever)",
    text: "A Mel adora ficar na Turma do Tobias! Sempre que busco, ela está feliz e bem cuidada. O carinho que eles têm é incrível. Recebo fotos e vídeos todos os dias!",
    image: "/images/testimonial-1.jpg",
  },
  {
    name: "Carlos R.",
    pet: "Mimi (Gata Persa)",
    text: "Confio plenamente na equipe. Minha gatinha é muito arredia mas lá ela fica super tranquila. As fotos diárias me deixam em paz durante as viagens.",
    image: "/images/testimonial-2.jpg",
  },
  {
    name: "Fernanda L.",
    pet: "Thor e Pipoca",
    text: "Já uso o serviço há 3 anos e nunca me decepcionou. O atendimento é humanizado de verdade, parece que estou deixando na casa de família.",
    image: "/images/testimonial-3.jpg",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-[#E5A4CB] uppercase tracking-wide">Depoimentos Reais</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5C3D2E] tracking-tight mt-2">
              O que nossos clientes dizem
            </h2>
            <p className="text-[#5C3D2E]/60 mt-3 max-w-xl mx-auto">Veja o que as famílias que confiam na Turma do Tobias têm a dizer sobre nossa hospedagem.</p>
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials?.map((t: any, i: number) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="bg-pink-50/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow relative h-full flex flex-col">
                <Quote className="w-8 h-8 text-[#E5A4CB]/30 absolute top-4 right-4" />
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5]?.map((s: number) => (
                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[#5C3D2E]/70 text-sm leading-relaxed italic flex-1">"{t?.text ?? ""}"</p>
                <div className="mt-4 pt-4 border-t border-pink-100 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#E5A4CB]/30">
                    <Image src={t?.image ?? ""} alt={`Foto de ${t?.name ?? "cliente"}`} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#5C3D2E] text-sm">{t?.name ?? ""}</p>
                    <p className="text-xs text-[#E5A4CB]">{t?.pet ?? ""}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
