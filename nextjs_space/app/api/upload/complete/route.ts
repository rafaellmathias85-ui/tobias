import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getFileUrl } from "@/lib/s3";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const body = await request.json();
    const { cloud_storage_path, isPublic } = body ?? {};
    if (!cloud_storage_path) {
      return NextResponse.json({ error: "cloud_storage_path é obrigatório" }, { status: 400 });
    }
    const url = await getFileUrl(cloud_storage_path, isPublic ?? false);
    return NextResponse.json({ url, cloud_storage_path });
  } catch (error: any) {
    console.error("Upload complete error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
