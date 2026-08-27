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
  lien?: string
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
  },
  {
    slug: "has-denutrition",
    nom: "Diagnostic de la dénutrition (enfant, adulte, personne de 70 ans et plus)",
    acronyme: "HAS / FFN",
    organisme: "Haute Autorité de Santé, avec la Fédération Française de Nutrition",
    periode: "2019 (enfant/adulte), puis 2021 (70 ans et plus)",
    emoji: "⚖️",
    description:
      "Critères diagnostiques de la dénutrition : un critère phénotypique (perte de poids, IMC, masse musculaire) associé à un critère étiologique.",
    pointsCles: [
      "Seuil IMC différent : < 22 kg/m² chez les 70 ans et + vs < 18,5 kg/m² chez l'adulte jeune",
      "Prend en compte la sarcopénie chez la personne âgée",
      "Une personne obèse peut être dénutrie : ne pas se fier au seul IMC",
    ],
    categorie: "population",
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
    lien: "/portions",
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
  },
]

export function getReferencesByCategorie(categorie: CategorieReference) {
  return REFERENCES.filter((r) => r.categorie === categorie)
}