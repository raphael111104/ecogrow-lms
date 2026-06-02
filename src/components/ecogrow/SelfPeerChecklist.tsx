"use client";

import { EcoCard } from "@/components/ui/EcoCard";

export function SelfPeerChecklist({
  title,
  items,
  selected,
  onChange,
}: {
  title: string;
  items: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) {
  return (
    <EcoCard className="p-4">
      <h3 className="font-heading text-xl font-black text-leaf-700">{title}</h3>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <label key={item} className="flex items-start gap-3 rounded-xl bg-leaf-50 p-3 text-sm font-bold text-slateText">
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={(event) => onChange(event.target.checked ? [...selected, item] : selected.filter((value) => value !== item))}
              className="mt-0.5 size-4 accent-leaf-500"
            />
            {item}
          </label>
        ))}
      </div>
    </EcoCard>
  );
}
