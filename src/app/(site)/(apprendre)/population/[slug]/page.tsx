// app/(site)/(apprendre)/(population)/[slug]/page.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import { POPULATIONS, getPopulation } from "@/data/populations"
import { getJustification } from "@/data/justifications"
import JustificationTable from "@/components/JustificationTable"
import AETSection from "@/components/AETSection"
import LateralMenu from "@/components/LateralMenu"
import { Badge } from "@/components/ui/badge"
import { Section, Bullet, EmptyState } from "@/components/shared/Section"

export async function generateStaticParams() {
  return POPULATIONS.map((p) => ({ slug: p.slug }))
}

export default async function PopulationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pop = getPopulation(slug)
  if (!pop) notFound()

  const justif = getJustification(pop.slug)

  const lateralMenuItems = [
    { id: "besoins", label: "Besoins énergétiques" },
    { id: "reperes", label: "Repères journaliers" },
    { id: "portions", label: "Tailles de portions" },
    ...(justif ? [{ id: "justification", label: "Justification" }] : []),
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Fil d'ariane */}
      <div className="flex items-center gap-2 text-xs text-stone-400 mb-8">
        <Link href="/population" className="hover:text-emerald-700 transition-colors">
          Fiches populations
        </Link>
        <span>/</span>
        <span className="text-stone-600">{pop.label}</span>
      </div>

      <div className="flex gap-8 items-start flex-row-reverse">
        {/* Menu latéral */}
        <LateralMenu params={Promise.resolve({ slug, items: lateralMenuItems })} />

        {/* Contenu */}
        <div className="min-w-0 flex-1 space-y-5">
          {/* En-tête */}
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {pop.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">
              <span className="mr-2">{pop.emoji}</span>
              {pop.label}
            </h1>
            <p className="text-sm text-stone-400 leading-relaxed max-w-2xl">
              {pop.description}
            </p>
          </header>

          {/* Besoins énergétiques */}
          <Section id="besoins" title="Besoins énergétiques" emoji="🔥">
            <AETSection slug={pop.slug} />
          </Section>

          {/* Repères journaliers */}
          {pop.reperes ? (
            <Section id="reperes" title="Repères journaliers" emoji="🥗">
              {pop.reperes.introduction && (
                <p className="text-sm text-stone-400 leading-relaxed mb-4">
                  {pop.reperes.introduction}
                </p>
              )}

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {pop.reperes.groupes.map((g) => (
                  <div key={g.groupe} className="border border-stone-100 rounded-xl p-4">
                    <p className="text-sm font-medium text-stone-800 mb-1">
                      {g.emoji && <span className="mr-1.5">{g.emoji}</span>}
                      {g.groupe}
                    </p>
                    <p className="text-lg font-semibold text-emerald-700">
                      {g.portionsParJour} / jour
                    </p>
                    {g.tailleReference && (
                      <p className="text-xs text-stone-400 mt-1">{g.tailleReference}</p>
                    )}
                  </div>
                ))}
              </div>

              {(pop.reperes.alimentsFavoriser || pop.reperes.alimentsLimiter) && (
                <div className="grid sm:grid-cols-2 gap-5">
                  {pop.reperes.alimentsFavoriser && (
                    <div>
                      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2.5">
                        À favoriser
                      </p>
                      <ul className="space-y-1.5">
                        {pop.reperes.alimentsFavoriser.map((a) => (
                          <Bullet key={a}>{a}</Bullet>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pop.reperes.alimentsLimiter && (
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">
                        À limiter
                      </p>
                      <ul className="space-y-1.5">
                        {pop.reperes.alimentsLimiter.map((a) => (
                          <Bullet key={a}>{a}</Bullet>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {pop.reperes.particularites && pop.reperes.particularites.length > 0 && (
                <div className="mt-5 pt-5 border-t border-stone-100">
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">
                    Particularités
                  </p>
                  <ul className="space-y-1.5">
                    {pop.reperes.particularites.map((p) => (
                      <Bullet key={p}>{p}</Bullet>
                    ))}
                  </ul>
                </div>
              )}
            </Section>
          ) : (
            <EmptyState id="reperes" label="Repères journaliers" />
          )}

          {/* Tailles de portions */}
          <Section id="portions" title="Tailles de portions" emoji="🍽️">
            <p className="text-sm text-stone-400 leading-relaxed mb-4">
              Grammages de référence par groupe d&apos;aliments pour cette population.
            </p>
            <Link
              href={`/portions?population=${pop.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Voir le tableau complet des portions →
            </Link>
          </Section>

          {/* Justification nutritionnelle */}
          {justif && (
            <Section id="justification" title="Justification nutritionnelle" emoji="📋">
              {justif.intro && (
                <p className="text-sm text-stone-400 leading-relaxed mb-4">{justif.intro}</p>
              )}
              <JustificationTable rows={justif.rows} />
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}