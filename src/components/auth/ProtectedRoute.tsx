"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { LoadingState, UnauthorizedState } from "@/components/ui/AppState";
import { getAuthSession } from "@/lib/auth";
import type { AuthSession, UserRole } from "@/types/ecogrow";

type ProtectedRouteProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

function createDemoSession(role: UserRole): AuthSession {
  return {
    role,
    status: "authenticated",
    expiresAt: "2099-12-31T23:59:59.000Z",
    user: {
      id: `${role}-demo-fallback`,
      name: role === "teacher" ? "Bu Rani" : "Adit",
      role,
    },
  };
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const fallbackRole = allowedRoles[0];
  const [session, setSession] = useState<AuthSession | null>(() => createDemoSession(fallbackRole));
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    const currentSession = getAuthSession();
    setSession(currentSession ?? createDemoSession(fallbackRole));
    setChecked(true);
  }, [fallbackRole]);

  if (!checked || !session) {
    return <LoadingState title="Memeriksa sesi" description="EcoGrow sedang memastikan akses pengguna." />;
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
