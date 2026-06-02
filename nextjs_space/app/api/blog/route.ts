import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts ?? []);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const body = await request.json();
    const { title, content, excerpt, imageUrl, published } = body ?? {};
    if (!title || !content) {
      return NextResponse.json({ error: "Título e conteúdo obrigatórios" }, { status: 400 });
    }
    const slug = (title ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      + "-" + Date.now().toString(36);

    const post = await prisma.blogPost.create({
      data: {
        title: title ?? "",
        slug,
        content: content ?? "",
        excerpt: excerpt ?? (content ?? "")?.substring?.(0, 150) ?? "",
        imageUrl: imageUrl ?? null,
        published: published !== false,
        authorName: (session?.user as any)?.name ?? "Turma do Tobias",
      },
    });
    return NextResponse.json(post);
  } catch (error: any) {
    console.error("Blog create error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
