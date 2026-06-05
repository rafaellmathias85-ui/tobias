"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, BookOpen, Loader2, Save, X, Eye, EyeOff, AlertCircle, GitCommit } from "lucide-react";
import { toast } from "sonner";
import { readGithubFile, writeGithubFile, BLOG_PATH, getStoredPat } from "@/lib/github-content";

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

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", excerpt: "", imageUrl: "", published: true });
  const [saving, setSaving] = useState(false);
  const [pat, setPat] = useState("");

  useEffect(() => { setPat(getStoredPat()); }, []);

  const fetchPosts = useCallback(async () => {
    const token = getStoredPat();
    setPat(token);
    if (!token) { setLoading(false); return; }
    try {
      const { content, sha: fileSha } = await readGithubFile(BLOG_PATH, token);
      setPosts(content ?? []);
      setSha(fileSha);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao carregar posts";
      toast.error(msg);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleSave = async () => {
    if (!form.title || !form.content) { toast.error("Título e conteúdo são obrigatórios"); return; }
    const token = getStoredPat();
    if (!token) { toast.error("Configure o token do GitHub nas Configurações"); return; }
    setSaving(true);
    try {
      let updatedPosts: BlogPost[];
      if (editing) {
        updatedPosts = posts.map((p) =>
          p.id === editing.id ? { ...editing, ...form, slug: generateSlug(form.title) } : p
        );
      } else {
        const newPost: BlogPost = {
          id: `p${Date.now()}`,
          slug: generateSlug(form.title),
          authorName: "Turma do Tobias",
          createdAt: new Date().toISOString(),
          ...form,
        };
        updatedPosts = [newPost, ...posts];
      }
      await writeGithubFile(BLOG_PATH, updatedPosts, sha, token, `content: ${editing ? "atualiza" : "adiciona"} post "${form.title}"`);
      toast.success(
        <span className="flex items-center gap-2">
          <GitCommit className="w-4 h-4" />
          {editing ? "Post atualizado!" : "Post criado!"} Site atualiza em ~3 min.
        </span>
      );
      setPosts(updatedPosts);
      setEditing(null);
      setCreating(false);
      setForm({ title: "", content: "", excerpt: "", imageUrl: "", published: true });
      await fetchPosts();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao salvar";
      toast.error(msg);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este post?")) return;
    const token = getStoredPat();
    if (!token) { toast.error("Configure o token do GitHub nas Configurações"); return; }
    try {
      const updatedPosts = posts.filter((p) => p.id !== id);
      await writeGithubFile(BLOG_PATH, updatedPosts, sha, token, "content: remove post do blog");
      toast.success("Post excluído. Site atualiza em ~3 min.");
      setPosts(updatedPosts);
      await fetchPosts();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao excluir";
      toast.error(msg);
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditing(post);
    setCreating(false);
    setForm({ title: post.title, content: post.content, excerpt: post.excerpt ?? "", imageUrl: post.imageUrl ?? "", published: post.published });
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

  if (!pat) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-800">Token do GitHub não configurado</p>
          <p className="text-sm text-amber-700 mt-1">Vá em <strong>Configurações</strong> e insira seu token do GitHub para gerenciar o blog.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-[#5C3D2E] text-2xl flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#E5A4CB]" /> Gerenciar Blog
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
              <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="Título do post" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Resumo</label>
              <input value={form.excerpt} onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="Breve resumo exibido na listagem" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">Conteúdo *</label>
              <textarea value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} rows={10} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB] resize-none" placeholder="Conteúdo do post..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C3D2E] mb-1">URL da Imagem</label>
              <input value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} className="w-full border border-pink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5A4CB]" placeholder="/images/nome-da-imagem.jpg ou https://..." />
              {form.imageUrl && (
                <div className="relative aspect-video w-48 mt-3 rounded-lg overflow-hidden bg-pink-50">
                  <Image src={form.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setForm((p) => ({ ...p, published: !p.published }))} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${form.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {form.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {form.published ? "Publicado" : "Rascunho"}
              </button>
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
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <BookOpen className="w-12 h-12 text-[#E5A4CB]/30 mx-auto mb-3" />
          <p className="text-[#5C3D2E]/50">Nenhum post ainda. Crie o primeiro!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
              {post.imageUrl && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-pink-50 flex-shrink-0">
                  <Image src={post.imageUrl} alt={post.title} fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#5C3D2E] truncate">{post.title}</h4>
                <p className="text-xs text-[#5C3D2E]/50 mt-1 truncate">{post.excerpt ?? ""}</p>
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                  {post.published ? "Publicado" : "Rascunho"}
                </span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(post)} className="p-2 text-[#5C3D2E]/50 hover:text-[#E5A4CB] hover:bg-pink-50 rounded-lg transition-colors" title="Editar">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(post.id)} className="p-2 text-[#5C3D2E]/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
