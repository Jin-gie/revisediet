// data/references.ts

export type CategorieReference = "programme" | "population" | "restauration" | "organisme"

export interface Reference {
  slug: string
  nom: string
  acronyme: string
  organisme: string
  periode: string
  emoji: string
  description: string
  pointsCles: string[]
  categorie: CategorieReference
  lienOfficiel?: string // page de présentation / site officiel
  lienPdf?: string // lien direct vers le document PDF
  lienInterne?: string // lien vers une page interne du site (ex: /portions)
  lienInterneLabel?: string // label du lien interne (ex: "Voir le tableau des portions")
}

export const REFERENCES: Reference[] = [
  // --- Programmes & stratégies nationales ---
  {
    slug: "pnns",
    nom: "Programme National Nutrition Santé",
    acronyme: "PNNS",
    organisme: "Ministère de la Santé / Santé publique France",
    periode: "Depuis 2001 — PNNS 4 (2019-2023), PNNS 5 (2026-2030)",
    emoji: "🎯",
    description:
      "La politique publique de référence en nutrition en France. Fixe les repères alimentaires grand public (fruits et légumes, féculents, produits laitiers...) et pilote des outils comme le Nutri-Score.",
    pointsCles: [
      "5 éditions depuis 2001",
      "PNNS 4 : introduction du Nutri-Score, repères actualisés",
      "PNNS 5 : sommeil, végétalisation de l'alimentation, encadrement du marketing alimentaire",
    ],
    categorie: "programme",
    lienOfficiel: "https://www.mangerbouger.fr",
  },
  {
    slug: "snanc",
    nom: "Stratégie nationale pour l'alimentation, la nutrition et le climat",
    acronyme: "SNANC",
    organisme: "Ministères de la Santé, de la Transition écologique et de l'Agriculture",
    periode: "2025-2030 (publiée le 11 février 2026)",
    emoji: "🌍",
    description:
      "Nouvelle feuille de route interministérielle qui articule santé publique, transition écologique et souveraineté alimentaire, dans une approche « One Health ». Elle prend le relais du PNA et se coordonne avec le PNNS.",
    pointsCles: [
      "Approche « One Health » : santé humaine, animale, environnementale",
      "Pilotage partagé Santé / Écologie / Agriculture",
      "Volets restauration collective, précarité alimentaire, projets alimentaires territoriaux (PAT)",
    ],
    categorie: "programme",
    lienOfficiel:
      "https://www.ecologie.gouv.fr/politiques-publiques/strategie-nationale-alimentation-nutrition-climat-2025-2030",
    lienPdf: "https://www.ecologie.gouv.fr/sites/default/files/documents/11.02.2026_SNANC.pdf",
  },
  {
    slug: "pna",
    nom: "Programme National pour l'Alimentation",
    acronyme: "PNA",
    organisme: "Ministère de l'Agriculture",
    periode: "Depuis 2014",
    emoji: "🌾",
    description:
      "Volet plus \"agricole et social\" de la politique alimentaire : accès à une alimentation sûre et durable, justice sociale, ancrage territorial. Ses travaux ont préparé la SNANC.",
    pointsCles: [
      "Complémentaire du PNNS, qui est plus centré santé",
      "Lutte contre la précarité alimentaire",
    ],
    categorie: "programme",
    lienOfficiel: "https://agriculture.gouv.fr/pnan-le-programme-national-de-lalimentation-et-de-la-nutrition",
  },

  // --- Repères pour populations spécifiques ---
  {
    slug: "anses-enfants-0-3",
    nom: "Repères alimentaires pour les enfants de 0 à 3 ans",
    acronyme: "Avis ANSES (saisine 2017-SA-0145)",
    organisme: "ANSES",
    periode: "2019",
    emoji: "🍼",
    description:
      "Base scientifique des repères PNNS pour la petite enfance : diversification alimentaire, allaitement, laits infantiles, textures.",
    pointsCles: ["Concerne les enfants nés à terme et en bonne santé"],
    categorie: "population",
    lienOfficiel:
      "https://www.anses.fr/fr/content/nutrition-des-enfants-des-personnes-agees-et-des-femmes-enceintes-ou-allaitantes-lanses",
    lienPdf: "https://www.anses.fr/fr/system/files/NUT2017SA0145.pdf",
  },
  {
    slug: "anses-enfants-4-17",
    nom: "Repères alimentaires pour les enfants et adolescents de 4 à 17 ans",
    acronyme: "Avis ANSES (saisine 2017-SA-0142)",
    organisme: "ANSES",
    periode: "2019",
    emoji: "🎒",
    description:
      "Repères PNNS pour l'enfance et l'adolescence : groupes d'aliments, fréquences et portions adaptées à l'âge.",
    pointsCles: ["Base des repères utilisés en restauration scolaire"],
    categorie: "population",
    lienOfficiel:
      "https://www.anses.fr/fr/content/nutrition-des-enfants-des-personnes-agees-et-des-femmes-enceintes-ou-allaitantes-lanses",
    lienPdf: "https://www.anses.fr/fr/system/files/NUT2017SA0142.pdf",
  },
  {
    slug: "anses-femme-enceinte-allaitante",
    nom: "Repères alimentaires pour les femmes enceintes et allaitantes",
    acronyme: "Avis ANSES (saisine 2017-SA-0141)",
    organisme: "ANSES",
    periode: "2019",
    emoji: "🤰",
    description:
      "Besoins spécifiques liés à la grossesse et à l'allaitement (folates, fer, vitamine D...) et messages de sécurité alimentaire (listériose, toxoplasmose).",
    pointsCles: [
      "Surcoût énergétique progressif selon le trimestre, environ +500 kcal/j pendant l'allaitement",
    ],
    categorie: "population",
    lienOfficiel:
      "https://www.anses.fr/fr/content/nutrition-des-enfants-des-personnes-agees-et-des-femmes-enceintes-ou-allaitantes-lanses",
    lienPdf: "https://www.anses.fr/fr/system/files/NUT2017SA0141.pdf",
  },
  {
    slug: "anses-personnes-agees",
    nom: "Repères alimentaires pour les personnes âgées et femmes ménopausées",
    acronyme: "Avis ANSES (saisine 2017-SA-0143)",
    organisme: "ANSES",
    periode: "2019-2020",
    emoji: "👵",
    description:
      "Prise en compte du vieillissement (sarcopénie, appétit, besoins protéiques) dans les repères, notamment pour prévenir la dénutrition.",
    pointsCles: ["À croiser avec les critères de dénutrition de la HAS ci-dessous"],
    categorie: "population",
    lienOfficiel:
      "https://www.anses.fr/fr/content/avis-revise-de-lanses-relatif-lactualisation-des-reperes-alimentaires-du-pnns-pour-les",
    lienPdf: "https://www.anses.fr/fr/system/files/NUT2017SA0143.pdf",
  },
  {
    slug: "has-denutrition-enfant-adulte",
    nom: "Diagnostic de la dénutrition de l'enfant et de l'adulte (< 70 ans)",
    acronyme: "HAS / FFN",
    organisme: "Haute Autorité de Santé, avec la Fédération Française de Nutrition",
    periode: "Novembre 2019",
    emoji: "⚖️",
    description:
      "Recommandation de bonne pratique fixant les critères diagnostiques de la dénutrition chez l'enfant et l'adulte de moins de 70 ans : un critère phénotypique associé à un critère étiologique.",
    pointsCles: [
      "L'albuminémie n'est pas un critère diagnostique, mais un critère de sévérité",
      "Nouvelles courbes d'IMC pour l'enfant (avril 2018) à utiliser",
    ],
    categorie: "population",
    lienOfficiel: "https://www.has-sante.fr/jcms/p_3118872/fr/diagnostic-de-la-denutrition-de-l-enfant-et-de-l-adulte",
    lienPdf:
      "https://www.has-sante.fr/upload/docs/application/pdf/2019-11/reco277_recommandations_rbp_denutrition_cd_2019_11_13_v0.pdf",
  },
  {
    slug: "has-denutrition-personne-agee",
    nom: "Diagnostic de la dénutrition chez la personne de 70 ans et plus",
    acronyme: "HAS / FFN",
    organisme: "Haute Autorité de Santé, avec la Fédération Française de Nutrition",
    periode: "Novembre 2021",
    emoji: "🧓",
    description:
      "Actualise les critères de 2007 et s'aligne sur ceux de l'enfant/adulte (2019), avec des seuils spécifiques à la personne âgée (IMC, sarcopénie).",
    pointsCles: [
      "Seuil IMC < 22 kg/m² (vs < 18,5 kg/m² chez l'adulte jeune)",
      "Prend en compte la sarcopénie confirmée",
      "Une personne obèse peut être dénutrie : ne pas se fier au seul IMC",
    ],
    categorie: "population",
    lienOfficiel:
      "https://www.has-sante.fr/jcms/p_3165944/fr/diagnostic-de-la-denutrition-chez-la-personne-de-70-ans-et-plus",
    lienPdf:
      "https://www.has-sante.fr/upload/docs/application/pdf/2021-11/reco368_recommandations_denutrition_pa_cd_20211110_v1.pdf",
  },

  // --- Restauration collective ---
  {
    slug: "gemrcn",
    nom: "Groupe d'Étude des Marchés Restauration Collective et Nutrition",
    acronyme: "GEMRCN",
    organisme: "Observatoire économique de l'achat public",
    periode: "1999, actualisé en 2015",
    emoji: "🍽️",
    description:
      "Recommandations nutritionnelles pour la restauration collective (scolaire, hospitalière, médico-sociale...) : fréquences de service sur 20 repas consécutifs et grammages de portions selon l'âge des convives.",
    pointsCles: [
      "Obligatoire pour la restauration scolaire de plus de 80 couverts depuis 2012",
      "Contrôlé par les DDPP",
    ],
    categorie: "restauration",
    lienOfficiel: "https://www.economie.gouv.fr/daj/oeap-groupe-detude-des-marches-restauration-collective-et-nutrition",
    lienPdf: "https://www.economie.gouv.fr/files/directions_services/daj/marches_publics/oeap/gem/nutrition/nutrition.pdf",
    lienInterne: "/portions",
    lienInterneLabel: "Voir le résumé des portions →",
  },

  // --- Organismes de référence transversaux ---
  {
    slug: "anses",
    nom: "Agence nationale de sécurité sanitaire de l'alimentation, de l'environnement et du travail",
    acronyme: "ANSES",
    organisme: "Agence sanitaire publique",
    periode: "Créée en 2010",
    emoji: "🔬",
    description:
      "Produit l'expertise scientifique derrière les repères du PNNS (ANC, étude INCA3 sur les consommations réelles) et évalue les risques sanitaires liés à l'alimentation.",
    pointsCles: [],
    categorie: "organisme",
    lienOfficiel: "https://www.anses.fr",
  },
  {
    slug: "has",
    nom: "Haute Autorité de Santé",
    acronyme: "HAS",
    organisme: "Autorité publique indépendante",
    periode: "Créée en 2004",
    emoji: "🏥",
    description:
      "Émet les recommandations de bonne pratique clinique (dénutrition, obésité, diabète...) utilisées par les professionnels de santé, dont les diététiciens.",
    pointsCles: [],
    categorie: "organisme",
    lienOfficiel: "https://www.has-sante.fr",
  },
  {
    slug: "spf",
    nom: "Santé publique France",
    acronyme: "SpF",
    organisme: "Agence nationale de santé publique",
    periode: "Créée en 2016",
    emoji: "📢",
    description:
      "Diffuse les repères du PNNS auprès du grand public (mangerbouger.fr), pilote les campagnes de communication et la surveillance nutritionnelle.",
    pointsCles: [],
    categorie: "organisme",
    lienOfficiel: "https://www.santepubliquefrance.fr",
  },
  {
    slug: "oms",
    nom: "Organisation Mondiale de la Santé",
    acronyme: "OMS",
    organisme: "Agence des Nations Unies",
    periode: "—",
    emoji: "🌐",
    description:
      "Émet des recommandations internationales (sel, sucres libres, activité physique) qui inspirent souvent les politiques nationales comme le PNNS.",
    pointsCles: [],
    categorie: "organisme",
    lienOfficiel: "https://www.who.int/fr",
  },
]

export function getReferencesByCategorie(categorie: CategorieReference) {
  return REFERENCES.filter((r) => r.categorie === categorie)
}