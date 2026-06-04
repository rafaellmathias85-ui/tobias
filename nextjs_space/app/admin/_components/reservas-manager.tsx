"use client";
import { useState, useEffect, useCallback } from "react";
import { ClipboardList, Loader2, Trash2, CheckCircle, Clock, XCircle, Phone, Mail, Dog, Cat, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Reserva {
  id: string;
  tutorName: string;
  tutorEmail: string;
  tutorPhone: string;
  petName: string;
  petSpecies: string;
  petBreed: string | null;
  startDate: string;
  endDate: string;
  message: string | null;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ["pendente", "confirmado", "cancelado", "concluido"];

const STATUS_STYLE: Record<string, string> = {
  pendente: "bg-yellow-100 text-yellow-700",
  confirmado: "bg-green-100 text-green-700",
  cancelado: "bg-red-100 text-red-600",
  concluido: "bg-gray-100 text-gray-600",
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  pendente: <Clock className="w-3 h-3" />,
  confirmado: <CheckCircle className="w-3 h-3" />,
  cancelado: <XCircle className="w-3 h-3" />,
  concluido: <CheckCircle className="w-3 h-3" />,
};

const fmt = (d: string) => {
  if (!d) return "";
  try { return new Date(d).toLocaleDateString("pt-BR"); } catch { return d; }
};

export function ReservasManager() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchReservas = useCallback(async () => {
    try {
      const res = await fetch("/api/reservas");
      const data = await res?.json?.();
      setReservas(Array.isArray(data) ? data : []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchReservas(); }, [fetchReservas]);

  const handleStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/reservas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res?.ok) {
        toast.success("Status atualizado!");
        setReservas((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
      } else {
        toast.error("Erro ao atualizar");
      }
    } catch { toast.error("Erro ao atualizar"); } finally { setUpdating(null); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta reserva?")) return;
    try {
      const res = await fetch(`/api/reservas/${id}`, { method: "DELETE" });
      if (res?.ok) { toast.success("Reserva excluída"); fetchReservas(); }
    } catch { toast.error("Erro ao excluir"); }
  };

  const counts = STATUS_OPTIONS.reduce((acc, s) => ({ ...acc, [s]: reservas.filter((r) => r.status === s).length }), {} as Record<string, number>);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-[#5C3D2E] text-2xl flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-[#E5A4CB]" /> Reservas e Solicitações
        </h2>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {STATUS_OPTIONS.map((s) => (
          <div key={s} className={`rounded-xl p-4 ${STATUS_STYLE[s] ?? "bg-gray-100 text-gray-600"}`}>
            <p className="text-2xl font-bold">{counts[s] ?? 0}</p>
            <p className="text-xs capitalize mt-1">{s}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#E5A4CB] mx-auto" /></div>
      ) : reservas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <ClipboardList className="w-12 h-12 text-[#E5A4CB]/30 mx-auto mb-3" />
          <p className="text-[#5C3D2E]/50">Nenhuma reserva recebida ainda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reservas.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h4 className="font-semibold text-[#5C3D2E]">{r.tutorName}</h4>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[r.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {STATUS_ICON[r.status]}
                      {r.status}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-[#5C3D2E]/70">
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#E5A4CB]" />{r.tutorPhone}</span>
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#E5A4CB]" />{r.tutorEmail}</span>
                    <span className="flex items-center gap-1.5">
                      {r.petSpecies === "gato" ? <Cat className="w-3.5 h-3.5 text-[#E5A4CB]" /> : <Dog className="w-3.5 h-3.5 text-[#E5A4CB]" />}
                      {r.petName} · {r.petSpecies}{r.petBreed ? ` · ${r.petBreed}` : ""}
                    </span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#E5A4CB]" />{fmt(r.startDate)} → {fmt(r.endDate)}</span>
                  </div>
                  {r.message && <p className="mt-2 text-xs text-[#5C3D2E]/50 italic">"{r.message}"</p>}
                  <p className="text-[10px] text-[#5C3D2E]/30 mt-1">Recebido em {fmt(r.createdAt)}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <select
                    value={r.status}
                    onChange={(e) => handleStatus(r.id, e.target.value)}
                    disabled={updating === r.id}
                    className="text-xs border border-pink-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-[#E5A4CB] disabled:opacity-50"
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <a
                    href={`https://wa.me/55${r.tutorPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá ${r.tutorName}! Recebemos sua solicitação de reserva para ${r.petName}. `)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    WhatsApp
                  </a>
                  <button onClick={() => handleDelete(r.id)} className="p-1.5 text-[#5C3D2E]/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
