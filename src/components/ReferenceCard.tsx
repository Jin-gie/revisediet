// components/ReferenceCard.tsx
import Link from "next/link"
import { Reference } from "@/data/references"

export default function ReferenceCard({ reference }: { reference: Reference }) {
  return (
    <div className="border border-stone-100 rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl flex-shrink-0">{reference.emoji}</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-stone-900 leading-snug">
            {reference.acronyme}
          </p>
          <p className="text-xs text-stone-400 leading-snug">{reference.nom}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="px-2 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-700 rounded-full">
          {reference.organisme}
        </span>
        <span className="px-2 py-0.5 text-[11px] font-medium bg-stone-50 text-stone-500 rounded-full">
          {reference.periode}
        </span>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed mb-3">{reference.description}</p>

      {reference.pointsCles.length > 0 && (
        <ul className="space-y-1.5 mt-auto pt-2 border-t border-stone-100">
          {reference.pointsCles.map((pt) => (
            <li key={pt} className="flex items-start gap-2 text-xs text-stone-500">
              <span className="text-emerald-400 mt-0.5 flex-shrink-0">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      )}

      {reference.lien && (
        <Link
          href={reference.lien}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors mt-3"
        >
          Voir sur le site →
        </Link>
      )}
    </div>
  )
}