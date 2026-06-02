"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sprout,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import { EcoGrowLogo } from "@/components/brand/EcoGrowLogo";
import { EcoButton } from "@/components/ui/EcoButton";
import { authenticate, getRoleHome, setDemoRole, type AuthFormState } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/ecogrow";

type AuthRole = Extract<UserRole, "teacher" | "student">;
type AuthMode = "login" | "register";

type AuthPageProps = {
  mode: AuthMode;
};

const roleContent: Record<
  AuthRole,
  {
    label: string;
    title: string;
    subtitle: string;
    href: string;
    icon: typeof GraduationCap;
    buttonVariant: "primary" | "reward";
  }
> = {
  teacher: {
    label: "Guru",
    title: "Ruang Guru",
    subtitle: "Kelola modul, asesmen, proyek, dan progres kelas.",
    href: "/guru",
    icon: GraduationCap,
    buttonVariant: "primary",
  },
  student: {
    label: "Peserta Didik",
    title: "Ruang Peserta Didik",
    subtitle: "Lanjutkan misi, jurnal, badge, dan portofolio belajar.",
    href: "/siswa",
    icon: Sprout,
    buttonVariant: "reward",
  },
};

const modeContent: Record<
  AuthMode,
  {
    eyebrow: string;
    title: string;
    description: string;
    submitAction: string;
    alternateText: string;
    alternateHref: string;
    alternateLabel: string;
  }
> = {
  login: {
    eyebrow: "Masuk",
    title: "Selamat datang kembali.",
    description: "Gunakan akun EcoGrow untuk melanjutkan aktivitas sesuai role.",
    submitAction: "Masuk",
    alternateText: "Belum punya akun?",
    alternateHref: "/register",
    alternateLabel: "Daftar di EcoGrow",
  },
  register: {
    eyebrow: "Daftar",
    title: "Buat akun EcoGrow.",
    description: "Siapkan akun Guru atau Peserta Didik untuk masuk ke LMS.",
    submitAction: "Daftar",
    alternateText: "Sudah punya akun?",
    alternateHref: "/login",
    alternateLabel: "Masuk ke EcoGrow",
  },
};

