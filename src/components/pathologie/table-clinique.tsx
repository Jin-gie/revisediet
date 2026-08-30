// components/pathologie/table-clinique.tsx
import type { SigneClinique } from "@/data/pathologies/types";

export function TableClinique({ items }: { items: SigneClinique[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-stone-800 mb-2.5">Clinique</p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {items.map((s) => (
          <div key={s.signe} className="border border-stone-100 rounded-xl p-3.5 flex gap-3">
            <span className="text-xl leading-none flex-shrink-0">{s.emoji}</span>
            <div>
              <p className="text-sm font-medium text-stone-800">{s.signe}</p>
              <p className="text-xs text-stone-400 leading-relaxed mt-0.5">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
