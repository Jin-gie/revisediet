"use client"

import { useState, useMemo } from "react"
import { CiqualEntry, ColumnDef, formatVal, parseVal } from "@/lib/ciqual"

type SortDir = "asc" | "desc"

export default function CiqualTable({
  data,
  columns,
  portion,
  compared,
  onCompare,
}: {
  data: CiqualEntry[]
  columns: ColumnDef[]
  portion: number
  compared: number[]
  onCompare: (entry: CiqualEntry) => void
}) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [page, setPage] = useState(0)
  const PER_PAGE = 50

  const sorted = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const av = parseVal(a[sortKey]) ?? -Infinity
      const bv = parseVal(b[sortKey]) ?? -Infinity
      return sortDir === "desc" ? bv - av : av - bv
    })
  }, [data, sortKey, sortDir])

  const paged = sorted.slice(page * PER_PAGE, (page + 1) * PER_PAGE)
  const totalPages = Math.ceil(sorted.length / PER_PAGE)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc")
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
    setPage(0)
  }

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider sticky left-0 bg-stone-50 min-w-[220px]">
                Aliment
              </th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider min-w-[160px]">
                Groupe
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-3 py-3 text-right text-xs font-semibold text-stone-400 uppercase tracking-wider cursor-pointer hover:text-emerald-600 transition-colors whitespace-nowrap select-none min-w-[90px]"
                >
                  <span className="flex items-center justify-end gap-1">
                    {col.label}
                    {sortKey === col.key ? (
                      <span className="text-emerald-500">{sortDir === "desc" ? "↓" : "↑"}</span>
                    ) : (
                      <span className="text-stone-200">↕</span>
                    )}
                  </span>
                </th>
              ))}
              <th className="px-3 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider text-center min-w-[80px]">
                Comparer
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-50">
            {paged.length === 0 && (
              <tr>
                <td colSpan={columns.length + 3} className="text-center py-12 text-stone-400 text-sm">
                  Aucun résultat
                </td>
              </tr>
            )}
            {paged.map((entry) => {
              const isCompared = compared.includes(entry.alim_code)
              return (
                <tr key={entry.alim_code} className="hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-3 sticky left-0 bg-white group-hover:bg-stone-50">
                    <div>
                      <p className="font-medium text-stone-800 leading-snug">{entry.alim_nom_fr}</p>
                      {entry.alim_ssgrp_nom_fr && (
                        <p className="text-[11px] text-stone-400 mt-0.5">{entry.alim_ssgrp_nom_fr}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs text-stone-500 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100">
                      {entry.alim_grp_nom_fr || "—"}
                    </span>
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-3 py-3 text-right tabular-nums">
                      <span className="text-sm text-stone-700">
                        {formatVal(entry[col.key], portion)}
                      </span>
                      {parseVal(entry[col.key]) !== null && (
                        <span className="text-[10px] text-stone-400 ml-0.5">{col.unit}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-3 py-3 text-center">
                    <button
                      onClick={() => onCompare(entry)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-all ${
                        isCompared
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "text-stone-400 border-stone-200 hover:border-emerald-300 hover:text-emerald-600"
                      }`}
                    >
                      {isCompared ? "✓" : "+"}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-5 py-3 border-t border-stone-100 flex items-center justify-between">
          <p className="text-xs text-stone-400">
            {page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, sorted.length)} sur {sorted.length}
          </p>
          <div className="flex gap-1">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 text-xs border border-stone-200 rounded-lg disabled:opacity-30 hover:border-stone-300 transition-colors"
            >
              ←
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const p = totalPages <= 7 ? i : page < 4 ? i : page + i - 3
              if (p >= totalPages) return null
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 text-xs border rounded-lg transition-colors ${
                    p === page
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  {p + 1}
                </button>
              )
            })}
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 text-xs border border-stone-200 rounded-lg disabled:opacity-30 hover:border-stone-300 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}