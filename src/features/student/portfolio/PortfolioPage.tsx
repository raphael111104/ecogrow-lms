"use client";

import Image from "next/image";
import { Award, BarChart3, BookHeart, Camera, CheckCircle2, ClipboardCheck, Gamepad2, HeartHandshake, Leaf, MessageCircleMore, Sprout, Trophy } from "lucide-react";
import { EcoGrowJourneyStepper } from "@/components/student/EcoGrowJourneyStepper";
import { PageHeader } from "@/components/shared/PageHeader";
import { NextSuggestedActionCard } from "@/components/shared/NextSuggestedActionCard";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { ecoChallenges, ecoExhibitionItems, ecoPlayGames, studentMoodOptions } from "@/data";
import { useMockStorage } from "@/hooks/useMockStorage";
import { getStudentDashboardMock, getStudentMissionMock, getStudentPortfolioMock } from "@/mock/repositories/studentRepository";
import type { EcoMasterResult, EcoReadinessResult, StudentReflectionMemory } from "@/types/ecogrow";

export function PortfolioPage() {
  const dashboard = getStudentDashboardMock();
  const mission = getStudentMissionMock();
  const portfolio = getStudentPortfolioMock();
  const album = mission.journals.slice(-3).reverse();
  const [reflectionMemory] = useMockStorage<StudentReflectionMemory | null>("ecoGrow-reflection-memory", null);
  const [readinessResult] = useMockStorage<EcoReadinessResult | null>("ecoGrow-readiness-result", null);
  const [masterResult] = useMockStorage<EcoMasterResult | null>("ecoGrow-ecomaster-results", null);
  const latestReflection = portfolio.reflections[0];
  const moodLabel = studentMoodOptions.find((mood) => mood.id === reflectionMemory?.mood)?.label;
  const kaihEntries = Object.entries(dashboard.profile.ecologicalCharacter);
  const approvedExhibitions = ecoExhibitionItems.filter((item) => item.status === "approved");
  const evidenceCards = [
    {
      label: "Kuis Awal",
      value: readinessResult ? `${readinessResult.score}` : "Mock",
      note: readinessResult?.recommendation ?? "Memetakan minat, gaya belajar, dan kesiapan ekologis.",
      icon: ClipboardCheck,
    },
    {
      label: "EcoMission",
      value: `${mission.journals.length} jurnal`,
      note: "Pengamatan tinggi tanaman, daun, air, dan foto praktik.",
      icon: Sprout,
    },
    {
      label: "EcoPlay",
      value: `${ecoPlayGames.length} game`,
      note: "Latihan fotosintesis, puzzle alur, dan detektif tanaman layu.",
      icon: Gamepad2,
    },
    {
      label: "Kuis Akhir",
      value: masterResult ? `${masterResult.score}` : `${portfolio.quizAttempts[0]?.score ?? 80}`,
      note: masterResult?.recommendation ?? portfolio.quizAttempts[0]?.recommendation ?? "Menguatkan konsep dan rekomendasi lanjut.",
      icon: Trophy,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        eyebrow="Album Belajarku"
        title="Album Perkembangan Adit"
        description="Lihat cerita tanaman, karya terbaik, dan pesan Bu Guru dalam satu album."
        badge={`${dashboard.profile.points} EcoPoint`}
        actions={<EcoButton href="/siswa/laporan-belajar">Lihat Laporan Belajar</EcoButton>}
      />

      <EcoCard tone="dark" className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid size-16 place-items-center rounded-2xl bg-white/10 text-sun">
            <Leaf className="size-9" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-heading text-3xl font-black text-white">{dashboard.user.name}</h2>
            <p className="mt-1 text-sm font-semibold text-white/70">{dashboard.profile.groupName} - Kelas 4B</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {dashboard.badges.slice(0, 3).map((badge) => (
            <EcoBadge key={badge.id} className="bg-white/10 text-white" icon={<Award className="size-4 text-sun" />}>
              {badge.name}
            </EcoBadge>
          ))}
        </div>
      </EcoCard>

      <EcoCard>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Perjalanan Belajar</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Dari mengamati sampai berkarya</h2>
        <div className="mt-5">
          <EcoGrowJourneyStepper activeStage={dashboard.activeMission.stage} />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {portfolio.timeline.map((item) => (
            <div key={`${item.date}-${item.title}`} className="rounded-2xl bg-leaf-50 p-4">
              <p className="text-xs font-black text-earth">{item.date}</p>
              <p className="mt-2 font-heading text-lg font-black text-leaf-700">{item.title}</p>
              <p className="mt-1 text-sm font-semibold text-mutedText">{item.evidence}</p>
            </div>
          ))}
        </div>
      </EcoCard>

      <section>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Evidence Belajar</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Jejak dari kuis, misi, game, dan karya</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {evidenceCards.map(({ label, value, note, icon: Icon }) => (
            <EcoCard key={label} tone="soft" className="p-4">
              <Icon className="size-7 text-leaf-600" aria-hidden="true" />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.13em] text-mutedText">{label}</p>
              <p className="mt-1 font-heading text-2xl font-black text-leaf-700">{value}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slateText">{note}</p>
            </EcoCard>
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Album Tanamanku</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Pertumbuhan kangkung</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {album.map((journal) => (
            <EcoCard key={journal.id} className="p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-leaf-50">
                <Image
                  src={journal.photoUrl ?? "/assets/images/seedling-closeup-unsplash.jpg"}
                  alt={`Tanaman pada ${journal.date}`}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-heading text-xl font-black text-leaf-700">{journal.plantHeightCm} cm</p>
              <p className="text-sm font-semibold text-mutedText">{journal.date}</p>
            </EcoCard>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <EcoCard tone="cream">
          <div className="flex items-center gap-3">
            <BookHeart className="size-7 text-harvest" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Cerita Belajarku</p>
              <h2 className="font-heading text-2xl font-black text-leaf-700">Catatan dari kebunku</h2>
            </div>
          </div>
          {reflectionMemory ? (
            <div className="mt-4 rounded-2xl bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                {moodLabel ? <EcoBadge className="bg-cream text-earth">{moodLabel}</EcoBadge> : null}
                <span className="text-xs font-black uppercase tracking-[0.13em] text-mutedText">{reflectionMemory.savedAt}</span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-7 text-slateText">{reflectionMemory.lesson}</p>
              <p className="mt-3 text-sm font-bold text-leaf-700">Janji hijau: {reflectionMemory.promise}</p>
            </div>
          ) : (
            <p className="mt-4 rounded-2xl bg-white p-4 text-sm font-semibold leading-7 text-mutedText">
              {latestReflection?.lessonLearned ?? "Cerita terbarumu akan tampil di sini setelah disimpan."}
            </p>
          )}
        </EcoCard>
        <EcoCard tone="soft">
          <div className="flex items-center gap-3">
            <HeartHandshake className="size-7 text-leaf-700" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Cek Usahaku</p>
              <h2 className="font-heading text-2xl font-black text-leaf-700">Hal baik hari ini</h2>
            </div>
          </div>
          {reflectionMemory?.efforts.length ? (
            <div className="mt-4 space-y-2">
              {reflectionMemory.efforts.map((effort) => (
                <p key={effort} className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-bold text-slateText">
                  <CheckCircle2 className="size-5 shrink-0 text-leaf-500" aria-hidden="true" />
                  {effort}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-4 rounded-xl bg-white p-3 text-sm font-semibold leading-6 text-mutedText">
              Tandai usahamu saat menulis cerita agar jejak kebaikanmu terlihat di sini.
            </p>
          )}
          {reflectionMemory ? (
            <p className="mt-4 rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-slateText">
              <span className="font-black text-leaf-700">Apresiasi untuk {reflectionMemory.appreciationFriend}: </span>
              {reflectionMemory.appreciationMessage}
            </p>
          ) : null}
        </EcoCard>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <EcoCard tone="cream">
          <div className="flex items-center gap-3">
            <Camera className="size-7 text-harvest" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Karya Terbaik</p>
              <h2 className="font-heading text-2xl font-black text-leaf-700">Yang paling kubanggakan</h2>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {portfolio.evidence.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-3">
                {item.imageUrl ? (
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-leaf-50">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                  </div>
                ) : null}
                <p className="mt-3 font-bold text-leaf-700">{item.title}</p>
              </div>
            ))}
          </div>
        </EcoCard>
        <EcoCard tone="soft">
          <MessageCircleMore className="size-8 text-leaf-700" aria-hidden="true" />
          <h2 className="mt-3 font-heading text-2xl font-black text-leaf-700">Pesan Bu Guru</h2>
          <div className="mt-4 space-y-3">
            {portfolio.summary.teacherNotes.map((note) => (
              <p key={note} className="rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-slateText">
                {note}
              </p>
            ))}
          </div>
        </EcoCard>
      </section>
      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <EcoCard tone="soft">
          <div className="flex items-center gap-3">
            <Trophy className="size-7 text-leaf-700" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">EcoChallenge</p>
              <h2 className="font-heading text-2xl font-black text-leaf-700">Remedial, pengayaan, dan kebiasaan baik</h2>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {ecoChallenges.slice(0, 3).map((challenge) => (
              <div key={challenge.id} className="rounded-2xl bg-white p-4">
                <EcoBadge className="bg-leaf-100 text-leaf-700">{challenge.type ?? "habit"}</EcoBadge>
                <p className="mt-3 font-heading text-lg font-black text-leaf-700">{challenge.title}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{challenge.rewardPoints} EcoPoint - {challenge.evidenceHint}</p>
              </div>
            ))}
          </div>
        </EcoCard>
        <EcoCard tone="cream">
          <div className="flex items-center gap-3">
            <BarChart3 className="size-7 text-harvest" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">KAIH</p>
              <h2 className="font-heading text-2xl font-black text-leaf-700">Karakter ekologis</h2>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {kaihEntries.map(([dimension, value]) => (
              <div key={dimension} className="rounded-xl bg-white p-3">
                <div className="flex items-center justify-between gap-3 text-sm font-black">
                  <span className="capitalize text-slateText">{dimension}</span>
                  <span className="text-leaf-700">{value}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-leaf-100">
                  <span className="block h-full rounded-full bg-leaf-500" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </EcoCard>
      </section>
      <EcoCard tone="soft">
        <div className="flex items-center gap-3">
          <Camera className="size-7 text-leaf-700" aria-hidden="true" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Eco-Exhibition</p>
            <h2 className="font-heading text-2xl font-black text-leaf-700">Karya yang sudah disetujui</h2>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {approvedExhibitions.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                <EcoBadge className="bg-sun/25 text-earth">{item.badgeCandidate}</EcoBadge>
                {item.groupName ? <EcoBadge className="bg-leaf-100 text-leaf-700">{item.groupName}</EcoBadge> : null}
              </div>
              <p className="mt-3 font-heading text-xl font-black text-leaf-700">{item.title}</p>
              {item.mainMessage ? <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{item.mainMessage}</p> : null}
            </div>
          ))}
        </div>
      </EcoCard>
      <EcoCard tone="dark" className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sun">Pamerkan Karya</p>
          <h2 className="mt-3 font-heading text-3xl font-black text-white">Karyamu siap masuk panggung panen.</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-white/75">
            Bawa karya yang paling kamu banggakan ke pameran kelas dan lihat pilihan karya teman-temanmu.
          </p>
          <EcoBadge className="mt-4 bg-sun/15 text-sun" icon={<Trophy className="size-4" />}>
            Lulus Misi Ekologis
          </EcoBadge>
        </div>
        <EcoButton href="/siswa/galeri" variant="reward" icon={<Camera className="size-4" />}>
          Buka Pameran Karya
        </EcoButton>
      </EcoCard>
      <NextSuggestedActionCard
        title="Siap menunjukkan pemahamanmu?"
        description="Album perkembanganmu sudah berisi pengamatan dan karya. Uji pengetahuanmu melalui kuis akhir."
        href="/siswa/ecomaster-quiz"
        actionLabel="Mulai Kuis Akhir"
        secondaryAction={{ href: "/siswa/laporan-belajar", label: "Lihat Laporan" }}
      />
    </div>
  );
}
