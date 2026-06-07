"use client"

import { useState, useMemo } from "react"
import ciqualData from "@/data/ciqual.json"
import {
  CiqualEntry,
  DEFAULT_COLUMNS,
  ALL_COLUMNS,
  getGroups,
  getSousGroupes,
} from "@/lib/ciqual"
import CiqualTable from "@/components/ciqual/CiqualTable"
import CiqualComparison from "@/components/ciqual/CiqualComparison"
import CiqualColumnPicker from "@/components/ciqual/CiqualColumnPicker"
import CiqualSimplifie from "@/components/ciqual/CiqualSimplifie"

const data = ciqualData as CiqualEntry[]
const groups = getGroups(data)

export default function CiqualPage() {
  const [search, setSearch] = useState("")
  const [group, setGroup] = useState("")
  const [sousGroupe, setSousGroupe] = useState("")
  const [portion, setPortion] = useState("100")
  const [extraColumns, setExtraColumns] = useState<string[]>([])
  const [compared, setCompared] = useState<CiqualEntry[]>([])

  const [mode, setMode] = useState<"complete" | "simplifiee">("complete")

  const sousGroupes = useMemo(
    () => (group ? getSousGroupes(data, group) : []),
    [group]
  )

  const activeColumns = useMemo(() => {
    const extraDefs = ALL_COLUMNS.filter((c) => extraColumns.includes(c.key))
    return [...DEFAULT_COLUMNS, ...extraDefs]
  }, [extraColumns])

  const filtered = useMemo(() => {
    return data.filter((entry) => {
      const matchSearch =
        !search ||
        entry.alim_nom_fr.toLowerCase().includes(search.toLowerCase())
      const matchGroup = !group || entry.alim_grp_nom_fr === group
      const matchSous = !sousGroupe || entry.alim_ssgrp_nom_fr === sousGroupe
      return matchSearch && matchGroup && matchSous
    })
  }, [search, group, sousGroupe])

  const handleCompare = (entry: CiqualEntry) => {
    setCompared((prev) =>
      prev.find((e) => e.alim_code === entry.alim_code)
        ? prev.filter((e) => e.alim_code !== entry.alim_code)
        : prev.length < 5
        ? [...prev, entry]
        : prev
    )
  }

  const portionNum = parseFloat(portion) || 100

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* En-tête */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-2">Outils</p>
        <h1 className="font-serif text-4xl text-stone-900 mb-2">Table Ciqual</h1>
        {/* Toggle */}
        <div className="inline-flex bg-stone-100 p-1 rounded-xl mt-4 mb-8">
          {(["complete", "simplifiee"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`relative px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                mode === m
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {m === "complete" ? "Table Ciqual complète" : "Table simplifiée"}
            </button>
          ))}
        </div>
      </div>

      {mode === "complete" ? (
        <>
          {/* Filtres */}
          <div className="bg-white border border-stone-100 rounded-2xl p-4 mb-5 flex flex-wrap gap-3 items-end">
            {/* Recherche */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
                Recherche
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" fill="none" viewBox="0 0 16 16">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Ex: pain complet, saumon..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>

            {/* Groupe */}
            <div className="min-w-[180px]">
              <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
                Groupe alimentaire
              </label>
              <select
                value={group}
                onChange={(e) => { setGroup(e.target.value); setSousGroupe("") }}
                className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors bg-white"
              >
                <option value="">Tous les groupes</option>
                {groups.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Sous-groupe */}
            {sousGroupes.length > 0 && (
              <div className="min-w-[180px]">
                <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
                  Sous-groupe
                </label>
                <select
                  value={sousGroupe}
                  onChange={(e) => setSousGroupe(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors bg-white"
                >
                  <option value="">Tous</option>
                  {sousGroupes.map((sg) => (
                    <option key={sg} value={sg}>{sg}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Portion */}
            <div className="w-36">
              <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
                Portion
              </label>
              <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden focus-within:border-emerald-400 transition-colors bg-white">
                <input
                  type="number"
                  value={portion}
                  onChange={(e) => setPortion(e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 text-sm focus:outline-none"
                />
                <span className="pr-3 text-xs text-stone-400">g</span>
              </div>
            </div>

            {/* Colonnes */}
            <div>
              <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
                Colonnes
              </label>
              <CiqualColumnPicker active={extraColumns} onChange={setExtraColumns} />
            </div>

            {/* Résultats */}
            <div className="ml-auto self-end">
              <p className="text-xs text-stone-400 text-right">
                <span className="font-semibold text-stone-700">{filtered.length.toLocaleString("fr-FR")}</span> aliment{filtered.length > 1 ? "s" : ""}
              </p>
              {compared.length > 0 && (
                <button
                  onClick={() => setCompared([])}
                  className="text-xs text-red-400 hover:text-red-500 transition-colors mt-0.5"
                >
                  Vider la comparaison ({compared.length})
                </button>
              )}
            </div>
          </div>

          {/* Comparaison */}
          {compared.length > 0 && (
            <div className="mb-5">
              <CiqualComparison
                items={compared}
                columns={activeColumns}
                portion={portionNum}
                onRemove={(code) => setCompared((prev) => prev.filter((e) => e.alim_code !== code))}
              />
            </div>
          )}

          {/* Tableau */}
          <CiqualTable
            data={filtered}
            columns={activeColumns}
            portion={portionNum}
            compared={compared.map((e) => e.alim_code)}
            onCompare={handleCompare}
          />

          <p className="text-xs text-stone-300 mt-4 text-center">
            Source : ANSES — Table de composition nutritionnelle des aliments Ciqual 2025 · Données en accès libre
          </p>
        </>
      ) : (
        <CiqualSimplifie />
      )}
    </div>
  )
}