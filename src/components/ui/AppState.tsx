import type { ReactNode } from "react";
import { AlertTriangle, Loader2, LockKeyhole, Sprout } from "lucide-react";
import { EcoButton } from "@/components/ui/EcoButton";
import { cn } from "@/lib/utils";

type AppStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

function StateFrame({
  title,
  description,
  actionLabel,
  actionHref,
  className,
  icon,
}: AppStateProps & { icon: ReactNode }) {
  return (
    <section
      className={cn(
        "mx-auto grid min-h-[55vh] w-full max-w-2xl place-items-center px-4 py-12 text-center",
        className,
      )}
    >
      <div className="rounded-[1.35rem] border border-gardenBorder bg-white/[0.9] p-8 shadow-eco backdrop-blur">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
          {icon}
        </div>
        <h1 className="mt-5 font-heading text-3xl font-black text-leaf-700">{title}</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-mutedText">{description}</p>
        {actionLabel && actionHref ? (
          <EcoButton href={actionHref} className="mt-6">
            {actionLabel}
          </EcoButton>
        ) : null}
      </div>
    </section>
  );
}

export function LoadingState({ title = "Memuat EcoGrow", description = "Menyiapkan data belajar terbaru." }: Partial<AppStateProps>) {
  return (
    <StateFrame
      title={title}
      description={description}
      icon={<Loader2 className="size-6 animate-spin" aria-hidden="true" />}
    />
  );
}

export function EmptyState(props: AppStateProps) {
  return <StateFrame {...props} icon={<Sprout className="size-6" aria-hidden="true" />} />;
}

export function ErrorState(props: AppStateProps) {
  return <StateFrame {...props} icon={<AlertTriangle className="size-6" aria-hidden="true" />} />;
}

export function UnauthorizedState({
  title = "Akses belum sesuai",
  description = "Akun yang digunakan tidak memiliki izin untuk membuka halaman ini.",
  actionLabel = "Kembali ke Login",
  actionHref = "/login",
  className,
}: Partial<AppStateProps>) {
  return (
    <StateFrame
      title={title}
      description={description}
      actionLabel={actionLabel}
      actionHref={actionHref}
      className={className}
      icon={<LockKeyhole className="size-6" aria-hidden="true" />}
    />
  );
}
