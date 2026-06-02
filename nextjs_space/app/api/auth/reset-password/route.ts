import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, password } = body ?? {};

    if (!token || !password) {
      return NextResponse.json({ error: "Token e nova senha são obrigatórios" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "A senha deve ter pelo menos 6 caracteres" }, { status: 400 });
    }

    // Find valid token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json({ error: "Link de recuperação inválido" }, { status: 400 });
    }

    if (resetToken.used) {
      return NextResponse.json({ error: "Este link já foi utilizado" }, { status: 400 });
    }

    if (new Date() > resetToken.expiresAt) {
      return NextResponse.json({ error: "Link de recuperação expirado. Solicite um novo." }, { status: 400 });
    }

    // Verify user exists and is admin
    const user = await prisma.user.findUnique({ where: { email: resetToken.email } });
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 400 });
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    });

    // Mark token as used
    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true },
    });

    return NextResponse.json({ success: true, message: "Senha redefinida com sucesso!" });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
