"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { siswaNavigation } from "@/data/navigation";

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <AppShell
        role="siswa"
        name="Adit"
        activeClass="Level 3"
        navItems={siswaNavigation}
      >
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
