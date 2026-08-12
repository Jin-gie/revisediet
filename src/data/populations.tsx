// data/populations.tsx
//
// Fichier réduit aux champs utilisés par la page /populations (switch de
// populations + calculatrice AET + tableau de justification). Le texte des
// formules utilise du JSX (ex: <sup> pour les exposants), d'où l'extension
// .tsx. Le chemin d'import "@/data/populations" ne change pas.

import type { Formule } from "@/lib/calculs";

// ─────────────────────────────────────────────────────────────────────────
// Formules de métabolisme de base (MB).
//
// Chaque formule porte directement sa fonction de calcul (`calcMB`), quelle
// que soit sa forme mathématique. Pour ajouter une nouvelle formule :
// dupliquer un bloc ci-dessous, adapter `text` (affichage) et `calcMB`
// (calcul réel), puis l'assigner au champ `formule` d'une population plus
// bas. Aucune autre modification n'est nécessaire ailleurs dans le code.
// ─────────────────────────────────────────────────────────────────────────

// Harris & Benedict révisée (Roche et al., 1984) — formule additive :
// MB = P×poids + T×taille − A×âge + C
const HARRIS_BENEDICT_REVISEE: Formule = {
  nom: "Harris & Benedict révisé — Roche et al., 1984",
  femme: {
    text: (
      <>
        MB = 9,740 × P + 172,9 × T − 4,737 × Â + 667,051
      </>
    ),
    calcMB: (poids, taille, age) => 9.74 * poids + 172.9 * taille - 4.737 * age + 667.051,
  },
  homme: {
    text: (
      <>
        MB = 13,707 × P + 492,3 × T − 6,673 × Â + 77,607
      </>
    ),
    calcMB: (poids, taille, age) => 13.707 * poids + 492.3 * taille - 6.673 * age + 77.607,
  },
};

// Black et al., 1996 — formule en puissance (multiplicative) :
// MB = C × poids^P × taille^T × âge^A
const BLACK_ET_AL: Formule = {
  nom: "Black et al., 1996",
  femme: {
    text: (
      <>
        MB = 0,963 × P<sup>0,48</sup> × T<sup>0,50</sup> × Â<sup>−0,13</sup>
      </>
    ),
    calcMB: (poids, taille, age) => 0.963 * Math.pow(poids, 0.48) * Math.pow(taille, 0.5) * Math.pow(age, -0.13) * 1000,
  },
  homme: {
    text: (
      <>
        MB = 1,083 × P<sup>0,48</sup> × T<sup>0,50</sup> × Â<sup>−0,13</sup>
      </>
    ),
    calcMB: (poids, taille, age) => 1.083 * Math.pow(poids, 0.48) * Math.pow(taille, 0.5) * Math.pow(age, -0.13) * 1000,
  },
};

// Exemple pour une future formule dans un tout autre style (juste pour
// montrer que n'importe quelle forme de calcul fonctionne sans changement
// ailleurs dans le code) :
//
// const MA_NOUVELLE_FORMULE: Formule = {
//   nom: "Nom, année",
//   femme: {
//     text: <>MB = ...</>,
//     calcMB: (poids, taille, age) => { /* ton calcul ici */ return 0; },
//   },
//   homme: { ... },
// };

export type Population = {
  slug: string;
  label: string;
  emoji: string;
  description: string;
  tags: string[];
  formule: Formule;
  aet: {
    description: string;
    valeurs: { profil: string; kcal: string }[];
  };
};

