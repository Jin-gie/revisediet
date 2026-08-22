// components/AETSection.tsx
"use client";

// Petit wrapper client : reçoit uniquement un `slug` (string, donc
// sérialisable) depuis un Server Component, résout la population et sa
// formule ICI, côté client, puis les passe à AETCalculatrice — qui reste
// inchangé. Aucune fonction (calcMB) ne traverse la frontière serveur/client.

import { PopulationSlug, getPopulation } from "@/data/populations";
import AETCalculatrice from "@/components/AETCalculatrice";

export default function AETSection({ slug }: { slug: PopulationSlug }) {
  const population = getPopulation(slug);
  if (!population?.formule) return null;

  return (
    <AETCalculatrice
      formuleNom={population.formule.nom}
      formuleFemme={population.formule.femme}
      formuleHomme={population.formule.homme}
      status={population.slug}
    />
  );
}