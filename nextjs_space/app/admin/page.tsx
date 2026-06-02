import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminDashboard } from "./_components/admin-dashboard";


export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");

  return <AdminDashboard />;
}
