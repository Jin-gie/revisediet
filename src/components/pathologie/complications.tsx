// components/pathologie/complications.tsx
import type { Complication } from "@/data/pathologies/types";

export function Complications({ items }: { items: Complication[] }) {
  const groupes = items.reduce<Record<string, Complication[]>>((acc, c) => {
    (acc[c.type] ??= []).push(c);
    return acc;
  }, {});

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {Object.entries(groupes).map(([type, comps]) => (
        <div key={type} className="border border-stone-100 rounded-xl p-4">
          <p className="text-sm font-medium text-stone-800 mb-2.5">{type}</p>
          <div className="space-y-3">
            {comps.map((c) => (
              <div key={c.nom}>
                <p className="text-sm font-medium text-stone-800">
                  {c.emoji && <span className="mr-1">{c.emoji}</span>}
                  {c.nom}
                </p>
                {c.description && (
                  <p className="text-xs text-stone-400 leading-relaxed mt-0.5">
                    {c.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
