"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Calendar, User } from "lucide-react";

export function BlogPostContent({ post }: { post: any }) {
  const safePost = post ?? {};

  return (
    <article>
      {safePost?.imageUrl && (
        <div className="relative h-64 md:h-96 bg-pink-100">
          <Image src={safePost.imageUrl} alt={safePost?.title ?? "Post"} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}
      <div className="max-w-[800px] mx-auto px-4 py-12">
        <AnimatedSection>
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#E5A4CB] hover:text-[#d48dba] text-sm font-medium mb-6">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#5C3D2E] tracking-tight">{safePost?.title ?? ""}</h1>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-[#5C3D2E]/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {safePost?.createdAt ? format(new Date(safePost.createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR }) : ""}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {safePost?.authorName ?? "Turma do Tobias"}
            </span>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="mt-8 prose prose-lg max-w-none text-[#5C3D2E]/80 leading-relaxed whitespace-pre-wrap">
            {safePost?.content ?? ""}
          </div>
        </AnimatedSection>
      </div>
    </article>
  );
}
