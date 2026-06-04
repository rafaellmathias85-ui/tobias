"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "./_components/admin-dashboard";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const { status } = useSession() || {};
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  if (status === "authenticated") return <AdminDashboard />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      <Loader2 className="w-8 h-8 animate-spin text-[#E5A4CB]" />
    </div>
  );
}
