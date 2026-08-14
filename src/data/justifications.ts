// data/justifications.ts
//
// Contenu des tableaux "Apports / Justification" par population.
// Rempli pour "adulte" à partir du document de justification.
// Pour ajouter une population : dupliquer un bloc "rows" et l'adapter.
//
// Les mots présents dans data/glossaire.ts (ex: "NAP") deviennent
// automatiquement cliquables dans les textes ci-dessous, via GlossaryText —
// pas besoin de les annoter ici.

import { PopulationSlug } from "./populations";

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
  slug: PopulationSlug;
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
          "AG trans < 2 % de l'AET (xx g)",
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

  // -----------------------
  // ----- ALLAITEMENT -----
  // -----------------------
  {
    slug: "allaitement",
    intro:
      "Justification nutritionnelle de la femme allaitante (18-49 ans), d'après les repères ANSES.",
    rows: [
      {
        id: "energie",
        title: "Énergie (AET)",
        apports: [
          "IMC = Poids (kg) / Taille² (m) = xx + commentaire IMC",
          "Métabolisme de base (MB) calculé selon la formule choisie -> donne MB = xx kJ = xx kcal",
          "Choix du NAP selon 3 critères : activité professionnelle, activité physique, loisirs -> on choisira donc un NAP de xx",
          "Besoin énergétique journalier (BEJ) = MB × NAP + 2000 Kj",
          "AET = BEJ, sauf contexte pathologique",
          "Valeurs moyennes (NAP 1,63) : 8,8 + 2 MJ = 10,8 MJ",
        ],
        justification: [
          "Couvre les besoins liés au métabolisme de base, à l'activité physique et professionnelle, la thermorégulation et la thermogenèse post-prandiale et aux besoins énergétiques supplémentaires pour la production de lait",
          "Répartition conseillée : 3 repas principaux par jour + 1 ou 2 collation(s) nutritionnellement équilibrées(s)",
        ],
      },
      {
        id: "proteines",
        title: "Protéines",
        apports: [
          "IR : 12-20 % de l'AET, soit xx - xx g",
          "Minimum 1 g/kg/j, soit xx g/j",
          "Rapport P animales / P végétales > 1",
          "4 produits laitiers / j"
        ],
        justification: [
          "Synthèse de composés : hormones, enzymes, neuromédiateurs",
          "Rôle structural : protéines membranaires et cytoplasmiques, composition des tissus",
          "Rôle fonctionnel : protéines de transport",
          "Contraction musculaire",
          "Rôle immunitaire",
          "Rôle énergétique secondaire (1 g de protéines = 17 kJ)",
          "Assure les besoins d'entretien et de réparation post-gestation",
          "Forme le lait maternel et apporte les AAE",
          "Le lait maternel contient environ 1,1 à 1,2 g de P / 100 mL",
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
          "AG trans < 2 % de l'AET (xx g)",
        ],
        justification: [
          "Rôle énergétique (1 g de lipides = 38 kJ), composant essentiel du lait maternel, nécessaires pour la mère et le fœtus",
          "Réserve énergétique dans le tissu adipeux sous forme de triglycérides, utilisés pour la production de lait",
          "Rôle de transporteur : vitamines liposolubles ADEK cruciales pour la croissance, HDL/LDL/chylomicrons",
          "Rôle structural : fluidité membranaire et échanges cellulaires, en particulier au niveau du système nerveux",
          "Rôle hormonal : précurseurs hormonaux",
          "Rôle isolant thermique et protecteur",
          "Veiller à une bonne répartition pour couvrir les besoins en AGE, assurer un apport suffisant en AGPI (effet cardioprotecteur et anti-inflammatoire), en DHA et en acide arachidonique, en respectant un ratio EPA/DHA < 1",
          "Qualité des AG dans le lait dépend de la l'alimentation maternelle",
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
          "Nécessaire pour compenser les pertes de lait (environ 800 mL lait/j)",
          "Limiter les boissons sucrées, éviter les boissons excitantes (thé, café) our les consommer à distance des tétées"
        ],
      },
      {
        id: "alcool",
        title : "Alcool",
        apports: ["A proscrire"],
        justification: [
          "Alcool pendant l'allaitement peut causer des retards de croissance, problèmes du système nerveux central et malformations",
          "Risques permanents pour le nourrisson : retard intellectuel, déficits d'apprentissage, troubles du comportement"
        ]
      },
      { id: "sep-mineraux", title: "Minéraux", isSectionHeader: true },
      {
        id: "calcium",
        title: "Calcium",
        apports: [
          "Adultes < 25 ans : 1 000 mg/j", 
          "Adultes > 25 ans : 950 mg/j",
          "Apports sont les mêmes car absorption intestinale augmente"
        ],
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
          "16 mg"
        ],
        justification: [
          "Rôle essentiel dans la synthèse de l'hémoglobine et le transport de l'oxygène",
          "Veiller à consommer du fer héminique, à meilleure biodisponibilité",
          "Entre dans la composition du lait maternel (légère augmentation du besoin composée par l'aménorrhée)"
        ],
      },
      {
        id: "magnesium",
        title: "Magnésium",
        apports: ["300 mg/j"],
        justification: [
          "Rôle dans la contraction et la relaxation musculaire",
          "Contribue à lutter contre le stress",
        ],
      },
      {
        id: "iode",
        title: "Iode",
        apports: ["200 µg/j"],
        justification: [
          "Entre dans la composition du lait maternel",
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
        id: "vitb",
        title: "Vitamine B9",
        apports: ["500 µg/j"],
        justification: [
          "Augmentation pour compenser les pertes dans le lait",
        ],
      },
      {
        id: "vita",
        title: "Vitamine A",
        apports: ["1300 µg/j"],
        justification: [
          "Le lait maternel est pauvre en vitamine A et le nourrisson n'a quasiment pas de réserves, d'où une augmentation des apports",
        ],
      },
      {
        id: "rythme",
        title: "Rythme alimentaire",
        apports: [
          "À définir, souvent 4 repas/j : petit-déjeuner, déjeuner, dîner et 1 collation",
        ],
        justification: [
          "À définir selon le rythme de vie (et des tétées) et du contexte pour éviter les grignotages. Souvent : petit-déjeuner, déjeuner, goûter (collation), dîner",
        ],
      },
    ],
  },

  // ---------------------
  // ----- GROSSESSE -----
  // ---------------------
  {
    slug: "grossesse",
    intro:
      "Justification nutritionnelle de la femme enceinte (18-49 ans), d'après les repères ANSES.",
    rows: [
      {
        id: "energie",
        title: "Énergie (AET)",
        apports: [
          "IMC = Poids (kg) / Taille² (m) = xx + commentaire IMC",
          "Métabolisme de base (MB) calculé selon la formule choisie -> donne MB = xx kJ = xx kcal",
          "Choix du NAP selon 3 critères : activité professionnelle, activité physique, loisirs -> on choisira donc un NAP de xx",
          "Besoin énergétique journalier (BEJ) = MB × NAP + augmentation selon trimestre : T1 +0,3MJ ; T2 +1,1MJ ; T3 +2MJ",
          "AET = BEJ, sauf contexte pathologique",
          "Valeurs moyennes (NAP 1,63) : T1 9,1MJ, T2 9,9MJ, T3 10,8MJ",
        ],
        justification: [
          "Couvre les besoins liés au métabolisme de base, à l'activité physique et professionnelle, la thermorégulation, la thermogenèse post-prandiale et besoins liés à la grossesse (croissance du fœtus, placenta)",
          "Répartition conseillée : 3 repas principaux par jour + 1 collation nutritionnellement équilibrée",
        ],
      },
      {
        id: "proteines",
        title: "Protéines",
        apports: [
          "IR T1-T2 : 10-20 % de l'AET, soit xx - xx g",
          "Minimum 0,83 à 1 g/kg/j, soit xx g/j",
          "IR T3 : 12-20 % de l'AET, soit xx - xx g",
          "Minimum 1 g/kg/j, soit xx g/j",
          "Rapport P animales / P végétales > 1",
          "4 produits laitiers / j"
        ],
        justification: [
          "Synthèse de composés : hormones, enzymes, neuromédiateurs",
          "Rôle structural : protéines membranaires et cytoplasmiques, composition des tissus",
          "Rôle fonctionnel : protéines de transport",
          "Contraction musculaire",
          "Rôle immunitaire",
          "Rôle énergétique secondaire (1 g de protéines = 17 kJ)",
          "Assure les besoins d'entretiens, croissance du fœtus, placenta, glandes mammaires, développement de l'utérus et volume sanguin",
          "Couvre les rôles structurels, fonctionnels, énergétiques et immunitaire des protéines",
          "Besoin minimum augmente en fin de grossesse (croissance des tissus et organes du fœtus)",
          "Privilégier les protéines à haute valeur biologique (VB) et bon coefficient d'utilisation digestive (CUD) pour apporter l'ensemble des acides aminés essentiels",
          "Sources : VPO, lait et produits laitiers, céréales et légumineuses",
          "Éviter les viandes crues lors de la grossesse pour limiter les risques de taxoplasmose et listériose"
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
          "AG trans < 2 % de l'AET (xx g)",
        ],
        justification: [
          "Rôle énergétique (1 g de lipides = 38 kJ), nécessaires pour la mère et le fœtus",
          "Réserve énergétique dans le tissu adipeux sous forme de triglycérides, utilisés en fin de grossesse par le fœtus pour constituer ses réserves",
          "Rôle de transporteur : vitamines liposolubles ADEK cruciales pour la croissance, HDL/LDL/chylomicrons",
          "Rôle structural : fluidité membranaire et échanges cellulaires, en particulier au niveau du système nerveux",
          "Rôle hormonal : précurseurs hormonaux",
          "Rôle isolant thermique et protecteur",
          "Veiller à une bonne répartition pour couvrir les besoins en AGE, assurer un apport suffisant en AGPI (effet cardioprotecteur et anti-inflammatoire), en DHA et en acide arachidonique, en respectant un ratio EPA/DHA < 1 pour développement du système nerveux du nourrisson et évuter l'hyperlipidémie chez la femme enceinte",
          "D'après l'ANSES, l'alimentation périnatale laisse une « empreinte » au niveau des gènes du fœtus",
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
          "Sucres et produits sucrés < 10 % de l'AET (xx g), selon l'OMS : permet d'éviter les hypoglycémies réactionnelles",
          "Répartition conseillée : 1/3 de glucides simples, 2/3 de glucides complexes",
        ],
        justification: [
          "Complément énergétique de la ration (1 g de glucides = 17 kJ)",
          "Indispensables aux cellules gluco-dépendantes → préservation des protéines tissulaires (d'où un apport supérieur à 50 % de l'AET)",
          "Réserve dans le foie et les muscles sous forme de glycogène",
          "Rôle structural : membranes cellulaires, acides nucléiques",
          "Rôle d'épargne azotée : l'organisme utilise préférentiellement le glucose comme substrat énergétique, ce qui préserve les protéines",
          "Glucose est le substrat préféré du fœtus, en cas de manque de glucose, le fœtus peut subir un retard de croissance. T1 ↗insulinosensibilité → risque d'hypoglycémie ; T2 : hormones placentaires favorisent insulinorésistance → risque d'hyperglycémie ; T3 : ↗insulinorésistance → risque d'hyperglycémie, diabète gestationnel",
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
          "Régulation du transit (prévention de la constipation, surtout au T3, et de la diarrhée)",
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
          "Indispensable à l'activité métabolique intense de la grossesse",
          "Développement des tissus : liquide amniotique, augmentation du volume sanguin",
          "Constituant majeur du fœtus et des annexes"
        ],
      },
      {
        id: "alcool",
        title: "Alcool",
        apports: [
          "A proscrire",
        ],
        justification: [
          "Peut causer un retard de croissance, problèmes du système nerveux central et des malformations ; ces conséquences néfastes pour le fœtus sont permanentes",
          "Les atteintes cérébrales sont responsables à long terme d'un retard intellectuel (déficits de l'apprentissage, de mémorisation, d'attention) ou de troubles du comportement qui se manifestent au fil de la croissance et du développement psychomoteur de l'enfant" 
        ],
      },
      { id: "sep-mineraux", title: "Minéraux", isSectionHeader: true },
      {
        id: "calcium",
        title: "Calcium",
        apports: [
          "Adultes < 25 ans : 1 000 mg/j", 
          "Adultes > 25 ans : 950 mg/j",
          "Apports sont les mêmes car absorption intestinale augmente"
        ],
        justification: [
          "Minéralisation du squelette (maintien de la masse osseuse)",
          "Prévention de l'ostéoporose, conduction de l'influx nerveux, contraction musculaire, coagulation, limitation des crampes",
          "Le calcium laitier doit représenter 2/3 des apports",
          "Besoins accrus au T3 pour croissance fœtus et prévention pré-éclampsies"
        ],
      },
      {
        id: "fer",
        title: "Fer",
        apports: [
          "T1-T2 : 16 mg",
          "T3 : 30 mg -> besoins augmentent en prévision de l'accouchement"
        ],
        justification: [
          "Rôle essentiel dans la synthèse de l'hémoglobine et le transport de l'oxygène",
          "Veiller à consommer du fer héminique, à meilleure biodisponibilité",
          "Veiller à bien couvrir les besoins car augmentation volume sanguin de la mère, croissance du fœtus et du placenta. Si carence : risque d'anémie responsable de prématuré ou hypotrophie fœtale"
        ],
      },
      {
        id: "magnesium",
        title: "Magnésium",
        apports: ["300 mg/j"],
        justification: [
          "Rôle dans la contraction et la relaxation musculaire",
          "Contribue à lutter contre le stress",
        ],
      },
      {
        id: "iode",
        title: "Iode",
        apports: ["200 mg/j"],
        justification: [
          "Augmentation clairance rénale en iode de la mère et consommation par fœtus",
          "Carence peut entraîner dysfonctionnement thyroïdiens chez mère et troubles neurologiques chez l'enfant",
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
        apports: ["120 mg/j"],
        justification: [
          "Antioxydant, anti-inflammatoire, antiasthénique",
          "Immunostimulant, d'autant plus en vie en collectivité",
          "Favorise la cicatrisation",
          "Augmente l'absorption du fer",
        ],
      },
      {
        id: "vitb",
        title: "Vitamine B9",
        apports: ["600 µg/j"],
        justification: [
          "Supplémentation médicale possible dès arrêt contraception",
          "Prévention des malformations du système nerveux embryonnaire du type spina-bifida, anencéphalie, etc."
        ],
      },
      {
        id: "vita",
        title: "Vitamine A",
        apports: ["700 µg/j"],
        justification: [
          "Le nourrisson n'a quasiment pas de réserves, d'où une augmentation des apports"
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

  // -------------------------
  // ----- PERSONNE ÂGÉE -----
  // -------------------------
  {
    slug: "personne-agee",
    intro:
      "Justification nutritionnelle de la personne âgée (au-delà de 70 ans), d'après la HAS et l'ANSES.",
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
          "Valeurs moyennes (NAP 1,63) : 8,6 MJ",
          "Hommes > 65 ans = 9,6 MJ",
          "Femmes ménopausées 50-60 ans = 8,6 MJ",
          "Femmes > 65 ans = 7,8 MJ"
        ],
        justification: [
          "Couvre les besoins liés au métabolisme de base, à l'activité physique, la thermorégulation et la thermogenèse post-prandiale",
          "Les besoins énergétiques doivent être modulés en fonction du niveau d'activité physique",
          "Les besoins sont souvent sous-estimés chez les personnes âgées, surtout en cas d'activité physique",
          "Répartition conseillée : 3 repas principaux par jour + 1 collation nutritionnellement équilibrée",
        ],
      },
      {
        id: "proteines",
        title: "Protéines",
        apports: [
          "IR : 12-20 % de l'AET, soit xx - xx g",
          "Minimum 1 g/kg/j, soit xx g/j, d'après l'ANSES (en moyenne 60 g/j)",
          "Rapport P animales / P végétales > 1",
        ],
        justification: [
          "Assure les besoins d'entretien et les rôles structurels, fonctionnels, énergétiques",
          "Le besoin minimal augmente avec l'âge (sarcopénie)",
          "Rôle énergétique secondaire (1 g de protéines = 17 kJ)",
          "Privilégier les protéines à haute valeur biologique (VB) et bon coefficient d'utilisation digestive (CUD) pour apporter l'ensemble des acides aminés essentiels : privilégier les protéines animales et les protéines végétales doivent être complétées pour assurer tous les AAE",
          "Concentrer les apports protéiques sur le déjeuner pour maximuser l'anabolisme et la rétention azotée",
          "Certaines personnes âgées peuvent diminuer leur consommation à cause de la baisse du goût et/ou des difficultés masticatoires. Les charcuteries sont généralement appréciées",
          "Sources : VPO (privilégier viandes maigres), lait et produits laitiers, céréales et légumineuses",
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
          "AG trans < 2 % de l'AET (xx g)",
        ],
        justification: [
          "Rôle énergétique (1 g de lipides = 38 kJ) => utile en cas de dénutrition, petit appétit",
          "Rôle structural important (membranes des cellules)",
          "Rôle hormonal",
          "Rôle des w6 pour réguler le bilan lipidémique et le système immunitaire",
          "Rôle des w3 dans la vision, le système nerveux et cérébtal, la physiologie vasculaire",

          "Veiller à une bonne répartition pour couvrir les besoins en AGE, assurer un apport suffisant en AGPI (effet cardioprotecteur et anti-inflammatoire)",
          "Attention particulière à porter sur les AGPI car des études suggèrent un possible lien entre des apports alimentaires élevés en AGPI w3 et une réduction du risque de certaines maladies dégénératives (Parkinson, Alzheimer) et psychiatriques (dépression, schizophrénie) chez la personne pagée. L'acide arachidonique devient essentiel par défaut de synthèse de l'acide linoléique (pas de recommandation spécifique pour cet acide gras)",
          "Les MG apportant de l'onctuosité et de la sapidité aux plats, elles favorisent une 'prise alimentaire' chez cette population qui présente souvent une ration alimentaire quantitativement insuffisante",
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
          "Sucres et produits sucrés < 12 % de l'AET (xx g), selon le GRNC",
          "Répartition conseillée : 1/3 de glucides simples, 2/3 de glucides complexes",
        ],
        justification: [
          "Complément énergétique de la ration (1 g de glucides = 17 kJ)",
          "Rôle structural : membranes cellulaires, acides nucléiques",
          "Indispensables aux cellules gluco-dépendantes → préservation des protéines tissulaires (d'où un apport supérieur à 50 % de l'AET)",
          "Vieillissement impacte la régulation de la glycémie (hyperglycémies post-prandies, résistante à l'insuline, risque d'hypoglycémie en cas de jeûne",
          "Produits sucrés dans intérêt nutritionnel, limiter consommation mais ne pas être trop restrictif",
          "Perception des goûts diminue avec l'âge (notamment le goût salé), favoriser un apport modéré en produits sucrés pour stimuler l'appétit",
          "Privilégier les glucides complexes à index glycémique bas ou modéré (IG bas < 55, moyen 56-69, élevé > 70)",
          
          "Glucides complexes : céréales complètes, légumes secs, tubercules, produits céréaliers non raffinés",
          "Glucides simples : fruits, légumes, miel, lait, sucre de table, produits transformés sucrés — à consommer avec modération",
        ],
      },
      {
        id: "fibres",
        title: "Fibres",
        apports: ["25-30 g/j, dont 50 % de fibres solubles"],
        justification: [
          "Régulation du transit (prévention de la constipation et de la diarrhée), limite l'usage de laxatif",
          "La quantité est un peu réduite par rapport à l'adulte à cause de la baisse d'appétit et la baisse des capacités digestives",
          "Rôle dans la prévention de l'athérosclérose et cancer colorectal",
          "Diminue l'index glycémique du repas et le pic d'hyperglycémie post-prandiale",
          "Renforcent le système immunitaire et équilibrent la flore intestinale",
          "Attention à l'effet satiétogène des fibres",
          "La couverture de ce besoin est extrêmement important car les troubles digestifs sont fréquents chez le sujet âgé : constipation, ballonnement, côlon irritable ou diarrhées",
          "Sources : fruits et légumes, céréales complètes, légumineuses, etc."
        ],
      },
      {
        id: "eau",
        title: "Eau",
        apports: [
          "1,5 L d'eau de boisson minimum",
          "0,30 mL/kg/j, soit xx mL",
          "En cas de fièvre ou de forte chaleur, augmenter de 0,5 L/j (par degré au-delà de 38°C de température corporelle)"
        ],
        justification: [
          "Compense les pertes hydriques (urines, selles, transpiration, respiration, fièvre, vomissements, diarrhée, activité physique)",
          "Hydrate les fibres et améliore la satiété post-prandiale",
          "Baisse de la perception de la soif avec l'âge, troubles de la déglutition, crainte de boire",
          "Rôle plastique, prévention des calculs rénaux et des cystites",
          "Boire entre les repas pour ne pas couper l'appétit au moment des repas",
          "Aromatiser l'eau à l'aide d'herbes et morceaux de fruits, utiliser des infusions et du thé",
          "Utiliser des eaux gélifiées en cas de troubles de déglutition"
        ],
      },
      { id: "sep-mineraux", title: "Minéraux", isSectionHeader: true },
      {
        id: "calcium",
        title: "Calcium",
        apports: ["950 mg/j"],
        justification: [
          "Le besoin en calcium doit être assuré car le métabolisme calcique est altéré du fait du veillissement",
          "Minéralisation du squelette (maintien de la masse osseuse)",
          "Prévention de l'ostéoporose, conduction de l'influx nerveux, contraction musculaire, coagulation, limitation des crampes",
          "Favoriser un bon rapport Ca/P",
          "Le calcium laitier doit représenter 2/3 des apports",
        ],
      },
      {
        id: "fer",
        title: "Fer",
        apports: [
          "11 mg/j",
        ],
        justification: [
          "Rôle essentiel dans la synthèse de l'hémoglobine et le transport de l'oxygène",
          "Veiller à consommer du fer héminique, à meilleure biodisponibilité : la consommation de produits du groupe VPO étant moins représentée dans ce groupe de population, le besoin en fer n'est pas toujours couvert",
        ],
      },
      {
        id: "magnesium",
        title: "Magnésium",
        apports: ["Homme : 380 mg/j", "Femme : 300 mg/j"],
        justification: [
          "Rôle dans la contraction et la relaxation musculaire",
          "Contribue à lutter contre le stress",
          "Prévention de la constipation"
        ],
      },
      { id: "sep-vitamines", title: "Vitamines", isSectionHeader: true },
      {
        id: "vitd",
        title: "Vitamine D",
        apports: ["15 µg/j"],
        justification: [
          "Besoin accru, veillez à bien couvrir les besoins en vitamine D car favorise l'absorption du calcium et la minéralisation osseuse",
          "Supplémentation médicale possible (voie nécessaire si impossibilité de sortir",
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
      {
        id: "texture",
        title: "Texture",
        apports: [
          "À définir",
        ],
        justification: [
          "À adapter selon les capacités masticatoires du patient, de son état, etc.",
        ],
      },
    ],
  },


  // ------------------------
  // ----- BEBE 0-3 ANS -----
  // ------------------------
  {
    slug: "bebe",
    intro:
      "Justification nutritionnelle des enfants en bas âge (0-3 ans).",
    rows: [
      {
        id: "energie",
        title: "Énergie (AET)",
        apports: [
          "IMC = Poids (kg) / Taille² (m) = xx + commentaire IMC (l'IMC est à comparé à la courbe de croissance)",
          "Métabolisme de base (MB) calculé selon la formule choisie -> donne MB = xx kJ = xx kcal",
          "Besoin énergétique journalier (BEJ) = MB × NAP (+ facteur d'agression selon pathologie)",
          "AET = BEJ, sauf contexte pathologique",
          "Valeurs moyennes (NAP 1,63) :",
          "0-12 mois : 385 kJ/kg/j",
          "1 an : garçon 4 MJ/j ; fille 3,8 MJ/j",
          "2 ans : garçon 4,8 MJ/j ; fille 4,4 MJ/j",
          "3 ans : garçon 5,1 MJ/j ; fille 4,8 MJ/j"
        ],
        justification: [
          "Couvre les besoins liés au métabolisme de base, à l'activité physique et professionnelle, la thermorégulation et la thermogenèse post-prandiale et le besoin lié à la croissance (très important au cours de la 1ère année",
        ],
      },
      {
        id: "proteines",
        title: "Protéines",
        apports: [
          "0-12 mois : 7-15 % de l'AET, soit xx-xx g",
          "1-3 ans : 6-15 % de l'AET, soit xx-xx g",
          "Valeurs mini : jusqu'à 2 ans mini 10g/j ; 3e année mini 12 g/j"
        ],
        justification: [
          "Assurer les besoins d'entretien, de croissance et de développement de la masse musculaire",
          "Couvrir les besoins liés aux différents rôles des protéines (structural, fonctionnel, immunitaire et énergétique)",
          "Privilégier les protéines de bonne VB et de bon CUD pour apporter l'ensemble des acides aminés essentiels (pas de protéines présentant un facteur limitant)",
          "Point de vigilence : fonction rénale immature"
        ],
      },
      {
        id: "lipides",
        title: "Lipides",
        apports: [
          "0-6 mois : 50-55 % de l'AET, soit xx-xx g",
          "6 mois - 3 ans : 45-50 % de l'AET, soit xx-xx g",
          "AGPI : 0-12 mois 3,15% de l'AET (soit xx g) avec w6 = 2,7% et w3 = 0,45% ; 1-3 ans : w3 = 0,45%",
          "DHA : 0-6 mois 0,32% des lipides totaux ; 6-12 mois 70 mg/j",
          "1-3 ans : EPA + DHA = 250 mg/j dont DHA = 70 mg/j"
        ],
        justification: [
          "Rôle énergétique (1 g de lipides = 38 kJ), particulièrement important pendant les premiers mois",
          "Apportent les AG essentiels nécessaires au développement du cerveau et du système nerveux central",
          "Veiller à une bonne répartition des lipides pour couvrir les besoins en AG essentiels et pour assurer un apport suffisant en acides linoléiques et α-linolénique, en DHA et acide arachidonique, tout en respectan un rapport EPA/DHA < 1",
          "Pour les prématurés : supplémentation en AGPI LC à envisager"
        ],
      },
      {
        id: "glucides",
        title: "Glucides",
        apports: [
          "IR : 40-50 % de l'AET, soit xx - xx g",
          "En moyenne 10 g/kg/j",
          "Sucre et produits sucrés : à éviter avant 6 mois ; à limiter après 6 mois",
        ],
        justification: [
          "Complément énergétique de la ration (1 g de glucides = 17 kJ)",
          "Rôle énergétique et structurel (acides nucléiques, etc.)",
          "0 à 4-6 mois : l'alimentation exclusivement lactée apporte du lactose (galactose + glucose), indispensable à la synthèse des cérébrosides et des acides nucléiques",
          "6 mois - 3 ans : amidon, fructose et saccharose sont introduits avec la diversification alimentaire : proportion lactose/total glucides baisse progressivement. On veillera à un bon apport en glucides complexes, et à éviter/limiter au maximum les produits sucrés (effet cariogène)"
        ],
      },
      {
        id: "fibres",
        title: "Fibres",
        apports: ["1-3 ans : 5-10 g/j"],
        justification: [
          "Régulation du transit (prévention de la constipation et de la diarrhée)",
          "Formation, l'amélioration et régulation du microbiote intestinal",
          "Renforce le système immunitaire",
        ],
      },
      {
        id: "eau",
        title: "Eau",
        apports: [
          "0-6 mois : 150 mL/kg/j",
          "7-11 mois : 125 mL/kg/j",
          "> 12 mois : 100 mL/kg/j",
          "OU 0-12 mois 0,35 mL/kJ/j ; > 12 mois 0,25 mL/kJ/j"
        ],
        justification: [
          "Rôle très important pendant les premiers mois",
          "Apportée par l'alimentation lactée liquide",
          "Permet de compenser les pertes hydriques : urinaires, fécales, cutanées (sueur), respiratoires (vapeur d'eau), etc.",
          "Hydrater les fibres, hydrater la peau"
        ],
      },
      { id: "sep-mineraux", title: "Minéraux", isSectionHeader: true },
      {
        id: "calcium",
        title: "Calcium",
        apports: [
          "AS 0-6 mois : 200 mg/j",
          "AS 6-12 mois : 280 mg/j",
          "RNP 1-3 ans : 450 mg/j",
        ],
        justification: [
          "Veiller à bien couvrir les besoins en calcium qui sont très importants lors de cette phase de croissance rapide",
          "Minéralisation optimale du squelette (croissance osseuse +++ et maintien de la masse osseuse)",
          "Minéralisation des dents et conduction de l'influx nerveux",
          "Le lait maternel contient 320 mg Ca/L et les laits pour nourrissons entre 430-930 mg Ca/L. Cette différence tient au fait que le CUD du lait maternel est bien supérieur à celui des préparations maternelles"
        ],
      },
      {
        id: "fer",
        title: "Fer",
        apports: [
          "AS 0-6 mois : 0,3 mg/j",
          "AS 6-12 mois : 11 mg/j",
          "RNP 1-3 ans : 5 mg/j",
        ],
        justification: [
          "Rôle dans le développement du volume sanguin",
          "Croissance et oxygénation des tissus : constitution de l'hémoglobine et transport de l'oxygène",
          "Vigilence : en cas de prématurité, une supplémentation peut être envisagée (carence éventuelle)"
        ],
      },
      {
        id: "magnesium",
        title: "Magnésium",
        apports: [
          "AS 0-6 mois : 25 mg/j",
          "AS 6-12 mois : 80 mg/j",
          "RNP 1-3 ans : 180 mg/j",
        ],
        justification: [
          "Veiller à bien coubrir les besoins car le magnésium a un effet myorelaxant : activité physique et développement musculaire",
        ],
      },
      {
        id: "fluor",
        title: "Fluor",
        apports: [
          "AS 0-6 mois : 0,08 mg/j",
          "AS 6-12 mois : 0,4 mg/j",
          "RNP 1-3 ans : 0,6 mg/j",
        ],
        justification: [
          "Supplémentation médicale possible pour prévenir les caries dentaires",
        ],
      },
      { id: "sep-vitamines", title: "Vitamines", isSectionHeader: true },
      {
        id: "vitd",
        title: "Vitamine D",
        apports: [
          "AS 0-1 an : 10 µg/j",
          "AS 1-3 ans : 15 µg/j"
        ],
        justification: [
          "Supplémentation médicamenteuse systématique. Il conviendra de veiller à couvrir les besoins en vitamine D, car elle favorise l'absorption du calcium et donc le développement de la masse osseuse (la croissance)",
          "Rôle antirachitique"
        ],
      },
      {
        id: "vitk",
        title: "Vitamine K",
        apports: [
          "AS 0-6 mois : 5 µg/j",
          "AS 6-12 mois : 10 µg/j",
          "RNP 1-3 ans : 29 µg/j",
        ],
        justification: [
          "Supplémentation systématique des nouveaux nés pour pallier le risque d'hémorragie"
        ],
      },
      {
        id: "vitc",
        title: "Vitamine C",
        apports: ["20 mg/j"],
        justification: [
          "Veiller à bien couvrir les besoins en vitamine C pour bénéficier de son effet antioxydant, immunostimulat",
          "Intéressant du fait de la vie en collectivité",
          "Augmente l'absorption du fer"
        ],
      },
      {
        id: "rythme",
        title: "Rythme alimentaire",
        apports: [
          "À adapter en fonction de l'âge",
        ],
        justification: [
          "0-6 mois (avant la diversification alimentaire) : à la demande si allaitement maternel ; au rythme des biberons",
          "Puis progressivement tendre vers 3 repas et 1 goûter"
        ],
      },
      {
        id: "texture",
        title: "Texture",
        apports: [
          "À adapter en fonction des capacités de l'enfant",
        ],
        justification: [
          "D'abord liquide, puis mixée, hachée et enfin en petits morceaux"
        ],
      },
    ],
  },

  // -------------------------
  // ----- ENFANT & ADOS -----
  // -------------------------
  {
    slug: "enfant-ados",
    intro:
      "Justification nutritionnelle de l'enfant et adolenscent.es de 4 à 18 ans..",
    rows: [
      {
        id: "energie",
        title: "Énergie (AET)",
        apports: [
          "IMC = Poids (kg) / Taille² (m) = xx + commentaire IMC (l'IMC est à comparé à la courbe de croissance)",
          "Métabolisme de base (MB) calculé selon la formule choisie -> donne MB = xx kJ = xx kcal",
          "Besoin énergétique journalier (BEJ) = MB × NAP (+ facteur d'agression selon pathologie)",
          "AET = BEJ, sauf contexte pathologique",
          "Valeurs moyennes :",
          "4-6 ans : garçon 6,4 MJ ; fille 5,9 MJ",
          "7-10 ans : garçon 7,7 MJ ; fille 7,2 MJ",
          "11-14 ans : garçon 9,5 MJ ; fille 8,6 MJ",
          "15-17 ans : garçon 11,8 MJ ; fille 9,4 MJ",
        ],
        justification: [
          "Couvre les besoins liés au métabolisme de base, à l'activité physique (NAP moyen de 1,6 < 10 ans, 1,75 au-dessus), la thermorégulation, thermogenèse post-prandiale et la croissance",
          "Les besoins énergétiques varient selon l'âge, le sexe et l'activité physique",
        ],
      },
      {
        id: "proteines",
        title: "Protéines",
        apports: [
          "4-5 ans : 6-16 % de l'AET, soit xx-xx g",
          "6 - 9 ans : 7-17 % de l'AET, soit xx-xx g",
          "10 - 13 ans : 9-19 % de l'AET, soit xx-xx g",
          "14 - 17 ans : 10-20 % de l'AET, soit xx-xx g"
        ],
        justification: [
          "Assure les besois d'entretien et de croissance",
          "Couvre les rôles structurels, fonctionnels et énergétiques des protéines",
          "Privilégier les protéines de bonne VB et de bon CUD : VPO, laits et produits laitiers, céréales, légumineuses"
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
          "DHA = 125 mg/j, EPA = 125 mg/j",
        ],
        justification: [
          "Rôle énergétique (1 g de lipides = 38 kJ)",
          "Rôle de transporteur des vitamines liposolubles, notamment A et D qui sont importantes en phase de croissance",
          "Rôle structural important (membranes des cellules)",
          "Rôle hormonal",
          "Veiller à une bonne répartition des lipides pour couvrir les besoins en AG essentiels : AGS à limiter, AGMI et AGPI à privilégier (effet cardioprotecteur et anti-inflammatoire)"
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
          "Rôle énergétique et structurel (acides nucléiques, ...)",
          "Veiller à un bon apport en glucides complexes (à IG bas ou modéré)",
          "Les produits sucrés et le sucre n'ont pas d'intérêt nutritionnel. Ce sont des aliments plaisir à consommer avec modération (objectif du GEMRCN) du fait de leur effet cariogène"
        ],
      },
      {
        id: "fibres",
        title: "Fibres",
        apports: [
          "4-6 ans : 14 g",
          "7-10 ans : 16 g",
          "11-14 ans : 19g",
          "15-17 ans : 21 g",
          "dont 50 % de fibres solubles"
        ],
        justification: [
          "Régulation du transit (prévention de la constipation et de la diarrhée)",
          "Effet satiétogène, limitant la prise de poids excessive",
          "Diminue l'index glycémique du repas et le pic d'hyperglycémie post-prandiale",
          "Formation, l'amélioration et régulation du microbiote intestinal",
          "Renforce le système immunitaire",
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
          "Hydrate la peau",
          "Les apports se feront pour moitié sous forme d'eau de boisson, il est recommandé de limiter les boissons sucrées et d'éviter les boissons excitantes"
        ],
      },
      { id: "sep-mineraux", title: "Minéraux", isSectionHeader: true },
      {
        id: "calcium",
        title: "Calcium",
        apports: [
          "4-10 ans : 800 mg/j", 
          "11-17 ans : 1150 mg/j"
        ],
        justification: [
          "Minéralisation du squelette (croissance osseuse +++ et maintien de la masse osseuse)",
          "Minéralisation des dents",
          "Conduction de l'influx nerveux, contraction musculaire, coagulation, limitation des crampes",
          "Le calcium laitier doit représenter 2/3 des apports",
        ],
      },
      {
        id: "fer",
        title: "Fer",
        apports: [
          "4-6 ans : 4 mg/j",
          "7-10 ans : 6 mg/j",
          "11-17 ans : garçon 11 mg/j ; fille règles faibles 11 mg/j ; fille règle abondante 13 mg/j"
        ],
        justification: [
          "Rôle essentiel dans la synthèse de l'hémoglobine et le transport de l'oxygène",
          "Veiller à consommer du fer héminique, à meilleure biodisponibilité",
        ],
      },
      {
        id: "magnesium",
        title: "Magnésium",
        apports: [
          "4-6 ans : 210 mg/j",
          "7-10 ans : 240 mg/j",
          "11-14 ans : 265 mg/j",
          "15-17 ans : garçon 295 mg/j ; fille 225 mg/j"
        ],
        justification: [
          "Rôle dans la contraction et la relaxation musculaire",
          "Contribue à lutter contre le stress",
        ],
      },
      {
        id: "iode",
        title: "Iode",
        apports: [
          "4-10 ans : 90 µg/j",
          "11-14 ans : 120 µg/j",
          "15-17 ans : 235 µg/j"
        ],
        justification: [
          "Constitution des hormones thyroïdiennes (T3/T4)",
          "Régule croissance, métabolisme énergétique, développement cérébral",
          "Essentiel au développement du cerveau, du système nerveux et du QI",
          "Une carence peut conduire à : fatigue, troubles de concentration, retard de croissance, goitre",
          "Besoins élevés pendant l'enfance en raison du développement neurologique et somatique"
        ],
      },
      {
        id: "zinc",
        title: "Zinc",
        apports: [
          "4-6 ans : 5,5 mg/j",
          "7-10 ans : 7,4 mg/j",
          "11-14 ans : 10,7 mg/j",
          "15-17 ans : garçon 14,2 mg/j ; fille 11,9 mg/j"
        ],
        justification: [
          "Croissance et développement : synthèse des protéines, division cellulaire",
          "Immunité : rôle clé dans la réponse immunitaire",
          "Cicatrisation : régénération des tissus",
          "Fonction cognitive : impliqué dans les neurotransmetteurs",
          "Besoins accrus car croissance corporelle rapide",
          "Carence = retard staturo-pondéral, infections répétées, baisse d'appétit"
        ],
      },
      { id: "sep-vitamines", title: "Vitamines", isSectionHeader: true },
      {
        id: "vita",
        title: "Vitamine A",
        apports: [
          "4-6 ans : 300 µg ER/j",
          "7-10 ans : 400 µg ER/j",
          "11-14 ans : 600 µg ER/j",
          "15-17 ans : garçon 750 µg ER/j ; fille 650 µg ER/j"
        ],
        justification: [
          "Vision : indispensable à la formation de la rhosopsine (vision nocturne)",
          "Croissance : participe à la différenciation cellulaire et au développement des tissus",
          "Système immunitaire : renforce les barrières cutanées et muqueuses + immunité anti-infectieuse",
          "Peau et muqueuse : maintien de l'intégrité des tissus épithéliaux",
          "Besoins plus élevés rapportés au poids car croissance rapide",
          "Déficit = risque accru d'infections + troubles visuels + retard de croissance"
        ],
      },
      {
        id: "vitd",
        title: "Vitamine D",
        apports: ["15 µg/j"],
        justification: [
          "Favorise l'absorption du calcium et la minéralisation osseuse (développement de la masse osseuse)",
          "S'active grâce aux UV",
        ],
      },
      {
        id: "vitc",
        title: "Vitamine C",
        apports: [
          "4-6 ans : 30 mg/j",
          "7-10 ans : 45 mg/j",
          "11-14 ans : 70 mg/j",
          "15-17 ans : 100 mg/j"
        ],
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
          "4 repas par jour",
        ],
        justification: [
          "Petit déjeuner, déjeuner, goûter, dîner",
        ],
      },
    ],
  },

  // ----------------------
  // ----- SPORTIF·VE -----
  // ----------------------
  {
    slug: "sportif",
    intro:
      "Justification nutritionnelle de l'adulte pratiquant une activité physique régulière et intensive.",
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
          "AG trans < 2 % de l'AET (xx g)",
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
  // { slug: "sportif", rows: [...] },
];

export function getJustification(slug: string): PopulationJustification | undefined {
  return JUSTIFICATIONS.find((j) => j.slug === slug);
}