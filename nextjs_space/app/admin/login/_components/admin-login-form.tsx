"use client";
import { useState } from "react";
import Image from "next/image";
import { Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "turma2024!";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed", "1");
      window.location.href = "/admin/";
    } else {
      toast.error("Senha incorreta");
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
          <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Senha</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E5A4CB]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full border border-pink-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]"
              placeholder="Senha do painel"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E5A4CB] hover:bg-[#d48dba] disabled:opacity-50 text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
          {loading ? "Verificando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
