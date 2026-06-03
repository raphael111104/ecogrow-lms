"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, CheckCircle2, ClipboardCheck, Send, Star } from "lucide-react";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { ecoExhibitionItems, ecoExhibitionRubric, galleryPosts, users } from "@/data";
import { useMockStorage } from "@/hooks/useMockStorage";
import type { GalleryPost } from "@/types/ecogrow";

const categoryLabel = {
  foto_tanaman: "Foto tanaman",
  poster: "Poster proyek",
  panen: "Foto panen",
  refleksi: "Cerita praktik baik",
  laporan_proyek: "Laporan proyek",
};

const exhibitionTypeLabel = {
  photo: "Foto pengamatan",
  poster: "Poster",
  story: "Cerita",
  report: "Laporan proyek",
  harvest_report: "Laporan panen",
};

export function TeacherGalleryPage() {
  const [posts, setPosts] = useMockStorage<GalleryPost[]>("ecoGrow-exhibition-gallery", galleryPosts);
  const [selectedId, setSelectedId] = useState(galleryPosts.find((post) => post.moderationStatus === "pending")?.id ?? galleryPosts[0].id);
  const [notice, setNotice] = useState("");
  const selected = posts.find((post) => post.id === selectedId) ?? posts[0];
  const selectedCandidate =
    ecoExhibitionItems.find((item) => item.sourcePostId === selected.id) ??
    ecoExhibitionItems.find((item) => item.title === selected.title);
  const pending = posts.filter((post) => post.moderationStatus === "pending").length;
  const published = posts.filter((post) => post.moderationStatus === "approved").length;
  const featured = posts.filter((post) => post.isFeatured).length;

  const publishSelected = () => {
    setPosts((current) =>
      current.map((post) =>
        post.id === selected.id
          ? {
              ...post,
              moderationStatus: "approved",
              isFeatured: true,
              teacherComment: "Karya pilihan kelas. Lulus Misi Ekologis dan siap dipamerkan.",
            }
          : post,
      ),
    );
    setNotice(`${selected.title} sudah dipublikasikan sebagai karya unggulan.`);
  };

  const requestRevision = () => {
    setPosts((current) =>
      current.map((post) =>
        post.id === selected.id
          ? { ...post, moderationStatus: "revision", teacherComment: "Tambahkan bukti pengamatan sebelum dipamerkan." }
          : post,
      ),
    );
    setNotice(`Catatan revisi untuk ${selected.title} sudah disimpan.`);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Eco-Exhibition"
        title="Kurasi Panggung Panen Kelas"
        description="Pilih karya yang menunjukkan pemahaman dan aksi ekologis siswa, lalu publikasikan sebagai pencapaian akhir kelas."
        badge="Kelas 4B"
        actions={
          <EcoButton icon={<Send className="size-4" />} onClick={publishSelected}>
            Publikasikan ke Galeri
          </EcoButton>
        }
      />

      {notice ? <FriendlyAlert tone="success" title="Perubahan pameran tersimpan." description={notice} /> : null}

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Karya masuk", value: posts.length, icon: ClipboardCheck },
          { label: "Menunggu review", value: pending, icon: Award },
          { label: "Karya unggulan", value: featured, icon: Star },
        ].map(({ label, value, icon: Icon }) => (
          <EcoCard key={label} tone={label === "Menunggu review" ? "cream" : "white"} className="flex items-center justify-between p-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.13em] text-mutedText">{label}</p>
              <p className="mt-2 font-heading text-4xl font-black text-leaf-700">{value}</p>
            </div>
            <Icon className="size-8 text-leaf-500" aria-hidden="true" />
          </EcoCard>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <EcoCard>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Daftar Karya</p>
              <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Siap dikurasi</h2>
            </div>
            <EcoBadge className="bg-leaf-100 text-leaf-700">{published} tayang</EcoBadge>
          </div>
          <div className="mt-5 space-y-3">
            {posts.map((post) => (
              <button
                key={post.id}
                type="button"
                aria-pressed={post.id === selected.id}
                onClick={() => setSelectedId(post.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  post.id === selected.id ? "border-leaf-500 bg-leaf-50" : "border-gardenBorder bg-white hover:border-leaf-500/30"
                }`}
              >
                <p className="font-heading text-lg font-black text-leaf-700">{post.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StatusBadge status={post.moderationStatus ?? "pending"} />
                  <span className="text-xs font-bold text-mutedText">{categoryLabel[post.category ?? "foto_tanaman"]}</span>
                </div>
              </button>
            ))}
          </div>
        </EcoCard>

        <EcoCard tone="soft">
          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl bg-white">
            <Image src={selected.imageUrl} alt={selected.title} fill className="object-cover" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <StatusBadge status={selected.moderationStatus ?? "pending"} />
            {selected.moderationStatus === "approved" ? (
              <EcoBadge className="bg-sun/25 text-earth" icon={<CheckCircle2 className="size-4" />}>
                Lulus Misi Ekologis
              </EcoBadge>
            ) : null}
          </div>
          <h2 className="mt-3 font-heading text-3xl font-black text-leaf-700">{selected.title}</h2>
          <p className="mt-2 text-sm font-semibold leading-7 text-slateText">{selected.description}</p>
          <p className="mt-3 text-sm font-black text-leaf-700">
            {users.find((user) => user.id === selected.studentId)?.name ?? "Siswa"} - {categoryLabel[selected.category ?? "foto_tanaman"]}
          </p>
          {selectedCandidate ? (
            <div className="mt-4 grid gap-3 rounded-2xl bg-white p-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.13em] text-mutedText">Kandidat Badge</p>
                <p className="mt-1 font-heading text-lg font-black text-leaf-700">{selectedCandidate.badgeCandidate}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.13em] text-mutedText">Jenis Karya</p>
                <p className="mt-1 text-sm font-bold text-slateText">{exhibitionTypeLabel[selectedCandidate.type]}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.13em] text-mutedText">Pemilik</p>
                <p className="mt-1 text-sm font-bold text-slateText">{selectedCandidate.studentName}</p>
                {selectedCandidate.groupName ? <p className="mt-1 text-xs font-bold text-mutedText">{selectedCandidate.groupName}</p> : null}
              </div>
            </div>
          ) : null}
          {selectedCandidate?.mainMessage ? (
            <div className="mt-4 rounded-2xl bg-white p-4">
              <p className="text-xs font-black uppercase tracking-[0.13em] text-mutedText">Pesan Utama</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slateText">{selectedCandidate.mainMessage}</p>
              {selectedCandidate.evidence?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedCandidate.evidence.map((item) => (
                    <EcoBadge key={item} className="bg-leaf-100 text-leaf-700">
                      {item}
                    </EcoBadge>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          {selected.teacherComment ? (
            <p className="mt-4 rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-slateText">{selected.teacherComment}</p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <EcoButton icon={<Send className="size-4" />} onClick={publishSelected}>
              Publikasikan ke Galeri
            </EcoButton>
            <EcoButton variant="secondary" onClick={requestRevision}>
              Minta Revisi
            </EcoButton>
          </div>
        </EcoCard>
      </section>

      <EcoCard tone="cream">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Rubrik Pameran</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Yang dilihat saat memilih karya</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {ecoExhibitionRubric.slice(0, 4).map((criterion) => (
            <div key={criterion.id} className="rounded-2xl bg-white p-4">
              <p className="font-bold text-leaf-700">{criterion.aspect}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{criterion.good}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.13em] text-earth">{criterion.maxScore} poin</p>
            </div>
          ))}
        </div>
      </EcoCard>
    </div>
  );
}
