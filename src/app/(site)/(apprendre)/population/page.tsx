"use client"
// app/(site)/(apprendre)/population/page.tsx
import Link from "next/link"
import { POPULATIONS } from "@/data/populations"
import { usePreferences } from "@/components/preferences/PreferencesContext"

export default function PopulationIndexPage() {
  const { unit } = usePreferences();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* En-tête */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-2">
          Conception alimentation
        </p>
        <h1 className="font-serif text-4xl text-stone-900 mb-3">Fiches populations</h1>
        <p className="text-stone-400 text-sm max-w-2xl">
          Besoins énergétiques, repères journaliers et tailles de portions, population par population.
        </p>
      </div>

      {/* Grille */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {POPULATIONS.map((p) => {

          return (
            <Link
              key={p.slug}
              href={`/population/${p.slug}`}
              className="group bg-white border border-stone-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-sm transition-all flex flex-col"
            >
              {/* Titre */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{p.emoji}</span>
                  <h2 className="font-serif text-lg text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {p.label}
                  </h2>
                </div>
                <svg
                  className="w-4 h-4 text-stone-300 group-hover:text-emerald-500 flex-shrink-0 mt-1.5 transition-colors"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-400 mb-3 leading-relaxed line-clamp-2">
                {p.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium bg-stone-50 text-stone-500 px-2 py-0.5 rounded-md border border-stone-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* AET — valeurs telles que fournies dans les données */}
              <div className="pt-4 border-t border-stone-100 space-y-1.5">
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                  AET
                </p>
                {p.aet.valeurs.map((v) => {
                  const valeur = unit === "kcal" ? v.kcal : v.kJ
                  return (
                    <div key={v.profil} className="flex items-baseline justify-between gap-3">
                      <span className="text-xs text-stone-400 truncate">{v.profil}</span>
                      <span className="text-sm font-medium text-stone-700 flex-shrink-0">{valeur}</span>
                    </div>
                  )
                })}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}