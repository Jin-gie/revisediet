// data/glossaire.ts
//
// Glossaire général du site : tout terme listé ici devient automatiquement
// cliquable partout où <GlossaryText text="..." /> est utilisé (voir
// components/GlossaryText.tsx), et ouvre une boîte de détail au clic.
//
// Pour ajouter un terme : ajouter une entrée ci-dessous. `term` doit
// correspondre exactement au mot tel qu'il apparaît dans les textes
// (respecte la casse), délimité par des limites de mot (\b) — donc "NAP"
// matchera "NAP" mais pas "NAPPE".
//
// `category` est une liste : un terme peut appartenir à plusieurs
// catégories à la fois (ex: l'IG est à la fois un repère nutritionnel et
// une notion de biochimie glucidique).

export type GlossaryCategories =
  | "nutrition"       // macro/micronutriments, besoins, repères alimentaires
  | "biochimie"       // mécanismes métaboliques et physiologiques
  | "anthropometrie"  // mesures du corps : poids, taille, IMC, plis cutanés…
  | "dietetique"      // pratique diététique : ration, prescription, texture…
  | "clinique"        // signes, diagnostic, contexte pathologique
  | "reglementation"; // ANC, PNNS, ANSES, textes de référence

export const CATEGORY_LABELS: Record<GlossaryCategories, string> = {
  nutrition: "Nutrition",
  biochimie: "Biochimie",
  anthropometrie: "Anthropométrie",
  dietetique: "Diététique",
  clinique: "Clinique",
  reglementation: "Réglementation",
};

export type GlossaryEntry = {
  term: string;
  title: string;
  category: GlossaryCategories[];
  items: string[];
};

export const GLOSSAIRE: GlossaryEntry[] = [
  {
    term: "NAP",
    title: "Les niveaux de NAP",
    category: ["nutrition"],
    items: [
      "1 – 1,39 : sédentaire — activités de la vie quotidienne, intensité légère, 30 min de marche lente (< 5 km/h)",
      "1,4 – 1,59 : peu actif — intensité légère (60 min) ou modérée (30 min)",
      "1,6 – 1,89 : actif — intensité modérée (60 min) ou forte (30 min)",
      "1,9 – 2,5 : très actif — intensité modérée (60 min) + forte (60 min), ou modérée (2h30)",
      "-----",
      "Chez l'enfant :",
      "4-9 ans : entre 1,4 (faible) et 1,8 (élevé) -> moyenne 1,6",
      "10-17 ans : entre 1,4 (faible) et 2 (élevé) -> moyenne 1,75",
    ],
  },
  {
    term: "métabolisme de base",
    title: "Métabolisme de base (MB)",
    category: ["nutrition", "biochimie"],
    items: [
      "Dépenses énergétiques nécessaires pour entretenir la vie d'un individu au repos, allongé, éveillé, à jeun depuis plus de 12h, condition de neutralité thermique (température extérieure de 22°C) au calme émotionnel",
    ],
  },
  {
    term: "IG",
    title: "Index glycémique",
    category: ["nutrition", "biochimie"],
    items: ["Bas : < 55", "Moyen : 56-69", "Élevé : > 70"],
  },
  {
    term: "CUD",
    title: "Coefficient d'utilisation digestive",
    category: ["nutrition", "biochimie"],
    items: ["Mesure la part d'un nutriment réellement absorbée par l'organisme. Utilisé notamment pour les protéines."],
  },
  {
    term: "VB",
    title: "Valeur biologique",
    category: ["nutrition", "biochimie"],
    items: ["tbd"],
  },
  {
    term: "ER",
    title: "Équivalent rétinol",
    category: ["nutrition", "reglementation"],
    items: ["tbd"],
  },
  {
    term: "anabolisme",
    title: "Anabolisme",
    category: ["biochimie"],
    items: ["Permet la synthèse de molécules grosses et complexes (protéines, glycogène, acides nucléiques, …) à partir de précurseurs relativement simples (acides aminés, glucose, …)."]
  },
  {
    term: "catabolisme",
    title: "Catabolisme",
    category: ["biochimie"],
    items: ["Correspond aux réactions de dégradation des molécules complexes en molécules simples au sein de l'organisme."]
  },
  {
    term: "phosphatase",
    title: "Phosphatase",
    category: ["biochimie"],
    items: ["Enzyme catalysant le retrait d'un groupement phosphate d'une molécule. C'est une réaction d'hydrolyse, qui nécessite donc une molécule d'eau."]
  },
  {
    term: "cycle de Cori",
    title: "Cycle de Cori",
    category: ["biochimie"],
    items: [
      "Cycle permettant de régénérer le lactate produit par les tissus en pyruvate pour la néoglucogenèse",
      "Dans les tissus : Glucose -> Pyruvate -> Lactate",
      "Dans le foie (et les reins en moindre quantité) : Lactate -> Pyruvate -> Glucose"
    ]
  },
  {
    term: "sarcopénie",
    title: "Sarcopénie",
    category: ['clinique', 'nutrition', 'dietetique'],
    items: [
      "Syndrome gériatrique",
      "Diminution des capacités musculiares due à l'âge qui, en s'aggravant, sera à l'origine d'une détérioration de la force musculaire et des performances physiques",
      "Imputable au processus de vieillissement, mais peut être accéléré par des facteurs pathologiques et comportementaux (dénutrition, sédentarité, ...)"
    ]
  },
];

export function getGlossaryEntry(term: string): GlossaryEntry | undefined {
  return GLOSSAIRE.find((g) => g.term === term);
}