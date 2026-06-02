import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function sourceAt(relativeUrl) {
  return readFile(new URL(relativeUrl, import.meta.url), "utf8").catch(() => "");
}

const layoutSource = await sourceAt("../../data/layout-ux.ts");
const navigationSource = await sourceAt("../../data/navigation.ts");
const mockDataSource = await sourceAt("../../data/mock.ts");
const missionSource = await sourceAt("./ecomission/EcoMissionPage.tsx");
const reflectionSource = await sourceAt("./reflection/ReflectionPage.tsx");
const portfolioSource = await sourceAt("./portfolio/PortfolioPage.tsx");
const gallerySource = await sourceAt("./gallery/StudentGalleryPage.tsx");
const playSource = await sourceAt("./ecoplay/EcoPlayPage.tsx");
const uploadSource = await sourceAt("../../components/shared/MockUploadBox.tsx");
const recommendationSource = await sourceAt("../../lib/ecogrow-assessment-utils.ts");
const prototypeSource = await sourceAt("../../components/prototype/PrototypePages.tsx");

test("student journey and navigation lead with friendly action language", () => {
  for (const label of ["Kenali Alam", "Jelajahi Masalah", "Lakukan Aksi", "Cerita dan Renungan", "Pamerkan Karya"]) {
    assert.match(layoutSource, new RegExp(`label: \"${label}\"`));
  }
  assert.match(navigationSource, /label:\s*"Album Belajarku"/);
  assert.doesNotMatch(navigationSource, /label:\s*"Portofolio"/);
  assert.match(missionSource, /Lakukan Aksi/);
  assert.doesNotMatch(missionSource, /Tahap Aksi - Niti Bukti/);
  assert.match(gallerySource, /Pamerkan Karya/);
  assert.doesNotMatch(gallerySource, /badge="Niti Sajati"/);
});

test("student stories, albums, and recommendations avoid academic terms", () => {
  assert.match(reflectionSource, /Cerita Hari Ini/);
  assert.match(reflectionSource, /Jejak Ceritaku/);
  assert.match(reflectionSource, /Buka Album Belajarku/);
  assert.match(portfolioSource, /Album Belajarku/);
  assert.match(recommendationSource, /Latihan Ulang/);
  assert.match(recommendationSource, /Tantangan Lanjutan/);
  assert.match(recommendationSource, /album belajarmu/);
  assert.match(mockDataSource, /Mulai Kenali Alam/);
  assert.match(mockDataSource, /Selesai Lakukan Aksi/);
});

test("student practice screens replace prototype jargon with helpful copy", () => {
  assert.match(playSource, /Mode latihan dibuka/);
  assert.doesNotMatch(playSource, /Mode permainan mock/);
  assert.match(uploadSource, /Pratinjau gambar/);
  assert.match(prototypeSource, /Tantangan dikirim\. Pesan Guru akan segera datang\./);
  assert.match(prototypeSource, /Detail tantangan/);
  assert.match(prototypeSource, /Pratinjau bukti tantangan/);
  assert.match(prototypeSource, /Tulis ceritamu tentang panen/);
});
