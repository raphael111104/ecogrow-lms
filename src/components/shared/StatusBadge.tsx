import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Circle, Clock, LockKeyhole, Send } from "lucide-react";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { cn } from "@/lib/utils";

type StatusTone = "success" | "warning" | "danger" | "info" | "locked" | "neutral";

const toneClass: Record<StatusTone, string> = {
  success: "bg-leaf-100 text-leaf-700",
  warning: "bg-sun/25 text-earth",
  danger: "bg-red-50 text-red-700",
  info: "bg-sky/15 text-sky",
  locked: "bg-slate-100 text-slate-500",
  neutral: "bg-white text-mutedText",
};

const statusMap: Record<string, { label: string; tone: StatusTone; icon: ReactNode }> = {
  locked: { label: "Terkunci", tone: "locked", icon: <LockKeyhole className="size-3.5" /> },
  active: { label: "Aktif", tone: "info", icon: <Clock className="size-3.5" /> },
  not_started: { label: "Belum mulai", tone: "neutral", icon: <Circle className="size-3.5" /> },
  in_progress: { label: "Sedang dikerjakan", tone: "info", icon: <Clock className="size-3.5" /> },
  waiting_feedback: { label: "Menunggu Bu Guru", tone: "warning", icon: <Clock className="size-3.5" /> },
  draft: { label: "Draft", tone: "neutral", icon: <Clock className="size-3.5" /> },
  submitted: { label: "Terkirim", tone: "warning", icon: <Send className="size-3.5" /> },
  reviewed: { label: "Sudah direview", tone: "success", icon: <CheckCircle2 className="size-3.5" /> },
  completed: { label: "Selesai", tone: "success", icon: <CheckCircle2 className="size-3.5" /> },
  pending: { label: "Menunggu review", tone: "warning", icon: <Clock className="size-3.5" /> },
  approved: { label: "Disetujui", tone: "success", icon: <CheckCircle2 className="size-3.5" /> },
  needs_revision: { label: "Perlu revisi", tone: "danger", icon: <AlertTriangle className="size-3.5" /> },
  revision: { label: "Perlu revisi", tone: "danger", icon: <AlertTriangle className="size-3.5" /> },
};

type StatusBadgeProps = {
  status: string;
  label?: string;
  className?: string;
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusMap[status] ?? {
    label: label ?? status.replaceAll("_", " "),
    tone: "neutral" as const,
    icon: null,
  };

  return (
    <EcoBadge className={cn(toneClass[config.tone], className)} icon={config.icon}>
      {label ?? config.label}
    </EcoBadge>
  );
}
