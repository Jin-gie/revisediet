// components/pathologie/facteurs-risque.tsx
import type { Pathologie } from "@/data/pathologies/types";
import { Bullet } from "@/components/shared/Section";

export function FacteursRisque({
  data,
}: {
  data: NonNullable<Pathologie["facteursRisque"]>;
}) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-stone-400 leading-relaxed">{data.introduction}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.groupes.map((g) => (
          <div key={g.groupe} className="border border-stone-100 rounded-xl p-4">
            <p className="text-sm font-medium text-stone-800 mb-2.5">{g.groupe}</p>
            <ul className="space-y-1.5">
              {g.items.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
