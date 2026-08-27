// data/populations.tsx
//
// Fichier réduit aux champs utilisés par la page /populations (switch de
// populations + calculatrice AET + tableau de justification). Le texte des
// formules utilise du JSX (ex: <sup> pour les exposants), d'où l'extension
// .tsx. Le chemin d'import "@/data/populations" ne change pas.
//
// NOTE : les valeurs kcal ci-dessous ont été complétées à partir des kJ
// fournis (conversion 1 kcal = 4,184 kJ), arrondies à la dizaine/cinquantaine
// la plus proche pour rester lisibles. À vérifier/ajuster si tu as une
// source de référence donnant directement des kcal (les arrondis officiels
// peuvent légèrement différer d'une conversion brute).

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
        { profil: "Fille 1 an", kcal: "910 kcal", kJ: "3,8 MJ" },
        { profil: "Garçon 1 an", kcal: "960 kcal", kJ: "4 MJ" },
        { profil: "Fille 2 an", kcal: "1 050 kcal", kJ: "4,4 MJ" },
        { profil: "Garçon 2 ans", kcal: "1 150 kcal", kJ: "4,8 MJ" },
        { profil: "Fille 3 an", kcal: "1 150 kcal", kJ: "4,8 MJ" },
        { profil: "Garçon 3 an", kcal: "1 220 kcal", kJ: "5,1 MJ" },
      ],
    },
    reperes: {
      introduction: "Repères PNNS pour le nourrisson et le jeune enfant, à adapter selon le stade de diversification alimentaire.",
      groupes: [
        { groupe: "Lait / produits laitiers", emoji: "🍼", portionsParJour: "500 ml/j environ (dès 1 an)", tailleReference: "Lait maternel, lait infantile puis lait de croissance jusqu'à 3 ans" },
        { groupe: "Féculents", emoji: "🍞", portionsParJour: "1 à 2, introduits progressivement", tailleReference: "Céréales infantiles, puis pain, pâtes, riz en petites quantités" },
        { groupe: "Fruits et légumes", emoji: "🥦", portionsParJour: "2 à 3, dès la diversification", tailleReference: "Purées puis morceaux selon les capacités de mastication" },
        { groupe: "Viandes, poissons, œufs", emoji: "🍗", portionsParJour: "1, en petite quantité", tailleReference: "10 g à 6 mois jusqu'à 20-30 g vers 2-3 ans" },
        { groupe: "Matières grasses", emoji: "🫒", portionsParJour: "À chaque repas dès la diversification", tailleReference: "Beurre ou huile à ajouter dans les purées/plats (besoins lipidiques élevés)" },
      ],
      alimentsFavoriser: [
        "Diversification progressive à partir de 4-6 mois révolus, en respectant le rythme de l'enfant",
        "Introduction précoce et variée des aliments potentiellement allergisants (selon recommandations en vigueur)",
        "Textures adaptées à l'âge : lisse, puis moulinée, hachée, morceaux",
        "Eau comme seule boisson en dehors du lait",
        "Lait de croissance jusqu'à 3 ans (apport en fer et AGE)",
      ],
      alimentsLimiter: [
        "Sel ajouté : à proscrire avant 1 an, à limiter fortement ensuite",
        "Sucre et produits sucrés : à éviter avant 1 an",
        "Miel avant 1 an (risque de botulisme infantile)",
        "Lait de vache non adapté comme boisson principale avant 1 an",
        "Fruits à coque entiers et aliments à risque de fausse route (étouffement)",
        "Charcuterie et plats industriels non adaptés",
      ],
      particularites: [
        "Pas de sel ni de miel ajoutés avant 12 mois",
        "Surveillance des signes de fausse route lors du passage aux morceaux",
        "Vigilance sur l'introduction des allergènes en lien avec les antécédents familiaux",
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
        { profil: "Fille 4-6 ans", kcal: "1 410 kcal", kJ: "5,9 MJ" },
        { profil: "Garçon 4-6 ans", kcal: "1 530 kcal", kJ: "6,4 MJ" },
        { profil: "Fille 7-10 ans", kcal: "1 720 kcal", kJ: "7,2 MJ" },
        { profil: "Garçon 7-10 ans", kcal: "1 840 kcal", kJ: "7,7 MJ" },
        { profil: "Fille 11-14 ans", kcal: "2 055 kcal", kJ: "8,6 MJ" },
        { profil: "Garçon 11-14 ans", kcal: "2 270 kcal", kJ: "9,5 MJ" },
        { profil: "Fille 15-17 ans", kcal: "2 245 kcal", kJ: "9,4 MJ" },
        { profil: "Garçon 15-17 ans", kcal: "2 820 kcal", kJ: "11,8 MJ" },
      ],
    },
    reperes: {
      introduction: "Repères PNNS pour l'enfant et l'adolescent, avec un 4e repas (goûter) recommandé et une vigilance particulière sur le calcium et le fer.",
      groupes: [
        { groupe: "Fruits et légumes", emoji: "🥦", portionsParJour: "5", tailleReference: "1 portion ≈ 80-100 g, crus et cuits" },
        { groupe: "Féculents", emoji: "🍞", portionsParJour: "3 à 4", tailleReference: "À chaque repas selon l'appétit et la croissance" },
        { groupe: "Produits laitiers", emoji: "🥛", portionsParJour: "3 à 4", tailleReference: "150 ml de lait, 1 yaourt ou 30 g de fromage (besoins osseux accrus)" },
        { groupe: "Viandes, poissons, œufs", emoji: "🍗", portionsParJour: "1 à 2", tailleReference: "Privilégier le poisson 2 fois/semaine" },
        { groupe: "Matières grasses", emoji: "🫒", portionsParJour: "3 à 4", tailleReference: "En favorisant les huiles végétales" },
        { groupe: "Goûter", emoji: "🍎", portionsParJour: "1", tailleReference: "Ex : fruit + produit laitier + féculent" },
      ],
      alimentsFavoriser: [
        "Goûter équilibré (4e repas), utile pour fractionner les apports",
        "Eau comme boisson principale, y compris au goûter",
        "Produits laitiers variés pour la minéralisation osseuse",
        "Fruits et légumes de saison, crus et cuits",
        "Activité physique quotidienne associée (au moins 60 min/j)",
      ],
      alimentsLimiter: [
        "Boissons sucrées et sodas",
        "Grignotage de produits gras, salés ou sucrés en dehors des repas",
        "Charcuterie et sel ajouté",
        "Produits ultra-transformés",
      ],
      particularites: [
        "Besoins caloriques et en calcium/fer particulièrement élevés au pic de croissance pubertaire",
        "Attention aux carences en fer chez les adolescentes réglées",
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
        { profil: "Femme > 65 ans", kcal: "1 865 kcal", kJ: "7,8 MJ" },
        { profil: "Homme > 65 ans", kcal: "2 295 kcal", kJ: "9,6 MJ" },
        { profil: "Femmes ménopausées 50-60 ans", kcal: "2 055 kcal", kJ: "8,6 MJ" },
      ],
    },
    reperes: {
      introduction: "Repères PNNS et HASP (2021)",
      groupes: [
        { groupe: "Fruits et légumes", emoji: "🥦", portionsParJour: "au moins 5", tailleReference: "1 portion ≈ 80-100 g" },
        { groupe: "Féculents", emoji: "🍞", portionsParJour: "3 à 4", tailleReference: "Selon l'appétit, à chaque repas" },
        { groupe: "Produits laitiers", emoji: "🥛", portionsParJour: "2 à 3", tailleReference: "150 ml de lait, 1 yaourt ou 30 g de fromage" },
        { groupe: "Viandes, poissons, œufs", emoji: "🍗", portionsParJour: "1 à 2", tailleReference: "Privilégier le poisson 2 fois/semaine" },
        { groupe: "Matières grasses", emoji: "🫒", portionsParJour: "3 à 4", tailleReference: "En favorisant les huiles végétales" },
        { groupe: "Fruits à coque", emoji: "🫒", portionsParJour: "1", tailleReference: "Consommation non recommandée pour les personnes présentant des allergies identifiées" },
      ],
      alimentsFavoriser: [
        "Fruits et légumes de saison, crus et cuits (fruits frais, surgelés ou en conserve)",
        "Légumineuses (au moins 2 fois par semaine)",
        "Poissons gras (sardine, maquereau, saumon)",
        "Huiles de colza, noix ou olive",
      ],
      alimentsLimiter: [
        "Produits sucrés et boissons sucrées (dont jus de fruit)",
        "Charcuterie",
        "Huiles de tournesol et d'arachide. Matières grasses animales à utiliser préférentiellement pour usage cru ou tartinable",
        "Sel ajouté",
        "Produits ultra-transformés",
        "Alcool : < 10 verres par semaines (max 2/jour)"
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
    reperes: {
      introduction: "Repères PNNS pour la femme enceinte, avec des règles d'hygiène alimentaire strictes pour prévenir toxoplasmose, listériose et excès de vitamine A.",
      groupes: [
        { groupe: "Fruits et légumes", emoji: "🥦", portionsParJour: "5", tailleReference: "1 portion ≈ 80-100 g, bien lavés" },
        { groupe: "Féculents", emoji: "🍞", portionsParJour: "3 à 4", tailleReference: "Selon l'appétit, à chaque repas" },
        { groupe: "Produits laitiers", emoji: "🥛", portionsParJour: "3 à 4", tailleReference: "150 ml de lait, 1 yaourt ou 30 g de fromage (pasteurisés)" },
        { groupe: "Viandes, poissons, œufs", emoji: "🍗", portionsParJour: "1 à 2", tailleReference: "Bien cuits ; poisson 2 fois/semaine en variant les espèces" },
        { groupe: "Matières grasses", emoji: "🫒", portionsParJour: "3 à 4", tailleReference: "En favorisant les huiles végétales" },
      ],
      alimentsFavoriser: [
        "Fruits et légumes bien lavés, crus et cuits",
        "Viandes et poissons bien cuits à cœur",
        "Produits laitiers pasteurisés",
        "Eau comme boisson principale",
      ],
      alimentsLimiter: [
        "Alcool : à proscrire totalement, à tous les stades de la grossesse",
        "Caféine : à limiter (< 300 mg/j)",
        "Foie et produits à base de foie (excès de vitamine A)",
        "Poissons prédateurs riches en mercure (espadon, requin, lamproie...)",
        "Sel ajouté",
      ],
      particularites: [
        "Prévention toxoplasmose : bien cuire viandes, laver fruits/légumes/herbes, éviter le contact avec litières de chat",
        "Prévention listériose : éviter fromages au lait cru, charcuteries à la coupe, poissons fumés, graines germées crues, produits sous vide",
        "Ne pas consommer d'alcool, même en faible quantité ou occasionnellement",
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
    },
    reperes: {
      introduction: "Repères PNNS pour la femme allaitante, avec des besoins accrus en énergie, calcium, iode et hydratation pour soutenir la lactation.",
      groupes: [
        { groupe: "Fruits et légumes", emoji: "🥦", portionsParJour: "5", tailleReference: "1 portion ≈ 80-100 g" },
        { groupe: "Féculents", emoji: "🍞", portionsParJour: "3 à 4", tailleReference: "Selon l'appétit, à chaque repas" },
        { groupe: "Produits laitiers", emoji: "🥛", portionsParJour: "3 à 4", tailleReference: "150 ml de lait, 1 yaourt ou 30 g de fromage" },
        { groupe: "Viandes, poissons, œufs", emoji: "🍗", portionsParJour: "1 à 2", tailleReference: "Privilégier le poisson gras 2 fois/semaine (oméga-3)" },
        { groupe: "Matières grasses", emoji: "🫒", portionsParJour: "3 à 4", tailleReference: "En favorisant les huiles végétales (colza, noix, olive)" },
      ],
      alimentsFavoriser: [
        "Hydratation régulière tout au long de la journée (compense les pertes liées au lait produit)",
        "Poissons gras pour les apports en oméga-3 (qualité du lait maternel)",
        "Fruits et légumes variés",
        "Produits laitiers pour couvrir les besoins calciques inchangés",
      ],
      alimentsLimiter: [
        "Alcool : à proscrire, passe dans le lait maternel",
        "Café et thé : à limiter, surtout en fin de journée (excitants pour le nourrisson)",
        "Poissons prédateurs riches en mercure",
      ],
      particularites: [
        "Certains aliments (ail, chou, épices fortes...) peuvent modifier le goût du lait sans que cela pose problème pour la majorité des nourrissons",
        "Pas de restriction alimentaire systématique en dehors de l'alcool et de la modération en excitants",
      ],
    },
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
        { profil: "Femme, majoré de 5% (hors NAP)", kcal: "1 360 kcal", kJ: "5,7 MJ" },
        { profil: "Homme, majoré de 5% (hors NAP)", kcal: "1 675 kcal", kJ: "7 MJ" },
        { profil: "Femme, mojoré de 10% (hors NAP)", kcal: "1 435 kcal", kJ: "6 MJ" },
        { profil: "Homme, majoré de 10% (hors NAP)", kcal: "1 770 kcal", kJ: "7,4 MJ" },
      ],
    },
    reperes: {
      introduction: "Repères PNNS pour le sportif, avec une attention particulière portée à la répartition des glucides, à l'hydratation et au timing des prises alimentaires autour de l'effort.",
      groupes: [
        { groupe: "Fruits et légumes", emoji: "🥦", portionsParJour: "5 ou plus", tailleReference: "1 portion ≈ 80-100 g" },
        { groupe: "Féculents", emoji: "🍞", portionsParJour: "3 à 5", tailleReference: "À chaque repas, quantité ajustée au volume d'entraînement" },
        { groupe: "Produits laitiers", emoji: "🥛", portionsParJour: "3 à 4", tailleReference: "150 ml de lait, 1 yaourt ou 30 g de fromage" },
        { groupe: "Viandes, poissons, œufs", emoji: "🍗", portionsParJour: "1 à 2", tailleReference: "Répartis sur la journée pour optimiser la synthèse protéique" },
        { groupe: "Matières grasses", emoji: "🫒", portionsParJour: "3 à 4", tailleReference: "En favorisant les huiles végétales" },
        { groupe: "Hydratation", emoji: "💧", portionsParJour: "Renforcée", tailleReference: "Avant, pendant et après l'effort ; eau ± boisson électrolytique selon la durée" },
      ],
      alimentsFavoriser: [
        "Glucides complexes avant l'effort pour constituer les réserves de glycogène",
        "Collation glucido-protéique dans les heures suivant l'effort (récupération)",
        "Protéines réparties sur l'ensemble des repas de la journée",
        "Fruits secs et oléagineux pour les collations",
        "Hydratation fractionnée tout au long de la journée",
      ],
      alimentsLimiter: [
        "Aliments gras et lourds à digérer juste avant l'effort",
        "Alcool (nuit à la récupération et à l'hydratation)",
        "Boissons énergisantes non adaptées à l'effort sportif",
      ],
      particularites: [
        "Repas pré-effort à prendre environ 3h avant, pauvre en graisses et en fibres pour limiter l'inconfort digestif",
        "Vigilance sur les apports en fer et en calcium, en particulier chez les sportives",
        "Besoins variables selon la discipline (endurance, force, sports à catégorie de poids)",
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