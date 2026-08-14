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

export type GlossaryEntry = {
  term: string;
  title: string;
  items: string[];
};

export const GLOSSAIRE: GlossaryEntry[] = [
  {
    term: "NAP",
    title: "Les niveaux de NAP",
    items: [
      "1 – 1,39 : sédentaire — activités de la vie quotidienne, intensité légère, 30 min de marche lente (< 5 km/h)",
      "1,4 – 1,59 : peu actif — intensité légère (60 min) ou modérée (30 min)",
      "1,6 – 1,89 : actif — intensité modérée (60 min) ou forte (30 min)",
      "1,9 – 2,5 : très actif — intensité modérée (60 min) + forte (60 min), ou modérée (2h30)",
      "-----",
      "Chez l'enfant :",
      "4-9 ans : entre 1,4 (faible) et 1,8 (élevé) -> moyenne 1,6",
      "10-17 ans : entre 1,4 (faible) et 2 (élevé) -> moyenne 1,75"
    ],
  },
  {
    term: "métabolisme de base",
    title: "Métabolisme de base (MB)",
    items: ["Dépenses énergétiques nécessaires pour entretenir la vie d'un individu au repos, allongé, éveillé, à jeun depuis plus de 12h, condition de neutralité thermique (température extérieure de 22°C) au calme émotionnel"]
  },
  {
    term: "IG",
    title: "Index glycémique",
    items: ["Bas : < 55", "Moyen : 56-69", "Élevé : > 70"],
  },
  {
    term: "CUD",
    title: "Coefficient d'utilisation digestive",
    items: ["Mesure la part d'un nutriment réellement absorbée par l'organisme. Utilisé notamment pour les protéines."],
  },
  {
    term: "VB",
    title: "Valeur biologique",
    items: ["tbd"]
  },
  {
    term: "ER",
    title: "Équivalent rétinol",
    items: ["tbd"]
  }
];

export function getGlossaryEntry(term: string): GlossaryEntry | undefined {
  return GLOSSAIRE.find((g) => g.term === term);
}