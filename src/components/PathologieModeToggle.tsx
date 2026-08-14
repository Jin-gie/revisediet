"use client"

import { useState } from "react"
import FlashInfo from "@/components/FlashInfo"
import type { Pathologie } from "@/data/pathologies/types"

export default function PathologieModeToggle({
  patho,
  children,
}: {
  patho: Pathologie
  children: React.ReactNode
}) {
  const [mode, setMode] = useState<"detail" | "flash">("detail")

  return (
    <>
      {patho.flash && (
        <div className="flex justify-end mb-4">
          <div className="inline-flex bg-stone-100 p-1 rounded-xl">
            {(["detail", "flash"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  mode === m
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {m === "detail" ? "📖 Fiche complète" : "⚡ Fiche flash"}
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === "flash" && patho.flash ? (
        <FlashInfo flash={patho.flash} emoji={patho.emoji} label={patho.label} />
      ) : (
        <>{children}</>
      )}
    </>
  )
}