"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Camera, Sparkles, Trophy } from "lucide-react";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { galleryPosts, users } from "@/data";
import { useMockStorage } from "@/hooks/useMockStorage";
import type { GalleryCategory, GalleryPost } from "@/types/ecogrow";

const categoryLabel = {
  foto_tanaman: "Foto tanaman",
  poster: "Poster proyek",
  panen: "Foto panen",
  refleksi: "Cerita praktik baik",
  laporan_proyek: "Laporan proyek",
};

export function StudentGalleryPage() {
  const [posts, setPosts] = useMockStorage<GalleryPost[]>("ecoGrow-exhibition-gallery", galleryPosts);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "Poster Siklus Hidup Kangkung",
    description: "Tanaman tumbuh sehat jika mendapat air, cahaya, dan perawatan yang teratur.",
    supportingData: "Tinggi 31 cm, 16 daun, foto hari ke-1 sampai ke-10.",
    imageUrl: "/assets/images/ecogrow-concept-board.webp",
    category: "poster" as GalleryCategory,
    badgeCandidate: "Eco Exhibitor",
  });
  const published = posts.filter((post) => post.moderationStatus === "approved");
  const featured = published.filter((post) => post.isFeatured);
  const ownWork = posts.find((post) => post.studentId === "siswa-1");

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitWork = () => {
    const nextPost: GalleryPost = {
      id: `student-gallery-${Date.now()}`,
      studentId: "siswa-1",
      projectId: "proyek-kangkung",
      title: form.title,
      description: form.description,
      supportingData: form.supportingData,
      imageUrl: form.imageUrl,
      createdAt: "2026-05-30",
      likes: 0,
      moderationStatus: "pending",
      category: form.category,
      stage: "NITI_SAJATI",
    };
    setPosts([nextPost, ...posts]);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        eyebrow="Pameran Karya"
        title="Panggung Panen EcoGrow"
        description="Inilah puncak perjalananmu. Karya terbaik kelas dipamerkan untuk menunjukkan cara kita merawat kebun sekolah."
        badge="Pamerkan Karya"
        actions={
          <EcoButton variant="reward" icon={<Camera className="size-4" />} onClick={submitWork}>
            Ajukan Karya Terbaik
          </EcoButton>
        }
      />

      {submitted ? (
        <FriendlyAlert
          tone="success"
          title="Karyamu masuk daftar pameran."
          description="Bu Guru akan meninjau karya pilihanmu sebelum tampil di panggung kelas."
        />
      ) : null}

      <EcoCard tone="dark" className="relative overflow-hidden p-6 md:p-8">
        <div className="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full bg-sun/10 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <EcoBadge className="bg-sun/15 text-sun" icon={<Award className="size-4" />}>
              Lulus Misi Ekologis
            </EcoBadge>
            <h2 className="mt-4 font-heading text-3xl font-black text-white md:text-4xl">
              Karya kebunmu pantas dirayakan.
            </h2>
            <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-white/75">
              Kamu telah belajar, merawat, bercerita, dan kini ikut memamerkan bukti baik untuk lingkungan.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <EcoBadge className="bg-white/10 text-white">Foto panen</EcoBadge>
              <EcoBadge className="bg-white/10 text-white">Poster proyek</EcoBadge>
              <EcoBadge className="bg-white/10 text-white">Cerita praktik baik</EcoBadge>
            </div>
          </div>
          {ownWork ? (
            <div className="rounded-[1.3rem] border border-white/15 bg-white/10 p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
                <Image src={ownWork.imageUrl} alt={ownWork.title} fill className="object-cover" />
              </div>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-sun">Karyaku</p>
              <p className="mt-1 font-heading text-xl font-black text-white">{ownWork.title}</p>
            </div>
          ) : null}
        </div>
      </EcoCard>

      <EcoCard tone="cream">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Submit Karya Akhir</p>
            <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Tulis pesan utama pameranmu</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="block space-y-2 text-sm font-extrabold text-mutedText">
                Judul karya
                <input className="eco-input" value={form.title} onChange={(event) => updateForm("title", event.target.value)} />
              </label>
              <label className="block space-y-2 text-sm font-extrabold text-mutedText">
                Jenis karya
                <select className="eco-input" value={form.category} onChange={(event) => updateForm("category", event.target.value)}>
                  {Object.entries(categoryLabel).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="block space-y-2 text-sm font-extrabold text-mutedText md:col-span-2">
                Pesan utama
                <textarea className="eco-input min-h-24 py-3" value={form.description} onChange={(event) => updateForm("description", event.target.value)} />
              </label>
              <label className="block space-y-2 text-sm font-extrabold text-mutedText md:col-span-2">
                Data pendukung
                <input className="eco-input" value={form.supportingData} onChange={(event) => updateForm("supportingData", event.target.value)} />
              </label>
              <label className="block space-y-2 text-sm font-extrabold text-mutedText md:col-span-2">
                URL gambar mock
                <input className="eco-input" value={form.imageUrl} onChange={(event) => updateForm("imageUrl", event.target.value)} />
              </label>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-leaf-50">
              <Image src={form.imageUrl} alt={`Preview ${form.title}`} fill className="object-cover" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge status={submitted ? "waiting_feedback" : "draft"} label={submitted ? "Menunggu review guru" : "Draft karya"} />
              <EcoBadge className="bg-sun/25 text-earth">Kandidat Badge: {form.badgeCandidate}</EcoBadge>
            </div>
            <p className="mt-3 font-heading text-xl font-black text-leaf-700">{form.title}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{form.description}</p>
            <p className="mt-3 rounded-xl bg-leaf-50 p-3 text-sm font-bold text-leaf-700">{form.supportingData}</p>
          </div>
        </div>
      </EcoCard>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Karya Unggulan Kelas</p>
            <h2 className="mt-2 font-heading text-3xl font-black text-leaf-700">Dipilih untuk dipamerkan</h2>
          </div>
          <EcoBadge className="bg-sun/25 text-earth" icon={<Trophy className="size-4" />}>
            {featured.length} karya pilihan
          </EcoBadge>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {featured.map((post) => (
            <EcoCard key={post.id} tone="cream" className="p-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-leaf-50">
                <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <EcoBadge className="bg-white text-earth">{categoryLabel[post.category ?? "foto_tanaman"]}</EcoBadge>
                <EcoBadge className="bg-leaf-100 text-leaf-700" icon={<Sparkles className="size-3.5" />}>
                  Unggulan
                </EcoBadge>
              </div>
              <h3 className="mt-3 font-heading text-2xl font-black text-leaf-700">{post.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{post.description}</p>
              <p className="mt-3 text-sm font-black text-leaf-700">
                {users.find((user) => user.id === post.studentId)?.name ?? "Eco Explorer"}
              </p>
            </EcoCard>
          ))}
        </div>
      </section>

      <EcoCard>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Galeri Pameran</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Karya yang sudah tayang</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((post) => (
            <article key={post.id} className="rounded-2xl bg-leaf-50 p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
              </div>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-earth">
                {categoryLabel[post.category ?? "foto_tanaman"]}
              </p>
              <p className="mt-1 font-heading text-lg font-black text-leaf-700">{post.title}</p>
            </article>
          ))}
        </div>
      </EcoCard>
    </div>
  );
}
