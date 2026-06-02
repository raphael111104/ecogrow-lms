"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { guruNavigation } from "@/data/navigation";

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AppShell
        role="guru"
        name="Bu Rani"
        activeClass="Kelas 4B"
        navItems={guruNavigation}
      >
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
