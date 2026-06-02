import type { UserRole } from "@/types/ecogrow";
import { clearAuthSession, setDemoRole } from "./auth";

export function setMockRole(role: UserRole) {
  setDemoRole(role);
}

export function clearMockRole() {
  clearAuthSession();
}
