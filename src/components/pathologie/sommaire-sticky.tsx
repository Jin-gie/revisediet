"use client";
// components/pathologie/sommaire-sticky.tsx

export function SommaireSticky({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav className="sticky top-0 z-10 -mx-4 bg-background/95 px-4 py-3 backdrop-blur border-b">
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
