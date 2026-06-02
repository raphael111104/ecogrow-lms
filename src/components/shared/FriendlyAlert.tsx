import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type FriendlyAlertProps = {
  tone?: "success" | "info" | "warning";
  title: string;
  description?: string;
  className?: string;
};

const tones = {
  success: {
    icon: CheckCircle2,
    classes: "border-leaf-500/20 bg-leaf-50 text-leaf-700",
  },
  info: {
    icon: Info,
    classes: "border-sky/20 bg-sky/10 text-slateText",
  },
  warning: {
    icon: AlertCircle,
    classes: "border-sun/35 bg-cream text-earth",
  },
};

export function FriendlyAlert({
  tone = "info",
  title,
  description,
  className,
}: FriendlyAlertProps) {
  const { icon: Icon, classes } = tones[tone];

  return (
    <div className={cn("flex gap-3 rounded-2xl border p-4", classes, className)} role="status">
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-extrabold">{title}</p>
        {description ? <p className="mt-1 text-sm font-semibold leading-6 opacity-85">{description}</p> : null}
      </div>
    </div>
  );
}
