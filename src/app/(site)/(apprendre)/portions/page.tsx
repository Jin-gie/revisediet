// app/apprendre/portions/page.tsx
import type { ReactNode } from "react";

const th = "px-3 py-2.5 text-xs font-semibold text-white uppercase tracking-wide text-center align-middle";
const td = "px-3 py-2 text-sm text-stone-700 text-center align-middle border border-stone-100";
const tdLabel = "px-3 py-2 text-sm text-stone-800 text-left align-middle border border-stone-100 sticky left-0 bg-white";
const sectionRow = "bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wide";

function Section({ label }: { label: ReactNode }) {
  return (
    <tr>
      <td colSpan={9} className={`px-3 py-2 ${sectionRow}`}>
        {label}
      </td>
    </tr>
  );
}

export default function PortionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* En-tête */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-2">
          Apprendre
        </p>
        <h1 className="font-serif text-4xl text-stone-900 mb-3">Tableau des portions</h1>
        <p className="text-stone-400 text-sm max-w-2xl">
          Grammages de référence par groupe d'aliments, selon l'âge et le lieu de prise en
          charge (domicile ou institution). Les poids sont exprimés en grammes, sauf mention
          contraire.
        </p>
      </div>

      {/* Tableau */}
      <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-stone-800">
                <th rowSpan={2} className={`${th} text-left sticky left-0 bg-stone-800`}>
                  Poids (en g)
                </th>
                <th rowSpan={2} className={th}>Bébé &lt; 12M</th>
                <th rowSpan={2} className={th}>Bébé 12-18M</th>
                <th rowSpan={2} className={th}>Bébé 18-36M</th>
                <th rowSpan={2} className={th}>Maternelle</th>
                <th rowSpan={2} className={th}>Primaire</th>
                <th rowSpan={2} className={th}>Ado/Adulte/PA (domicile)</th>
                <th colSpan={2} className={th}>PA en institution</th>
              </tr>
              <tr className="bg-stone-700">
                <th className={th}>Déjeuner</th>
                <th className={th}>Dîner</th>
              </tr>
            </thead>

            <tbody>
              {/* Pain */}
              <tr className="bg-emerald-50/50">
                <td className={`${tdLabel} font-medium bg-emerald-50/50`}>Pain</td>
                <td className={td}>-</td>
                <td className={td}>10</td>
                <td className={td}>20</td>
                <td className={td}>30</td>
                <td className={td}>40</td>
                <td className={td}>50-100</td>
                <td className={td} colSpan={2}>50</td>
              </tr>

              <Section
                label={
                  <>
                    ASSAISONNEMENTS<sup>*</sup>
                  </>
                }
              />

              <tr>
                <td className={tdLabel}>Entrées</td>
                <td className={td} rowSpan={2}>
                  5<sup>**</sup>
                </td>
                <td className={td} rowSpan={2}>
                  5-10<sup>**</sup>
                </td>
                <td className={td} rowSpan={2}>
                  10<sup>**</sup>
                </td>
                <td className={td}>5</td>
                <td className={td}>7</td>
                <td className={td} rowSpan={2} colSpan={3}>
                  8
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Plat principal</td>
                <td className={td}>5</td>
                <td className={td}>7</td>
              </tr>

              <Section label="ENTRÉES (hors assaisonnement)" />

              <tr>
                <td className={tdLabel}>Potage</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td}>125</td>
                <td className={td}>125</td>
                <td className={td}>170</td>
                <td className={td} colSpan={3}>
                  250
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>Crudités : tomates</td>
                <td className={td}>-</td>
                <td className={td} rowSpan={3}>
                  30<sup>***</sup>
                </td>
                <td className={td} rowSpan={2}>
                  40
                </td>
                <td className={td}>60</td>
                <td className={td}>80</td>
                <td className={td}>100-120</td>
                <td className={td} colSpan={2}>
                  80
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Crudités : carottes</td>
                <td className={td}>-</td>
                <td className={td}>50</td>
                <td className={td}>70</td>
                <td className={td}>90-120</td>
                <td className={td} colSpan={2}>
                  70
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Crudités : betteraves</td>
                <td className={td}>-</td>
                <td className={td}>30</td>
                <td className={td}></td>
                <td className={td}></td>
                <td className={td}></td>
                <td className={td} colSpan={2}>
                  80
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>À base de féculents</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td}>30</td>
                <td className={td}>60</td>
                <td className={td}>80</td>
                <td className={td}>100-150</td>
                <td className={td} colSpan={2}>
                  100
                </td>
              </tr>

              <tr>
                <td className={tdLabel}>Œuf dur</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td} rowSpan={3}>
                  15
                </td>
                <td className={td}>1/2</td>
                <td className={td}>1</td>
                <td className={td}>1-1,5</td>
                <td className={td} colSpan={2}>
                  1
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Maquereau</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td} rowSpan={2}>
                  30
                </td>
                <td className={td}>30</td>
                <td className={td}>40-50</td>
                <td className={td} rowSpan={2} colSpan={2}>
                  50
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Jambon blanc</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td}>40</td>
                <td className={td}>50</td>
              </tr>

              <tr>
                <td className={tdLabel}>Pizza/tarte salée</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td}>60</td>
                <td className={td}>70</td>
                <td className={td}>70</td>
                <td className={td}>90</td>
                <td className={td} colSpan={2}>
                  70
                </td>
              </tr>

              <Section label="PLAT PROTIDIQUE" />

              <tr>
                <td className={tdLabel}>Steak/Escalope/Rôti</td>
                <td className={td} rowSpan={3}>
                  10-20
                </td>
                <td className={td} rowSpan={3}>
                  20
                </td>
                <td className={td} rowSpan={3}>
                  30
                </td>
                <td className={td}>40</td>
                <td className={td}>60</td>
                <td className={td}>80-100</td>
                <td className={td}>80</td>
                <td className={td}>60</td>
              </tr>
              <tr>
                <td className={tdLabel}>Braisé/sauté</td>
                <td className={td}>50</td>
                <td className={td}>70</td>
                <td className={td}>100-120</td>
                <td className={td}>100</td>
                <td className={td}>70</td>
              </tr>
              <tr>
                <td className={tdLabel}>Omelette</td>
                <td className={td}>60</td>
                <td className={td}>90</td>
                <td className={td}>90-130</td>
                <td className={td}>90</td>
                <td className={td}>60</td>
              </tr>

              <Section label="PLAT COMPOSÉ" />

              <tr>
                <td className={tdLabel}>Denrée protidique</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td}>30</td>
                <td className={td}>50</td>
                <td className={td}>70</td>
                <td className={td}>100-120</td>
                <td className={td}>100</td>
                <td className={td}>70</td>
              </tr>
              <tr>
                <td className={tdLabel}>Plat composé</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td}>180</td>
                <td className={td}>250</td>
                <td className={td}>250-300</td>
                <td className={td}>250</td>
                <td className={td}>175</td>
              </tr>
              <tr>
                <td className={tdLabel}>Crêpes/pizza/croque-monsieur</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td}>
                  60+90<sup>****</sup>
                </td>
                <td className={td}>100</td>
                <td className={td}>150</td>
                <td className={td}>200</td>
                <td className={td} colSpan={2}>
                  150
                </td>
              </tr>

              <Section label="GARNITURE / ACCOMPAGNEMENT" />

              <tr>
                <td className={tdLabel}>Légumes cuits</td>
                <td className={td}>
                  200<sup>*****</sup>
                </td>
                <td className={td}>
                  200<sup>*****</sup>
                </td>
                <td className={td}>120</td>
                <td className={td} colSpan={2}>
                  100
                </td>
                <td className={td} colSpan={3}>
                  150
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Riz/Pâtes/Pdt/Légumes secs</td>
                <td className={td}>-</td>
                <td className={td}>-</td>
                <td className={td} colSpan={2}>
                  120
                </td>
                <td className={td}>170</td>
                <td className={td}>200-250</td>
                <td className={td}>200</td>
                <td className={td}>150</td>
              </tr>

              <Section label="PRODUITS LAITIERS" />

              <tr>
                <td className={tdLabel}>Fromages</td>
                <td className={td}>-</td>
                <td className={td} colSpan={3}>
                  16-20
                </td>
                <td className={td}>16-30</td>
                <td className={td} colSpan={3}>
                  16-40
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Fromage blanc, fromage frais</td>
                <td className={td}>-</td>
                <td className={td} colSpan={2}>
                  90-100
                </td>
                <td className={td} colSpan={3}>
                  90-120
                </td>
                <td className={td} colSpan={2}>
                  100-120
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Yaourt</td>
                <td className={td}>-</td>
                <td className={td} colSpan={7}>
                  100-125
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Petits suisses</td>
                <td className={td}>-</td>
                <td className={td} colSpan={5}>
                  50-60
                </td>
                <td className={td} colSpan={2}>
                  100-120
                </td>
              </tr>

              <Section label="DESSERTS" />

              <tr>
                <td className={tdLabel}>Dessert lacté</td>
                <td className={td}>-</td>
                <td className={td}></td>
                <td className={td} colSpan={6}>
                  90-125
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Fruits crus</td>
                <td className={td} colSpan={3} rowSpan={2}>
                  80-100
                </td>
                <td className={td} colSpan={2} rowSpan={2}>
                  100
                </td>
                <td className={td} rowSpan={2}>
                  100-150
                </td>
                <td className={td} colSpan={2} rowSpan={2}>
                  &gt;80
                </td>
              </tr>
              <tr>
                <td className={tdLabel}>Fruits cuits</td>
              </tr>
              <tr>
                <td className={tdLabel}>Pâtisseries (hors pâte à choux, pâtisserie sèche)</td>
                <td className={td}>-</td>
                <td className={td}>30-35</td>
                <td className={td}>35-40</td>
                <td className={td} colSpan={2}>
                  40-60
                </td>
                <td className={td} colSpan={3}>
                  60-80
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes de bas de tableau */}
      <div className="mt-4 space-y-1">
        <p className="text-[11px] text-stone-400">
          <sup>*</sup> Poids de la matière grasse dans l'assaisonnement
        </p>
        <p className="text-[11px] text-stone-400">
          <sup>**</sup> Assaisonnement du repas (entrée + plat)
        </p>
        <p className="text-[11px] text-stone-400">
          <sup>***</sup> Selon capacités de mastication
        </p>
        <p className="text-[11px] text-stone-400">
          <sup>****</sup> Garniture de légume
        </p>
        <p className="text-[11px] text-stone-400">
          <sup>*****</sup> Purée de légumes (mélange de légumes et pdt) pour les enfants mangeant
          mixé
        </p>
      </div>
    </div>
  );
}