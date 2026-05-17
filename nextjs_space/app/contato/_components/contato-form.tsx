"use client";
import { useState } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { Send, CheckCircle, AlertCircle, Dog, Cat, Bird, Fish, Loader2 } from "lucide-react";
import { toast } from "sonner";

const speciesOptions = [
  { value: "cachorro", label: "Cachorro", icon: Dog },
  { value: "gato", label: "Gato", icon: Cat },
  { value: "ave", label: "Ave", icon: Bird },
  { value: "peixe", label: "Peixe", icon: Fish },
  { value: "roedor", label: "Roedor", icon: Dog },
  { value: "outro", label: "Outro", icon: Dog },
];

export function ContatoForm() {
  const [form, setForm] = useState({
    tutorName: "",
    tutorEmail: "",
    tutorPhone: "",
    petName: "",
    petSpecies: "cachorro",
    petBreed: "",
    startDate: "",
    endDate: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e?.target ?? {};
    setForm((prev: any) => ({ ...(prev ?? {}), [name ?? ""]: value ?? "" }));
  };

  const handleSubmit = async (e: any) => {
    e?.preventDefault?.();
    if (!form?.tutorName || !form?.tutorEmail || !form?.tutorPhone || !form?.petName || !form?.startDate || !form?.endDate) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res?.ok) {
        setSuccess(true);
        toast.success("Solicitação enviada com sucesso!");
      } else {
        toast.error("Erro ao enviar. Tente novamente.");
      }
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AnimatedSection>
        <div className="bg-green-50 rounded-xl p-8 text-center shadow-md">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-display font-bold text-[#5C3D2E] text-xl">Solicitação Enviada!</h3>
          <p className="text-[#5C3D2E]/60 mt-2">Recebemos sua solicitação de reserva. Entraremos em contato em breve pelo WhatsApp ou e-mail.</p>
          <button onClick={() => { setSuccess(false); setForm({ tutorName: "", tutorEmail: "", tutorPhone: "", petName: "", petSpecies: "cachorro", petBreed: "", startDate: "", endDate: "", message: "" }); }} className="mt-4 bg-[#E5A4CB] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#d48dba] transition-colors">
            Nova Solicitação
          </button>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection>
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="font-display font-bold text-[#5C3D2E] text-2xl mb-6">Solicitar Orçamento / Reserva</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Nome do Tutor *</label>
              <input name="tutorName" value={form?.tutorName ?? ""} onChange={handleChange} required className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] focus:border-transparent" placeholder="Seu nome completo" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">E-mail *</label>
              <input name="tutorEmail" type="email" value={form?.tutorEmail ?? ""} onChange={handleChange} required className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] focus:border-transparent" placeholder="seu@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Telefone / WhatsApp *</label>
            <input name="tutorPhone" value={form?.tutorPhone ?? ""} onChange={handleChange} required className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] focus:border-transparent" placeholder="(11) 98834-1796" />
          </div>

          <div className="border-t border-pink-100 pt-5">
            <h3 className="font-semibold text-[#5C3D2E] mb-3">Dados do Pet</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Nome do Pet *</label>
                <input name="petName" value={form?.petName ?? ""} onChange={handleChange} required className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] focus:border-transparent" placeholder="Nome do pet" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Espécie *</label>
                <select name="petSpecies" value={form?.petSpecies ?? "cachorro"} onChange={handleChange} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] focus:border-transparent bg-white">
                  {speciesOptions?.map((opt: any) => (
                    <option key={opt?.value} value={opt?.value ?? ""}>{opt?.label ?? ""}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Raça</label>
                <input name="petBreed" value={form?.petBreed ?? ""} onChange={handleChange} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] focus:border-transparent" placeholder="Raça (opcional)" />
              </div>
            </div>
          </div>

          <div className="border-t border-pink-100 pt-5">
            <h3 className="font-semibold text-[#5C3D2E] mb-3">Período de Hospedagem</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Data de Entrada *</label>
                <input name="startDate" type="date" value={form?.startDate ?? ""} onChange={handleChange} required className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Data de Saída *</label>
                <input name="endDate" type="date" value={form?.endDate ?? ""} onChange={handleChange} required className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] focus:border-transparent" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Mensagem / Observações</label>
            <textarea name="message" value={form?.message ?? ""} onChange={handleChange} rows={4} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] focus:border-transparent resize-none" placeholder="Alguma informação especial sobre seu pet? (medicamentos, dieta, comportamento...)" />
          </div>

          <p className="text-xs text-[#5C3D2E]/40">Seus dados serão utilizados apenas para contato sobre a reserva.</p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E5A4CB] hover:bg-[#d48dba] disabled:opacity-50 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {loading ? "Enviando..." : "Enviar Solicitação"}
          </button>
        </form>
      </div>
    </AnimatedSection>
  );
}
