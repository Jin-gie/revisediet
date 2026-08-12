// components/JustificationTable.tsx
import { JustificationRow } from "@/data/justifications";
import GlossaryText from "./glossary/GlossaryText";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-stone-600 leading-relaxed">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
          <span>
            <GlossaryText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function JustificationTable({ rows }: { rows: JustificationRow[] }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-visible">
      {/* En-têtes de colonnes (desktop uniquement) */}
      <div className="hidden md:grid md:grid-cols-2 border-b border-stone-100 bg-stone-50/60 rounded-t-2xl overflow-hidden">
        <p className="px-6 py-3 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
          Apports
        </p>
        <p className="px-6 py-3 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-l border-stone-100">
          Justification
        </p>
      </div>

      <div className="divide-y divide-stone-100">
        {rows.map((row) =>
          row.isSectionHeader ? (
            <div key={row.id} className="px-6 py-3 bg-emerald-50/60">
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
                {row.title}
              </p>
            </div>
          ) : (
            <div key={row.id} className="grid md:grid-cols-2">
              <div className="px-6 py-5">
                <h3 className="font-medium text-stone-900 mb-3">{row.title}</h3>
                {row.apports && <BulletList items={row.apports} />}
              </div>
              <div className="px-6 py-5 md:border-l border-stone-100 bg-stone-50/30 md:bg-transparent">
                <h3 className="font-medium text-stone-400 text-xs uppercase tracking-wider mb-3 md:hidden">
                  Justification
                </h3>
                {row.justification && <BulletList items={row.justification} />}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}