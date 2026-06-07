"use client"

import { useState } from "react"
import { ColumnDef, MICRO_COLUMNS } from "@/lib/ciqual"

const GROUP_LABELS: Record<string, string> = {
  mineral: "Minéraux",
  vitamin: "Vitamines",
  lipid: "Acides gras",
  other: "Autres",
}

export default function CiqualColumnPicker({
  active,
  onChange,
}: {
  active: string[]
  onChange: (keys: string[]) => void
}) {
  const [open, setOpen] = useState(false)

  const toggle = (key: string) => {
    onChange(active.includes(key) ? active.filter((k) => k !== key) : [...active, key])
  }

  const groups = Array.from(new Set(MICRO_COLUMNS.map((c) => c.group)))

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium px-3.5 py-2 border border-stone-200 rounded-xl bg-white hover:border-stone-300 transition-colors"
      >
        <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 16 16">
          <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Colonnes
        <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-1.5 py-0.5 rounded-md">
          +{active.length}
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-[calc(100%+8px)] z-40 bg-white border border-stone-100 rounded-2xl shadow-xl p-4 w-72 max-h-[70vh] overflow-y-auto">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
              Micronutriments à afficher
            </p>
            {groups.map((grp) => (
              <div key={grp} className="mb-4">
                <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  {GROUP_LABELS[grp] ?? grp}
                </p>
                <div className="space-y-1">
                  {MICRO_COLUMNS.filter((c) => c.group === grp).map((col) => (
                    <label
                      key={col.key}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-stone-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={active.includes(col.key)}
                        onChange={() => toggle(col.key)}
                        className="accent-emerald-600 w-3.5 h-3.5"
                      />
                      <span className="text-sm text-stone-700">{col.label}</span>
                      <span className="text-xs text-stone-400 ml-auto">{col.unit}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}