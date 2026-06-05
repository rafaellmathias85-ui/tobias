"use client";
import { useState } from "react";
import Image from "next/image";
import { LogOut, BookOpen, ImageIcon, LayoutDashboard, ClipboardList, Settings } from "lucide-react";
import { BlogManager } from "./blog-manager";
import { GalleryManager } from "./gallery-manager";
import { ReservasManager } from "./reservas-manager";
import { GithubSettings } from "./github-settings";

type Tab = "blog" | "galeria" | "reservas" | "config";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("blog");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "blog",     label: "Blog",           icon: <BookOpen className="w-4 h-4" /> },
    { id: "galeria",  label: "Galeria",         icon: <ImageIcon className="w-4 h-4" /> },
    { id: "reservas", label: "Reservas",        icon: <ClipboardList className="w-4 h-4" /> },
    { id: "config",   label: "Configurações",   icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-pink-50/30">
      <header className="bg-white border-b border-pink-100 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <h1 className="font-display font-bold text-[#5C3D2E] flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-[#E5A4CB]" />
                Painel Administrativo
              </h1>
              <p className="text-xs text-[#5C3D2E]/50">Turma do Tobias</p>
            </div>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_authed");
              window.location.href = "/admin/login/";
            }}
            className="flex items-center gap-2 text-sm text-[#5C3D2E]/70 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <div className="bg-white border-b border-pink-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#E5A4CB] text-[#E5A4CB]"
                    : "border-transparent text-[#5C3D2E]/60 hover:text-[#5C3D2E] hover:border-pink-200"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {activeTab === "blog"     && <BlogManager />}
        {activeTab === "galeria"  && <GalleryManager />}
        {activeTab === "reservas" && <ReservasManager />}
        {activeTab === "config"   && <GithubSettings />}
      </div>
    </div>
  );
}
