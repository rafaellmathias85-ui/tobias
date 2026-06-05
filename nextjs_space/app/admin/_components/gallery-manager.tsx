"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, ImageIcon, Loader2, Save, X, Camera, AlertCircle, GitCommit } from "lucide-react";
import { toast } from "sonner";
import { readGithubFile, writeGithubFile, GALLERY_PATH, getStoredPat } from "@/lib/github-content";

interface GalleryImage {
  id: string;
  imageUrl: string;
  caption: string | null;
  category: string;
  createdAt: string;
}

const CATEGORIES = ["geral", "cães", "gatos", "brincadeiras", "cuidados", "ambiente", "tutores"];

export function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ imageUrl: "", caption: "", category: "geral" });
  const [saving, setSaving] = useState(false);
  const [pat, setPat] = useState("");

  useEffect(() => { setPat(getStoredPat()); }, []);

  const fetchImages = useCallback(async () => {
    const token = getStoredPat();
    setPat(token);
    if (!token) { setLoading(false); return; }
    try {
      const { content, sha: fileSha } = await readGithubFile(GALLERY_PATH, token);
      setImages(content ?? []);
      setSha(fileSha);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao carregar galeria";
      toast.error(msg);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const handleSave = async () => {
    if (!form.imageUrl) { toast.error("URL da imagem é obrigatória"); return; }
    const token = getStoredPat();
    if (!token) { toast.error("Configure o token do GitHub nas Configurações"); return; }
    setSaving(true);
    try {
      let updatedImages: GalleryImage[];
      if (editing) {
        updatedImages = images.map((img) =>
          img.id === editing.id ? { ...editing, ...form } : img
        );
      } else {
        const newImage: GalleryImage = {
          id: `img${Date.now()}`,
          createdAt: new Date().toISOString(),
          ...form,
        };
        updatedImages = [newImage, ...images];
      }
      await writeGithubFile(GALLERY_PATH, updatedImages, sha, token, `content: ${editing ? "atualiza" : "adiciona"} foto na galeria`);
      toast.success(
        <span className="flex items-center gap-2">
          <GitCommit className="w-4 h-4" />
          {editing ? "Foto atualizada!" : "Foto adicionada!"} Site atualiza em ~3 min.
        </span>
      );
      setImages(updatedImages);
      setEditing(null);
      setCreating(false);
      setForm({ imageUrl: "", caption: "", category: "geral" });
      await fetchImages();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao salvar";
      toast.error(msg);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta foto?")) return;
    const token = getStoredPat();
    if (!token) { toast.error("Configure o token do GitHub nas Configurações"); return; }
    try {
      const updatedImages = images.filter((img) => img.id !== id);
      await writeGithubFile(GALLERY_PATH, updatedImages, sha, token, "content: remove foto da galeria");
      toast.success("Foto excluída. Site atualiza em ~3 min.");
      setImages(updatedImages);
      await fetchImages();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao excluir";
      toast.error(msg);
    }
  };

  const startEdit = (image: GalleryImage) => {
    setEditing(image);
    setCreating(false);
    setForm({ imageUrl: image.imageUrl, caption: image.caption ?? "", category: image.category });
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

  if (!pat) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-800">Token do GitHub não configurado</p>
          <p className="text-sm text-amber-700 mt-1">Vá em <strong>Configurações</strong> e insira seu token do GitHub para gerenciar a galeria.</p>
        </div>
      </div>
    );
  }

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

      {(creating || editing) && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-[#5C3D2E] text-lg">{editing ? "Editar Foto" : "Nova Foto"}</h3>
            <button onClick={cancelEdit} className="text-[#5C3D2E]/50 hover:text-[#5C3D2E]"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">URL da Imagem *</label>
              <input value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="/images/nome.jpg ou https://..." />
              {form.imageUrl && (
                <div className="relative aspect-square w-40 mt-3 rounded-lg overflow-hidden bg-pink-50">
                  <Image src={form.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Legenda</label>
              <input value={form.caption} onChange={(e) => setForm((p) => ({ ...p, caption: e.target.value }))} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="Descrição da foto" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Categoria</label>
              <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] bg-white">
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
            <button onClick={handleSave} disabled={saving} className="bg-[#E5A4CB] hover:bg-[#d48dba] disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Salvando no GitHub..." : "Salvar"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#E5A4CB] mx-auto" /></div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <ImageIcon className="w-12 h-12 text-[#E5A4CB]/30 mx-auto mb-3" />
          <p className="text-[#5C3D2E]/50">Nenhuma foto na galeria. Adicione a primeira!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image src={img.imageUrl} alt={img.caption ?? "Foto da galeria"} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => startEdit(img)} className="p-2 bg-white/90 rounded-lg text-[#5C3D2E] hover:bg-white transition-colors" title="Editar">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(img.id)} className="p-2 bg-white/90 rounded-lg text-red-500 hover:bg-white transition-colors" title="Excluir">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-[#5C3D2E] truncate font-medium">{img.caption || "Sem legenda"}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-pink-50 text-[#E5A4CB] font-medium">
                  {img.category.charAt(0).toUpperCase() + img.category.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
