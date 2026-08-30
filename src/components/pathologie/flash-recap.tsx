// components/pathologie/flash-recap.tsx
import type { Pathologie } from "@/data/pathologies/types";
import { Bullet } from "@/components/shared/Section";

export function FlashRecap({ data }: { data: Pathologie["flash"] }) {
  return (
    <div className="space-y-5">
      <div className="border border-emerald-100 bg-emerald-50/50 rounded-xl p-4">
        <p className="text-sm font-medium text-stone-800">{data.definition}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {data.motsClés.map((mot) => (
            <span
              key={mot}
              className="text-xs px-2 py-0.5 rounded-full border border-emerald-200 text-emerald-700 bg-white"
            >
              {mot}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {data.sections.map((s) => (
          <div key={s.titre} className="border border-stone-100 rounded-xl p-4">
            <p className="text-sm font-medium text-stone-800 mb-2.5">{s.titre}</p>
            <ul className="space-y-1.5">
              {s.items.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
