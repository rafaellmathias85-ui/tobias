"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, ImageIcon, Loader2, Save, X, Camera } from "lucide-react";
import { toast } from "sonner";

interface GalleryImage {
  id: string;
  imageUrl: string;
  caption: string | null;
  category: string;
  createdAt: string;
}

const CATEGORIES = ["geral", "cães", "gatos", "hospedagem", "passeios", "eventos"];

export function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ imageUrl: "", caption: "", category: "geral" });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res?.json?.();
      setImages(data ?? []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const handleImageUpload = async (e: any) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const presignRes = await fetch("/api/upload/presigned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, contentType: file.type, isPublic: true }),
      });
      const presignData = await presignRes?.json?.() ?? {};
      const { uploadUrl, cloud_storage_path } = presignData;
      if (!uploadUrl) throw new Error("No upload URL");

      const headers: Record<string, string> = { "Content-Type": file.type };
      const urlParams = new URLSearchParams(uploadUrl?.split?.('?')?.[1] ?? "");
      const signedHeaders = urlParams?.get?.("X-Amz-SignedHeaders") ?? "";
      if (signedHeaders?.includes?.("content-disposition")) {
        headers["Content-Disposition"] = "attachment";
      }

      await fetch(uploadUrl, { method: "PUT", headers, body: file });

      const fileRes = await fetch("/api/upload/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cloud_storage_path, isPublic: true }),
      });
      const fileData = await fileRes?.json?.() ?? {};
      const publicUrl = fileData?.url ?? "";
      setForm((prev: any) => ({ ...(prev ?? {}), imageUrl: publicUrl }));
      toast.success("Imagem enviada!");
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao enviar imagem");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form?.imageUrl) { toast.error("URL da imagem é obrigatória"); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/gallery/${editing.id}` : "/api/gallery";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res?.ok) {
        toast.success(editing ? "Imagem atualizada!" : "Imagem adicionada!");
        setEditing(null);
        setCreating(false);
        setForm({ imageUrl: "", caption: "", category: "geral" });
        fetchImages();
      } else {
        toast.error("Erro ao salvar");
      }
    } catch { toast.error("Erro ao salvar"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta imagem?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res?.ok) { toast.success("Imagem excluída"); fetchImages(); }
    } catch { toast.error("Erro ao excluir"); }
  };

  const startEdit = (image: GalleryImage) => {
    setEditing(image);
    setCreating(false);
    setForm({ imageUrl: image?.imageUrl ?? "", caption: image?.caption ?? "", category: image?.category ?? "geral" });
  };

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm({ imageUrl: "", caption: "", category: "geral" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setCreating(false);
    setForm({ imageUrl: "", caption: "", category: "geral" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-[#5C3D2E] text-2xl flex items-center gap-2">
          <Camera className="w-6 h-6 text-[#E5A4CB]" /> Gerenciar Galeria
        </h2>
        {!creating && !editing && (
          <button onClick={startCreate} className="bg-[#E5A4CB] hover:bg-[#d48dba] text-white font-semibold px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-colors">
            <Plus className="w-4 h-4" /> Nova Foto
          </button>
        )}
      </div>

      {/* Form */}
      {(creating || editing) && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-[#5C3D2E] text-lg">{editing ? "Editar Foto" : "Nova Foto"}</h3>
            <button onClick={cancelEdit} className="text-[#5C3D2E]/50 hover:text-[#5C3D2E]"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Imagem *</label>
              <div className="flex gap-3 items-center">
                <input value={form?.imageUrl ?? ""} onChange={(e: any) => setForm((p: any) => ({ ...(p ?? {}), imageUrl: e?.target?.value ?? "" }))} className="flex-1 border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="URL da imagem ou faça upload" />
                <label className="bg-pink-50 hover:bg-pink-100 text-[#5C3D2E] px-4 py-2.5 rounded-lg cursor-pointer text-sm font-medium flex items-center gap-1.5 transition-colors">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                  Upload
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
              {form?.imageUrl && (
                <div className="relative aspect-square w-40 mt-3 rounded-lg overflow-hidden bg-pink-50">
                  <Image src={form.imageUrl} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Legenda</label>
              <input value={form?.caption ?? ""} onChange={(e: any) => setForm((p: any) => ({ ...(p ?? {}), caption: e?.target?.value ?? "" }))} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="Descrição da foto" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Categoria</label>
              <select
                value={form?.category ?? "geral"}
                onChange={(e: any) => setForm((p: any) => ({ ...(p ?? {}), category: e?.target?.value ?? "geral" }))}
                className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
            <button onClick={handleSave} disabled={saving} className="bg-[#E5A4CB] hover:bg-[#d48dba] disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#E5A4CB] mx-auto" /></div>
      ) : (images ?? [])?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <ImageIcon className="w-12 h-12 text-[#E5A4CB]/30 mx-auto mb-3" />
          <p className="text-[#5C3D2E]/50">Nenhuma foto na galeria. Adicione a primeira!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {(images ?? [])?.map((img: GalleryImage) => (
            <div key={img?.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image src={img?.imageUrl ?? ""} alt={img?.caption ?? "Foto da galeria"} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => startEdit(img)} className="p-2 bg-white/90 rounded-lg text-[#5C3D2E] hover:bg-white transition-colors" title="Editar">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(img?.id ?? "")} className="p-2 bg-white/90 rounded-lg text-red-500 hover:bg-white transition-colors" title="Excluir">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-[#5C3D2E] truncate font-medium">{img?.caption || "Sem legenda"}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-pink-50 text-[#E5A4CB] font-medium">
                  {(img?.category ?? "geral").charAt(0).toUpperCase() + (img?.category ?? "geral").slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
