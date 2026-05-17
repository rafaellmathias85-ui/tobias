import Link from "next/link";
import { Instagram, Facebook, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#5C3D2E] text-white">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-3">Turma do Tobias</h3>
            <p className="text-white/70 text-sm leading-relaxed">Pet Sitter e Pousadinha. Cuidamos do seu pet com muito amor e carinho desde 2016.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navegação</h4>
            <div className="flex flex-col gap-2">
              <Link href="/sobre" className="text-white/70 text-sm hover:text-[#E5A4CB] transition-colors">Sobre Nós</Link>
              <Link href="/servicos" className="text-white/70 text-sm hover:text-[#E5A4CB] transition-colors">Serviços</Link>
              <Link href="/contato" className="text-white/70 text-sm hover:text-[#E5A4CB] transition-colors">Contato e Reservas</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href="https://instagram.com/turmadotobias" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#E5A4CB] p-2.5 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/turmadotobias" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#E5A4CB] p-2.5 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@turmadotobias" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#E5A4CB] p-2.5 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.15z"/></svg>
              </a>
            </div>
            <p className="text-white/70 text-sm mt-3">
              <a href="https://wa.me/5511988341796" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5A4CB] transition-colors">
                (11) 98834-1796
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/50 text-xs flex items-center justify-center gap-1">
          Feito com <Heart className="w-3 h-3 text-[#E5A4CB] fill-[#E5A4CB]" /> Turma do Tobias © 2016
        </div>
      </div>
    </footer>
  );
}
