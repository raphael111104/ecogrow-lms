import type { AuthSession, UserRole } from "@/types/ecogrow";

const ROLE_STORAGE_KEY = "ecogrow-role";
const SESSION_STORAGE_KEY = "ecogrow-auth-session";

let memorySession: AuthSession | null = null;

function getBrowserStorage() {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") return null;
  return window.localStorage;
}

export type AuthFailureReason =
  | "invalid_email"
  | "invalid_password"
  | "not_found"
  | "wrong_password"
  | "role_mismatch"
  | "inactive_account"
  | "unauthorized"
  | "session_expired";

export type AuthFormState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; session: AuthSession }
  | { status: "error"; reason: AuthFailureReason; message: string };

export type AuthMode = "login" | "register";

type AuthRequest = {
  mode: AuthMode;
  role: UserRole;
  email: string;
  password: string;
  name?: string;
};

const roleLabels: Record<UserRole, string> = {
  teacher: "Guru",
  student: "Peserta Didik",
};

const roleRoutes: Record<UserRole, string> = {
  teacher: "/guru",
  student: "/siswa",
};

export function getRoleLabel(role: UserRole) {
  return roleLabels[role];
}

export function getRoleHome(role: UserRole) {
  return roleRoutes[role];
}

export function setAuthSession(session: AuthSession) {
  memorySession = session;
  const storage = getBrowserStorage();
  if (!storage) return;
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  storage.setItem(ROLE_STORAGE_KEY, session.role);
}

export function getAuthSession(): AuthSession | null {
  const storage = getBrowserStorage();
  if (!storage) {
    if (!memorySession) return null;
    if (new Date(memorySession.expiresAt).getTime() <= Date.now()) {
      memorySession = null;
      return null;
    }
    return memorySession;
  }

  const rawSession = storage.getItem(SESSION_STORAGE_KEY);
  if (!rawSession) return null;

  try {
    const session = JSON.parse(rawSession) as AuthSession;
    if (!session.expiresAt || new Date(session.expiresAt).getTime() <= Date.now()) {
      clearAuthSession();
      return null;
    }

    return session;
  } catch {
    clearAuthSession();
    return null;
  }
}

export function clearAuthSession() {
  memorySession = null;
  const storage = getBrowserStorage();
  if (!storage) return;
  storage.removeItem(SESSION_STORAGE_KEY);
  storage.removeItem(ROLE_STORAGE_KEY);
}

export function setDemoRole(role: UserRole) {
  const session: AuthSession = {
    role,
    status: "authenticated",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    user: {
      id: `${role}-demo`,
      name: role === "teacher" ? "Bu Rani" : "Adit",
      role,
    },
  };

  setAuthSession(session);
  return session;
}

export async function authenticate(request: AuthRequest): Promise<AuthFormState> {
  const email = request.email.trim().toLowerCase();
  const password = request.password.trim();

  await new Promise((resolve) => setTimeout(resolve, 450));

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      reason: "invalid_email",
      message: "Gunakan format email yang valid.",
    };
  }

  if (password.length < 8) {
    return {
      status: "error",
      reason: "invalid_password",
      message: "Password minimal 8 karakter.",
    };
  }

  if (email.includes("tidakada")) {
    return {
      status: "error",
      reason: "not_found",
      message: "Akun tidak ditemukan. Periksa email atau daftar akun baru.",
    };
  }

  if (email.includes("nonaktif")) {
    return {
      status: "error",
      reason: "inactive_account",
      message: "Akun belum aktif. Hubungi guru atau pengelola sekolah untuk aktivasi.",
    };
  }

  if (email.includes("salah-role")) {
    return {
      status: "error",
      reason: "role_mismatch",
      message: `Akun ini tidak terdaftar sebagai ${roleLabels[request.role]}.`,
    };
  }

  if (password.toLowerCase() === "password-salah") {
    return {
      status: "error",
      reason: "wrong_password",
      message: "Password salah. Coba lagi atau gunakan lupa password.",
    };
  }

  const session: AuthSession = {
    role: request.role,
    status: "authenticated",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    user: {
      id: `${request.role}-${email}`,
      name: request.name?.trim() || roleLabels[request.role],
      role: request.role,
    },
  };

  setAuthSession(session);

  return { status: "success", session };
}
