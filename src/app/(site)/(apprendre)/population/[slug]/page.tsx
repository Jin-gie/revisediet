// app/(site)/(apprendre)/(population)/[slug]/page.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import { POPULATIONS, getPopulation } from "@/data/populations"
import { getJustification } from "@/data/justifications"
import JustificationTable from "@/components/JustificationTable"
import AETSection from "@/components/AETSection"

export async function generateStaticParams() {
  return POPULATIONS.map((p) => ({ slug: p.slug }))
}

function Section({
  id,
  title,
  emoji,
  children,
}: {
  id?: string
  title: string
  emoji: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="bg-white border border-stone-100 rounded-2xl p-6 scroll-mt-20">
      <h2 className="font-serif text-xl text-stone-900 mb-5 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h2>
      {children}
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-stone-600">
      <span className="text-emerald-400 mt-0.5 flex-shrink-0">•</span>
      <span>{children}</span>
    </li>
  )
}

function EmptyState({ id, label }: { id?: string; label: string }) {
  return (
    <div id={id} className="border border-dashed border-stone-200 rounded-2xl p-6 text-center scroll-mt-20">
      <p className="text-sm font-medium text-stone-500 mb-1">{label}</p>
      <p className="text-xs text-stone-400">Cette section sera disponible prochainement.</p>
    </div>
  )
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
        <nav className="hidden lg:block sticky top-24 w-44 flex-shrink-0">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">
            Sur cette page
          </p>
          <ul className="space-y-1">
            {[
              { id: "besoins", label: "Besoins énergétiques" },
              { id: "reperes", label: "Repères journaliers" },
              { id: "portions", label: "Tailles de portions" },
              ...(justif ? [{ id: "justification", label: "Justification" }] : []),
            ].map((item) => (
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

        {/* Contenu */}
        <div className="min-w-0 flex-1 space-y-5">
          {/* En-tête */}
          <div className="mb-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{pop.emoji}</span>
              <h1 className="font-serif text-3xl text-stone-900">{pop.label}</h1>
            </div>
            <p className="text-stone-500 text-sm max-w-xl mb-3">{pop.description}</p>
            <div className="flex flex-wrap gap-2">
              {pop.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Besoins énergétiques */}
          <Section id="besoins" title="Besoins énergétiques" emoji="🔥">
            <p className="text-sm text-stone-400 leading-relaxed mb-4">{pop.aet.description}</p>

            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {pop.aet.valeurs.map((v) => (
                <div key={v.profil} className="border border-stone-100 rounded-xl p-4">
                  <p className="text-xs text-stone-400 mb-1">{v.profil}</p>
                  <p className="text-lg font-semibold text-stone-900">{v.kcal}</p>
                  <p className="text-xs text-stone-400">{v.kJ}</p>
                </div>
              ))}
            </div>

            {pop.formule && <AETSection slug={pop.slug} />}
          </Section>

          {/* Repères journaliers */}
          {pop.reperes ? (
            <Section id="reperes" title="Repères journaliers" emoji="🥗">
              {pop.reperes.introduction && (
                <p className="text-sm text-stone-400 leading-relaxed mb-4">{pop.reperes.introduction}</p>
              )}

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {pop.reperes.groupes.map((g) => (
                  <div key={g.groupe} className="border border-stone-100 rounded-xl p-4">
                    <p className="text-sm font-medium text-stone-800 mb-1">
                      {g.emoji && <span className="mr-1.5">{g.emoji}</span>}
                      {g.groupe}
                    </p>
                    <p className="text-lg font-semibold text-emerald-700">{g.portionsParJour} / jour</p>
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