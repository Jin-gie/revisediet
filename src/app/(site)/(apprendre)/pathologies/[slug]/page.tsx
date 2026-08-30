// app/pathologie/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import { getAllPathologieSlugs, getPathologie } from "@/data/pathologies";
import { loadPathologieMdx } from "@/lib/mdx-loader";
import { Section } from "@/components/shared/Section";
import LateralMenu from "@/components/LateralMenu";

import { ChiffresCles } from "@/components/pathologie/chiffres-cles";
import { FacteursRisque } from "@/components/pathologie/facteurs-risque";
import { MesuresAnthropometriques } from "@/components/pathologie/mesures-anthropometriques";
import { TableClinique } from "@/components/pathologie/table-clinique";
import { TableParaclinique } from "@/components/pathologie/table-paraclinique";
import { Complications } from "@/components/pathologie/complications";
import { DietetiqueSection } from "@/components/pathologie/dietetique-section";
import { FlashRecap } from "@/components/pathologie/flash-recap";

export async function generateStaticParams() {
  return getAllPathologieSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PathologiePage({ params }: PageProps) {
  const { slug } = await params;
  const pathologie = getPathologie(slug);

  if (!pathologie) {
    notFound();
  }

  const PhysiopathologieMdx = pathologie.mdx?.physiopathologie
    ? await loadPathologieMdx(slug, "physiopathologie")
    : null;
  const TraitementMdx = pathologie.mdx?.traitement
    ? await loadPathologieMdx(slug, "traitement")
    : null;
  const DietetiqueMdx = pathologie.mdx?.dietetique
    ? await loadPathologieMdx(slug, "dietetique")
    : null;

  const lateralMenuItems = [
    { id: "resume", label: "Résumé" },
    ...(pathologie.facteursRisque ? [{ id: "facteurs-risque", label: "Facteurs de risque" }] : []),
    ...(pathologie.diagnostic ? [{ id: "diagnostic", label: "Diagnostic" }] : []),
    ...(PhysiopathologieMdx ? [{ id: "physiopathologie", label: "Physiopathologie" }] : []),
    ...(pathologie.complications ? [{ id: "complications", label: "Complications" }] : []),
    ...(pathologie.dietetique || DietetiqueMdx
      ? [{ id: "dietetique", label: "Diététique thérapeutique" }]
      : []),
    ...(TraitementMdx ? [{ id: "traitement", label: "Traitement" }] : []),
    { id: "flash", label: "À retenir" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Fil d'ariane */}
      <div className="flex items-center gap-2 text-xs text-stone-400 mb-8">
        <Link href="/pathologies" className="hover:text-emerald-700 transition-colors">
          Fiches pathologies
        </Link>
        <span>/</span>
        <span className="text-stone-600">{pathologie.label}</span>
      </div>

      <div className="flex gap-8 items-start flex-row-reverse">
        {/* Menu latéral */}
        <LateralMenu params={Promise.resolve({ slug, items: lateralMenuItems })} />

        {/* Contenu */}
        <div className="min-w-0 flex-1 space-y-5">
          {/* En-tête */}
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {pathologie.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">
              <span className="mr-2">{pathologie.emoji}</span>
              {pathologie.label}
            </h1>
            <p className="text-sm text-stone-400 leading-relaxed max-w-2xl">
              {pathologie.description}
            </p>
          </header>

          {/* Résumé */}
          <Section id="resume" title="Résumé" emoji="📖">
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <ResumeBloc titre="Définition" texte={pathologie.resume.definition} />
              <ResumeBloc titre="Mécanisme clé" texte={pathologie.resume.mecanismeCle} />
              <ResumeBloc titre="Épidémiologie" texte={pathologie.resume.epidemiologie} />
              <ResumeBloc titre="Étiologie" texte={pathologie.resume.etiologie} />
            </div>
            {pathologie.resume.chiffresCles && (
              <ChiffresCles items={pathologie.resume.chiffresCles} />
            )}
          </Section>

          {/* Facteurs de risque */}
          {pathologie.facteursRisque ? (
            <Section id="facteurs-risque" title="Facteurs de risque" emoji="🎯">
              <FacteursRisque data={pathologie.facteursRisque} />
            </Section>
          ) : null}

          {/* Diagnostic */}
          {pathologie.diagnostic ? (
            <Section id="diagnostic" title="Diagnostic" emoji="🩺">
              <div className="space-y-6">
                {pathologie.diagnostic.criteresDefinition && (
                  <ul className="space-y-1.5">
                    {pathologie.diagnostic.criteresDefinition.map((c) => (
                      <Bullet key={c}>{c}</Bullet>
                    ))}
                  </ul>
                )}

                {pathologie.diagnostic.mesuresAnthropometriques && (
                  <MesuresAnthropometriques
                    data={pathologie.diagnostic.mesuresAnthropometriques}
                  />
                )}

                {pathologie.diagnostic.clinique && (
                  <TableClinique items={pathologie.diagnostic.clinique} />
                )}

                {pathologie.diagnostic.paraclinique && (
                  <TableParaclinique items={pathologie.diagnostic.paraclinique} />
                )}

                {pathologie.diagnostic.enqueteAlimentaire && (
                  <div>
                    <p className="text-sm font-medium text-stone-800 mb-2.5">
                      Enquête alimentaire
                    </p>
                    <ul className="space-y-1.5">
                      {pathologie.diagnostic.enqueteAlimentaire.map((e) => (
                        <Bullet key={e}>{e}</Bullet>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Section>
          ) : null}

          {/* Physiopathologie (MDX uniquement) */}
          {PhysiopathologieMdx ? (
            <Section id="physiopathologie" title="Physiopathologie" emoji="🧬">
              <div className="prose prose-sm prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600 prose-li:text-stone-600 prose-strong:text-stone-800">
                <PhysiopathologieMdx />
              </div>
            </Section>
          ) : null}

          {/* Complications */}
          {pathologie.complications ? (
            <Section id="complications" title="Complications" emoji="⚠️">
              <Complications items={pathologie.complications} />
            </Section>
          ) : null}

          {/* Diététique thérapeutique */}
          {pathologie.dietetique || DietetiqueMdx ? (
            <Section id="dietetique" title="Diététique thérapeutique" emoji="🥗">
              {DietetiqueMdx ? (
                <div className="prose prose-sm prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600 prose-li:text-stone-600 prose-strong:text-stone-800">
                  <DietetiqueMdx />
                </div>
              ) : (
                pathologie.dietetique && <DietetiqueSection data={pathologie.dietetique} />
              )}
            </Section>
          ) : null}

          {/* Traitement (MDX uniquement) */}
          {TraitementMdx ? (
            <Section id="traitement" title="Traitement" emoji="💊">
              <div className="prose prose-sm prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:text-stone-600 prose-li:text-stone-600 prose-strong:text-stone-800">
                <TraitementMdx />
              </div>
            </Section>
          ) : null}

          {/* À retenir */}
          <Section id="flash" title="À retenir" emoji="⚡">
            <FlashRecap data={pathologie.flash} />
          </Section>
        </div>
      </div>
    </div>
  );
}

function ResumeBloc({ titre, texte }: { titre: string; texte: string }) {
  return (
    <div className="border border-stone-100 rounded-xl p-4">
      <p className="text-sm font-medium text-stone-800 mb-1">{titre}</p>
      <p className="text-sm text-stone-600 leading-relaxed">{texte}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-stone-600">
      <span className="text-emerald-400 mt-0.5 flex-shrink-0">•</span>
      <span>{children}</span>
    </li>
  );
}