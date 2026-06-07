"use client"

import { useState, useMemo } from "react"
import data from "@/data/ciqual-simplifie.json"

type Row = typeof data[0]

const COLUMNS: { key: keyof Row; label: string; unit: string; color: string }[] = [
  { key: "proteines",  label: "P",       unit: "g",  color: "text-red-500" },
  { key: "lipides",    label: "L",       unit: "g",  color: "text-amber-400" },
  { key: "glucides",   label: "G",       unit: "g",  color: "text-blue-500" },
  { key: "calcium",    label: "Ca",      unit: "mg", color: "text-cyan-500" },
  { key: "fer",        label: "Fer",     unit: "mg", color: "text-stone-500" },
  { key: "sodium",     label: "Na",      unit: "mg", color: "text-orange-400" },
  { key: "potassium",  label: "K",       unit: "mg", color: "text-stone-500" },
  { key: "vitamine_c", label: "Vit C",   unit: "mg", color: "text-emerald-500" },
  { key: "fibres",     label: "Fibres",  unit: "g",  color: "text-stone-500" },
]

const GROUPES = Array.from(new Set(data.map((d) => d.groupe)))

export default function CiqualSimplifie() {
  const [search, setSearch] = useState("")
  const [groupe, setGroupe] = useState("")
  const [sortKey, setSortKey] = useState<keyof Row | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const filtered = useMemo(() => {
    let rows = data as Row[]
    if (search) rows = rows.filter((r) => r.aliment.toLowerCase().includes(search.toLowerCase()))
    if (groupe) rows = rows.filter((r) => r.groupe === groupe)
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = (a[sortKey] as number | null) ?? -Infinity
        const bv = (b[sortKey] as number | null) ?? -Infinity
        return sortDir === "desc" ? bv - av : av - bv
      })
    }
    return rows
  }, [search, groupe, sortKey, sortDir])

  const handleSort = (key: keyof Row) => {
    if (sortKey === key) setSortDir(sortDir === "desc" ? "asc" : "desc")
    else { setSortKey(key); setSortDir("desc") }
  }

  return (
    <div className="space-y-4">
      {/* Filtres */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" fill="none" viewBox="0 0 16 16">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un aliment…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>
        <select
          value={groupe}
          onChange={(e) => setGroupe(e.target.value)}
          className="px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-400 bg-white transition-colors"
        >
          <option value="">Tous les groupes</option>
          {GROUPES.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <p className="text-xs text-stone-400 ml-auto self-center">
          <span className="font-semibold text-stone-700">{filtered.length}</span> aliment{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Tableau */}
      <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider sticky left-0 bg-stone-50 min-w-[160px]">
                  Aliment
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key as string}
                    onClick={() => handleSort(col.key)}
                    className={`px-4 py-3 text-center text-xs font-bold uppercase tracking-wider cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap select-none min-w-[64px] ${col.color}`}
                  >
                    <span className="flex items-center justify-center gap-1">
                      {col.label}
                      {sortKey === col.key ? (
                        <span>{sortDir === "desc" ? "↓" : "↑"}</span>
                      ) : (
                        <span className="text-stone-200 font-normal">↕</span>
                      )}
                    </span>
                    <div className="text-[10px] font-normal text-stone-400 normal-case tracking-normal">{col.unit}/100g</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filtered.map((row) => (
                <tr key={row.aliment} className="hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-3 sticky left-0 bg-white">
                    <p className="font-medium text-stone-800 text-sm leading-snug">{row.aliment}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{row.groupe}</p>
                  </td>
                  {COLUMNS.map((col) => {
                    const val = row[col.key] as number | null
                    return (
                      <td key={col.key as string} className="px-4 py-3 text-center">
                        {val !== null ? (
                          <span className={`text-sm font-semibold tabular-nums ${col.color}`}>
                            {val % 1 === 0 ? val : val}
                          </span>
                        ) : (
                          <span className="text-stone-300 text-sm">/</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-stone-300 text-center">
        Table simplifiée à usage pédagogique — valeurs moyennes arrondies
      </p>
    </div>
  )
}