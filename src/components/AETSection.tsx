// components/AETSection.tsx
"use client";

// Petit wrapper client : reçoit uniquement un `slug` (string, donc
// sérialisable) depuis un Server Component, résout la population et sa
// formule ICI, côté client, puis les passe à AETCalculatrice — qui reste
// inchangé. Aucune fonction (calcMB) ne traverse la frontière serveur/client.

import { PopulationSlug, getPopulation } from "@/data/populations";
import AETCalculatrice from "@/components/AETCalculatrice";
import { usePreferences } from "./preferences/PreferencesContext";

export default function AETSection({ slug }: { slug: PopulationSlug }) {
  const population = getPopulation(slug);
  if (!population?.formule) return null;
  const { unit } = usePreferences();

  return (
    <>
      <p className="text-sm text-stone-400 leading-relaxed mb-4">{population.aet.description}</p>

      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        {population.aet.valeurs.map((v) => (
          <div key={v.profil} className="border border-stone-100 rounded-xl p-4">
            <p className="text-xs text-stone-400 mb-1">{v.profil}</p>
            <p className="text-lg font-semibold text-stone-900">
              { unit === "kcal" ? v.kcal : v.kJ}
            </p>
            <p className="text-xs text-stone-400">
              { unit === "kcal" ? v.kJ : v.kcal}
            </p>
          </div>
        ))}
      </div>

      {population.formule && 
        <AETCalculatrice
          formuleNom={population.formule.nom}
          formuleFemme={population.formule.femme}
          formuleHomme={population.formule.homme}
          status={population.slug}
        />
      }
    </>

  );
}