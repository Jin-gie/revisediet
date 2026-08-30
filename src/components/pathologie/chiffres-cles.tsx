// components/pathologie/chiffres-cles.tsx
import type { ChiffreCle } from "@/data/pathologies/types";

export function ChiffresCles({ items }: { items: ChiffreCle[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((c) => (
        <div key={c.label} className="border border-stone-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-semibold text-emerald-700">{c.valeur}</p>
          <p className="text-xs text-stone-400 mt-1 leading-snug">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
