"use client"

import Link from "next/link"
import { useState } from "react"
import { PATHOLOGIES } from "@/data/pathologies"

const ALL_TAGS = Array.from(new Set(PATHOLOGIES.flatMap((p) => p.tags)))

const GRAVITE_STYLE: Record<string, string> = {
  "faible":      "bg-emerald-50 text-emerald-700",
  "modérée":     "bg-amber-50 text-amber-700",
  "élevée":      "bg-orange-50 text-orange-700",
  "très élevée": "bg-red-50 text-red-700",
}

export default function PathologiesPage() {
  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = PATHOLOGIES.filter((p) => {
    const matchSearch =
      !search ||
      p.label.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchTag = !activeTag || p.tags.includes(activeTag)
    return matchSearch && matchTag
  })

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* En-tête */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-2">
          Apprendre
        </p>
        <h1 className="font-serif text-4xl text-stone-900 mb-3">Fiches pathologies</h1>
        <p className="text-stone-400 text-sm max-w-lg">
          Physiopathologie, diagnostic, complications, traitement et diététique thérapeutique pour chaque pathologie du programme BTS.
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" fill="none" viewBox="0 0 16 16">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher une pathologie…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-xl bg-white text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
              !activeTag ? "bg-emerald-700 text-white border-emerald-700" : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
            }`}
          >
            Toutes
          </button>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
                activeTag === tag ? "bg-emerald-700 text-white border-emerald-700" : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-stone-400 mb-5">
        {filtered.length} pathologie{filtered.length > 1 ? "s" : ""}
      </p>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-stone-400 text-sm">
          Aucune pathologie ne correspond à ta recherche.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((patho) => (
            <Link
              key={patho.slug}
              href={`/pathologies/${patho.slug}`}
              className="group bg-white border border-stone-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-sm transition-all flex gap-4"
            >
              <div className="text-3xl flex-shrink-0 mt-0.5">{patho.emoji}</div>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="font-medium text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {patho.label}
                  </h2>
                  <svg className="w-4 h-4 text-stone-300 group-hover:text-emerald-500 flex-shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 16 16">
                    <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-xs text-stone-400 mb-3 leading-relaxed line-clamp-2">{patho.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${GRAVITE_STYLE[patho.gravite]}`}>
                    ● {patho.gravite}
                  </span>
                  {patho.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-medium bg-stone-50 text-stone-500 px-2 py-0.5 rounded-md border border-stone-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
