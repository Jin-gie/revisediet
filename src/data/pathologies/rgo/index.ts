import type { Pathologie } from "@/data/pathologies/types"

export const rgo: Pathologie = {
  slug: "rgo",
  label: "Reflux gastro-œsophagien",
  labelCourt: "RGO",
  emoji: "🔥",
  description:
    "Passage intermittent ou permanent du contenu gastrique de l'estomac vers l'œsophage, lié à une défaillance de la barrière anti-reflux.",
  tags: ["Digestif", "Chronique"],

  resume: {
    definition:
      "Passage intermittent ou permanent de contenu gastrique (liquide) de l'estomac vers l'œsophage. Peut être physiologique (nouveau-né, personne âgée, grossesse, repas copieux) ou pathologique (répétition, durée, survenue à distance des repas ou pendant le sommeil).",
    mecanismeCle:
      "Défaillance de la barrière anti-reflux liée au dysfonctionnement du sphincter inférieur de l'œsophage (SIO) et du diaphragme.",
    epidemiologie:
      "5 à 10 % des adultes souffrent de RGO au quotidien, 30 à 40 % se plaignent occasionnellement de pyrosis et/ou de régurgitations. La prévalence augmente dans les pays occidentaux et au-delà de 50 ans.",
    etiologie:
      "Origine multifactorielle : troubles du contrôle neurologique, diminution du péristaltisme œsophagien, relâchement du diaphragme, ralentissement de la vidange gastrique, augmentation du volume intragastrique.",
  },

  physiopathologie: {
    introduction:
      "La principale cause du RGO est une défaillance de la barrière anti-reflux, favorisée par de multiples facteurs de risque.",
    etapes: [
      {
        numero: 1,
        titre: "Dysfonctionnement de la barrière anti-reflux",
        description:
          "Dysfonctionnement anormal, transitoire ou permanent de la partie inférieure de l'œsophage, au niveau du muscle du diaphragme et du sphincter inférieur de l'œsophage (SIO).",
      },
      {
        numero: 2,
        titre: "Diminution de la clairance œsophagienne",
        description:
          "Le relâchement, favorisé par les facteurs de risque, diminue la clairance œsophagienne (péristaltisme œsophagien) et accentue les effets du reflux.",
      },
      {
        numero: 3,
        titre: "Perte de la protection muqueuse",
        description:
          "Cette diminution de la clairance œsophagienne diminue la sécrétion salivaire et le mucus œsophagien qui protègent normalement contre l'acidité gastrique.",
      },
      {
        numero: 4,
        titre: "Agression de la muqueuse œsophagienne",
        description:
          "Le reflux du contenu gastrique dans l'œsophage entraîne une agression de la muqueuse œsophagienne et induit l'apparition du RGO.",
      },
    ],
  },

  facteursRisque: {
    introduction: "Les causes du RGO peuvent être regroupées en plusieurs catégories.",
    groupes: [
      {
        groupe: "Troubles du contrôle neurologique",
        items: [
          "Stress",
          "Consommation de stimulants ou irritants (café, alcool, tabac, certains médicaments)",
          "Neuropathies diabétiques ou alcooliques",
        ],
      },
      {
        groupe: "Diminution du péristaltisme œsophagien",
        items: [
          "Présence d'une hernie hiatale",
          "Augmentation de la pression intra-abdominale",
          "Grossesse",
          "Vêtement trop serré",
          "Surpoids et obésité",
        ],
      },
      {
        groupe: "Autres causes",
        items: [
          "Affection idiopathique",
          "Relâchement du diaphragme",
          "Ralentissement de la vidange gastrique",
          "Augmentation du volume intragastrique",
        ],
      },
    ],
  },

  diagnostic: {
    criteresDefinition: [
      "Composante physiologique : nouveau-né et nourrisson (immaturité des mécanismes antireflux, alimentation liquide), personne âgée (diminution du contrôle nerveux de la motricité œsophagienne), après un repas copieux et/ou eau gazeuse, femme enceinte au dernier trimestre",
      "Composante pathologique : répétition et durée des épisodes, survenue à distance des repas ou pendant le sommeil, complication à type d'œsophagite avec ou sans saignement pouvant conduire à une dysphagie",
    ],
    clinique: [
      { emoji: "🔥", signe: "Pyrosis", detail: "Douleur rétrosternale à type de brûlure acide, en période postprandiale et/ou en position de décubitus ou d'antéflexion (signe typique)" },
      { emoji: "🤮", signe: "Régurgitation acide", detail: "Remontée passive et sans effort, dans la bouche, du contenu gastrique ou œsophagien (signe typique)" },
      { emoji: "🤢", signe: "Nausée", detail: "Signe typique" },
      { emoji: "🔥", signe: "Brûlure épigastrique", detail: "Signe typique" },
      { emoji: "💔", signe: "Douleur thoracique à type d'angor", detail: "Signe atypique" },
      { emoji: "😮‍💨", signe: "Toux nocturne", detail: "Signe atypique" },
      { emoji: "😮‍💨", signe: "Dyspnée asthmatiforme", detail: "Signe atypique" },
      { emoji: "😴", signe: "Apnée du sommeil", detail: "Signe atypique" },
      { emoji: "🗣️", signe: "Fausse angine", detail: "Signe atypique" },
      { emoji: "🗣️", signe: "Laryngite", detail: "Signe atypique" },
      { emoji: "🗣️", signe: "Voix enrouée", detail: "Signe atypique" },
      { emoji: "👄", signe: "Dysesthésie buccopharyngée", detail: "Signe atypique" },
      { emoji: "👂", signe: "Otalgie", detail: "Signe atypique" },
      { emoji: "🍽️", signe: "Dysphagie", detail: "Signe atypique" },
      { emoji: "⚖️", signe: "Amaigrissement", detail: "Signe de gravité" },
      { emoji: "🫁", signe: "Pneumopathie d'inhalation", detail: "Signe de gravité" },
      { emoji: "🩸", signe: "Hématémèse", detail: "Conséquence d'un ulcère de Barrett — signe de gravité" },
      { emoji: "😴", signe: "Anémie / asthénie", detail: "Dues au saignement causé par l'érosion de la muqueuse — signe de gravité" },
    ],
    paraclinique: [
      { emoji: "🔬", nom: "Fibroscopie œso-gastro-duodénale (FOGD)", detail: "Permet de confirmer le diagnostic, de déceler les complications et de rechercher des lésions associées, comme un ulcère gastrique ou duodénal." },
      { emoji: "🧪", nom: "pH-métrie œsophagienne", detail: "Mesure le pH œsophagien sur 24h pour quantifier l'exposition acide de l'œsophage. Indiquée en cas de RGO typique ou atypique, ou d'œsophagite réfractaire au traitement médical et/ou bilan préopératoire.", valeursSeuil: "Fiabilité > 90 % lorsque le pH œsophagien est inférieur à 4 (normale : 5 - 7)" },
      { emoji: "📊", nom: "Manométrie œsophagienne", detail: "Évalue les pressions le long de l'œsophage et le degré de fermeture ou d'ouverture du sphincter inférieur de l'œsophage (SIO). Permet de déceler des troubles du péristaltisme.", valeursSeuil: "Tonicité du SIO : 10-30 mmHg | Œsophage au repos : 5-8 mmHg | Onde péristaltique après déglutition : 70-120 mmHg" },
      { emoji: "📷", nom: "Scintigraphie", detail: "Permet de visualiser l'activité motrice de l'œsophage." },
      { emoji: "🔊", nom: "Échographie œsophagienne", detail: "Permet d'écarter l'éventualité d'un diagnostic différentiel, comme une achalasie du cardia ou un spasme diffus de l'œsophage." },
    ],
  },

  complications: [
    { emoji: "🔥", nom: "Œsophagite peptique", type: "Digestive" },
    { emoji: "🩹", nom: "Ulcère gastro-duodénal", type: "Digestive" },
    { emoji: "🍽️", nom: "Sténose peptique", type: "Digestive", description: "Rétrécissement de l'œsophage, signalé par l'apparition d'une dysphagie permanente." },
    { emoji: "🧬", nom: "Endobrachyœsophage (œsophage de Barrett)", type: "Digestive", description: "Remplacement de l'épithélium œsophagien normal par un épithélium de type intestinal dans le bas de l'œsophage." },
    { emoji: "😮‍💨", nom: "Complications respiratoires", type: "Respiratoire", description: "Toux, dyspnée nocturne, asthme, infection bronchopulmonaire." },
    { emoji: "👂", nom: "Complications ORL", type: "ORL", description: "Dysphonie, laryngites, otites à répétition, caries et/ou gingivite dues à l'agression acide sur l'émail dentaire ou les gencives." },
    { emoji: "🩸", nom: "Hémorragie digestive haute", type: "Digestive" },
    { emoji: "⚖️", nom: "Altération de l'état général (AEG)", type: "Générale", description: "Asthénie, anorexie, amaigrissement." },
    { emoji: "🩸", nom: "Hématémèse", type: "Digestive" },
    { emoji: "🩸", nom: "Anémie", type: "Hématologique" },
    { emoji: "🎗️", nom: "Cancer de l'œsophage", type: "Oncologique" },
  ],

  traitement: {
    objectifs: [
      "Diminuer le RGO",
      "Neutraliser les reflux",
      "Protéger la muqueuse œsophagienne",
      "Augmenter la clairance de l'œsophage",
    ],
    surveillance: [
      "Suivi médical régulier afin de dépister les facteurs de risque",
      "Informer et impliquer le patient dans sa prise en charge",
    ],
    mesuresHygienoDiet: [
      "Dormir le buste surélevé",
      "Éviter toute compression abdominale",
      "Éviter les aliments irritants",
      "Éviter l'ingestion de grandes quantités de liquide pendant les repas ou l'eau gazeuse",
      "Éviter l'alcool, les aliments gras, le café, le chocolat, le jus d'orange",
      "Arrêt du tabac et de l'alcool",
      "Adapter son hygiène de vie",
    ],
    medicaments: [
      {
        famille: "Antiacides",
        exemples: ["Alginate GAVISCON®"],
        mecanisme: "Neutralisent l'acidité gastrique et limitent l'extension du reflux gastro-œsophagien.",
      },
      {
        famille: "Inhibiteur de la pompe à protons (IPP) ou anti-H2",
        exemples: ["Esoméprazole INEXIUM®", "Pantoprazole INIPOMP®"],
        mecanisme: "Diminuent l'acidité du contenu gastrique.",
      },
      {
        famille: "Protecteurs de la muqueuse",
        exemples: ["Alginate GAVISCON®"],
        mecanisme: "Limitent l'extension du reflux gastro-œsophagien.",
      },
      {
        famille: "Prokinétique",
        exemples: ["Dompéridone MOTILIUM®", "Métoclopramide PRIMPERAN®"],
        mecanisme: "Stimulent la motricité œso-gastrique.",
      },
    ],
    chirurgie: [
      {
        famille: "Fundoplicature circulaire selon Nissen",
        mecanisme:
          "Traitement chirurgical rare dans le cas des RGO, habituellement effectué en cas d'échec du traitement médical. On réalise un manchon avec le fundus gastrique enroulé autour du bas œsophage pour augmenter le tonus sur le SIO. À chaque contraction de l'estomac, l'œsophage se ferme, ce qui empêche les sucs gastriques d'y remonter et empêche ainsi le RGO.",
      },
    ],
  },

  mdx: {
    physiopathologie: false,
    traitement: false,
    dietetique: false,
  },
}