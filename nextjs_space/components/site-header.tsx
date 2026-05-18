"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/servicos", label: "Serviços" },
  { href: "/blog", label: "Blog" },
  { href: "/galeria", label: "Galeria" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-14 h-14">
            <Image src="/images/logo.png" alt="Logo Turma do Tobias" fill className="object-contain" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-[#5C3D2E] text-lg leading-tight block">Turma do Tobias</span>
            <span className="text-xs text-[#E5A4CB] font-medium">Pet Sitter e Pousadinha</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks?.map((link: any) => (
            <Link
              key={link?.href}
              href={link?.href ?? "/"}
              className="px-3 py-2 text-sm font-medium text-[#5C3D2E] hover:text-[#E5A4CB] hover:bg-pink-50 rounded-lg transition-colors"
            >
              {link?.label ?? ""}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/5511988341796"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#E5A4CB] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#d48dba] transition-colors shadow-md"
          >
            <Phone className="w-4 h-4" />
            WhatsApp
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-[#5C3D2E] hover:bg-pink-50 rounded-lg"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-pink-100 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks?.map((link: any) => (
                <Link
                  key={link?.href}
                  href={link?.href ?? "/"}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-[#5C3D2E] hover:text-[#E5A4CB] hover:bg-pink-50 rounded-lg transition-colors"
                >
                  {link?.label ?? ""}
                </Link>
              ))}
              <a
                href="https://wa.me/5511988341796"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#E5A4CB] text-white px-4 py-3 rounded-lg text-sm font-semibold mt-2 justify-center"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
