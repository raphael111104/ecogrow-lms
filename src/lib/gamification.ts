export function calculateLevel(points: number) {
  if (points >= 1200) return 5;
  if (points >= 800) return 4;
  if (points >= 500) return 3;
  if (points >= 250) return 2;
  return 1;
}

export function getLevelName(level: number) {
  const map: Record<number, string> = {
    1: "Benih",
    2: "Tunas",
    3: "Daun Muda",
    4: "Pohon Kecil",
    5: "Eco Master",
  };
  return map[level] ?? "Benih";
}

export function getProgressToNextLevel(points: number) {
  const thresholds = [0, 250, 500, 800, 1200];
  const level = calculateLevel(points);
  if (level === 5) return 100;
  const current = thresholds[level - 1];
  const next = thresholds[level];
  return Math.round(((points - current) / (next - current)) * 100);
}
