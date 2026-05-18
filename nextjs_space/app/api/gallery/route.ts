export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(images ?? []);
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
    const { imageUrl, caption, category } = body ?? {};
    if (!imageUrl) {
      return NextResponse.json({ error: "URL da imagem é obrigatória" }, { status: 400 });
    }
    const image = await prisma.galleryImage.create({
      data: {
        imageUrl: imageUrl ?? "",
        caption: caption ?? null,
        category: category ?? "geral",
      },
    });
    return NextResponse.json(image);
  } catch (error: any) {
    console.error("Gallery create error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
