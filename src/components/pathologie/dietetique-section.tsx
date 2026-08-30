// components/pathologie/dietetique-section.tsx
import type { Dietetique } from "@/data/pathologies/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bullet } from "@/components/shared/Section";
import { ApportsComparatif } from "./apports-comparatif";

export function DietetiqueSection({ data }: { data: Dietetique }) {
  return (
    <div className="space-y-8">
      {data.intro && (
        <p className="text-sm text-stone-400 leading-relaxed">{data.intro}</p>
      )}

      {data.pes && (
        <div>
          <p className="text-sm font-medium text-stone-800 mb-3">
            Diagnostic diététique — méthode PES
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <BlocPES
              titre="Problèmes nutritionnels (P)"
              items={data.pes.problemesNutritionnels}
              accent="text-sky-700"
            />
            <BlocPES
              titre="Étiologie (E)"
              items={data.pes.etiologie}
              accent="text-emerald-700"
            />
            <BlocPES
              titre="Signes / symptômes (S)"
              items={data.pes.signesSymptomes}
              accent="text-red-700"
            />
          </div>
        </div>
      )}

      {data.objectifsSoin && (
        <div>
          <p className="text-sm font-medium text-stone-800 mb-3">Objectifs de soin</p>
          <Accordion type="single" collapsible className="w-full border border-stone-100 rounded-xl px-4">
            {data.objectifsSoin.map((o) => (
              <AccordionItem key={o.titre} value={o.titre} className="border-stone-100">
                <AccordionTrigger className="text-sm font-medium text-stone-800 hover:text-emerald-700">
                  {o.titre}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-stone-600 leading-relaxed">
                  {o.contenu}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {data.populations && data.populations.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-stone-800">
            Apports nutritionnels par population
          </p>
          <ApportsComparatif populations={data.populations} />
        </div>
      )}

      {data.casParticuliers && data.casParticuliers.length > 0 && (
        <div className="space-y-6">
          {data.casParticuliers.map((cas) => (
            <div key={cas.titre} className="space-y-3">
              <p className="text-sm font-medium text-stone-800">{cas.titre}</p>
              {cas.description && (
                <p className="text-sm text-stone-400 leading-relaxed">{cas.description}</p>
              )}
              {cas.scoff && (
                <div className="border border-stone-100 rounded-xl p-4">
                  <p className="text-sm font-medium text-stone-800 mb-2.5">
                    Questionnaire de dépistage
                  </p>
                  <ul className="space-y-1.5">
                    {cas.scoff.map((q) => (
                      <Bullet key={q}>{q}</Bullet>
                    ))}
                  </ul>
                </div>
              )}
              {cas.points && (
                <Accordion type="single" collapsible className="w-full border border-stone-100 rounded-xl px-4">
                  {cas.points.map((p) => (
                    <AccordionItem key={p.titre} value={p.titre} className="border-stone-100">
                      <AccordionTrigger className="text-sm font-medium text-stone-800 hover:text-emerald-700">
                        {p.titre}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                        {p.contenu}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BlocPES({
  titre,
  items,
  accent,
}: {
  titre: string;
  items: string[];
  accent: string;
}) {
  return (
    <div className="border border-stone-100 rounded-xl p-4">
      <p className={`text-sm font-medium mb-2.5 ${accent}`}>{titre}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <Bullet key={item}>{item}</Bullet>
        ))}
      </ul>
    </div>
  );
}
