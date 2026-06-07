"use client"

import { CiqualEntry, ColumnDef, formatVal, parseVal } from "@/lib/ciqual"

export default function CiqualComparison({
  items,
  columns,
  portion,
  onRemove,
}: {
  items: CiqualEntry[]
  columns: ColumnDef[]
  portion: number
  onRemove: (code: number) => void
}) {
  if (items.length === 0) return null

  // Pour colorer la meilleure valeur par ligne
  const getBest = (col: ColumnDef) => {
    const vals = items.map((item) => parseVal(item[col.key]))
    const nums = vals.filter((v): v is number => v !== null)
    return nums.length ? Math.max(...nums) : null
  }

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
        <h2 className="font-serif text-lg text-stone-900">Comparaison</h2>
        <span className="text-xs text-stone-400">{items.length} aliment{items.length > 1 ? "s" : ""} • pour {portion} g</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider w-36">
                Nutriment
              </th>
              {items.map((item) => (
                <th key={item.alim_code} className="px-4 py-3 text-center min-w-[140px]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-medium text-stone-700 leading-tight text-center">
                      {item.alim_nom_fr}
                    </span>
                    <button
                      onClick={() => onRemove(item.alim_code)}
                      className="text-[10px] text-stone-300 hover:text-red-400 transition-colors"
                    >
                      Retirer ✕
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columns.map((col) => {
              const best = getBest(col)
              return (
                <tr key={col.key} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-2.5 text-xs text-stone-500 font-medium">{col.label}</td>
                  {items.map((item) => {
                    const n = parseVal(item[col.key])
                    const adjusted = n !== null ? (n * portion) / 100 : null
                    const isBest = best !== null && n !== null && n === best
                    return (
                      <td key={item.alim_code} className="px-4 py-2.5 text-center">
                        <span className={`text-sm tabular-nums font-medium ${
                          isBest ? "text-emerald-600" : "text-stone-700"
                        }`}>
                          {adjusted !== null ? (
                            <>
                              {formatVal(item[col.key], portion)}
                              <span className="text-[10px] text-stone-400 ml-0.5">{col.unit}</span>
                            </>
                          ) : "—"}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}