"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

type Item = { type: "population" | "pathologie" | "biochimie"; slug: string; label: string; emoji: string }
type ProgressRow = { type: string; slug: string; vu: boolean; vu_le: string | null }

export default function SuiviClient({
  items,
  progress,
  userId,
}: {
  items: Item[]
  progress: ProgressRow[]
  userId: string
}) {
  const supabase = createClient()
  const [local, setLocal] = useState<Record<string, ProgressRow>>(
    Object.fromEntries(progress.map((p) => [`${p.type}-${p.slug}`, p]))
  )

  const toggle = async (item: Item) => {
    const key = `${item.type}-${item.slug}`
    const current = local[key]
    const newVu = !current?.vu
    const now = new Date().toISOString()

    setLocal((prev) => ({
      ...prev,
      [key]: { type: item.type, slug: item.slug, vu: newVu, vu_le: newVu ? now : null },
    }))

    await supabase.from("user_progress").upsert({
      user_id: userId,
      type: item.type,
      slug: item.slug,
      label: item.label,
      vu: newVu,
      vu_le: newVu ? now : null,
    }, { onConflict: "user_id,type,slug" })
  }

  const groups = [
    { label: "Fiches populations", type: "population" as const },
    { label: "Fiches pathologies", type: "pathologie" as const },
    { label: "Biochimie", type: "biochimie" as const },
  ]

  const total = items.length
  const done = Object.values(local).filter((p) => p.vu).length
  
  console.log(items)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-2">Mon espace</p>
        <h1 className="font-serif text-4xl text-stone-900 mb-3">Suivi des révisions</h1>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${total ? (done / total) * 100 : 0}%` }}
            />
          </div>
          <span className="text-sm text-stone-500 tabular-nums flex-shrink-0">
            {done} / {total}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {groups.map((group) => {
          const groupItems = items.filter((i) => i.type === group.type)
          const groupDone = groupItems.filter((i) => local[`${i.type}-${i.slug}`]?.vu).length
          return (
            <div key={group.type}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-serif text-xl text-stone-900">{group.label}</h2>
                <span className="text-xs text-stone-400">{groupDone}/{groupItems.length}</span>
              </div>
              <div className="bg-white border border-stone-100 rounded-2xl divide-y divide-stone-50">
                {groupItems.map((item) => {
                  const key = `${item.type}-${item.slug}`
                  const row = local[key]
                  const vu = row?.vu ?? false
                  const vuLe = row?.vu_le

                  return (
                    <div key={key} className="flex items-center gap-4 px-5 py-3.5">
                      <button
                        onClick={() => toggle(item)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          vu
                            ? "bg-emerald-600 border-emerald-600"
                            : "border-stone-300 hover:border-emerald-400"
                        }`}
                      >
                        {vu && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>

                      <span className="text-base flex-shrink-0">{item.emoji}</span>

                      <Link
                        href={`/${item.type === "population" ? "populations" : item.type === "pathologie" ? "pathologies" : "biochimie"}/${item.slug}`}
                        className={`flex-1 text-sm font-medium transition-colors hover:text-emerald-700 ${vu ? "text-stone-400 line-through" : "text-stone-800"}`}
                      >
                        {item.label}
                      </Link>

                      {vuLe && (
                        <span className="text-[11px] text-stone-400 flex-shrink-0">
                          {new Date(vuLe).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}