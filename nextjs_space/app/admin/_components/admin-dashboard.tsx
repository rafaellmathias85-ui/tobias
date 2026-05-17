"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, LogOut, BookOpen, ImageIcon, Loader2, Save, X, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  imageUrl: string | null;
  published: boolean;
  authorName: string;
  createdAt: string;
}

export function AdminDashboard() {
  const { data: session } = useSession() || {};
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", excerpt: "", imageUrl: "", published: true });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res?.json?.();
      setPosts(data ?? []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

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
      const { uploadUrl, cloud_storage_path } = await presignRes?.json?.() ?? {};
      if (!uploadUrl) throw new Error("No upload URL");

      const headers: Record<string, string> = { "Content-Type": file.type };
      const urlParams = new URLSearchParams(uploadUrl?.split?.('?')?.[1] ?? "");
      const signedHeaders = urlParams?.get?.("X-Amz-SignedHeaders") ?? "";
      if (signedHeaders?.includes?.("content-disposition")) {
        headers["Content-Disposition"] = "attachment";
      }

      await fetch(uploadUrl, { method: "PUT", headers, body: file });

      const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME ?? "";
      const region = process.env.NEXT_PUBLIC_AWS_REGION ?? "us-east-1";
      const publicUrl = `https://i.ytimg.com/vi/TtuCCfren_I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC6GPKwN8mlVFsJ34TqLdv7Wss7cQ`;
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
    if (!form?.title || !form?.content) { toast.error("Título e conteúdo são obrigatórios"); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/blog/${editing.id}` : "/api/blog";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res?.ok) {
        toast.success(editing ? "Post atualizado!" : "Post criado!");
        setEditing(null);
        setCreating(false);
        setForm({ title: "", content: "", excerpt: "", imageUrl: "", published: true });
        fetchPosts();
      } else {
        toast.error("Erro ao salvar");
      }
    } catch { toast.error("Erro ao salvar"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res?.ok) { toast.success("Post excluído"); fetchPosts(); }
    } catch { toast.error("Erro ao excluir"); }
  };

  const startEdit = (post: BlogPost) => {
    setEditing(post);
    setCreating(false);
    setForm({ title: post?.title ?? "", content: post?.content ?? "", excerpt: post?.excerpt ?? "", imageUrl: post?.imageUrl ?? "", published: post?.published ?? true });
  };

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm({ title: "", content: "", excerpt: "", imageUrl: "", published: true });
  };

  const cancelEdit = () => {
    setEditing(null);
    setCreating(false);
    setForm({ title: "", content: "", excerpt: "", imageUrl: "", published: true });
  };

  return (
    <div className="min-h-screen bg-pink-50/30">
      <header className="bg-white border-b border-pink-100 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain rounded-full" />
            </div>
            <div>
              <h1 className="font-display font-bold text-[#5C3D2E]">Painel Admin</h1>
              <p className="text-xs text-[#5C3D2E]/50">{session?.user?.email ?? ""}</p>
            </div>
          </div>
          <button onClick={() => signOut?.({ callbackUrl: "/" })} className="flex items-center gap-2 text-sm text-[#5C3D2E]/70 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-[#5C3D2E] text-2xl flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#E5A4CB]" /> Posts do Blog
          </h2>
          {!creating && !editing && (
            <button onClick={startCreate} className="bg-[#E5A4CB] hover:bg-[#d48dba] text-white font-semibold px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-colors">
              <Plus className="w-4 h-4" /> Novo Post
            </button>
          )}
        </div>

        {(creating || editing) && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-[#5C3D2E] text-lg">{editing ? "Editar Post" : "Novo Post"}</h3>
              <button onClick={cancelEdit} className="text-[#5C3D2E]/50 hover:text-[#5C3D2E]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Título *</label>
                <input value={form?.title ?? ""} onChange={(e: any) => setForm((p: any) => ({ ...(p ?? {}), title: e?.target?.value ?? "" }))} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="Título do post" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Resumo</label>
                <input value={form?.excerpt ?? ""} onChange={(e: any) => setForm((p: any) => ({ ...(p ?? {}), excerpt: e?.target?.value ?? "" }))} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="Breve resumo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Conteúdo *</label>
                <textarea value={form?.content ?? ""} onChange={(e: any) => setForm((p: any) => ({ ...(p ?? {}), content: e?.target?.value ?? "" }))} rows={10} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] resize-none" placeholder="Conteúdo do post..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Imagem</label>
                <div className="flex gap-3 items-center">
                  <input value={form?.imageUrl ?? ""} onChange={(e: any) => setForm((p: any) => ({ ...(p ?? {}), imageUrl: e?.target?.value ?? "" }))} className="flex-1 border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="URL da imagem ou faça upload" />
                  <label className="bg-pink-50 hover:bg-pink-100 text-[#5C3D2E] px-4 py-2.5 rounded-lg cursor-pointer text-sm font-medium flex items-center gap-1.5 transition-colors">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                    Upload
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
                {form?.imageUrl && (
                  <div className="relative aspect-video w-48 mt-3 rounded-lg overflow-hidden bg-pink-50">
                    <Image src={form.imageUrl} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setForm((p: any) => ({ ...(p ?? {}), published: !(p?.published ?? true) }))} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${form?.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                  {form?.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {form?.published ? "Publicado" : "Rascunho"}
                </button>
              </div>
              <button onClick={handleSave} disabled={saving} className="bg-[#E5A4CB] hover:bg-[#d48dba] disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#E5A4CB] mx-auto" /></div>
        ) : (posts ?? [])?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <BookOpen className="w-12 h-12 text-[#E5A4CB]/30 mx-auto mb-3" />
            <p className="text-[#5C3D2E]/50">Nenhum post ainda. Crie o primeiro!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(posts ?? [])?.map((post: BlogPost) => (
              <div key={post?.id} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
                {post?.imageUrl && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-pink-50 flex-shrink-0">
                    <Image src={post.imageUrl} alt={post?.title ?? ""} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#5C3D2E] truncate">{post?.title ?? ""}</h4>
                  <p className="text-xs text-[#5C3D2E]/50 mt-1 truncate">{post?.excerpt ?? ""}</p>
                  <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${post?.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {post?.published ? "Publicado" : "Rascunho"}
                  </span>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(post)} className="p-2 text-[#5C3D2E]/50 hover:text-[#E5A4CB] hover:bg-pink-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(post?.id ?? "")} className="p-2 text-[#5C3D2E]/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
