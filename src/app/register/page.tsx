import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthPage } from "@/components/auth/AuthPage";
import { LoadingState } from "@/components/ui/AppState";

export const metadata: Metadata = {
  title: "Daftar | EcoGrow Learning",
  description: "Daftar akun EcoGrow Learning sebagai Guru atau Peserta Didik.",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingState title="Memuat halaman daftar" description="Menyiapkan form akun EcoGrow." />}>
      <AuthPage mode="register" />
    </Suspense>
  );
}
