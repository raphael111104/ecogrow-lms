import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthPage } from "@/components/auth/AuthPage";
import { LoadingState } from "@/components/ui/AppState";

export const metadata: Metadata = {
  title: "Masuk | EcoGrow Learning",
  description: "Masuk ke ruang belajar EcoGrow sebagai Guru atau Peserta Didik.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingState title="Memuat halaman masuk" description="Menyiapkan form autentikasi EcoGrow." />}>
      <AuthPage mode="login" />
    </Suspense>
  );
}
