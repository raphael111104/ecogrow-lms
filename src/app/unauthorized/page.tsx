import type { Metadata } from "next";
import { UnauthorizedState } from "@/components/ui/AppState";

export const metadata: Metadata = {
  title: "Akses Ditolak | EcoGrow Learning",
  description: "Halaman akses ditolak EcoGrow Learning.",
};

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-[#f7fbf3] px-4 py-10">
      <UnauthorizedState
        title="Akses ditolak"
        description="Halaman ini hanya dapat dibuka oleh role yang sesuai. Masuk ulang dengan akun Guru atau Peserta Didik yang tepat."
        actionLabel="Masuk Ulang"
        actionHref="/login"
      />
    </main>
  );
}
