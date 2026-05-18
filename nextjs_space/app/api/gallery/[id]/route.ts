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
    const { imageUrl, caption, category } = body ?? {};
    const image = await prisma.galleryImage.update({
      where: { id: params?.id ?? "" },
      data: {
        ...(imageUrl !== undefined ? { imageUrl } : {}),
        ...(caption !== undefined ? { caption } : {}),
        ...(category !== undefined ? { category } : {}),
      },
    });
    return NextResponse.json(image);
  } catch (error: any) {
    console.error("Gallery update error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    await prisma.galleryImage.delete({ where: { id: params?.id ?? "" } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Gallery delete error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
