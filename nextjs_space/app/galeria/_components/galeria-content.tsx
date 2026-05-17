"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GaleriaContent({ images }: { images: any[] }) {
  const safeImages = images ?? [];
  const [selected, setSelected] = useState<any>(null);
  const categories = ["todas", ...Array.from(new Set(safeImages?.map((img: any) => img?.category ?? "geral")))];
  const [filter, setFilter] = useState("todas");
  const filtered = filter === "todas" ? safeImages : safeImages?.filter((img: any) => img?.category === filter);

  if (safeImages?.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <Camera className="w-12 h-12 text-[#E5A4CB]/40 mx-auto mb-4" />
          <p className="text-[#5C3D2E]/60">Galeria em breve! Acompanhe nosso Instagram @turmadotobias.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          {categories?.length > 2 && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categories?.map((cat: string) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === cat ? "bg-[#E5A4CB] text-white" : "bg-pink-50 text-[#5C3D2E]/70 hover:bg-pink-100"
                  }`}
                >
                  {cat?.charAt?.(0)?.toUpperCase?.() ?? ""}{cat?.slice?.(1) ?? ""}
                </button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(filtered ?? [])?.map((img: any, i: number) => (
              <AnimatedSection key={img?.id ?? i} delay={i * 0.03}>
                <button
                  onClick={() => setSelected(img)}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group w-full"
                >
                  <Image src={img?.imageUrl ?? ""} alt={img?.caption ?? "Foto da galeria"} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  {img?.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs truncate">{img.caption}</p>
                    </div>
                  )}
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white bg-black/40 p-2 rounded-full hover:bg-black/60">
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-3xl w-full max-h-[80vh] aspect-square rounded-xl overflow-hidden"
              onClick={(e: any) => e?.stopPropagation?.()}
            >
              <Image src={selected?.imageUrl ?? ""} alt={selected?.caption ?? "Foto"} fill className="object-contain" />
            </motion.div>
            {selected?.caption && (
              <p className="absolute bottom-8 text-white text-center text-sm max-w-lg">{selected.caption}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
