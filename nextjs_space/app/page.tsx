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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Turma do Tobias Pet Sitter e Pousadinha",
    "description": "Hotel e hospedagem para cães e gatos em São Paulo com atendimento humanizado e monitoramento 24h.",
    "url": process.env.NEXTAUTH_URL || "https://turmadotobias.abacusai.app",
    "telephone": "+5511988341796",
    "foundingDate": "2016",
    "priceRange": "$$",
    "image": "/images/logo.png",
    "sameAs": [
      "https://instagram.com/turmadotobias",
      "https://facebook.com/turmadotobias",
      "https://tiktok.com/@turmadotobias"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "22:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "500",
      "bestRating": "5"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
