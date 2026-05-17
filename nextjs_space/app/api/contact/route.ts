export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tutorName, tutorEmail, tutorPhone, petName, petSpecies, petBreed, startDate, endDate, message } = body ?? {};
    if (!tutorName || !tutorEmail || !tutorPhone || !petName || !startDate || !endDate) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }
    const contact = await prisma.contactForm.create({
      data: {
        tutorName: tutorName ?? "",
        tutorEmail: tutorEmail ?? "",
        tutorPhone: tutorPhone ?? "",
        petName: petName ?? "",
        petSpecies: petSpecies ?? "cachorro",
        petBreed: petBreed ?? null,
        startDate: startDate ?? "",
        endDate: endDate ?? "",
        message: message ?? null,
      },
    });
    return NextResponse.json({ success: true, id: contact?.id });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
