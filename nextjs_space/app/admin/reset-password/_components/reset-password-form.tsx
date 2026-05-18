"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Loader2, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams?.get?.("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Link de recuperação inválido. Solicite um novo link.");
    }
  }, [token]);

  const handleSubmit = async (e: any) => {
    e?.preventDefault?.();
    if (!password || !confirmPassword) {
      toast.error("Preencha todos os campos");
      return;
    }
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res?.json?.();
      if (res?.ok) {
        setSuccess(true);
      } else {
        toast.error(data?.error || "Erro ao redefinir senha");
      }
    } catch {
      toast.error("Erro ao redefinir senha");
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
        <h1 className="font-display font-bold text-[#5C3D2E] text-2xl">Redefinir Senha</h1>
        <p className="text-[#5C3D2E]/60 text-sm mt-1">Crie uma nova senha para sua conta</p>
      </div>

      {error && !success ? (
        <div className="text-center py-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-[#5C3D2E]/70 text-sm mb-6">{error}</p>
          <Link
            href="/admin/forgot-password"
            className="inline-flex items-center gap-2 text-[#E5A4CB] hover:text-[#d48dba] font-medium text-sm transition-colors"
          >
            Solicitar novo link
          </Link>
        </div>
      ) : success ? (
        <div className="text-center py-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-semibold text-[#5C3D2E] text-lg mb-2">Senha Redefinida!</h3>
          <p className="text-[#5C3D2E]/60 text-sm mb-6">Sua senha foi alterada com sucesso. Agora você pode fazer login com a nova senha.</p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 bg-[#E5A4CB] hover:bg-[#d48dba] text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            Fazer Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Nova Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E5A4CB]" />
              <input
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e?.target?.value ?? "")}
                required
                minLength={6}
                className="w-full border border-pink-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Confirmar Nova Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E5A4CB]" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e?.target?.value ?? "")}
                required
                minLength={6}
                className="w-full border border-pink-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]"
                placeholder="Repita a nova senha"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E5A4CB] hover:bg-[#d48dba] disabled:opacity-50 text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {loading ? "Salvando..." : "Redefinir Senha"}
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
