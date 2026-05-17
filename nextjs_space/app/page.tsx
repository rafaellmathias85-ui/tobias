import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "./_components/hero-section";
import { AboutPreview } from "./_components/about-preview";
import { ServicesPreview } from "./_components/services-preview";
import { StatsSection } from "./_components/stats-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { CtaSection } from "./_components/cta-section";
import { BlogPreview } from "./_components/blog-preview";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let recentPosts: any[] = [];
  try {
    recentPosts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, title: true, slug: true, excerpt: true, imageUrl: true, createdAt: true },
    });
  } catch {}

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutPreview />
        <ServicesPreview />
        <StatsSection />
        <TestimonialsSection />
        <BlogPreview posts={JSON.parse(JSON.stringify(recentPosts ?? []))} />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
