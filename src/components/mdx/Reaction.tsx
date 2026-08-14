export function Reaction({ from, steps, to, danger }: {
  from: string
  steps: string | string[]
  to: string
  danger?: boolean
}) {
  const stepsArray = Array.isArray(steps) ? steps : [steps]

  return (
    <div className="flex flex-wrap items-center gap-1.5 my-4 text-xs font-medium">
      <span className="bg-stone-100 text-stone-600 px-2.5 py-1.5 rounded-lg">{from}</span>
      {stepsArray.map((step, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-stone-300">→</span>
          <span className="bg-stone-50 text-stone-500 px-2.5 py-1.5 rounded-lg border border-stone-100">{step}</span>
        </span>
      ))}
      <span className="text-stone-300">→</span>
      <span className={`px-2.5 py-1.5 rounded-lg font-semibold ${danger ? "bg-red-50 text-red-700 border border-red-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"}`}>
        {to}
      </span>
    </div>
  )
}