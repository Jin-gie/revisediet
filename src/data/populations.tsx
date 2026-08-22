// data/populations.tsx
//
// Fichier réduit aux champs utilisés par la page /populations (switch de
// populations + calculatrice AET + tableau de justification). Le texte des
// formules utilise du JSX (ex: <sup> pour les exposants), d'où l'extension
// .tsx. Le chemin d'import "@/data/populations" ne change pas.

import type { Formule } from "@/lib/calculs";

export type PopulationSlug =  'adulte' | 'allaitement' | 'grossesse' | 'personne-agee' | 'bebe' | 'enfant-ados' | 'sportif' | 'vegetarien';

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

const HENRY: Formule = {
  nom: "Henry",
  femme : {
    text : (
      <>
        MB = 0,0424 x P + 2,38
      </>
    ),
    calcMB: (poids) => 0.0424 * poids + 2.38
  },
  homme : {
    text : (
      <>
        MB = 0,0563 x P + 2,15
      </>
    ),
    calcMB : (poids) => 0.0563 * poids + 2.15
  }
}

const ADO: Formule = {
  nom: "Formule à utiliser uniquement au-dessus de 10 ans.",
  femme: {
    text: (
      <>
        MB = (30,9 x P) + (2016,6 x T) + 907
      </>
    ),
    calcMB: (poids, taille) => 30.9*poids + 2016.6*taille + 907
  },
  homme : {
    text: (
      <>
        MB = (69,4 x P) + (322 * T) + 2392
      </>
    ),
    calcMB: (poids, taille) => 69.4*poids + 322*taille + 2392
  }
}

export type RepereGroupe = {
  /** Nom du groupe alimentaire, ex: "Produits laitiers" */
  groupe: string;
  emoji?: string;
  /** Nombre de portions/jour, ex: "3 à 4" */
  portionsParJour: string;
  /** Ex: "150 ml de lait ou 1 yaourt ou 30 g de fromage" */
  tailleReference?: string;
};

