import { Suspense } from "react";
import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata = {
  title: "Redefinir Senha | Turma do Tobias",
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-orange-50 p-4">
      <Suspense fallback={<div className="text-[#5C3D2E]/50">Carregando...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
