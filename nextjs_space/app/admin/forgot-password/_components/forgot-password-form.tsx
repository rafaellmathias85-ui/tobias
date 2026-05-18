"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: any) => {
    e?.preventDefault?.();
    if (!email) {
      toast.error("Digite seu e-mail");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res?.json?.();
      if (res?.ok) {
        setSent(true);
      } else {
        toast.error(data?.error || "Erro ao enviar e-mail");
      }
    } catch {
      toast.error("Erro ao enviar e-mail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image src="/images/logo.png" alt="Logo Turma do Tobias" fill className="object-contain" />
        </div>
        <h1 className="font-display font-bold text-[#5C3D2E] text-2xl">Recuperar Senha</h1>
        <p className="text-[#5C3D2E]/60 text-sm mt-1">Enviaremos um link para redefinir sua senha</p>
      </div>

      {sent ? (
        <div className="text-center py-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-semibold text-[#5C3D2E] text-lg mb-2">E-mail Enviado!</h3>
          <p className="text-[#5C3D2E]/60 text-sm mb-6">
            Se o e-mail <strong>{email}</strong> estiver cadastrado, você receberá um link para redefinir sua senha. Verifique sua caixa de entrada e spam.
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 text-[#E5A4CB] hover:text-[#d48dba] font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5C3D2E] mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E5A4CB]" />
              <input
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e?.target?.value ?? "")}
                required
                className="w-full border border-pink-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]"
                placeholder="admin@turmadotobias.com"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E5A4CB] hover:bg-[#d48dba] disabled:opacity-50 text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
            {loading ? "Enviando..." : "Enviar Link de Recuperação"}
          </button>
          <div className="text-center">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-[#5C3D2E]/50 hover:text-[#5C3D2E] text-sm transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar ao Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
