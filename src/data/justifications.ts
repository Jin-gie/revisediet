// data/justifications.ts
//
// Contenu des tableaux "Apports / Justification" par population.
// Rempli pour "adulte" à partir du document de justification.
// Pour ajouter une population : dupliquer un bloc "rows" et l'adapter.
//
// Les mots présents dans data/glossaire.ts (ex: "NAP") deviennent
// automatiquement cliquables dans les textes ci-dessous, via GlossaryText —
// pas besoin de les annoter ici.

export type JustificationRow = {
  id: string;
  title: string;
  /** true = ligne de séparation de section (ex: "Minéraux", "Vitamines"), sans contenu */
  isSectionHeader?: boolean;
  /** Colonne de gauche : repères chiffrés / mode de calcul */
  apports?: string[];
  /** Colonne de droite : rôle physiologique / justification */
  justification?: string[];
};

export type PopulationJustification = {
  slug: string;
  intro?: string;
  rows: JustificationRow[];
};

export const JUSTIFICATIONS: PopulationJustification[] = [
  {
    slug: "adulte",
    intro:
      "Justification nutritionnelle de l'adulte bien portant (18-59 ans), d'après les repères ANSES.",
    rows: [
      {
        id: "energie",
        title: "Énergie (AET)",
        apports: [
          "IMC = Poids (kg) / Taille² (m) = xx + commentaire IMC",
          "Métabolisme de base (MB) calculé selon la formule choisie -> donne MB = xx kJ = xx kcal",
          "Choix du NAP selon 3 critères : activité professionnelle, activité physique, loisirs -> on choisira donc un NAP de xx",
          "Besoin énergétique journalier (BEJ) = MB × NAP (+ facteur d'agression selon pathologie)",
          "AET = BEJ, sauf contexte pathologique",
          "Valeurs moyennes (NAP 1,63) : Homme 10,9 MJ (2 600 kcal) — Femme 8,8 MJ (2 100 kcal)",
        ],
        justification: [
          "Couvre les besoins liés au métabolisme de base, à l'activité physique et professionnelle, la thermorégulation et la thermogenèse post-prandiale",
          "Répartition conseillée : 3 repas principaux par jour + 1 collation nutritionnellement équilibrée",
        ],
      },
      {
        id: "proteines",
        title: "Protéines",
        apports: [
          "IR : 10-20 % de l'AET, soit xx - xx g",
          "Minimum 0,83 g/kg/j, soit xx g/j",
          "Rapport P animales / P végétales > 1",
        ],
        justification: [
          "Synthèse de composés : hormones, enzymes, neuromédiateurs",
          "Rôle structural : protéines membranaires et cytoplasmiques, composition des tissus",
          "Rôle fonctionnel : protéines de transport",
          "Contraction musculaire",
          "Rôle immunitaire",
          "Rôle énergétique secondaire (1 g de protéines = 17 kJ)",
          "Privilégier les protéines à haute valeur biologique (VB) et bon coefficient d'utilisation digestive (CUD) pour apporter l'ensemble des acides aminés essentiels",
          "Sources : VPO, lait et produits laitiers, céréales et légumineuses",
        ],
      },
      {
        id: "lipides",
        title: "Lipides",
        apports: [
          "IR : 35-40 % de l'AET, soit xx - xx g",
          "AGS ≤ 12 % de l'AET (xx g), dont AGS athérogènes (laurique, palmitique, myristique) max 8 % de l'AET (xx g)",
          "AGMI : 15-20 % de l'AET (xx - xx g)",
          "AGPI : w6 4 % de l'AET (xx g) et w3 1 % de l'AET (xx g), avec un ratio w6/w3 < 5",
          "DHA = 250 mg/j, EPA = 250 mg/j",
          "Cholestérol < 200 mg/j",
          "AG trans < 20% de l'AET (xx g)",
        ],
        justification: [
          "Rôle énergétique (1 g de lipides = 38 kJ)",
          "Réserve énergétique dans le tissu adipeux sous forme de triglycérides",
          "Rôle de transporteur : vitamines liposolubles ADEK, HDL/LDL/chylomicrons",
          "Rôle structural : fluidité membranaire et échanges cellulaires, en particulier au niveau du système nerveux",
          "Rôle hormonal : précurseurs hormonaux",
          "Rôle isolant thermique et protecteur",
          "Veiller à une bonne répartition pour couvrir les besoins en AGE, assurer un apport suffisant en AGPI (effet cardioprotecteur et anti-inflammatoire), en DHA et en acide arachidonique, en respectant un ratio EPA/DHA < 1",
          "2 types de matières grasses à distinguer : animales (beurre, crème fraîche — riches en AGS) et végétales (huiles, fruits à coque — riches en AGPI/AGMI)",
          "Limiter les produits ultra-transformés riches en AGS et AG trans (effet athérogène et thrombogène)",
        ],
      },
      {
        id: "glucides",
        title: "Glucides",
        apports: [
          "IR : 40-55 % de l'AET, soit xx - xx g",
          "Max 100 g/j de glucides simples (hors lactose et galactose)",
          "Sucres et produits sucrés < 10 % de l'AET (xx g), selon l'OMS",
          "Répartition conseillée : 1/3 de glucides simples, 2/3 de glucides complexes",
        ],
        justification: [
          "Complément énergétique de la ration (1 g de glucides = 17 kJ)",
          "Indispensables aux cellules gluco-dépendantes → préservation des protéines tissulaires (d'où un apport supérieur à 50 % de l'AET)",
          "Réserve dans le foie et les muscles sous forme de glycogène",
          "Rôle structural : membranes cellulaires, acides nucléiques",
          "Rôle d'épargne azotée : l'organisme utilise préférentiellement le glucose comme substrat énergétique, ce qui préserve les protéines",
          "Privilégier les glucides complexes à index glycémique bas ou modéré (IG bas < 55, moyen 56-69, élevé > 70)",
          "Glucides complexes : céréales complètes, légumes secs, tubercules, produits céréaliers non raffinés",
          "Glucides simples : fruits, légumes, miel, lait, sucre de table, produits transformés sucrés — à consommer avec modération",
        ],
      },
      {
        id: "fibres",
        title: "Fibres",
        apports: ["30 g/j, dont 50 % de fibres solubles"],
        justification: [
          "Régulation du transit (prévention de la constipation et de la diarrhée)",
          "Effet satiétogène, limitant la prise de poids excessive",
          "Diminue l'index glycémique du repas et le pic d'hyperglycémie post-prandiale",
          "Formation, l'amélioration et régulation du microbiote intestinal",
          "Renforce le système immunitaire",
          "Effet hypocholestérolémiant et hypotriglycéridémiant : prévention des maladies cardiovasculaires, du diabète et du cancer colorectal",
        ],
      },
      {
        id: "eau",
        title: "Eau",
        apports: [
          "Entre 2 et 2,5 L/j, dont la moitié en eau de boisson",
          "0,25 mL/kg/j, soit xx mL",
        ],
        justification: [
          "Compense les pertes hydriques (urines, selles, transpiration, respiration)",
          "Hydrate les fibres et améliore la satiété post-prandiale",
          "Indispensable aux réactions métaboliques",
          "Régulation thermique du corps",
          "Rôle protecteur (liquide céphalo-rachidien)",
          "Rôle plastique, prévention des calculs rénaux et des cystites",
        ],
      },
      { id: "sep-mineraux", title: "Minéraux", isSectionHeader: true },
      {
        id: "calcium",
        title: "Calcium",
        apports: ["Adultes < 25 ans : 1 000 mg/j", "Adultes > 25 ans : 950 mg/j"],
        justification: [
          "Minéralisation du squelette (maintien de la masse osseuse)",
          "Prévention de l'ostéoporose, conduction de l'influx nerveux, contraction musculaire, coagulation, limitation des crampes",
          "Le calcium laitier doit représenter 2/3 des apports",
        ],
      },
      {
        id: "fer",
        title: "Fer",
        apports: [
          "Homme : 11 mg/j",
          "Femme avec règles faibles : 11 mg/j",
          "Femme avec règles abondantes : 16 mg/j",
        ],
        justification: [
          "Rôle essentiel dans la synthèse de l'hémoglobine et le transport de l'oxygène",
          "Veiller à consommer du fer héminique, à meilleure biodisponibilité",
        ],
      },
      {
        id: "magnesium",
        title: "Magnésium",
        apports: ["Homme : 380 mg/j", "Femme : 300 mg/j"],
        justification: [
          "Rôle dans la contraction et la relaxation musculaire",
          "Contribue à lutter contre le stress",
        ],
      },
      { id: "sep-vitamines", title: "Vitamines", isSectionHeader: true },
      {
        id: "vitd",
        title: "Vitamine D",
        apports: ["15 µg/j"],
        justification: [
          "Favorise l'absorption du calcium et la minéralisation osseuse",
          "S'active grâce aux UV",
        ],
      },
      {
        id: "vitc",
        title: "Vitamine C",
        apports: ["110 mg/j", "+20 % pour les fumeurs, soit 132 mg/j"],
        justification: [
          "Antioxydant, anti-inflammatoire, antiasthénique",
          "Immunostimulant, d'autant plus en vie en collectivité",
          "Favorise la cicatrisation",
          "Augmente l'absorption du fer",
        ],
      },
      {
        id: "rythme",
        title: "Rythme alimentaire",
        apports: [
          "À définir, souvent 4 repas/j : petit-déjeuner, déjeuner, dîner et 1 collation",
        ],
        justification: [
          "À adapter selon le rythme de vie pour maintenir un apport énergétique satisfaisant",
        ],
      },
    ],
  },

  // Populations à compléter : dupliquer le bloc ci-dessus et l'adapter.
  // Tant qu'un slug n'a pas d'entrée ici, la page affiche un message
  // "tableau à venir" pour cette population.
  // { slug: "enfant", rows: [...] },
  // { slug: "personne-agee", rows: [...] },
  // { slug: "grossesse", rows: [...] },
  // { slug: "sportif", rows: [...] },
  // { slug: "vegetarien", rows: [...] },
];

export function getJustification(slug: string): PopulationJustification | undefined {
  return JUSTIFICATIONS.find((j) => j.slug === slug);
}