export function EtapesList({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>
}

export function Etape({ numero, titre, children }: { numero: number; titre: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
        {numero}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-stone-800 mb-1.5">{titre}</p>
        <div className="text-xs text-stone-500 leading-relaxed space-y-1.5 [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1">
          {children}
        </div>
      </div>
    </div>
  )
}