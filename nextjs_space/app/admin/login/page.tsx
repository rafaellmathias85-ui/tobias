import { AdminLoginForm } from "./_components/admin-login-form";

export const metadata = { title: "Admin Login | Turma do Tobias" };

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white p-4">
      <AdminLoginForm />
    </div>
  );
}
