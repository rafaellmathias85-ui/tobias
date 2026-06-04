import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const reservas = await prisma.contactForm.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reservas ?? []);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
