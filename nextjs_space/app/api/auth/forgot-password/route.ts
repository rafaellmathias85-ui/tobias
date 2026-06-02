import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body ?? {};

    if (!email) {
      return NextResponse.json({ error: "E-mail é obrigatório" }, { status: 400 });
    }

    // Check if user exists and has admin role
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== "admin") {
      // Return success even if user not found to prevent email enumeration
      return NextResponse.json({ success: true, message: "Se o e-mail estiver cadastrado, você receberá um link de recuperação." });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Invalidate any existing tokens for this email
    await prisma.passwordResetToken.updateMany({
      where: { email, used: false },
      data: { used: true },
    });

    // Create new token
    await prisma.passwordResetToken.create({
      data: { email, token, expiresAt },
    });

    // Build reset URL
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/admin/reset-password?token=${token}`;

    // Send email notification
    const appUrl = process.env.NEXTAUTH_URL || "";
    const appHostname = appUrl ? new URL(appUrl).hostname : "turmadotobias.abacusai.app";

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: linear-gradient(135deg, #E5A4CB 0%, #f8d7e8 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #5C3D2E; margin: 0; font-size: 24px;">🐾 Turma do Tobias</h1>
          <p style="color: #5C3D2E; margin: 8px 0 0; opacity: 0.8;">Pet Sitter e Pousadinha</p>
        </div>
        <div style="padding: 30px; background: #fdf2f8; border-radius: 0 0 12px 12px;">
          <h2 style="color: #5C3D2E; margin-top: 0;">Recuperação de Senha</h2>
          <p style="color: #5C3D2E; line-height: 1.6;">Olá <strong>${user.name || "Admin"}</strong>,</p>
          <p style="color: #5C3D2E; line-height: 1.6;">Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para criar uma nova senha:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: #E5A4CB; color: #fff; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; font-size: 16px;">Redefinir Senha</a>
          </div>
          <p style="color: #5C3D2E; line-height: 1.6; font-size: 14px;">Este link expira em <strong>1 hora</strong>. Se você não solicitou a recuperação de senha, ignore este e-mail.</p>
          <hr style="border: none; border-top: 1px solid #E5A4CB40; margin: 20px 0;" />
          <p style="color: #5C3D2E; font-size: 12px; opacity: 0.6;">Se o botão não funcionar, copie e cole este link no navegador:</p>
          <p style="color: #E5A4CB; font-size: 12px; word-break: break-all;">${resetUrl}</p>
        </div>
      </div>
    `;

    try {
      const emailResponse = await fetch("https://apps.abacus.ai/api/sendNotificationEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_RECUPERAO_DE_SENHA,
          subject: "Recuperação de Senha - Turma do Tobias",
          body: htmlBody,
          is_html: true,
          recipient_email: email,
          sender_email: `noreply@${appHostname}`,
          sender_alias: "Turma do Tobias",
        }),
      });
      const emailResult = await emailResponse.json();
      if (!emailResult.success) {
        console.error("Email send failed:", emailResult);
      }
    } catch (emailErr) {
      console.error("Email send error:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Se o e-mail estiver cadastrado, você receberá um link de recuperação." });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
