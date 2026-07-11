export default function MdxWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-sm max-w-none
      prose-headings:font-serif prose-headings:font-normal text-stone-900
      prose-strong:text-stone-700 prose-strong:font-semibold
      prose-li:text-stone-500 prose-li:text-sm
      prose-blockquote:border-emerald-300 prose-blockquote:text-stone-400 prose-blockquote:not-italic
      prose-code:text-emerald-700 prose-code:bg-emerald-50 prose-code:px-1 prose-code:rounded prose-code:text-xs prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
      prose-table:text-sm prose-th:text-stone-600 prose-td:text-stone-500"
    >
      {children}
    </div>
  )
}