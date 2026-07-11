import type { Pathologie } from "../types"

export const diabeteType1: Pathologie = {
  slug: "diabete-type-1",
  label: "Diabète de type 1",
  labelCourt: "DT1",
  emoji: "🩸",
  description: "Maladie chronique caractérisée par l'absence de sécrétion d'insuline par les cellules β du pancréas.",
  tags: ["Endocrinologie", "Chronique", "Auto-immun"],

  // indique quelles sections viennent du MDX
  mdx: {
    physiopathologie: true,
    traitement: true,
  },

  resume: {
    definition: "Le diabète est un ensemble de désordre métabolique caractérisé par une hyperglycémie chronique résultant d'un déficit absolu ou relatif en insuline et/ou d'une résistance tissulaire à l'insuline. Le DT1 est considéré comme maladie auto-immune.",
    mecanismeCle: "Destruction auto-immune des cellules β des îlots de Langerhans du pancréas, entraînant une carence absolue en insuline.",
    epidemiologie: "10% des diabètes sont de type 1. Incidence : 15–20/100 000/an en Europe. Prévalence : 0,3 % de la population générale. Souvent chez l'enfant et l'adolescent, mais peut survenir à tout âge.",
    etiologie: "Prédisposition génétique (HLA-DR3, DR4) + facteurs environnementaux souvent nécessaires pour déclencher la maladie (infections virales, introduction précoce de protéines du lait de vache ou du gluten).",
  },

  facteursRisque: {
    introduction: "Combinaison de prédisposition génétique et de facteurs environnementaux déclenchants.",
    groupes: [
      {
        groupe: "Facteurs de risque principaux",
        items: [
          "Hérédité : risque 2–3 % mère, 5–6 % père",
          "Prédisposition génétique : terrain favorable aux processus auto-immuns",
          "Système HLA : phénotypes HLA-DR3 et DR4 (prédisposants) — HLA-DR15 + DQ6 (protecteurs)",
          "Infections virales (coxsackie B, rubéole, rougeole, cytomégalovirus, Epstein-Barr, varicelle-zona)",
          "Alimentation : introduction précoce des protéines du lait de vache ou du gluten",
          "Complications d'une maladie chronique pancréatique ou hépatique",
        ],
      },
    ],
  },

  diagnostic: {
    criteresDefinition: [
      "Glycémie à jeun ≥ 1,26 g/L (7 mmol/L) à au moins 2 reprises",
      "Glycémie postprandiale > 1,40 g/L (7,8 mmol/L)",
      "Glycémie > 2 g/L (11,1 mmol/L) à n'importe quel moment en présence de symptômes",
      "Si glycémie à jeun entre 1,1 et 1,26 g/L → intolérance au glucose → HGPO",
    ],
    enqueteAlimentaire: [
      "Évaluation quantitative : grammage, énergie, P, L, G, vitamines, minéraux",
      "Évaluation qualitative : qualité des G, L, P",
      "Étude des fréquences",
      "Étude de surconsommation ou sous-consommations",
      "Répartitions alimentaires et grignotage",
    ],
    clinique: [
      { emoji: "⚡", signe: "Présentation", detail: "Symptômes souvent rapides, chez patient jeune, après épisode infectieux viral (2–4 semaines), souvent avec signes d'acidocétose." },
      { emoji: "🚽", signe: "Polyurie & polydipsie", detail: "Augmentation du volume urinaire par effet osmotique du glucose." },
      { emoji: "⚖️", signe: "Amaigrissement & polyphagie", detail: "Fonte musculaire par protéolyse accrue." },
      { emoji: "😴", signe: "Asthénie & somnolence", detail: "Fatigue intense par carence énergétique cellulaire." },
      { emoji: "🩹", signe: "Cicatrisation lente", detail: "Altération immunitaire et vasculaire." },
      { emoji: "👁️", signe: "Vision trouble", detail: "Modification osmotique du cristallin." },
      { emoji: "🤢", signe: "Nausées & vomissements", detail: "Signe de décompensation, fréquent en cas d'acidocétose." },
      { emoji: "🍎", signe: "Haleine fruitée & urines anormales", detail: "Production de corps cétoniques (acétone)." },
      { emoji: "🔥", signe: "Démangeaisons génitales", detail: "Favorisées par la glycosurie." },
    ],
    paraclinique: [
      { emoji: "🩸", nom: "Glycémie à jeun", detail: "Examen de référence. Prélèvement veineux après 8h de jeûne. Effecté à 2 reprises.", valeursSeuil: "Normale < 1,10 g/L | Intolérance 1,10–1,26 g/L | Diabète ≥ 1,26 g/L" },
      { emoji: "🩸", nom: "HGPO", detail: "75 g de glucose per os, à jeun depuis 10h. Mesure à jeun, 1h et 2h.", valeursSeuil: "Diabète si > 2 g/L à 2h | Intolérance si 1,40–2 g/L à 2h" },
      { emoji: "🩸", nom: "HbA1c", detail: "Reflet de la glycémie moyenne des 6 dernières semaines.", valeursSeuil: "Normale : 4–6 %" },
      { emoji: "🩸", nom: "Dosage insuline & peptide C", detail: "Permet de différencier DT1 (insulinémie effondrée) et DT2.", valeursSeuil: "Insulinémie à jeun normale < 15 mU/L" },
      { emoji: "🩸", nom: "Auto-anticorps (DT1)", detail: "Anti-îlots (75 % des cas), anti-insuline, anti-GAD, anti-IA2." },
      { emoji: "🩸", nom: "Bilan lipidique", detail: "Cholestérolémie, triglycéridémie, LDL, HDL, lipoprotéines A et B." },
      { emoji: "🟡", nom: "Glycosurie", detail: "Bandelette glucose-oxydase. Apparaît si glycémie > 10 mmol/L.", valeursSeuil: "Normale : absence" },
      { emoji: "🟡", nom: "Cétonurie", detail: "Bandelette détectant l'acéto-acétate. Positive en acidocétose.", valeursSeuil: "Normale : absence" },
      { emoji: "🧪", nom: "Bilan rénal & urinaire", detail: "Créatininémie, albuminémie, ECBU. Microalbuminurie = premier signe d'atteinte glomérulaire." },
      { emoji: "👁️", nom: "Bilan ophtalmologique", detail: "Fond d'œil — dépistage rétinopathie." },
      { emoji: "🩸", nom: "Bilan hépatique", detail: "Recherche d'atteinte hépatique associée." },
      { emoji: "🩺", nom: "Tension artérielle", detail: "HTA fréquemment associée, facteur aggravant des complications vasculaires." },
      { emoji: "❤️", nom: "Examens cardiovasculaires", detail: "ECG, épreuve d'effort, échocardiographie Doppler, angiographie." },
      { emoji: "🧠", nom: "Examen neurologique", detail: "Dépistage neuropathie diabétique périphérique et centrale." },
    ],
  },

  complications: [
    { emoji: "⚠️", nom: "Acidocétose diabétique", type: "Aiguës métaboliques", description: "Absence d'insuline → lipolyse → cétogenèse hépatique → corps cétoniques toxiques. Glycémie > 13,5 mmol/L, cétonurie, acidose, hypokaliémie. Risque de coma." },
    { emoji: "⚠️", nom: "Coma hypoglycémique", type: "Aiguës métaboliques", description: "Hypoglycémie mineure (2,2–3,9 mmol/L) : sueurs, palpitations. Hypoglycémie majeure (< 2,2 mmol/L) : convulsions, coma." },
    { nom: "Tuberculose", type: "Infectieuses" },
    { nom: "Infection virale", type: "Infectieuses" },
    { nom: "Infection à germes pyogènes", type: "Infectieuses" },
    { nom: "Infections urinaires et mycoses récidivantes", type: "Infectieuses" },
    { nom: "Microangiopathies diabétiques", type: "Chroniques dégénératives", description: "Rétinopathie (1re cause de cécité), néphropathie (risque IRC), neuropathie (démyélinisation, mal perforant plantaire)." },
    { nom: "Macroangiopathies diabétiques", type: "Chroniques dégénératives", description: "Athérosclérose + artériosclérose → AVC, ischémie myocardique indolore, AOMI. 1re cause de décès des patients diabétiques." },
    { nom: "Autres troubles", type: "Chroniques dégénératives", description: "Cataracte, glaucome, lipodystrophie, dyslipoprotéinémies, problèmes psychologiques, retard de croissance." },
  ],

  dietetique: undefined,


  flash: {
  definition: "Hyperglycémie chronique par carence absolue en insuline (destruction auto-immune des cellules β).",
  motsClés: [
    "Maladie auto-immune", "Cellules β", "Îlots de Langerhans", "Insulinopénie",
    "HLA-DR3 / DR4", "GAD65", "Lymphocytes T", "Auto-anticorps (anti-IA2, anti-GAD, anti-insuline, ICA)",
    "Cellules glucodépendantes (hépatocytes, neurones, GR)",
  ],
  sections: [
    {
      titre: "Physiopathologie",
      items: [
        "Facteurs génétiques (HLA) + environnementaux → réponse auto-immune → destruction cellules β",
        "Auto-anticorps = marqueurs, pas cause → lymphocytes T détruisent",
        "Phase asymptomatique 5–10 ans → symptômes à 80 % destruction",
        "Absence insuline → ↗ NGG, ↗ glycogénolyse, ↘ utilisation glucose → hyperglycémie",
        "Mécanismes compensatoires → lipolyse → AGL → cétogenèse → acidocétose",
        "Voie des polyols : glucose → sorbitol (aldose réductase) → fructose (sorbitol DH)",
        "Glycation : base de Schiff → Amadori (HbA1c) → produits de Maillard",
        "↗ Stress oxydatif : ↘ vit C, ↘ glutathion réductase",
        "Glycosurie → polyurie → polydipsie",
      ],
    },
    {
      titre: "Diagnostic",
      items: [
        "Glycémie à jeun ≥ 1,26 g/L × 2 OU postprandiale > 1,40 g/L OU > 2 g/L avec symptômes",
        "HGPO si glycémie à jeun entre 1,1 et 1,26 g/L",
        "HbA1c normale : 4–6 %",
        "Insulinémie à jeun < 15 mU/L (effondrée dans DT1)",
        "Auto-anticorps DT1 : anti-îlots (75 %), anti-insuline, anti-GAD, anti-IA2",
        "Clinique : polyurie, polydipsie, amaigrissement, asthénie, haleine fruitée",
      ],
    },
    {
      titre: "Complications",
      items: [
        "Aiguës : acidocétose (glycémie > 13,5 mmol/L, cétonurie), coma hypoglycémique",
        "Infectieuses : tuberculose, infections urinaires, mycoses",
        "Microangiopathies : rétinopathie (1re cause cécité), néphropathie, neuropathie",
        "Macroangiopathies : athérosclérose → AVC, IDM indolore, AOMI (1re cause décès)",
        "Autres : cataracte, glaucome, dyslipoprotéinémies (↑ LDL + hypertriglycéridémie)",
      ],
    },
    {
      titre: "Traitement",
      items: [
        "Insulinothérapie à vie (obligatoire DT1) : analogues rapides + lents",
        "Conventionnel : 2–3 rapides + 1–2 lentes/j",
        "Fonctionnel : 4–5 injections/j ou pompe à insuline",
        "Boucle fermée : CGM + pompe + algorithme",
        "Surveillance : HbA1c < 7 %, glycémie, fond d'œil, bilan rénal",
        "Régime contrôlé en glucides + activité physique adaptée",
      ],
    },
  ],
},
}