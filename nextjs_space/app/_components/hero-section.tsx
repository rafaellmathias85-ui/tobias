"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Shield, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <div className="max-w-[1200px] mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-[#E5A4CB]/20 text-[#c67aa8] px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Heart className="w-3.5 h-3.5 fill-current" /> Desde 2016
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#5C3D2E] tracking-tight leading-tight">
              Seu pet merece ser <span className="text-[#E5A4CB]">amado</span> como família
            </h1>
            <p className="mt-4 text-lg text-[#5C3D2E]/70 max-w-lg leading-relaxed">
              A Turma do Tobias é um hotelzinho familiar para cães e gatos com atendimento humanizado, acompanhamento 24h e muito carinho.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/contato"
                className="bg-[#E5A4CB] hover:bg-[#d48dba] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Faça uma Reserva
              </Link>
              <Link
                href="/servicos"
                className="bg-[#5C3D2E] hover:bg-[#4a3125] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Nossos Serviços
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { icon: Heart, text: "Atendimento humanizado" },
                { icon: Shield, text: "Segurança total" },
                { icon: Clock, text: "Monitoramento 24h" },
              ]?.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#5C3D2E]/70">
                  <item.icon className="w-4 h-4 text-[#E5A4CB]" />
                  {item?.text ?? ""}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-dogs-cats-together.jpg"
                alt="Cães e gatos felizes na Turma do Tobias"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
              <div className="bg-[#E5A4CB]/20 p-2 rounded-full">
                <Heart className="w-5 h-5 text-[#E5A4CB] fill-[#E5A4CB]" />
              </div>
              <div>
                <p className="text-xs text-[#5C3D2E]/60">Famílias atendidas</p>
                <p className="font-bold text-[#5C3D2E] text-sm">+500</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
