import { ForgotPasswordForm } from "./_components/forgot-password-form";

export const metadata = {
  title: "Recuperar Senha | Turma do Tobias",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-orange-50 p-4">
      <ForgotPasswordForm />
    </div>
  );
}
