// app/(site)/(apprendre)/references/page.tsx
import { getReferencesByCategorie } from "@/data/references"
import ReferenceCard from "@/components/ReferenceCard"

function Section({
  id,
  title,
  emoji,
  intro,
  children,
}: {
  id: string
  title: string
  emoji: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="scroll-mt-20">
      <h2 className="font-serif text-xl text-stone-900 mb-2 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h2>
      {intro && <p className="text-sm text-stone-400 leading-relaxed mb-5 max-w-2xl">{intro}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
    </div>
  )
}

export default function ReferencesPage() {
  const programmes = getReferencesByCategorie("programme")
  const populations = getReferencesByCategorie("population")
  const restauration = getReferencesByCategorie("restauration")
  const organismes = getReferencesByCategorie("organisme")

  const sommaire = [
    { id: "programmes", label: "Programmes & stratégies" },
    { id: "populations", label: "Populations spécifiques" },
    { id: "restauration", label: "Restauration collective" },
    { id: "organismes", label: "Organismes de référence" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-stone-900 mb-3">Références & textes clés</h1>
        <p className="text-stone-500 text-sm max-w-xl">
          Les principaux programmes, avis et organismes à connaître pour le BTS diététique :
          qui les a rédigés, à quoi ils servent, et ce qu'il faut en retenir.
        </p>
      </div>

      <div className="flex gap-8 items-start flex-row-reverse">
        <nav className="hidden lg:block sticky top-24 w-48 flex-shrink-0">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">
            Sur cette page
          </p>
          <ul className="space-y-1">
            {sommaire.map((item) => (
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

        <div className="min-w-0 flex-1 space-y-10">
          <Section
            id="programmes"
            title="Programmes & stratégies nationales"
            emoji="🎯"
            intro="Les grandes politiques publiques qui fixent le cadre général."
          >
            {programmes.map((r) => (
              <ReferenceCard key={r.slug} reference={r} />
            ))}
          </Section>

          <Section
            id="populations"
            title="Repères pour populations spécifiques"
            emoji="👥"
            intro="Les avis qui adaptent les repères du PNNS selon l'âge et la situation physiologique — à mettre en lien avec tes fiches population."
          >
            {populations.map((r) => (
              <ReferenceCard key={r.slug} reference={r} />
            ))}
          </Section>

          <Section
            id="restauration"
            title="Restauration collective"
            emoji="🍽️"
          >
            {restauration.map((r) => (
              <ReferenceCard key={r.slug} reference={r} />
            ))}
          </Section>

          <Section
            id="organismes"
            title="Organismes de référence"
            emoji="🏛️"
            intro="Qui produit quoi, pour savoir qui citer dans tes copies."
          >
            {organismes.map((r) => (
              <ReferenceCard key={r.slug} reference={r} />
            ))}
          </Section>
        </div>
      </div>
    </div>
  )
}