export function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<AuthRole>("student");
  const [formState, setFormState] = useState<AuthFormState>({ status: "idle" });

  const activeRole = roleContent[role];
  const activeMode = modeContent[mode];
  const isRegister = mode === "register";
  const showSessionExpired = searchParams.get("reason") === "session-expired";
  const formId = `ecogrow-${mode}-form`;

  const enterAsRole = (selectedRole: AuthRole) => {
    setDemoRole(selectedRole);
    router.push(roleContent[selectedRole].href);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const selectedRole = form.get("role") === "teacher" ? "teacher" : "student";

    setFormState({ status: "loading" });

    const result = await authenticate({
      mode,
      role: selectedRole,
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });

    setFormState(result);

    if (result.status === "success") {
      const next = searchParams.get("next");
      router.push(next || getRoleHome(result.session.role));
    }
  };

  return (
    <main className="auth-page min-h-[100dvh] bg-[#f5f8f1] px-2 py-2 text-slateText sm:px-4 sm:py-3 lg:grid lg:place-items-center lg:px-5">
      <div className="mx-auto grid min-h-[calc(100dvh-1rem)] w-full min-w-0 max-w-6xl gap-3 sm:min-h-[calc(100dvh-1.5rem)] lg:h-[calc(100dvh-1.5rem)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-stretch">
        <section className="relative hidden min-h-0 overflow-hidden rounded-[1.75rem] border border-white/20 bg-leaf-700 text-white shadow-[0_28px_80px_rgba(11,79,42,0.22)] lg:flex lg:flex-col lg:justify-between">
          <Image
            src="/assets/images/children-gardening-pixabay.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover opacity-32"
          />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(4,39,22,0.95)_0%,rgba(8,74,41,0.86)_48%,rgba(19,93,74,0.78)_100%)]" />
          <div className="absolute inset-0 garden-grid opacity-[0.08]" aria-hidden="true" />

          <div className="relative z-10 p-6 xl:p-7">
            <EcoGrowLogo
              inverted
              priority
              subtitle="Learning LMS"
              size="md"
              markClassName="ring-white/15"
              textClassName="text-white"
            />
            <div className="auth-side-copy mt-10 max-w-md xl:mt-14">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-sun backdrop-blur">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Portal belajar hijau
              </p>
              <h1 className="mt-4 font-heading text-4xl font-black leading-[1.04] text-white xl:text-5xl">
                Satu pintu untuk misi, kelas, dan portofolio EcoGrow.
              </h1>
              <p className="mt-4 text-sm font-semibold leading-7 text-white/78 xl:text-base xl:leading-8">
                Masuk sebagai Guru atau Peserta Didik dengan alur yang ringkas,
                jelas, dan siap membawa pengguna langsung ke ruang belajarnya.
              </p>
            </div>
          </div>

          <div className="auth-side-stats relative z-10 grid grid-cols-3 gap-2 p-6 xl:gap-3 xl:p-7">
            {[
              ["25+", "Modul"],
              ["5", "Misi"],
              ["1", "Portofolio"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/12 bg-white/10 p-3 backdrop-blur xl:p-4">
                <p className="font-heading text-xl font-black text-white xl:text-2xl">{value}</p>
                <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/58 xl:text-xs">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="auth-card flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-gardenBorder bg-white px-3 py-3 shadow-[0_24px_70px_rgba(51,65,85,0.10)] sm:px-5 sm:py-4 lg:px-7 xl:px-8">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <EcoButton
              href="/"
              variant="ghost"
              size="sm"
              className="auth-back-button min-h-8 bg-leaf-50 px-3 text-leaf-700 shadow-none hover:bg-leaf-100"
              icon={<ArrowLeft className="size-4" aria-hidden="true" />}
            >
              Beranda
            </EcoButton>
            <EcoGrowLogo markOnly size="xs" className="shrink-0 lg:hidden" priority />
          </div>

          <div className="auth-content my-auto min-h-0 min-w-0 py-2 sm:py-3 lg:py-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-sun/20 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] text-earth">
                <ShieldCheck className="size-3" aria-hidden="true" />
                Demo
              </p>
              <h2 className="auth-title mt-2 font-heading text-2xl font-black leading-tight text-leaf-700 sm:text-3xl">
                {mode === "login" ? "Masuk EcoGrow" : "Daftar EcoGrow"}
              </h2>
            </div>

            <div className="auth-mode-tabs mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-1.5 rounded-2xl bg-[#f4f8f2] p-1 ring-1 ring-gardenBorder sm:mt-5">
              {(["login", "register"] as const).map((item) => {
                const selected = mode === item;
                const ModeIcon = item === "login" ? UserRound : UserRoundPlus;

                return (
                  <Link
                    key={item}
                    href={item === "login" ? "/login" : "/register"}
                    aria-current={selected ? "page" : undefined}
                    className={cn(
                      "flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-xl px-2 text-sm font-black transition duration-300 sm:px-3",
                      selected
                        ? "bg-white text-leaf-700 shadow-soft ring-1 ring-leaf-500/10"
                        : "text-mutedText hover:bg-white/70 hover:text-leaf-700",
                    )}
                  >
                    <ModeIcon className="size-4" aria-hidden="true" />
                    {item === "login" ? "Login" : "Register"}
                  </Link>
                );
              })}
            </div>

            <div className="auth-role-tabs mt-2.5 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2">
              {(["student", "teacher"] as const).map((item) => {
                const RoleIcon = roleContent[item].icon;

                return (
                  <label
                    key={item}
                    className="group/role relative block min-w-0 cursor-pointer"
                  >
                    <input
                      form={formId}
                      className="peer sr-only"
                      type="radio"
                      name="role"
                      value={item}
                      defaultChecked={item === "student"}
                      onChange={() => setRole(item)}
                    />
                    <span className="flex min-h-11 min-w-0 items-center gap-2 rounded-2xl border border-gardenBorder bg-white px-3 py-2 text-left text-mutedText transition duration-300 hover:border-leaf-500/25 hover:bg-leaf-50/50 hover:text-leaf-700 peer-checked:border-leaf-500/35 peer-checked:bg-leaf-50 peer-checked:text-leaf-700 peer-checked:shadow-soft sm:gap-3">
                      <RoleIcon className="size-5 shrink-0" aria-hidden="true" />
                      <span className="min-w-0 truncate text-sm font-black">{roleContent[item].label}</span>
                    </span>
                  </label>
                );
              })}
            </div>

            {showSessionExpired ? (
              <div className="mt-3 rounded-2xl border border-sun/35 bg-sun/10 p-3 text-sm font-bold leading-6 text-earth" role="status">
                Sesi berakhir atau belum tersedia. Silakan masuk lagi untuk melanjutkan.
              </div>
            ) : null}

            {formState.status === "error" ? (
              <div className="mt-3 flex gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-bold leading-6 text-red-700" role="alert">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{formState.message}</span>
              </div>
            ) : null}

            <form id={formId} onSubmit={handleSubmit} className="auth-form mt-3 space-y-2.5 sm:space-y-3">
              {isRegister && (
                <label className="block">
                  <span className="auth-label mb-1 block text-xs font-black text-slateText sm:mb-1.5 sm:text-sm">Nama lengkap</span>
                  <span className="relative block">
                    <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-leaf-500" />
                    <input
                      className="auth-input eco-input !min-h-9 rounded-2xl border-gardenBorder bg-[#fbfdf9] text-sm shadow-none sm:!min-h-10"
                      type="text"
                      name="name"
                      placeholder="Nama lengkap"
                      autoComplete="name"
                      required
                    />
                  </span>
                </label>
              )}

              <label className="block">
                <span className="auth-label mb-1 block text-xs font-black text-slateText sm:mb-1.5 sm:text-sm">Email</span>
                <span className="relative block">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-leaf-500" />
                  <input
                    className="auth-input eco-input !min-h-9 rounded-2xl border-gardenBorder bg-[#fbfdf9] text-sm shadow-none sm:!min-h-10"
                    type="email"
                    name="email"
                    placeholder="nama@sekolah.id"
                    autoComplete="email"
                    required
                  />
                </span>
              </label>

              <label className="block">
                <span className="auth-label mb-1 block text-xs font-black text-slateText sm:mb-1.5 sm:text-sm">Password</span>
                <span className="relative block">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-leaf-500" />
                  <input
                    className="auth-input eco-input !min-h-9 rounded-2xl border-gardenBorder bg-[#fbfdf9] text-sm shadow-none sm:!min-h-10"
                    type="password"
                    name="password"
                    placeholder="Minimal 8 karakter"
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    minLength={8}
                    required
                  />
                </span>
              </label>

              <EcoButton
                type="submit"
                variant={activeRole.buttonVariant}
                fullWidth
                size="lg"
                className="auth-submit min-h-10 rounded-2xl text-sm sm:min-h-11"
                icon={<ArrowRight className="size-4" aria-hidden="true" />}
                disabled={formState.status === "loading"}
              >
                {formState.status === "loading" ? "Memproses..." : activeMode.submitAction}
              </EcoButton>
            </form>

            {mode === "login" ? (
              <p className="auth-forgot mt-2 text-center text-xs font-bold text-mutedText">
                Lupa password?{" "}
                <Link href="/login?reason=reset-password" className="text-leaf-700 underline decoration-leaf-500/30 underline-offset-4 hover:text-leaf-500">
                  Minta bantuan guru
                </Link>
              </p>
            ) : null}

            <p className="auth-alternate mt-2.5 text-center text-xs font-bold text-mutedText sm:mt-3 sm:text-sm">
              {activeMode.alternateText}{" "}
              <Link href={activeMode.alternateHref} className="text-leaf-700 underline decoration-leaf-500/30 underline-offset-4 hover:text-leaf-500">
                {activeMode.alternateLabel}
              </Link>
            </p>

            <div className="auth-demo mt-3 border-t border-gardenBorder pt-2.5 sm:mt-4 sm:pt-3">
              <div className="auth-demo-actions grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2 sm:gap-3">
                <a
                  href="/siswa"
                  onClick={() => enterAsRole("student")}
                  className="auth-demo-button inline-flex min-h-8 min-w-0 items-center justify-center rounded-2xl bg-sun px-2 text-xs font-extrabold text-leaf-700 shadow-soft transition hover:bg-harvest hover:text-white sm:min-h-9 sm:px-4"
                >
                  Demo Siswa
                </a>
                <a
                  href="/guru"
                  onClick={() => enterAsRole("teacher")}
                  className="auth-demo-button inline-flex min-h-8 min-w-0 items-center justify-center rounded-2xl border border-leaf-500/25 bg-white px-2 text-xs font-extrabold text-leaf-700 shadow-soft transition hover:bg-leaf-50 sm:min-h-9 sm:px-4"
                >
                  Demo Guru
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
