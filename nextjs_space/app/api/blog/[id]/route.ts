export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const body = await request.json();
    const { title, content, excerpt, imageUrl, published } = body ?? {};
    const post = await prisma.blogPost.update({
      where: { id: params?.id ?? "" },
      data: {
        ...(title ? { title } : {}),
        ...(content ? { content } : {}),
        ...(excerpt !== undefined ? { excerpt } : {}),
        ...(imageUrl !== undefined ? { imageUrl } : {}),
        ...(published !== undefined ? { published } : {}),
      },
    });
    return NextResponse.json(post);
  } catch (error: any) {
    console.error("Blog update error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    await prisma.blogPost.delete({ where: { id: params?.id ?? "" } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Blog delete error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
