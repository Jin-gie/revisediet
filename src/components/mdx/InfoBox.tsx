const STYLES = {
  info:    { bg: "bg-blue-50",   border: "border-blue-100",   text: "text-blue-800",   icon: "ℹ️" },
  warning: { bg: "bg-amber-50",  border: "border-amber-100",  text: "text-amber-800",  icon: "⚠️" },
  danger:  { bg: "bg-red-50",    border: "border-red-100",    text: "text-red-800",    icon: "🚨" },
  success: { bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-800", icon: "✅" },
}

export function InfoBox({ type = "info", titre, children }: {
  type?: keyof typeof STYLES
  titre?: string
  children: React.ReactNode
}) {
  const s = STYLES[type]
  return (
    <div className={`${s.bg} ${s.border} border rounded-xl px-5 py-4 my-4`}>
      {titre && (
        <p className={`text-xs font-bold uppercase tracking-wider ${s.text} mb-2`}>
          {s.icon} {titre}
        </p>
      )}
      <div className={`text-sm ${s.text} leading-relaxed [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1 [&>p]:mb-1`}>
        {children}
      </div>
    </div>
  )
}