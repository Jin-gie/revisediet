import { notFound } from "next/navigation"
import Link from "next/link"
import { getPathologie, PATHOLOGIES, type Pathologie } from "@/data/pathologies"
import dynamic from "next/dynamic"
import MdxWrapper from "@/components/mdx/MdxWrapper"
import { useState } from "react"
import PathologieModeToggle from "@/components/PathologieModeToggle"

export async function generateStaticParams() {
  return PATHOLOGIES.map((p) => ({ slug: p.slug }))
}

const getMdxSection = (slug: string, section: string) =>
  dynamic(() => import(`@/data/pathologies/${slug}/${section}.mdx`), {
    ssr: true,
  })

const GRAVITE_STYLE: Record<string, string> = {
  "faible":      "bg-emerald-50 text-emerald-700 border-emerald-100",
  "modérée":     "bg-amber-50 text-amber-700 border-amber-100",
  "élevée":      "bg-orange-50 text-orange-700 border-orange-100",
  "très élevée": "bg-red-50 text-red-700 border-red-100",
}

function Section({ id, title, emoji, children }: { id?: string; title: string; emoji: string; children: React.ReactNode }) {
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

// ── Résumé ────────────────────────────────────────────────────────────────────

function ResumeCard({ patho }: { patho: Pathologie }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="bg-stone-50 border-b border-stone-100 px-6 py-5 flex items-start gap-4">
        <span className="text-4xl flex-shrink-0">{patho.emoji}</span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {patho.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-serif text-3xl text-stone-900">{patho.label}</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-100">
        {[
          { label: "Définition",     value: patho.resume.definition },
          { label: "Mécanisme clé",  value: patho.resume.mecanismeCle },
          { label: "Épidémiologie",  value: patho.resume.epidemiologie },
          { label: "Étiologie",      value: patho.resume.etiologie },
        ].map((item) => (
          <div key={item.label} className="px-6 py-4">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">{item.label}</p>
            <p className="text-sm text-stone-700 leading-relaxed">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Physiopathologie ──────────────────────────────────────────────────────────

function PhysiopathologieSection({ patho }: { patho: Pathologie }) {
  const { physiopathologie } = patho
  if (!physiopathologie) return null
  return (
    <Section id="physiopathologie" title="Physiopathologie" emoji="🔬">
      {physiopathologie.introduction && (
        <p className="text-sm text-stone-400 leading-relaxed mb-6">{physiopathologie.introduction}</p>
      )}

      {physiopathologie.subtypes ? (
        <div className="space-y-6">
          {physiopathologie.subtypes.map((sub) => (
            <div key={sub.id} className="border border-stone-100 rounded-xl overflow-hidden">
              <div className="bg-stone-50 px-5 py-3 border-b border-stone-100">
                <h3 className="font-medium text-stone-800 text-sm">{sub.label}</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-stone-500 leading-relaxed mb-4">{sub.description}</p>
                <EtapesList etapes={sub.etapes} />
              </div>
            </div>
          ))}
        </div>
      ) : physiopathologie.etapes ? (
        <EtapesList etapes={physiopathologie.etapes} />
      ) : null}
    </Section>
  )
}

function TraitementSection({patho} : {patho: Pathologie}) {
  const {traitement} = patho
  if (!traitement) return null

  return (
    <Section id="traitement" title="Traitement" emoji="💊">
      <div className="space-y-5">

        <div>
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">Objectifs</p>
          <ul className="space-y-1.5">
            {traitement.objectifs.map((o) => <Bullet key={o}>{o}</Bullet>)}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">Surveillance</p>
          <ul className="space-y-1.5">
            {traitement.surveillance.map((s) => <Bullet key={s}>{s}</Bullet>)}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">Mesures hygiéno-diététiques</p>
          <ul className="space-y-1.5">
            {traitement.mesuresHygienoDiet.map((m) => <Bullet key={m}>{m}</Bullet>)}
          </ul>
        </div>

        {[
          { key: "medicaments",       label: "Médicaments" },
          { key: "chirurgie",         label: "Chirurgie" },
          { key: "autresTraitements", label: "Autres traitements" },
        ].map(({ key, label }) => {
          const items = traitement[key as keyof typeof patho.traitement] as { famille: string; mecanisme: string; exemples?: string[] }[] | undefined
          if (!items?.length) return null
          return (
            <div key={key}>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">{label}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {items.map((item) => (
                  <div id={item.famille} key={item.famille} className="border border-stone-100 rounded-xl p-4">
                    <p className="text-sm font-semibold text-stone-800 mb-1">{item.famille}</p>
                    <p className="text-xs text-stone-500 leading-relaxed mb-2">{item.mecanisme}</p>
                    {item.exemples && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.exemples.map((ex) => (
                          <span key={ex} className="text-[11px] bg-stone-50 text-stone-600 px-2 py-0.5 rounded-md border border-stone-100">{ex}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

function EtapesList({ etapes }: { etapes: { numero: number; titre: string; description: string }[] }) {
  return (
    <div className="space-y-3">
      {etapes.map((etape) => (
        <div key={etape.numero} className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
            {etape.numero}
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800 mb-0.5">{etape.titre}</p>
            <p className="text-xs text-stone-500 leading-relaxed">{etape.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PathologiePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const patho = getPathologie(slug)
  if (!patho) notFound()

  const PhysiopathologieMdx = patho.mdx?.physiopathologie
    ? getMdxSection(patho.slug, "physiopathologie")
    : null

  const TraitementMdx = patho.mdx?.traitement
    ? getMdxSection(patho.slug, "traitement")
    : null

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 text-xs text-stone-400 mb-8">
        <Link href="/pathologies" className="hover:text-emerald-700 transition-colors">
          Fiches pathologies
        </Link>
        <span>/</span>
        <span className="text-stone-600">{patho.labelCourt}</span>
      </div>

      <PathologieModeToggle patho={patho}>
        <div className="flex gap-8 items-start flex-row-reverse">
          {/* Menu latéral */}
          <nav className="hidden lg:block sticky top-24 w-44 flex-shrink-0">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">Sur cette page</p>
            <ul className="space-y-1">
              {[
                { id: "physiopathologie", label: "Physiopathologie" },
                ...(patho.facteursRisque ? [{ id: "facteurs-risque", label: "Facteurs de risque" }] : []),
                { id: "diagnostic",       label: "Diagnostic" },
                { id: "complications",    label: "Complications" },
                { id: "traitement",       label: "Traitement" },
                { id: "dietetique",       label: "Diététique" },
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

            <ResumeCard patho={patho} />

            {/* Facteurs de risque — optionnel */}
            {patho.facteursRisque && (
              <Section id="facteurs-risque" title="Facteurs de risque" emoji="⚠️">
                {patho.facteursRisque.introduction && (
                  <p className="text-sm text-stone-400 leading-relaxed mb-4">{patho.facteursRisque.introduction}</p>
                )}
                <div className="space-y-5">
                  {patho.facteursRisque.groupes.map((groupe) => (
                    <div key={groupe.groupe}>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">{groupe.groupe}</p>
                      <ul className="space-y-1.5">
                        {groupe.items.map((item) => <Bullet key={item}>{item}</Bullet>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {PhysiopathologieMdx ? (
              <Section id="physiopathologie" title="Physiopathologie" emoji="🔬">
                <MdxWrapper>
                  <PhysiopathologieMdx />
                </MdxWrapper>
              </Section>
            ) : (
              <PhysiopathologieSection patho={patho} />
            )}


            {/* Diagnostic */}
            <Section id="diagnostic" title="Diagnostic" emoji="🔍">
              <div className="space-y-5">

                {/* Critères */}
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">Critères de définition</p>
                  <ul className="space-y-1.5">
                    {patho.diagnostic.criteresDefinition.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-stone-600">
                        <span className="text-emerald-600 mt-0.5 flex-shrink-0 font-bold">→</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clinique */}
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Examen clinique</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {patho.diagnostic.clinique.map((sc) => (
                      <div key={sc.signe} className="border border-stone-100 rounded-xl px-4 py-3">
                        <p className="text-sm font-semibold text-stone-800">
                          {sc.emoji && <span className="mr-1.5">{sc.emoji}</span>}
                          {sc.signe}
                        </p>
                        {sc.detail && <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{sc.detail}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enquête alimentaire */}
                {patho.diagnostic.enqueteAlimentaire && (
                  <div>
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">Enquête alimentaire</p>
                    <ul className="space-y-1.5">
                      {patho.diagnostic.enqueteAlimentaire.map((e) => <Bullet key={e}>{e}</Bullet>)}
                    </ul>
                  </div>
                )}

                {/* Paraclinique */}
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Examens paracliniques</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {patho.diagnostic.paraclinique.map((ex) => (
                      <div key={ex.nom} className="border border-stone-100 rounded-xl p-4">
                        <p className="text-sm font-semibold text-stone-800 mb-1">
                          {ex.emoji && <span className="mr-1.5">{ex.emoji}</span>}
                          {ex.nom}
                        </p>
                        <p className="text-xs text-stone-500 leading-relaxed">{ex.detail}</p>
                        {ex.valeursSeuil && (
                          <p className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg mt-2 font-medium">
                            {ex.valeursSeuil}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Section>

            {/* Complications */}
            <Section id="complications" title="Complications" emoji="🚨">
              <div className="space-y-5">
                {Array.from(new Set(patho.complications.map((c) => c.type))).map((type) => {
                  const items = patho.complications.filter((c) => c.type === type)
                  const isAigue = type.toLowerCase().includes("aiguë") || type.toLowerCase().includes("aigue") || type.toLowerCase().includes("métabolique")
                  return (
                    <div key={type}>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">{type}</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {items.map((c) => (
                          <div key={c.nom} className={`border rounded-xl p-4 ${isAigue ? "border-red-100 bg-red-50/30" : "border-stone-100"}`}>
                            <p className="text-sm font-semibold text-stone-800 mb-1">
                              {c.emoji && <span className="mr-1.5">{c.emoji}</span>}
                              {c.nom}
                            </p>
                            {c.description && <p className="text-xs text-stone-500 leading-relaxed">{c.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Section>

            {/* Traitement */}
            {TraitementMdx ? (
              <Section id="traitement" title="Traitement" emoji="💊">
                  <MdxWrapper>
                    <TraitementMdx />
                  </MdxWrapper>
              </Section>
            ) : (
              <TraitementSection patho={patho} />
            )}

            {/* Diététique thérapeutique */}
            {patho.dietetique ? (
              <Section id="dietetique" title="Diététique thérapeutique" emoji="🥗">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">Objectifs nutritionnels</p>
                    <ul className="space-y-1.5">
                      {patho.dietetique.objectifsNutritionnels.map((o) => <Bullet key={o}>{o}</Bullet>)}
                    </ul>
                  </div>
                  {patho.dietetique.aet && (
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">AET</p>
                      <p className="text-sm text-stone-600">{patho.dietetique.aet}</p>
                    </div>
                  )}
                  {patho.dietetique.macros && (
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">Macronutriments</p>
                      <div className="space-y-2">
                        {patho.dietetique.macros.map((m) => (
                          <div key={m.label} className="flex items-start gap-3 text-sm">
                            <span className="font-medium text-stone-700 w-28 flex-shrink-0">{m.label}</span>
                            <span className="text-stone-500">{m.recommandation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {patho.dietetique.alimentsFavoriser && (
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">Aliments à favoriser</p>
                      <div className="flex flex-wrap gap-1.5">
                        {patho.dietetique.alimentsFavoriser.map((a) => (
                          <span key={a} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-100">{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {patho.dietetique.alimentsLimiter && (
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">Aliments à limiter</p>
                      <ul className="space-y-1.5">
                        {patho.dietetique.alimentsLimiter.map((a) => (
                          <li key={a} className="flex items-start gap-2 text-sm text-stone-600">
                            <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {patho.dietetique.conseilsPratiques && (
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">Conseils pratiques</p>
                      <ul className="space-y-1.5">
                        {patho.dietetique.conseilsPratiques.map((c) => <Bullet key={c}>{c}</Bullet>)}
                      </ul>
                    </div>
                  )}
                </div>
              </Section>
            ) : (
              <div id="dietetique" className="border border-dashed border-stone-200 rounded-2xl p-6 text-center scroll-mt-20">
                <span className="text-2xl block mb-2">🥗</span>
                <p className="text-sm font-medium text-stone-500 mb-1">Diététique thérapeutique</p>
                <p className="text-xs text-stone-400">
                  Cette section sera disponible une fois le cours de diététique thérapeutique complété.
                </p>
              </div>
            )}

          </div>
        </div>
      </PathologieModeToggle>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8">
        <Link href="/pathologies" className="flex items-center gap-2 text-sm text-stone-400 hover:text-emerald-700 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Toutes les pathologies
        </Link>
        <Link
          href={`/cas/aleatoire?pathologie=${patho.slug}`}
          className="text-sm font-medium bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
        >
          S'entraîner sur ce cas →
        </Link>
      </div>
    </div>
  )
}