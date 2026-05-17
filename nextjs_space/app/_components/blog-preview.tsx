"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { BookOpen, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function BlogPreview({ posts }: { posts: any[] }) {
  const safePosts = posts ?? [];
  if (safePosts?.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50/30 to-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-[#E5A4CB] uppercase tracking-wide">Blog</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5C3D2E] tracking-tight mt-2">
              Novidades da Turma
            </h2>
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {safePosts?.map((post: any, i: number) => (
            <AnimatedSection key={post?.id ?? i} delay={i * 0.1}>
              <Link href={`/blog/${post?.slug ?? ""}`} className="group block">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-pink-100">
                    {post?.imageUrl && (
                      <Image src={post.imageUrl} alt={post?.title ?? "Post"} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-[#E5A4CB] font-medium mb-2">
                      {post?.createdAt ? format(new Date(post.createdAt), "dd 'de' MMM, yyyy", { locale: ptBR }) : ""}
                    </p>
                    <h3 className="font-display font-bold text-[#5C3D2E] group-hover:text-[#E5A4CB] transition-colors line-clamp-2">{post?.title ?? ""}</h3>
                    <p className="text-sm text-[#5C3D2E]/60 mt-2 line-clamp-2">{post?.excerpt ?? ""}</p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="inline-flex items-center gap-2 bg-[#5C3D2E] hover:bg-[#4a3125] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors">
            <BookOpen className="w-4 h-4" /> Ver todos os posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