export type Population = {
  slug: PopulationSlug;
  label: string;
  emoji: string;
  description: string;
  tags: string[];
  formule?: Formule;
  aet: {
    description: string;
    valeurs: { profil: string; kcal: string; kJ: string }[];
  };
  reperes?: {
    introduction?: string;
    groupes: RepereGroupe[];
    alimentsFavoriser?: string[];
    alimentsLimiter?: string[];
    particularites?: string[];
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
        { profil: "Femme (NAP 1,6)", kcal: "2 100 kcal", kJ: "8,8 MJ" },
        { profil: "Homme (NAP 1,6)", kcal: "2 600 kcal", kJ: "10,9 MJ" },
      ],
    },
    reperes: {
      introduction: "Repères PNNS pour un adulte sans pathologie, en dehors de toute restriction particulière.",
      groupes: [
        { groupe: "Fruits et légumes", emoji: "🥦", portionsParJour: "5", tailleReference: "1 portion ≈ 80-100 g" },
        { groupe: "Féculents", emoji: "🍞", portionsParJour: "3 à 4", tailleReference: "Selon l'appétit, à chaque repas" },
        { groupe: "Produits laitiers", emoji: "🥛", portionsParJour: "2", tailleReference: "150 ml de lait, 1 yaourt ou 30 g de fromage" },
        { groupe: "Viandes, poissons, œufs", emoji: "🍗", portionsParJour: "1 à 2", tailleReference: "Privilégier le poisson 2 fois/semaine" },
        { groupe: "Matières grasses", emoji: "🫒", portionsParJour: "3 à 4", tailleReference: "En favorisant les huiles végétales" },
      ],
      alimentsFavoriser: [
        "Fruits et légumes de saison, crus et cuits",
        "Légumineuses (au moins 2 fois par semaine)",
        "Poissons gras (sardine, maquereau, saumon)",
        "Huiles de colza, noix ou olive",
      ],
      alimentsLimiter: [
        "Produits sucrés et boissons sucrées",
        "Charcuterie",
        "Sel ajouté",
        "Produits ultra-transformés",
      ],
    },
  },
  {
    slug: "bebe",
    label: "Enfant bas âge",
    emoji: "👶",
    description: "De 0 à 3 ans, période de croissance intense avec des besoins nutritionnels élevé.",
    tags: ["Croissance", "3–17 ans"],
    aet: {
      description: "Les besoins augmentent fortement avec l'âge.",
      valeurs: [
        { profil: "0-12 mois", kcal: "92 kcal/kg/j", kJ: "385 kJ/kg/j" },
        { profil : " ", kcal: " ", kJ: " "},
        { profil: "Fille 1 an", kcal: "TODO kcal", kJ: "3,8 MJ" },
        { profil: "Garçon 1 an", kcal: "TODO kcal", kJ: "4 MJ" },
        { profil: "Fille 2 an", kcal: "TODO kcal", kJ: "4,4 MJ" },
        { profil: "Garçon 2 ans", kcal: "TODO kcal", kJ: "4,8 MJ" },
        { profil: "Fille 3 an", kcal: "TODO kcal", kJ: "4,8 MJ" },
        { profil: "Garçon 3 an", kcal: "TODO kcal", kJ: "5,1 MJ" },
      ],
    },
  },
  {
    slug: "enfant-ados",
    label: "Enfant & adolescent",
    emoji: "🧒",
    description: "De 4 à 17 ans, période de croissance intense avec des besoins nutritionnels élevés.",
    tags: ["Croissance", "3–17 ans"],
    // TODO : Harris & Benedict n'est validée que pour l'adulte. BLACK_ET_AL
    // est disponible en exemple (à vérifier/remplacer par la formule
    // pédiatrique de ton choix, ex: Schofield, OMS/FAO).
    formule: ADO,
    aet: {
      description: "Les besoins augmentent fortement avec l'âge et le pic de croissance pubertaire. Jusqu'à 10 ans, prendre uniquement les valeurs moyennes de population.",
      valeurs: [
        { profil: "Fille 4-6 ans", kcal: "TODO kcal", kJ: "5,9 MJ" },
        { profil: "Garçon 4-6 ans", kcal: "TODO kcal", kJ: "6,4 MJ" },
        { profil: "Fille 7-10 ans", kcal: "TODO kcal", kJ: "7,2 MJ" },
        { profil: "Garçon 7-10 ans", kcal: "TODO kcal", kJ: "7,7 MJ" },
        { profil: "Fille 11-14 ans", kcal: "TODO kcal", kJ: "8,6 MJ" },
        { profil: "Garçon 11-14 ans", kcal: "TODO kcal", kJ: "9,5 MJ" },
        { profil: "Fille 15-17 ans", kcal: "TODO kcal", kJ: "9,4 MJ" },
        { profil: "Garçon 15-17 ans", kcal: "TODO kcal", kJ: "11,8 MJ" },
      ],
    },
  },
  {
    slug: "personne-agee",
    label: "Personne âgée",
    emoji: "👴",
    description: "Personnes de 65 ans et plus. Risque de dénutrition, sarcopénie et carences spécifiques.",
    tags: ["65 ans et +", "Dénutrition"],
    formule: HENRY,
    aet: {
      description: "L'AET diminue avec l'âge mais les besoins en protéines restent élevés pour prévenir la sarcopénie.",
      valeurs: [
        { profil: "Femme > 65 ans", kcal: "TODO kcal", kJ: "7,8 MJ" },
        { profil: "Homme > 65 ans", kcal: "TODO kcal", kJ: "9,6 MJ" },
        { profil: "Femmes ménopausées 50-60 ans", kcal: "TODO kcal", kJ: "8,6 MJ" },
      ],
    },
  },
  {
    slug: "grossesse",
    label: "Femme enceinte",
    emoji: "🤰",
    description: "Grossesse unique sans complication. Besoins augmentés pour la croissance fœtale et les modifications maternelles.",
    tags: ["Grossesse", "Prénatal"],
    formule: BLACK_ET_AL,
    aet: {
      description: "Le surplus calorique évolue selon le trimestre. La qualité prime sur la quantité.",
      valeurs: [
        { profil: "1er trimestre (+0,3 MJ)", kcal: "2 000 kcal" , kJ: "9,1 MJ"},
        { profil: "2e trimestre (+1,1 MJ)", kcal: "2 300 kcal", kJ: "9,9 MJ" },
        { profil: "3e trimestre (+2 MJ)", kcal: "2 500 kcal", kJ: "10,8 MJ" },
      ],
    },
  },
  {
    slug: "allaitement",
    label: "Allaitement",
    emoji: "🤱",
    description: "Allaitement. Besoins augmentés pour cicatrisation post-accouchement et production de lait maternel.",
    tags: ["Allaitement"],
    formule: BLACK_ET_AL, 
    aet: {
      description : "Surplus calorique de 500 kcal (2,1 MJ).",
      valeurs: [
        { profil : "Toute personne (+2 MJ)", kcal: "2 600 kcal", kJ: "10,8 MJ"}
      ]
    }
  },
  {
    slug: "sportif",
    label: "Sportif",
    emoji: "🏃",
    description: "Pratique sportive régulière et intensive. Besoins énergétiques et en macronutriments augmentés.",
    tags: ["Sport", "Performance"],
    formule: BLACK_ET_AL,
    aet: {
      description: "L'AET dépend de la discipline, de l'intensité et du volume. Valeurs indicatives pour un sport d'endurance. Voici les valeurs du MB (hors NAP).",
      valeurs: [
        { profil: "Femme, majoré de 5% (hors NAP)", kcal: "TODO kcal", kJ: "5,7 MJ" },
        { profil: "Homme, majoré de 5% (hors NAP)", kcal: "TODO kcal", kJ: "7 MJ" },
        { profil: "Femme, mojoré de 10% (hors NAP)", kcal: "TODO kcal", kJ: "6 MJ" },
        { profil: "Homme, majoré de 10% (hors NAP)", kcal: "TODO kcal", kJ: "7,4 MJ" },
      ],
    },
  },
  // {
  //   slug: "vegetarien",
  //   label: "Végétarien / vegan",
  //   emoji: "🌿",
  //   description: "Régime végétarien (sans viande ni poisson) ou vegan (sans aucun produit animal). Carences spécifiques à prévenir.",
  //   tags: ["Végétarien", "Vegan"],
  //   formule: HARRIS_BENEDICT_REVISEE,
  //   aet: {
  //     description: "L'AET est identique à la population générale. Les ajustements portent sur la qualité et la complémentarité des protéines.",
  //     valeurs: [
  //       { profil: "Femme végétarienne/vegan", kcal: "2 000 kcal" },
  //       { profil: "Homme végétarien/vegan", kcal: "2 500 kcal" },
  //     ],
  //   },
  // },
];

export function getPopulation(slug: string): Population | undefined {
  return POPULATIONS.find((p) => p.slug === slug);
}