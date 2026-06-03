"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LoadingState, UnauthorizedState } from "@/components/ui/AppState";
import { getAuthSession } from "@/lib/auth";
import type { AuthSession, UserRole } from "@/types/ecogrow";

type ProtectedRouteProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const pathname = usePathname();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSession(getAuthSession());
    setChecked(true);
  }, []);

  if (!checked) {
    return <LoadingState title="Memeriksa sesi" description="EcoGrow sedang memastikan akses pengguna." />;
  }

  if (!session) {
    return (
      <UnauthorizedState
        description="Silakan masuk sebagai Guru atau Peserta Didik sebelum membuka ruang belajar."
        actionHref={`/login?next=${encodeURIComponent(pathname)}`}
        actionLabel="Masuk EcoGrow"
      />
    );
  }

  if (!allowedRoles.includes(session.role)) {
    return (
      <UnauthorizedState
        description="Role akun aktif tidak sesuai dengan halaman yang dibuka."
        actionHref="/unauthorized"
        actionLabel="Lihat Detail Akses"
      />
    );
  }

  return children;
}
