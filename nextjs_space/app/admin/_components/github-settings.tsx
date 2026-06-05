"use client";
import { useState, useEffect } from "react";
import { Key, Save, Eye, EyeOff, CheckCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { PAT_KEY } from "@/lib/github-content";

export function GithubSettings() {
  const [pat, setPat] = useState("");
  const [showPat, setShowPat] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(PAT_KEY) ?? "";
    setPat(stored);
    setSaved(!!stored);
  }, []);

  const handleSave = () => {
    if (!pat.trim()) { toast.error("Token não pode ser vazio"); return; }
    localStorage.setItem(PAT_KEY, pat.trim());
    setSaved(true);
    toast.success("Token salvo!");
  };

  return (
    <div className="max-w-xl">
      <h2 className="font-display font-bold text-[#5C3D2E] text-2xl flex items-center gap-2 mb-6">
        <Key className="w-6 h-6 text-[#E5A4CB]" /> Configurações
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-[#5C3D2E] mb-1">Token do GitHub (PAT)</h3>
          <p className="text-sm text-[#5C3D2E]/60 mb-3">
            Necessário para salvar conteúdo do blog e galeria. O token fica armazenado apenas neste navegador.
          </p>
          <a
            href="https://github.com/settings/tokens/new?scopes=repo&description=Tobias+Admin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#E5A4CB] hover:underline mb-3"
          >
            <ExternalLink className="w-3 h-3" /> Criar token no GitHub (marque &quot;repo&quot;)
          </a>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E5A4CB]" />
            <input
              type={showPat ? "text" : "password"}
              value={pat}
              onChange={(e) => { setPat(e.target.value); setSaved(false); }}
              className="w-full border border-pink-200 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            />
            <button
              type="button"
              onClick={() => setShowPat((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C3D2E]/40 hover:text-[#5C3D2E]"
            >
              {showPat ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="bg-[#E5A4CB] hover:bg-[#d48dba] text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Token salvo" : "Salvar token"}
        </button>
        {saved && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Token configurado. Blog e Galeria prontos para uso.
          </p>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4 text-sm text-amber-800">
        <p className="font-semibold mb-1">Como funciona o salvamento de conteúdo?</p>
        <ol className="list-decimal list-inside space-y-1 text-xs">
          <li>Você adiciona ou edita conteúdo no Blog ou Galeria</li>
          <li>Ao clicar em Salvar, o sistema faz um commit automático no GitHub</li>
          <li>O deploy automático atualiza o site em aproximadamente 3 minutos</li>
        </ol>
      </div>
    </div>
  );
}
