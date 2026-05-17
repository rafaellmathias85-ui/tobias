"use client";
import { Counter } from "@/components/counter";
import { AnimatedSection } from "@/components/animated-section";
import { Users, Calendar, Heart, Star } from "lucide-react";

const stats = [
  { icon: Calendar, target: 10, suffix: "+", label: "Anos de experiência" },
  { icon: Users, target: 500, suffix: "+", label: "Famílias atendidas" },
  { icon: Heart, target: 2000, suffix: "+", label: "Pets cuidados" },
  { icon: Star, target: 98, suffix: "%", label: "Satisfação" },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-[#5C3D2E]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats?.map((s: any, i: number) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="text-center">
                <s.icon className="w-8 h-8 text-[#E5A4CB] mx-auto mb-3" />
                <Counter target={s?.target ?? 0} suffix={s?.suffix ?? ""} />
                <p className="text-white/70 text-sm mt-1">{s?.label ?? ""}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
