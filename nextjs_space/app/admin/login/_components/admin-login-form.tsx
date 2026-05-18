"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e?.preventDefault?.();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        toast.error("E-mail ou senha inválidos");
        setLoading(false);
      } else if (result?.ok) {
        window.location.href = "/admin";
      }
    } catch {
      toast.error("Erro ao fazer login");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image src="/images/logo.png" alt="Logo Turma do Tobias" fill className="object-contain" />
        </div>
        <h1 className="font-display font-bold text-[#5C3D2E] text-2xl">Admin</h1>
        <p className="text-[#5C3D2E]/60 text-sm mt-1">Área administrativa da Turma do Tobias</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#5C3D2E] mb-1">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E5A4CB]" />
            <input type="email" value={email} onChange={(e: any) => setEmail(e?.target?.value ?? "")} required className="w-full border border-pink-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="admin@turmadotobias.com" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Senha</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E5A4CB]" />
            <input type="password" value={password} onChange={(e: any) => setPassword(e?.target?.value ?? "")} required className="w-full border border-pink-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="Sua senha" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#E5A4CB] hover:bg-[#d48dba] disabled:opacity-50 text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="text-center pt-2">
          <Link
            href="/admin/forgot-password"
            className="text-sm text-[#5C3D2E]/50 hover:text-[#E5A4CB] transition-colors"
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </form>
    </div>
  );
}
