"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BookOpen } from "lucide-react";

export function BlogList({ posts }: { posts: any[] }) {
  const safePosts = posts ?? [];

  if (safePosts?.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <BookOpen className="w-12 h-12 text-[#E5A4CB]/40 mx-auto mb-4" />
          <p className="text-[#5C3D2E]/60">Nenhum post publicado ainda. Volte em breve!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safePosts?.map((post: any, i: number) => (
            <AnimatedSection key={post?.id ?? i} delay={i * 0.05}>
              <Link href={`/blog/${post?.slug ?? ""}`} className="group block">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-pink-100">
                    {post?.imageUrl && (
                      <Image src={post.imageUrl} alt={post?.title ?? "Post"} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-[#E5A4CB] font-medium mb-2">
                      {post?.createdAt ? format(new Date(post.createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR }) : ""}
                    </p>
                    <h3 className="font-display font-bold text-[#5C3D2E] text-lg group-hover:text-[#E5A4CB] transition-colors line-clamp-2">
                      {post?.title ?? ""}
                    </h3>
                    <p className="text-sm text-[#5C3D2E]/60 mt-2 line-clamp-3">{post?.excerpt ?? ""}</p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
