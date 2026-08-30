export default async function LateralMenu({ params }: { params: Promise<{ slug: string, items: { id: string; label: string }[] }> }) {
  const { slug, items } = await params;

  
  return (
    <nav className="hidden lg:block sticky top-24 w-44 flex-shrink-0">
      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">
        Sur cette page
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block text-xs text-stone-400 hover:text-emerald-700 py-1 px-2 rounded-lg hover:bg-emerald-50 transition-all"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}