export const POPULATIONS: Population[] = [
  {
    slug: "adulte",
    label: "Adulte",
    emoji: "🧑",
    description: "Homme ou femme de 18 à 59 ans sans pathologie particulière.",
    tags: ["Référence", "18–59 ans"],
    formule: BLACK_ET_AL,
    aet: {
      description: "L'AET varie selon le sexe, l'âge et le NAP. Valeurs pour NAP modéré (1,63).",
      valeurs: [
        { profil: "Femme (NAP 1,6)", kcal: "2 100 kcal" },
        { profil: "Homme (NAP 1,6)", kcal: "2 600 kcal" },
      ],
    },
  },
  {
    slug: "enfant",
    label: "Enfant & adolescent",
    emoji: "👶",
    description: "De 3 à 17 ans, période de croissance intense avec des besoins nutritionnels élevés.",
    tags: ["Croissance", "3–17 ans"],
    // TODO : Harris & Benedict n'est validée que pour l'adulte. BLACK_ET_AL
    // est disponible en exemple (à vérifier/remplacer par la formule
    // pédiatrique de ton choix, ex: Schofield, OMS/FAO).
    formule: HARRIS_BENEDICT_REVISEE,
    aet: {
      description: "Les besoins augmentent fortement avec l'âge et le pic de croissance pubertaire.",
      valeurs: [
        { profil: "Enfant 3–5 ans", kcal: "1 250 kcal" },
        { profil: "Enfant 6–9 ans", kcal: "1 600 kcal" },
        { profil: "Enfant 10–12 ans", kcal: "1 900 kcal" },
        { profil: "Ado fille 13–17 ans", kcal: "2 000 kcal" },
        { profil: "Ado garçon 13–17 ans", kcal: "2 400 kcal" },
      ],
    },
  },
  {
    slug: "personne-agee",
    label: "Personne âgée",
    emoji: "👴",
    description: "Personnes de 65 ans et plus. Risque de dénutrition, sarcopénie et carences spécifiques.",
    tags: ["65 ans et +", "Dénutrition"],
    formule: HARRIS_BENEDICT_REVISEE,
    aet: {
      description: "L'AET diminue avec l'âge mais les besoins en protéines restent élevés pour prévenir la sarcopénie.",
      valeurs: [
        { profil: "Femme 65–74 ans", kcal: "1 800 kcal" },
        { profil: "Femme 75 ans et +", kcal: "1 600 kcal" },
        { profil: "Homme 65–74 ans", kcal: "2 100 kcal" },
        { profil: "Homme 75 ans et +", kcal: "1 900 kcal" },
      ],
    },
  },
  {
    slug: "grossesse",
    label: "Femme enceinte",
    emoji: "🤰",
    description: "Grossesse unique sans complication. Besoins augmentés pour la croissance fœtale et les modifications maternelles.",
    tags: ["Grossesse", "Prénatal"],
    formule: HARRIS_BENEDICT_REVISEE,
    aet: {
      description: "Le surplus calorique est modeste et évolue selon le trimestre. La qualité prime sur la quantité.",
      valeurs: [
        { profil: "1er trimestre (+0 kcal)", kcal: "≈ 2 000 kcal" },
        { profil: "2e trimestre (+300 kcal)", kcal: "≈ 2 300 kcal" },
        { profil: "3e trimestre (+500 kcal)", kcal: "≈ 2 500 kcal" },
      ],
    },
  },
  {
    slug: "sportif",
    label: "Sportif",
    emoji: "🏃",
    description: "Pratique sportive régulière et intensive. Besoins énergétiques et en macronutriments augmentés.",
    tags: ["Sport", "Performance"],
    formule: HARRIS_BENEDICT_REVISEE,
    aet: {
      description: "L'AET dépend de la discipline, de l'intensité et du volume. Valeurs indicatives pour un sport d'endurance.",
      valeurs: [
        { profil: "Sportive endurance (modéré)", kcal: "2 200–2 500 kcal" },
        { profil: "Sportif endurance (modéré)", kcal: "2 700–3 000 kcal" },
        { profil: "Sportif endurance (intense)", kcal: "3 500–4 500 kcal" },
        { profil: "Sport de force / musculation", kcal: "3 000–4 000 kcal" },
      ],
    },
  },
  {
    slug: "vegetarien",
    label: "Végétarien / vegan",
    emoji: "🌿",
    description: "Régime végétarien (sans viande ni poisson) ou vegan (sans aucun produit animal). Carences spécifiques à prévenir.",
    tags: ["Végétarien", "Vegan"],
    formule: HARRIS_BENEDICT_REVISEE,
    aet: {
      description: "L'AET est identique à la population générale. Les ajustements portent sur la qualité et la complémentarité des protéines.",
      valeurs: [
        { profil: "Femme végétarienne/vegan", kcal: "2 000 kcal" },
        { profil: "Homme végétarien/vegan", kcal: "2 500 kcal" },
      ],
    },
  },
];

export function getPopulation(slug: string): Population | undefined {
  return POPULATIONS.find((p) => p.slug === slug);
}