"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "./_components/admin-dashboard";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const ok = sessionStorage.getItem("admin_authed") === "1";
    if (ok) {
      setAuthed(true);
    } else {
      setAuthed(false);
      router.replace("/admin/login/");
    }
  }, [router]);

  if (authed === true) return <AdminDashboard />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      <Loader2 className="w-8 h-8 animate-spin text-[#E5A4CB]" />
    </div>
  );
}
