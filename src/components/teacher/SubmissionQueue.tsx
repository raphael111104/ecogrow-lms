import Link from "next/link";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { TeacherSubmissionItem } from "@/types/ecogrow";
import { cn } from "@/lib/utils";

type SubmissionQueueProps = {
  items: TeacherSubmissionItem[];
  selectedId?: string;
  onSelect?: (item: TeacherSubmissionItem) => void;
  compact?: boolean;
};

export function SubmissionQueue({ items, selectedId, onSelect, compact = false }: SubmissionQueueProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const contents = (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-heading text-lg font-black text-leaf-700">{item.studentName}</p>
              <StatusBadge status={item.status} />
            </div>
            <p className="mt-1 text-sm font-bold text-slateText">{item.mission} - {item.groupName}</p>
            {!compact ? <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{item.observation}</p> : null}
            <p className="mt-2 text-xs font-bold text-mutedText">{item.submittedAt}</p>
          </>
        );
        const classes = cn(
          "block w-full rounded-2xl border p-4 text-left transition",
          selectedId === item.id ? "border-leaf-500/35 bg-leaf-50 shadow-soft" : "border-gardenBorder bg-white hover:bg-leaf-50",
        );

        return onSelect ? (
          <button key={item.id} type="button" className={classes} onClick={() => onSelect(item)}>
            {contents}
          </button>
        ) : (
          <Link key={item.id} href="/guru/monitoring" className={classes}>
            {contents}
          </Link>
        );
      })}
    </div>
  );
}
