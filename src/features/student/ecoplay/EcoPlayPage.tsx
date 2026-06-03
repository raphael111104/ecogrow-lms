"use client";

import { useState } from "react";
import { Award, Gamepad2, Leaf, Puzzle, Recycle, Sprout, Sun } from "lucide-react";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { PageHeader } from "@/components/shared/PageHeader";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { studentGameCards } from "@/data";

const gameIcons = {
  "food-chain": Puzzle,
  "plant-parts": Sprout,
  photosynthesis: Sun,
  "healthy-plant": Leaf,
  sorting: Recycle,
};

const ecoPlayBadgePath = [
  {
    title: "Badge Pemikir Hijau",
    description: "Terbuka setelah kamu menyelesaikan satu latihan lagi.",
    progress: "80%",
    icon: Award,
    tone: "from-sun/35 via-white to-leaf-50",
  },
  {
    title: "Penjaga Siklus",
    description: "Hadiah untuk latihan rantai makanan dan kompos.",
    progress: "55%",
    icon: Recycle,
    tone: "from-leaf-100 via-white to-sky/10",
  },
  {
    title: "Detektif Daun",
    description: "Hadiah setelah mengenali tanda tanaman sehat.",
    progress: "35%",
    icon: Leaf,
    tone: "from-cream via-white to-leaf-100",
  },
];

const photosynthesisSequence = [
  {
    id: "sunlight",
    label: "Cahaya matahari",
    hint: "Daun menangkap cahaya sebagai energi.",
  },
  {
    id: "water",
    label: "Air diserap akar",
    hint: "Akar membawa air dari tanah ke batang.",
  },
  {
    id: "leaf-food",
    label: "Daun membuat makanan",
    hint: "Daun mengolah air dan cahaya menjadi makanan.",
  },
  {
    id: "plant-grows",
    label: "Tanaman tumbuh sehat",
    hint: "Makanan membantu tanaman bertambah kuat.",
  },
];

const compostChoices = [
  {
    id: "dry-leaves",
    label: "Sisa daun kering",
    compost: true,
    reason: "Daun kering bisa membusuk dan memperkaya kompos.",
  },
  {
    id: "fruit-peel",
    label: "Kulit pisang",
    compost: true,
    reason: "Kulit buah termasuk bahan organik yang bisa terurai.",
  },
  {
    id: "plastic-cup",
    label: "Gelas plastik",
    compost: false,
    reason: "Plastik tidak mudah terurai di kompos sekolah.",
  },
  {
    id: "used-paper",
    label: "Kertas bekas bersih",
    compost: true,
    reason: "Kertas bersih bisa membantu campuran kompos tetap seimbang.",
  },
  {
    id: "battery",
    label: "Baterai bekas",
    compost: false,
    reason: "Baterai harus dipilah khusus karena berbahaya bagi tanah.",
  },
];

const miniGameById = {
  photosynthesis: {
    type: "sequence",
    title: "Urutkan Fotosintesis",
    prompt: "Tekan kartu sesuai urutan cara tanaman membuat makanan.",
    reward: 30,
  },
  sorting: {
    type: "compost",
    title: "Pilah Sampah Organik",
    prompt: "Pilih bahan yang bisa masuk ke kompos sekolah.",
    reward: 15,
  },
};

