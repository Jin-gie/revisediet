// components/shared/Section.tsx
//
// Extrait de app/(site)/(apprendre)/(population)/[slug]/page.tsx pour être
// partagé entre les pages "population" et "pathologie" : même fond blanc,
// même bordure, même arrondi → séparation nette et identique entre les
// deux types de fiches.

export function Section({
  id,
  title,
  emoji,
  children,
}: {
  id?: string;
  title: string;
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="bg-white border border-stone-100 rounded-2xl p-6 scroll-mt-20">
      <h2 className="font-serif text-xl text-stone-900 mb-5 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h2>
      {children}
    </div>
  );
}

export function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-stone-600">
      <span className="text-emerald-400 mt-0.5 flex-shrink-0">•</span>
      <span>{children}</span>
    </li>
  );
}

export function EmptyState({ id, label }: { id?: string; label: string }) {
  return (
    <div
      id={id}
      className="border border-dashed border-stone-200 rounded-2xl p-6 text-center scroll-mt-20"
    >
      <p className="text-sm font-medium text-stone-500 mb-1">{label}</p>
      <p className="text-xs text-stone-400">Cette section sera disponible prochainement.</p>
    </div>
  );
}

// Petit bloc "carte" réutilisé à l'intérieur des Section pour grouper de
// l'info (remplace les Card shadcn qui avaient un rendu trop terne/gris
// par rapport au reste du site).
export function InfoCard({
  titre,
  accent,
  children,
}: {
  titre?: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-stone-100 rounded-xl p-4">
      {titre && (
        <p className={`text-sm font-medium mb-2 ${accent ?? "text-stone-800"}`}>{titre}</p>
      )}
      {children}
    </div>
  );
}

export function SousTitre({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">
      {children}
    </p>
  );
}
