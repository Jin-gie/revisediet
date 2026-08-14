"use client"

import { useState } from "react"
import type { Pathologie } from "@/data/pathologies/types"

export default function FlashInfo({ flash, emoji, label }: {
  flash: NonNullable<Pathologie["flash"]>
  emoji: string
  label: string
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <span>{emoji}</span>
          <span className="font-serif text-lg text-stone-900">{label}</span>
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-widest ml-1">
            Flash
          </span>
        </div>
      </div>

      {/* Définition */}
      <div className="px-6 py-4 bg-stone-50 border-b border-stone-100">
        <p className="text-sm text-stone-600 leading-relaxed">{flash.definition}</p>
      </div>

      {/* Mots-clés */}
      <div className="px-6 py-4 border-b border-stone-100">
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">Mots-clés</p>
        <div className="flex flex-wrap gap-1.5">
          {flash.motsClés.map((mot) => (
            <span key={mot} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-100 font-medium">
              {mot}
            </span>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="divide-y divide-stone-50">
        {flash.sections.map((section) => (
          <div key={section.titre} className="px-6 py-4">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">
              {section.titre}
            </p>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}