"use client"

import { useState } from "react"
import { GLOSSAIRE, CATEGORY_LABELS, type GlossaryCategories } from "@/data/glossaire"

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as GlossaryCategories[]

export default function GlossairePage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<GlossaryCategories | null>(null)

  const filtered = GLOSSAIRE.filter((entry) => {
    const matchSearch =
      !search ||
      entry.term.toLowerCase().includes(search.toLowerCase()) ||
      entry.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !activeCategory || entry.category.includes(activeCategory)
    return matchSearch && matchCategory
  }).sort((a, b) => a.term.localeCompare(b.term, "fr"))

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* En-tête */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-2">
          Outils
        </p>
        <h1 className="font-serif text-4xl text-stone-900 mb-3">Glossaire</h1>
        <p className="text-stone-400 text-sm max-w-lg">
          Les termes clés de la diététique et de la nutrition, définis clairement.
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
            placeholder="Rechercher un terme…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-xl bg-white text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
              !activeCategory
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
            }`}
          >
            Toutes
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
                activeCategory === cat
                  ? "bg-emerald-700 text-white border-emerald-700"
                  : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-stone-400 mb-5">
        {filtered.length} terme{filtered.length > 1 ? "s" : ""}
      </p>

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-stone-400 text-sm">
          Aucun terme ne correspond à ta recherche.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry) => (
            <div
              key={entry.term}
              className="bg-white border border-stone-100 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <div>
                  <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-widest mb-1">
                    {entry.term}
                  </p>
                  <h2 className="font-serif text-lg text-stone-900">{entry.title}</h2>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end flex-shrink-0">
                  {entry.category.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-medium bg-stone-50 text-stone-500 px-2 py-0.5 rounded-md border border-stone-100 whitespace-nowrap"
                    >
                      {CATEGORY_LABELS[cat]}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-1.5 mt-4">
                {entry.items.map((item, i) =>
                  item === "-----" ? (
                    <li key={i} className="border-t border-stone-100 my-2" />
                  ) : (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-600 leading-relaxed">
                      <span className="text-emerald-400 mt-0.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}