export function EcoPlayPage() {
  const recommended = studentGameCards[2];
  const [activeGameId, setActiveGameId] = useState<string>(recommended.id);
  const [sequencePick, setSequencePick] = useState<string[]>([]);
  const [compostPick, setCompostPick] = useState<string[]>([]);
  const [compostFeedback, setCompostFeedback] = useState<"correct" | "incorrect" | null>(null);
  const activeGame = studentGameCards.find((game) => game.id === activeGameId);
  const activeMiniGame = miniGameById[activeGameId as keyof typeof miniGameById];
  const sequenceComplete = sequencePick.length === photosynthesisSequence.length;
  const sequenceIsCorrect =
    sequenceComplete && sequencePick.every((stepId, index) => stepId === photosynthesisSequence[index].id);
  const compostIsCorrect =
    compostPick.length > 0 &&
    compostChoices.every((choice) => compostPick.includes(choice.id) === choice.compost);

  const startGame = (gameId: string) => {
    setActiveGameId(gameId);
    setSequencePick([]);
    setCompostPick([]);
    setCompostFeedback(null);
  };

  const toggleCompostChoice = (choiceId: string) => {
    setCompostFeedback(null);
    setCompostPick((current) =>
      current.includes(choiceId) ? current.filter((id) => id !== choiceId) : [...current, choiceId],
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        eyebrow="Bermain"
        title="EcoPlay"
        description="Main sebentar, kumpulkan poin, lalu gunakan pengetahuanmu saat merawat tanaman."
        badge="Permainan edukatif"
      />

      <EcoCard
        tone="dark"
        className="eco-play-hero-card grid gap-6 bg-[linear-gradient(115deg,#062a16,#0b4f2a_55%,#17683a)] p-6 md:grid-cols-[1fr_minmax(14rem,0.62fr)] md:items-center md:p-8"
      >
        <div className="relative z-10">
          <EcoBadge className="bg-sun text-leaf-700" icon={<Gamepad2 className="size-4" />}>
            Disarankan Hari Ini
          </EcoBadge>
          <h2 className="mt-4 font-heading text-3xl font-black text-white md:text-4xl">{recommended.title}</h2>
          <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-white/75">{recommended.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <EcoBadge className="bg-white/10 text-white">{recommended.duration}</EcoBadge>
            <EcoBadge className="bg-white/10 text-white">{recommended.level}</EcoBadge>
            <EcoBadge className="bg-sun/20 text-sun">+{recommended.points} poin</EcoBadge>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div
            className="eco-play-orbit relative grid size-44 place-items-center rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl shadow-leaf-900/25 backdrop-blur md:size-52"
            aria-hidden="true"
          >
            <span className="eco-play-orbit-ring" />
            <span className="eco-play-sun">
              <Sun className="size-5" />
            </span>
            <span className="eco-play-drop eco-play-drop-one" />
            <span className="eco-play-drop eco-play-drop-two" />
            <span className="eco-play-seedling">
              <Sprout className="size-14" />
            </span>
            <span className="absolute bottom-8 h-5 w-28 rounded-[999px] bg-leaf-900/35 blur-[1px]" />
          </div>
          <EcoButton variant="reward" size="lg" onClick={() => startGame(recommended.id)}>
            Main Sekarang
          </EcoButton>
        </div>
      </EcoCard>

      {activeGame ? (
        <FriendlyAlert
          tone="success"
          title={`Mode latihan dibuka: ${activeGame.title}`}
          description={
            activeMiniGame
              ? "Pilih jawabanmu langsung di Arena Latihan Mini."
              : "Contoh interaktif untuk permainan ini sedang disiapkan. Coba Urutkan Fotosintesis atau Pilah Sampah Organik dulu."
          }
        />
      ) : null}

      <section aria-labelledby="ecoplay-arena-title">
        <EcoCard className="overflow-hidden border-2 border-leaf-100 bg-white/95">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Arena Latihan Mini</p>
              <h2 id="ecoplay-arena-title" className="mt-2 font-heading text-2xl font-black text-leaf-700">
                {activeMiniGame?.title ?? "Pilih contoh permainan"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-mutedText">
                {activeMiniGame?.prompt ??
                  "Saat ini dua contoh yang bisa dimainkan adalah Urutkan Fotosintesis dan Pilah Sampah Organik."}
              </p>
            </div>
            <EcoBadge className="bg-cream text-earth" icon={<Award className="size-4" />}>
              +{activeMiniGame?.reward ?? 0} EcoPoint
            </EcoBadge>
          </div>

          {activeMiniGame?.type === "sequence" ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
              <div className="grid gap-3 sm:grid-cols-2">
                {photosynthesisSequence.map((step) => {
                  const selectedIndex = sequencePick.indexOf(step.id);
                  const isSelected = selectedIndex >= 0;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      className={`rounded-3xl border p-4 text-left transition ${
                        isSelected
                          ? "border-leaf-500 bg-leaf-50 text-leaf-700 shadow-soft"
                          : "border-leaf-100 bg-white text-slateText hover:-translate-y-0.5 hover:border-leaf-300"
                      }`}
                      aria-pressed={isSelected}
                      onClick={() => {
                        if (!isSelected && !sequenceComplete) {
                          setSequencePick((current) => [...current, step.id]);
                        }
                      }}
                    >
                      <span className="inline-grid size-8 place-items-center rounded-full bg-sun text-sm font-black text-leaf-700">
                        {isSelected ? selectedIndex + 1 : "?"}
                      </span>
                      <span className="mt-3 block font-heading text-lg font-black">{step.label}</span>
                      <span className="mt-1 block text-xs font-semibold leading-5 opacity-75">{step.hint}</span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-3xl bg-leaf-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Urutanmu</p>
                <div className="mt-4 space-y-3">
                  {photosynthesisSequence.map((step, index) => {
                    const pickedStep = photosynthesisSequence.find((item) => item.id === sequencePick[index]);
                    return (
                      <div key={step.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-leaf-700 text-xs font-black text-white">
                          {index + 1}
                        </span>
                        <span className="text-sm font-extrabold text-leaf-700">
                          {pickedStep?.label ?? "Pilih kartu proses"}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {sequenceComplete ? (
                  <FriendlyAlert
                    className="mt-4"
                    tone={sequenceIsCorrect ? "success" : "warning"}
                    title={sequenceIsCorrect ? "Urutannya sudah tepat." : "Masih ada urutan yang tertukar."}
                    description={
                      sequenceIsCorrect
                        ? "Tanaman menangkap cahaya, menyerap air, membuat makanan, lalu tumbuh sehat. Kamu mendapat 30 EcoPoint."
                        : "Coba mulai dari cahaya dan air dulu, lalu pikirkan apa yang terjadi di daun."
                    }
                  />
                ) : null}
                <EcoButton className="mt-4" variant="secondary" fullWidth onClick={() => setSequencePick([])}>
                  Ulangi Urutan
                </EcoButton>
              </div>
            </div>
          ) : null}

          {activeMiniGame?.type === "compost" ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.7fr]">
              <div className="grid gap-3 sm:grid-cols-2">
                {compostChoices.map((choice) => {
                  const isSelected = compostPick.includes(choice.id);
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      className={`rounded-3xl border p-4 text-left transition ${
                        isSelected
                          ? "border-harvest bg-cream text-earth shadow-soft"
                          : "border-leaf-100 bg-white text-slateText hover:-translate-y-0.5 hover:border-harvest/60"
                      }`}
                      aria-pressed={isSelected}
                      onClick={() => toggleCompostChoice(choice.id)}
                    >
                      <span className="font-heading text-lg font-black">{choice.label}</span>
                      <span className="mt-2 block text-xs font-semibold leading-5 opacity-75">{choice.reason}</span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-3xl bg-cream p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Keranjang Kompos</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-mutedText">
                  Pilih semua bahan yang bisa terurai dan aman untuk kompos kebun sekolah.
                </p>
                <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-extrabold text-leaf-700 shadow-sm">
                  {compostPick.length
                    ? compostChoices
                        .filter((choice) => compostPick.includes(choice.id))
                        .map((choice) => choice.label)
                        .join(", ")
                    : "Keranjang masih kosong"}
                </div>
                <EcoButton
                  className="mt-4"
                  variant="reward"
                  fullWidth
                  onClick={() => setCompostFeedback(compostIsCorrect ? "correct" : "incorrect")}
                >
                  Cek Jawaban
                </EcoButton>
                {compostFeedback ? (
                  <FriendlyAlert
                    className="mt-4"
                    tone={compostFeedback === "correct" ? "success" : "warning"}
                    title={
                      compostFeedback === "correct"
                        ? "Bahan komposmu sudah benar."
                        : "Masih ada bahan yang perlu dipilah ulang."
                    }
                    description={
                      compostFeedback === "correct"
                        ? "Daun kering, kulit pisang, dan kertas bersih bisa masuk kompos. Kamu mendapat 15 EcoPoint."
                        : "Ingat, plastik dan baterai bekas tidak boleh masuk ke kompos kebun."
                    }
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </EcoCard>
      </section>

      <section>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Pilih Permainan</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Belajar sambil bermain</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studentGameCards.map((game) => {
            const Icon = gameIcons[game.id as keyof typeof gameIcons] ?? Gamepad2;
            return (
              <EcoCard key={game.id} className="eco-play-game-card flex flex-col">
                <span className="eco-play-game-icon grid size-12 place-items-center rounded-2xl bg-leaf-50 text-leaf-700">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-xl font-black text-leaf-700">{game.title}</h3>
                <p className="mt-2 flex-1 text-sm font-semibold leading-6 text-mutedText">{game.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <EcoBadge className="bg-leaf-50 text-leaf-700">{game.duration}</EcoBadge>
                  <EcoBadge className="bg-cream text-earth">+{game.points}</EcoBadge>
                </div>
                <EcoButton
                  className="mt-4"
                  variant={game.id === activeGameId ? "primary" : "secondary"}
                  fullWidth
                  onClick={() => startGame(game.id)}
                >
                  {game.id === activeGameId ? "Sedang dimainkan" : "Main"}
                </EcoButton>
              </EcoCard>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <EcoCard tone="cream">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Skor Terakhir</p>
          <p className="mt-3 font-heading text-5xl font-black text-leaf-700">85</p>
          <p className="mt-2 text-sm font-semibold text-mutedText">Puzzle Rantai Makanan - kemarin</p>
        </EcoCard>
        <EcoCard tone="soft" className="overflow-hidden">
          <div className="flex items-center gap-4">
            <Award className="size-12 shrink-0 text-harvest" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Hadiah Berikutnya</p>
              <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Jalur badge EcoPlay</h2>
              <p className="mt-1 text-sm font-semibold text-mutedText">
                Kumpulkan latihan kecil untuk membuka badge ramah lingkungan.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {ecoPlayBadgePath.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className={`rounded-3xl border border-leaf-100 bg-gradient-to-br ${badge.tone} p-4 shadow-sm`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-2xl bg-white text-leaf-700 shadow-sm">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-sm font-black leading-5 text-leaf-700">{badge.title}</h3>
                  </div>
                  <p className="mt-3 min-h-12 text-xs font-semibold leading-5 text-mutedText">{badge.description}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
                    <span className="block h-full rounded-full bg-[linear-gradient(90deg,#167a3a,#f6c343)]" style={{ width: badge.progress }} />
                  </div>
                </div>
              );
            })}
          </div>
        </EcoCard>
      </section>
    </div>
  );
}
