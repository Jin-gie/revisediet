import type { Pathologie } from "../types";

export const obesite: Pathologie = {
  slug: "obesite",
  label: "Obésité",
  labelCourt: "Obésité",
  emoji: "⚖️",
  description:
    "Accumulation anormale ou excessive de masse grasse corporelle dans des proportions telles qu'elle altère la santé (OMS). Pathologie multifactorielle touchant toutes les tranches d'âge.",
  tags: ["Nutrition", "Chronique", "Multifactoriel"],

  mdx: {
    // La physiopathologie de l'obésité est surtout faite de typologies /
    // schémas étiologiques déjà bien rendus en données structurées (voir
    // diagnostic ci-dessous) : pas besoin de MDX ici, contrairement au DT1.
    physiopathologie: false,
    traitement: false,
    dietetique: false,
  },

  resume: {
    definition:
      "Situation d'accumulation anormale ou excessive de masse grasse corporelle dans des proportions telles qu'elle altère la santé (OMS). Considérée comme une maladie du fait de ses répercussions sur la santé.",
    mecanismeCle:
      "Déséquilibre chronique entre apports et dépenses énergétiques, résultant de l'interaction de facteurs génétiques, environnementaux, comportementaux et psychologiques.",
    epidemiologie:
      "16 % de la population adulte mondiale était obèse en 2022, soit 890 millions de personnes. 2,5 milliards de personnes en surpoids (43 %). 37 millions d'enfants de moins de 5 ans en surpoids/obèses ; plus de 390 millions d'enfants et adolescents (5-19 ans) en surpoids dont 160 millions obèses.",
    etiologie:
      "Génétique, stress, médicaments, sexe/âge, circonstances exceptionnelles, facteurs socioculturels, habitudes alimentaires, habitudes de vie, psychologie, microbiote, environnement.",
    chiffresCles: [
      { valeur: "16 %", label: "de la population adulte mondiale obèse (2022)" },
      { valeur: "2,5 Mds", label: "en surpoids (43 %)" },
      { valeur: "37 M", label: "enfants < 5 ans en surpoids/obèses" },
      { valeur: "390 M", label: "enfants/ados 5-19 ans en surpoids" },
    ],
  },

  diagnostic: {
    mesuresAnthropometriques: {
      imc: {
        formule: "Poids (kg) / Taille² (m)",
        note: "Seuils OMS : surpoids ≥ 25, obésité ≥ 30. Estimation indirecte de l'adiposité.",
        seuils: [
          { plage: "< 16.5", correspondance: "Dénutrition ou famine", couleur: "bg-red-700" },
          { plage: "16.5 - 18.5", correspondance: "Maigreur", couleur: "bg-orange-300" },
          { plage: "18.5 - 25", correspondance: "Corpulence normale", couleur: "bg-green-300" },
          { plage: "25 - 30", correspondance: "Surpoids", couleur: "bg-orange-400" },
          { plage: "30 - 35", correspondance: "Obésité modérée", couleur: "bg-orange-500" },
          { plage: "35 - 40", correspondance: "Obésité sévère", couleur: "bg-red-600" },
          { plage: "> 40", correspondance: "Obésité morbide ou massive", couleur: "bg-red-900" },
        ],
      },
      tourDeTaille: {
        note: "Mesure au mètre ruban. TT/TH = tour de taille / tour de hanches. Permet d'estimer l'obésité abdominale (androïde).",
        reperes: [
          { femme: "TT > 80 cm", homme: "> 94 cm", type: "Obésité androïde niveau 1" },
          { femme: "TT > 88 cm", homme: "> 102 cm", type: "Obésité androïde niveau 2" },
          { femme: "TT/TH > 0.8", homme: "> 1", type: "Obésité androïde" },
        ],
      },
    },
  },

  // Les typologies (topographie / tissu adipeux) et le schéma étiologie →
  // obésité → signes servent ici de "physiopathologie" structurée, exposées
  // via les complications + le PES diététique plutôt qu'un MDX narratif.
  complications: [
    {
      nom: "Obésité androïde",
      type: "Typologie par topographie",
      description:
        "Prédomine sur la partie haute du corps (forme « pomme »). Responsable de complications cardiovasculaires, respiratoires et d'hyperuricémie.",
    },
    {
      nom: "Obésité gynoïde",
      type: "Typologie par topographie",
      description:
        "Prédomine sur la partie basse du corps (forme « poire »). Responsable de complications mécaniques ostéoarticulaires et phlébologiques.",
    },
    {
      nom: "Obésité homogène",
      type: "Typologie par topographie",
      description: "L'excès de graisse ne prédomine dans aucune région du corps.",
    },
    {
      nom: "Hypertrophique",
      type: "Typologie par tissu adipeux",
      description: "Augmentation de la taille des adipocytes.",
    },
    {
      nom: "Hyperplasique",
      type: "Typologie par tissu adipeux",
      description: "Augmentation du nombre des adipocytes.",
    },
    {
      nom: "Mixte",
      type: "Typologie par tissu adipeux",
      description: "Augmentation des deux paramètres.",
    },
    {
      nom: "Maladies cardiovasculaires",
      type: "Retentissements",
    },
    {
      nom: "Maladies chroniques",
      type: "Retentissements",
    },
    {
      nom: "Cancers",
      type: "Retentissements",
    },
    {
      nom: "Problèmes psychologiques",
      type: "Retentissements",
      description:
        "Estime de soi altérée, discrimination liée aux rondeurs — retentissement fréquent et parfois sous-évalué.",
    },
    {
      nom: "Retentissements endocriniens",
      type: "Retentissements",
    },
  ],

  dietetique: {
    intro:
      "La prise en charge diététique s'appuie sur une démarche de soin : bilan diététique, négociation d'objectifs, stratégie et suivi nutritionnel à but éducatif, préventif ou thérapeutique.",
    pes: {
      etiologie: [
        "Génétique",
        "Stress",
        "Médicaments",
        "Sexe ou âge",
        "Circonstances exceptionnelles",
        "Facteurs socioculturels",
        "Habitudes alimentaires",
        "Habitudes de vie",
        "Psychologie",
        "Microbiote",
        "Environnement",
      ],
      problemesNutritionnels: [
        "Quantités consommées",
        "Qualité des apports alimentaires",
        "Moments des prises alimentaires",
        "Difficultés et motivation",
        "Comportements alimentaires",
        "Comportement alimentaire pathologique",
        "Éléments qui influencent la prise en charge",
      ],
      signesSymptomes: [
        "Poids corporel supérieur à la moyenne (IMC > 30)",
        "Maladies cardiovasculaires",
        "Maladies chroniques",
        "Cancers",
        "Problèmes psychologiques",
        "Retentissements endocriniens",
      ],
    },
    objectifsSoin: [
      {
        titre: "Objectifs de soin (HAS)",
        contenu:
          "Perte pondérale de 5 à 10 % par rapport au poids initial. Stabiliser le poids reste un objectif valable en cas d'échec thérapeutique antérieur. Prise en charge des comorbidités associées essentielle. Attention au bien-être, à l'estime de soi et à l'intégration sociale du patient.",
      },
      {
        titre: "Équipe pluridisciplinaire",
        contenu:
          "Médecin généraliste, diététicien / médecin nutritionniste, psychologue / psychiatre, professionnel en activité physique adaptée, médecin du travail.",
      },
      {
        titre: "CSO — Centres Spécialisés Obésité",
        contenu:
          "Soins de 3ᵉ recours pour obésité sévère et/ou complexe. Organisent les réunions de concertation pluridisciplinaire (RCP) en vue d'une chirurgie bariatrique.",
      },
    ],
    populations: [
      {
        population: "adulte",
        titre: "Adulte obèse",
        sousTitre: "Sans comorbidité particulière",
        lignes: [
          {
            label: "Apports énergétiques",
            valeur:
              "Hypoénergétique : -15 à -30 % des ingesta spontanés (perte de 5 à 10 % du poids actuel selon HAS 2023 si comorbidité)",
            justification:
              "Diminuer les apports énergétiques spontanés pour permettre une diminution du poids initial. Une perte de poids peut améliorer les comorbidités associées.",
          },
          {
            label: "Protéines",
            valeur: "15 à 20 % de l'AET (1.2 à 1.5 g/kg poids de référence)",
            justification:
              "Suffisant pour maintenir la masse maigre lors de la perte de poids. Protéines de bonne valeur biologique.",
          },
          {
            label: "Lipides",
            valeur:
              "35 à 40 % de l'AET (30-35 % si SM/DT2, tendre vers 35 % selon SFNCM/AFDN 2019)",
            justification:
              "AGS < 12 % AET ; AGMI 15-20 % AET ; AGPI 5 % AET (Ω6 4 %, Ω3 1 % dont EPA+DHA 500 mg/j) ; AG trans < 2 %. Adapter si risque de MCV (CHO/TG élevés).",
          },
          {
            label: "Glucides",
            valeur: "40 à 50 % de l'AET",
            justification:
              "Privilégier index glycémique bas. Limiter glucides simples à 100 g/j et sucres libres < 5 % AET.",
          },
          {
            label: "Fibres",
            valeur: "30 g/jour",
            justification:
              "Effet satiétogène, transit, régulation glycémie postprandiale, diminution absorption du cholestérol.",
          },
          {
            label: "Eau",
            valeur: "0.25 mL/kJ/j (moitié apportée par l'alimentation)",
            justification: "Lutte contre déshydratation et constipation.",
          },
          {
            label: "Minéraux / vitamines",
            valeur: "Normaux",
            justification:
              "Attention particulière au calcium, fer, vitamine D et C. Supplémentation médicamenteuse possible si restriction lipidique sévère.",
          },
          {
            label: "Alcool",
            valeur: "Déconseillé",
            justification: "Très énergétique (30 kJ/g).",
          },
        ],
      },
      {
        population: "enceinte",
        titre: "Femme enceinte obèse",
        lignes: [
          {
            label: "Apports énergétiques",
            valeur:
              "Diminution de 5 à 10 % des apports spontanés. Jamais < 1600 kcal/j (6.6 MJ)",
            justification: "Après accouchement, perte de poids de 3 kg/mois envisageable.",
          },
          {
            label: "Protéines",
            valeur: "12 à 20 % de l'AET (1.1 g/kg poids de référence)",
            justification: "Maintien de la masse maigre, protéines de bonne valeur biologique.",
          },
          {
            label: "Lipides",
            valeur: "35 à 40 % de l'AET",
            justification:
              "Ω3 essentiels à la construction du fœtus, Ω6 rôle anti-inflammatoire. Répartition identique à l'adulte obèse (AGS/AGMI/AGPI).",
          },
          {
            label: "Glucides",
            valeur: "40 à 53 % de l'AET",
            justification:
              "Index glycémique bas. Limiter glucides simples à 100 g/j. Si diabète gestationnel : sucres libres < 5 % AET, éviter le fructose, sucre uniquement pendant les repas.",
          },
          {
            label: "Fibres",
            valeur: "30 g/jour",
            justification: "Satiété, transit, régulation glycémique.",
          },
          {
            label: "Eau",
            valeur: "35 mL/kg poids souhaitable/j (moitié via l'alimentation)",
            justification: "Lutte contre déshydratation et constipation.",
          },
          {
            label: "Minéraux / vitamines",
            valeur:
              "Calcium 1000 mg/j (<25 ans) ou 950 mg/j (>25 ans). Fer 16 mg (T1-T2) à 30 mg/j (T3). Vitamine B9 systématique en pré-conceptionnel + 1er trimestre",
            justification:
              "Calcium favorable à la croissance fœtale. Fer évite l'anémie. B9 prévient anomalies du tube neural, RCIU, prématurité.",
          },
          {
            label: "Alcool",
            valeur: "Complètement déconseillé",
            justification: "Aucune dose sûre pendant la grossesse.",
          },
        ],
      },
      {
        population: "personneAgee",
        titre: "Personne âgée obèse",
        lignes: [
          {
            label: "Apports énergétiques",
            valeur: "AET moyen ou apport excessif : diminuer la ration de 1250 kJ/j",
            justification:
              "Seuil minimum de sécurité = 6.2 MJ (1500 kcal/j). En dessous : uniquement en prise en charge médicale spécialisée.",
          },
          {
            label: "Protéines",
            valeur: "15 à 20 % de l'AET (1.2 à 1.5 g/kg poids de référence)",
            justification: "Maintien masse maigre + prévention des complications rénales.",
          },
          {
            label: "Lipides",
            valeur: "35 à 40 % de l'AET",
            justification:
              "Répartition AGS/AGMI/AGPI identique à l'adulte. Adapter si risque de MCV.",
          },
          {
            label: "Glucides",
            valeur: "40 à 50 % de l'AET",
            justification: "Index glycémique bas, sucres libres < 5 % AET.",
          },
          {
            label: "Fibres",
            valeur: "25 à 30 g/jour",
            justification:
              "Satiété, transit, régulation glycémique, réduction absorption cholestérol.",
          },
          {
            label: "Eau",
            valeur: "25 mL/kJ/j sur l'AET réel (poids actuel), moitié via l'alimentation",
            justification: "Lutte contre déshydratation et constipation (risque accru chez la PA).",
          },
          {
            label: "Minéraux / vitamines",
            valeur: "Normaux — attention calcium, vitamine D, fer, vitamine C (< 120 mg/j)",
            justification:
              "Calcium/vitamine D pour la minéralisation osseuse et prévention de l'ostéoporose. Fer contre l'anémie. Vitamine C antioxydante à ne pas dépasser.",
          },
          {
            label: "Alcool",
            valeur: "Déconseillé",
            justification:
              "Énergie inutile ; hyperglycémiant à jeun ; hypertriglycéridémiant si diabète/risque MCV associé.",
          },
        ],
      },
    ],
    casParticuliers: [
      {
        titre: "Obésité et TCA",
        description:
          "Hors référentiel d'examen, mais utile en stage : dépistage systématique en cas de suspicion de TCA associé à l'excès de poids.",
        scoff: [
          "Vous faites-vous vomir parce que vous vous sentez mal d'avoir trop mangé ?",
          "Vous inquiétez-vous d'avoir perdu le contrôle de ce que vous mangez ?",
          "Avez-vous perdu récemment plus de 6 kg en 6 mois ?",
          "Pensez-vous que vous êtes grosse alors que d'autres vous trouvent trop mince ?",
          "Diriez-vous que la nourriture domine votre vie ?",
        ],
        points: [
          {
            titre: "Hyperphagie boulimique (Binge Eating Disorder)",
            contenu:
              "Survenue récurrente de crises de boulimie avec perte de contrôle : prise alimentaire rapide et largement supérieure à la normale, distension abdominale inconfortable, absence de sensation de faim, isolement pendant les crises, dégoût de soi et culpabilité après la crise, ≥ 1 fois/semaine pendant 3 mois.",
          },
          {
            titre: "Orientation si dépistage positif (score > 2)",
            contenu:
              "Patient non suivi par un psy → adressé vers un professionnel formé au TCA. Patient déjà connu de TCA → suivi par son praticien habituel et réévalué.",
          },
        ],
      },
    ],
  },

  flash: {
    definition:
      "Accumulation anormale ou excessive de masse grasse corporelle altérant la santé (IMC ≥ 30), d'origine multifactorielle.",
    motsClés: [
      "IMC", "Tour de taille", "Obésité androïde", "Obésité gynoïde",
      "Hypertrophique / hyperplasique", "Méthode PES", "HAS", "CSO", "PNNS4",
      "AET", "Hypoénergétique",
    ],
    sections: [
      {
        titre: "Diagnostic",
        items: [
          "IMC = Poids / Taille² — seuils OMS : surpoids ≥ 25, obésité ≥ 30",
          "Tour de taille : > 80 cm (F) / > 94 cm (H) → obésité androïde niveau 1",
          "Typologie topographique : androïde (pomme), gynoïde (poire), homogène",
          "Typologie tissulaire : hypertrophique, hyperplasique, mixte",
        ],
      },
      {
        titre: "Diagnostic diététique (PES)",
        items: [
          "Problèmes nutritionnels : quantités, qualité, moments des prises, comportements",
          "Étiologie : génétique, stress, médicaments, environnement, microbiote...",
          "Signes/symptômes : IMC > 30, MCV, cancers, troubles psychologiques",
        ],
      },
      {
        titre: "Prise en charge",
        items: [
          "Objectif HAS : perte pondérale de 5 à 10 % du poids initial",
          "Stabilisation du poids = objectif valable en cas d'échec thérapeutique",
          "Équipe pluridisciplinaire : médecin, diététicien, psy, APA",
          "CSO pour obésité sévère/complexe, RCP avant chirurgie bariatrique",
        ],
      },
      {
        titre: "Apports nutritionnels (adulte)",
        items: [
          "Énergie : hypoénergétique, -15 à -30 % des ingesta spontanés",
          "Protéines 15-20 % AET, Lipides 35-40 % AET, Glucides 40-50 % AET",
          "Fibres 30 g/j, glucides simples limités à 100 g/j",
          "Alcool déconseillé (30 kJ/g)",
        ],
      },
    ],
  },
};
