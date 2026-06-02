import Link from "next/link";
import { BookHeart, BookOpen, Gamepad2, PencilLine } from "lucide-react";
import { studentLearningFlow, studentTodayTasks } from "@/data";
import { StatusBadge } from "@/components/shared/StatusBadge";

const taskIcons = {
  "task-journal": PencilLine,
  "task-learn": BookOpen,
  "task-reflect": BookHeart,
};

const playAction = {
  id: "task-play",
  title: "Main EcoPlay",
  description: "Latih pengetahuanmu sambil bermain.",
  href: "/siswa/ecoplay",
  points: 10,
};

export function StudentQuickActions() {
  return (
    <section>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Aksi Cepat</p>
          <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Pilih kegiatanmu</h2>
        </div>
        <p className="hidden text-sm font-semibold text-mutedText sm:block">Maksimal 3 tugas utama hari ini</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {studentTodayTasks.map((task) => {
          const Icon = taskIcons[task.id as keyof typeof taskIcons] ?? PencilLine;
          return (
            <Link
              key={task.id}
              href={task.href}
              className="rounded-2xl border border-gardenBorder/80 bg-white/90 p-4 shadow-soft transition hover:-translate-y-1 hover:border-leaf-500/25"
            >
              <Icon className="size-6 text-leaf-500" aria-hidden="true" />
              <h3 className="mt-3 font-heading text-lg font-black text-leaf-700">{task.title}</h3>
              <p className="mt-2 hidden text-xs font-semibold leading-5 text-mutedText sm:block">
                {task.description}
              </p>
              <StatusBadge status={task.status} className="mt-3" />
            </Link>
          );
        })}
        <Link
          href={playAction.href}
          className="rounded-2xl border border-sky/20 bg-sky/10 p-4 shadow-soft transition hover:-translate-y-1"
        >
          <Gamepad2 className="size-6 text-sky" aria-hidden="true" />
          <h3 className="mt-3 font-heading text-lg font-black text-leaf-700">{playAction.title}</h3>
          <p className="mt-2 hidden text-xs font-semibold leading-5 text-mutedText sm:block">
            {playAction.description}
          </p>
          <p className="mt-3 text-xs font-black text-sky">+{playAction.points} poin</p>
        </Link>
      </div>
      <div className="mt-5 rounded-3xl border border-leaf-500/15 bg-leaf-50/70 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Alur belajarku</p>
            <p className="mt-1 text-sm font-bold text-slateText">Lihat posisi kegiatanmu dari kuis awal sampai cerita.</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-leaf-700 shadow-soft">
            {studentLearningFlow.filter((item) => item.status === "completed").length}/{studentLearningFlow.length} selesai
          </span>
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {studentLearningFlow.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-2xl bg-white p-3 text-left shadow-soft transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-sun/25 text-xs font-black text-earth">
                  {index + 1}
                </span>
                <StatusBadge status={item.status} />
              </div>
              <h3 className="mt-3 font-heading text-base font-black text-leaf-700">{item.title}</h3>
              <p className="mt-1 text-xs font-semibold leading-5 text-mutedText">{item.helperText}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
