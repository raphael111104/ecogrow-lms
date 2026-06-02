"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Bell, ChevronDown, ChevronRight, Leaf, LogOut, Search } from "lucide-react";
import { EcoGrowLogo } from "@/components/brand/EcoGrowLogo";
import {
  siswaMobileNavigation,
  siswaMoreNavigation,
  siswaPrimaryNavigation,
  siswaSecondaryNavigation,
} from "@/data/navigation";
import { clearAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getStudentDashboardMock } from "@/mock/repositories/studentRepository";
import { getTeacherDashboardMock } from "@/mock/repositories/teacherRepository";
import type { SelectOption } from "@/types/ecogrow";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type AppShellProps = {
  role: "guru" | "siswa";
  name: string;
  activeClass: string;
  navItems: NavItem[];
  children: ReactNode;
};

export function AppShell({
  role,
  name,
  activeClass,
  navItems,
  children,
}: AppShellProps) {
  const isTeacher = role === "guru";
  const pathname = usePathname();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studentMoreOpen, setStudentMoreOpen] = useState(false);
  const teacherShell = isTeacher ? getTeacherDashboardMock() : null;
  const studentShell = isTeacher ? null : getStudentDashboardMock();
  const notifications = teacherShell?.notifications ?? studentShell?.notifications ?? [];
  const switchOptions: SelectOption[] = teacherShell?.activeClassOptions ?? studentShell?.activeProjectOptions ?? [];
  const switchValue = teacherShell?.activeClass.id ?? studentShell?.activeProject.id ?? "";
  const roleLabel = isTeacher ? "Guru" : "Siswa";
  const studentPoints = studentShell?.profile.points ?? 0;
  const studentLevel = studentShell?.profile.level ?? 1;
  const studentBadgeCount = studentShell?.badges.length ?? 0;
  const contextualItem =
    pathname === "/siswa/laporan-belajar"
      ? { label: "Laporan Belajar", href: pathname, icon: Leaf }
      : null;
  const isActivePath = (href: string) =>
    pathname === href || (href !== `/${role}` && pathname.startsWith(`${href}/`));
  const activeItem =
    navItems.find((item) => isActivePath(item.href)) ??
    contextualItem;
  const isStudentSecondaryActive =
    !isTeacher && siswaSecondaryNavigation.some((item) => isActivePath(item.href));
  const showStudentSecondary = studentMoreOpen || isStudentSecondaryActive;
  const sidebarNavItems = isTeacher ? navItems : siswaPrimaryNavigation;
  const teacherMobilePrimaryHrefs = ["/guru", "/guru/modul-ajar", "/guru/monitoring", "/guru/laporan"];
  const teacherMobileNavItems = teacherMobilePrimaryHrefs
    .map((href) => navItems.find((item) => item.href === href))
    .filter((item): item is NavItem => Boolean(item));
  const mobileNavItems = isTeacher ? teacherMobileNavItems : siswaMobileNavigation;
  const mobileMenuItems = isTeacher ? navItems : siswaMoreNavigation;
  const activeHref = activeItem?.href ?? `/${role}`;
  const searchPlaceholder = isTeacher
    ? "Cari modul, jurnal, proyek, atau siswa"
    : "Cari misi atau materi belajar";

  const handleLogout = (event: MouseEvent<HTMLAnchorElement>) => {
    clearAuthSession();
    if (event.currentTarget.href) {
      window.location.assign(event.currentTarget.href);
    }
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setNotificationOpen(false);
    setStudentMoreOpen(false);
  }, [pathname]);

  return (
    <div className={cn("page-shell-bg min-h-screen", isTeacher ? "teacher-shell" : "student-shell")}>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-64 flex-col overflow-hidden border-r border-white/10 p-4 text-white shadow-[18px_0_60px_rgba(6,42,22,0.18)] lg:flex",
          isTeacher ? "bg-[#042716]" : "bg-[#173f2e]",
        )}
      >
        <div className="absolute inset-0 fine-noise opacity-45" />
        <div className="absolute inset-x-4 top-4 h-36 rounded-[2rem] bg-leaf-500/25 blur-3xl" />
        <div className="absolute -bottom-24 left-6 h-52 w-52 rounded-full bg-sun/12 blur-3xl" />
        <div className="relative flex min-h-0 flex-1 flex-col">
          <Link
            href={`/${role}`}
            className="mb-4 rounded-xl border border-white/10 bg-white/[0.08] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sun/70"
            aria-label={`Beranda EcoGrow ${roleLabel}`}
          >
            <EcoGrowLogo
              inverted
              size="sm"
              subtitle={isTeacher ? "Ruang Guru" : "Ruang Siswa"}
              markClassName="ring-white/20"
            />
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-sun">
                {isTeacher ? "Ruang Guru" : "Ruang Peserta Didik"}
              </p>
              <p className="mt-1 font-heading text-base font-black text-white">
                {isTeacher ? "Kendali kelas hari ini" : "Petualangan hijaumu"}
              </p>
            </div>
          </Link>

          <nav
            className={cn(
              "min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain pb-1 pr-1 [scrollbar-width:thin]",
              isTeacher ? "teacher-sidebar-scroll" : "student-sidebar-scroll",
            )}
            aria-label={`Navigasi ${role}`}
          >
            {sidebarNavItems.map((item) => {
              const active = isActivePath(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "group/nav flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 text-left text-xs font-bold text-white/[0.74] transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sun/70",
                    active && "bg-white text-leaf-700 shadow-soft hover:bg-white hover:text-leaf-700",
                  )}
                >
                  <span className={cn("grid size-7 place-items-center rounded-md bg-white/10 transition group-hover/nav:bg-white/15", active && "bg-leaf-100 text-leaf-700 group-hover/nav:bg-leaf-100")}>
                    <item.icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {notifications.some((notification) => notification.href === item.href) ? (
                    <span className={cn("grid min-w-5 place-items-center rounded-full px-1.5 text-[0.65rem] font-black", active ? "bg-sun text-leaf-700" : "bg-sun text-leaf-900")}>
                      {notifications.filter((notification) => notification.href === item.href).length}
                    </span>
                  ) : null}
                </Link>
              );
            })}
            {!isTeacher ? (
              <div className="pt-1">
                <button
                  type="button"
                  aria-label="Lainnya"
                  aria-expanded={showStudentSecondary}
                  onClick={() => setStudentMoreOpen((open) => !open)}
                  className={cn(
                    "flex min-h-10 w-full items-center justify-between gap-2.5 rounded-lg px-3 text-left text-xs font-bold text-white/[0.74] transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sun/70",
                    isStudentSecondaryActive && "bg-white/10 text-white",
                  )}
                >
                  <span>Lainnya</span>
                  <ChevronDown className={cn("size-4 transition", showStudentSecondary && "rotate-180")} aria-hidden="true" />
                </button>
                {showStudentSecondary ? (
                  <div className="mt-1 space-y-1 border-l border-white/10 pl-2">
                    {siswaSecondaryNavigation.map((item) => {
                      const active = isActivePath(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "group/nav flex min-h-9 w-full items-center gap-2 rounded-lg px-2 text-left text-[0.7rem] font-bold text-white/[0.7] transition hover:bg-white/10 hover:text-white",
                            active && "bg-white text-leaf-700 shadow-soft hover:bg-white hover:text-leaf-700",
                          )}
                        >
                          <item.icon className="size-4 shrink-0" aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ) : null}
          </nav>

          <div className="space-y-2.5 rounded-xl border border-white/10 bg-white/10 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur">
            <p className="text-[0.68rem] font-bold uppercase tracking-wide text-white/70">
              {isTeacher ? "Kelas Aktif" : "Level Saat Ini"}
            </p>
              <p className="mt-1 font-heading text-lg font-black">{activeClass}</p>
            {isTeacher ? (
              <div className="grid grid-cols-2 gap-2 text-center text-[0.68rem] font-black text-white/78">
                <span className="rounded-md bg-white/10 px-2 py-1.5">25 peserta</span>
                <span className="rounded-md bg-white/10 px-2 py-1.5">5 tim</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 text-center text-[0.68rem] font-black text-white/78">
                <span className="rounded-md bg-white/10 px-2 py-1.5">{studentPoints} poin</span>
                <span className="rounded-md bg-white/10 px-2 py-1.5">{studentBadgeCount} badge</span>
              </div>
            )}
            <a
              href="/login"
              className="flex min-h-9 w-full items-center justify-center gap-2 rounded-lg bg-white/10 text-xs font-bold text-white transition hover:bg-white hover:text-leaf-700"
              onClick={handleLogout}
            >
              <LogOut className="size-4" aria-hidden="true" />
              Keluar
            </a>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-gardenBorder/70 bg-[#F7FBF3]/[0.84] backdrop-blur-xl">
          <div className="flex min-h-14 items-center gap-2.5 px-4 md:min-h-16 md:gap-3 md:px-6">
            <Link
              href={`/${role}`}
              className="mr-auto min-w-0 md:hidden"
              aria-label={`Beranda EcoGrow ${roleLabel}`}
            >
              <EcoGrowLogo
                size="xs"
                subtitle={isTeacher ? "Ruang Guru" : "Ruang Siswa"}
                className="max-w-[11rem]"
              />
            </Link>

            <label className="hidden min-h-10 flex-1 items-center gap-3 rounded-lg border border-gardenBorder bg-white/90 px-3 text-sm text-mutedText shadow-soft md:flex">
              <Search className="size-4" aria-hidden="true" />
              <input
                className="w-full bg-transparent text-xs font-semibold text-slateText outline-none placeholder:text-mutedText"
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                suppressHydrationWarning
              />
            </label>

            <div className="hidden min-w-0 items-center gap-1.5 rounded-lg border border-gardenBorder bg-white px-3 py-2 text-xs font-black text-mutedText shadow-soft md:flex">
              <span>{roleLabel}</span>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span className="truncate text-leaf-700">{activeItem?.label ?? "Beranda"}</span>
            </div>

            <label className="hidden min-h-10 items-center gap-2 rounded-lg border border-gardenBorder bg-white px-3 text-xs font-black text-leaf-700 shadow-soft xl:flex">
              <span>{isTeacher ? "Kelas" : "Misi"}</span>
              <select className="max-w-44 bg-transparent text-xs font-bold text-slateText outline-none" defaultValue={switchValue} aria-label={isTeacher ? "Pilih kelas aktif" : "Pilih misi aktif"}>
                {switchOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>

            {!isTeacher ? (
              <div className="hidden items-center gap-2 rounded-full bg-sun/25 px-3 py-2 text-xs font-black text-leaf-700 sm:flex">
                <Leaf className="size-4" aria-hidden="true" />
                {studentPoints} EcoPoint
              </div>
            ) : null}

            <div className="relative ml-auto md:ml-0">
              <button
                className="relative grid size-9 place-items-center rounded-lg border border-gardenBorder bg-white text-leaf-700 shadow-soft focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sun/70 md:size-10"
                aria-label="Notifikasi"
                aria-expanded={notificationOpen}
                onClick={() => {
                  setNotificationOpen((open) => !open);
                  setMobileMenuOpen(false);
                }}
              >
                <Bell className="size-4" aria-hidden="true" />
                {notifications.length ? (
                  <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-sun text-[0.65rem] font-black text-leaf-900">
                    {notifications.length}
                  </span>
                ) : null}
              </button>
              {notificationOpen ? (
                <div className="fixed left-4 right-4 top-[4.5rem] z-30 rounded-xl border border-gardenBorder bg-white p-3 text-sm shadow-eco md:absolute md:left-auto md:right-0 md:top-12 md:w-80" aria-live="polite">
                  <p className="font-heading text-base font-black text-leaf-700">Notifikasi EcoGrow</p>
                  <div className="mt-2 space-y-2">
                    {notifications.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          "block rounded-lg p-2.5 text-xs font-bold leading-5 transition hover:-translate-y-0.5",
                          item.severity === "danger"
                            ? "bg-red-50 text-red-700"
                            : item.severity === "warning"
                              ? "bg-sun/20 text-earth"
                              : "bg-leaf-50 text-slateText",
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-gardenBorder bg-white px-2 py-1.5 shadow-soft md:gap-2.5 md:px-2.5">
              <div className="grid size-7 place-items-center rounded-md bg-sun text-leaf-700 font-heading text-xs font-black md:size-8 md:text-sm">
                {name.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-extrabold text-slateText">{name}</p>
                <p className="text-[0.68rem] font-bold text-mutedText">
                  {isTeacher ? "Aktivator EcoGrow" : `Level ${studentLevel} Explorer`}
                </p>
              </div>
            </div>
          </div>
          <div className="relative border-t border-gardenBorder/60 px-4 pb-2 pt-2 lg:hidden">
            <button
              type="button"
              className="flex min-h-10 w-full items-center gap-2 rounded-xl border border-gardenBorder bg-white px-3 text-left text-xs font-black text-leaf-700 shadow-soft transition hover:border-leaf-500/30 hover:bg-leaf-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sun/70"
              aria-expanded={mobileMenuOpen}
              aria-controls={`${role}-mobile-page-menu`}
              onClick={() => {
                setMobileMenuOpen((open) => !open);
                setNotificationOpen(false);
              }}
            >
              <span className="shrink-0 text-[0.68rem] uppercase tracking-[0.12em] text-mutedText">
                {isTeacher ? "Halaman" : "Lainnya"}
              </span>
              {activeItem ? (
                <activeItem.icon className="size-4 shrink-0 text-leaf-600" aria-hidden="true" />
              ) : null}
              <span className="min-w-0 flex-1 truncate font-heading text-sm font-black text-leaf-700">
                {activeItem?.label ?? "Beranda"}
              </span>
              <ChevronDown
                className={cn("size-4 shrink-0 text-leaf-700 transition", mobileMenuOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            {mobileMenuOpen ? (
              <div
                id={`${role}-mobile-page-menu`}
                className="absolute left-4 right-4 top-[calc(100%-0.25rem)] z-40 max-h-[min(28rem,calc(100vh-9rem))] overflow-y-auto rounded-2xl border border-leaf-500/15 bg-white p-2 shadow-[0_22px_70px_rgba(6,42,22,0.22)]"
              >
                <div className="mb-2 rounded-xl bg-leaf-50 px-3 py-2">
                  <p className="text-[0.66rem] font-black uppercase tracking-[0.14em] text-mutedText">
                    Pilih ruang
                  </p>
                  <p className="mt-1 text-xs font-bold leading-5 text-slateText">
                    {isTeacher ? "Buka kendali kelas, jurnal, dan asesmen." : "Temukan cerita, karya, kuis, dan hasil panenmu."}
                  </p>
                </div>
                <nav className="grid gap-1.5" aria-label={`Daftar halaman ${roleLabel}`}>
                  {mobileMenuItems.map((item) => {
                    const active = isActivePath(item.href);
                    const count = notifications.filter((notification) => notification.href === item.href).length;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group flex min-h-12 items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm font-black text-slateText transition hover:border-leaf-500/15 hover:bg-leaf-50",
                          active && "border-leaf-500/20 bg-leaf-700 text-white shadow-soft hover:bg-leaf-700 hover:text-white",
                        )}
                      >
                        <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg bg-leaf-50 text-leaf-700 transition group-hover:bg-white", active && "bg-white/15 text-white group-hover:bg-white/15")}>
                          <item.icon className="size-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        {count ? (
                          <span className={cn("grid min-w-5 place-items-center rounded-full px-1.5 text-[0.65rem] font-black", active ? "bg-sun text-leaf-900" : "bg-sun text-leaf-900")}>
                            {count}
                          </span>
                        ) : null}
                        <ChevronRight className={cn("size-4 shrink-0 opacity-45", active && "opacity-80")} aria-hidden="true" />
                      </Link>
                    );
                  })}
                </nav>
                <div className="sticky bottom-0 mt-2 border-t border-gardenBorder/70 bg-white/95 pt-2 backdrop-blur">
                  <a
                    href="/login"
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 text-sm font-black text-red-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition hover:border-red-200 hover:bg-red-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-red-200"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                    Keluar
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </header>

        <nav
          className={cn(
            "fixed inset-x-3 bottom-3 z-30 grid gap-1 rounded-2xl border border-leaf-500/15 bg-white/95 p-1.5 shadow-[0_18px_50px_rgba(6,42,22,0.2)] backdrop-blur-xl lg:hidden",
            isTeacher ? "grid-cols-4" : "grid-cols-5",
          )}
          aria-label={`Navigasi utama mobile ${role}`}
        >
          {mobileNavItems.map((item) => {
            const isMoreItem = !isTeacher && item.href === "#siswa-lainnya";
            const active = isMoreItem
              ? mobileMenuOpen || siswaMoreNavigation.some((moreItem) => isActivePath(moreItem.href))
              : isActivePath(item.href);
            const count = notifications.filter((notification) => notification.href === item.href).length;
            const itemClassName = cn(
              "relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-center text-[0.65rem] font-black leading-none text-mutedText transition",
              active && "bg-leaf-700 text-white shadow-soft",
            );

            if (isMoreItem) {
              return (
                <button
                  key={item.href}
                  type="button"
                  aria-label="Lainnya"
                  aria-expanded={mobileMenuOpen}
                  className={itemClassName}
                  onClick={() => {
                    setMobileMenuOpen((open) => !open);
                    setNotificationOpen(false);
                  }}
                >
                  <item.icon className="size-4" aria-hidden="true" />
                  <span className="max-w-full truncate">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={itemClassName}
              >
                <item.icon className="size-4" aria-hidden="true" />
                <span className="max-w-full truncate">{item.label}</span>
                {count ? (
                  <span className={cn("absolute right-2 top-1 grid size-4 place-items-center rounded-full text-[0.58rem]", active ? "bg-sun text-leaf-900" : "bg-sun text-leaf-900")}>
                    {count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <main className="px-4 pb-28 pt-5 md:px-6 md:py-6">{children}</main>
      </div>
    </div>
  );
}
