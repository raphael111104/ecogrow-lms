"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { badgeDistribution, journals, missionProgress, studentProfiles } from "@/data";
import type { JournalEntry } from "@/types/ecogrow";

const chartColors = ["#167A3A", "#38BDF8", "#F6C343", "#F59E0B", "#9A6B3F"];

const conditionLabel: Record<JournalEntry["condition"], string> = {
  sehat: "Sehat",
  layu: "Layu",
  kuning: "Kuning",
  perlu_perawatan: "Perlu perawatan",
};

function MeasuredChart({
  children,
  className = "h-64 w-full",
  height = 256,
}: {
  children: (width: number, height: number) => ReactNode;
  className?: string;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(ref.current?.clientWidth ?? 0);
    update();
    const observer = new ResizeObserver(update);
    if (ref.current) observer.observe(ref.current);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ minHeight: height }}>
      {width > 0 ? children(width, height) : <div className="h-full rounded-xl bg-leaf-50" aria-hidden="true" />}
    </div>
  );
}

export function GrowthLineChart({ data = journals }: { data?: JournalEntry[] }) {
  const chartData = useMemo(() => {
    const byDate = new Map<string, Record<string, string | number>>();
    data.forEach((entry) => {
      const group =
        studentProfiles.find((profile) => profile.userId === entry.studentId)?.groupName ?? "Kelompok";
      const record = byDate.get(entry.date) ?? { date: entry.date.slice(5) };
      record[group] = entry.plantHeightCm;
      byDate.set(entry.date, record);
    });
    return Array.from(byDate.values());
  }, [data]);

  return (
    <MeasuredChart className="h-72 w-full" height={288}>
      {(width, height) => (
        <LineChart data={chartData} width={width} height={height} margin={{ left: -16, right: 12, top: 12, bottom: 0 }}>
          <CartesianGrid stroke="#D9E8DD" strokeDasharray="4 6" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} stroke="#64748B" />
          <YAxis tickLine={false} axisLine={false} stroke="#64748B" />
          <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #D9E8DD" }} />
          <Line type="monotone" dataKey="Tim Tunas Hijau" stroke="#167A3A" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="Tim Sahabat Tanah" stroke="#38BDF8" strokeWidth={3} dot={false} />
        </LineChart>
      )}
    </MeasuredChart>
  );
}

export function LeafBarChart({ data = journals }: { data?: JournalEntry[] }) {
  const chartData = data.slice(-10).map((entry) => ({
    date: entry.date.slice(5),
    daun: entry.leafCount,
  }));

  return (
    <MeasuredChart className="h-64 w-full" height={256}>
      {(width, height) => (
        <BarChart data={chartData} width={width} height={height} margin={{ left: -16, right: 12, top: 12, bottom: 0 }}>
          <CartesianGrid stroke="#D9E8DD" strokeDasharray="4 6" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} stroke="#64748B" />
          <YAxis tickLine={false} axisLine={false} stroke="#64748B" />
          <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #D9E8DD" }} />
          <Bar dataKey="daun" radius={[10, 10, 0, 0]} fill="#167A3A" />
        </BarChart>
      )}
    </MeasuredChart>
  );
}

export function ConditionPieChart({ data = journals }: { data?: JournalEntry[] }) {
  const chartData = Object.entries(
    data.reduce<Record<string, number>>((acc, entry) => {
      acc[conditionLabel[entry.condition]] = (acc[conditionLabel[entry.condition]] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  return (
    <MeasuredChart className="h-64 w-full" height={256}>
      {(width, height) => (
        <PieChart width={width} height={height}>
          <Pie data={chartData} innerRadius={54} outerRadius={88} dataKey="value" nameKey="name">
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #D9E8DD" }} />
        </PieChart>
      )}
    </MeasuredChart>
  );
}

export function MissionProgressChart() {
  return (
    <MeasuredChart className="mt-5 h-[260px] w-full" height={260}>
      {(width, height) => (
        <BarChart data={missionProgress} width={width} height={height} margin={{ left: -16, right: 12, top: 12, bottom: 0 }}>
          <CartesianGrid stroke="#D9E8DD" strokeDasharray="4 6" />
          <XAxis dataKey="stage" tickLine={false} axisLine={false} stroke="#64748B" />
          <YAxis tickLine={false} axisLine={false} stroke="#64748B" />
          <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #D9E8DD" }} />
          <Bar dataKey="selesai" stackId="a" fill="#167A3A" radius={[10, 10, 0, 0]} />
          <Bar dataKey="berjalan" stackId="a" fill="#F6C343" radius={[10, 10, 0, 0]} />
        </BarChart>
      )}
    </MeasuredChart>
  );
}

export function BadgeDistributionChart() {
  return (
    <MeasuredChart className="h-[260px] w-full" height={260}>
      {(width, height) => (
        <BarChart data={badgeDistribution} width={width} height={height} layout="vertical" margin={{ left: 8, right: 12, top: 12, bottom: 0 }}>
          <CartesianGrid stroke="#D9E8DD" strokeDasharray="4 6" />
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" width={120} tickLine={false} axisLine={false} stroke="#64748B" />
          <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #D9E8DD" }} />
          <Bar dataKey="value" radius={[0, 10, 10, 0]} fill="#167A3A" />
        </BarChart>
      )}
    </MeasuredChart>
  );
}
