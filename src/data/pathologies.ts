// ── Types ─────────────────────────────────────────────────────────────────────

export type Gravite = "faible" | "modérée" | "élevée" | "très élevée"

export type SigneClinique = {
  signe: string
  detail?: string
}

export type Complication = {
  nom: string
  type: "aiguë" | "chronique"
  description: string
}

export type Medicament = {
  famille: string
  exemples: string[]
  mecanisme: string
}

export type PhysiopathologieEtape = {
  numero: number
  titre: string
  description: string
}

export type Pathologie = {
  slug: string
  label: string
  labelCourt: string
  emoji: string
  description: string
  tags: string[]
  gravite: Gravite
  // Résumé rapide (pour la card en haut)
  resume: {
    definition: string
    mecanismeCle: string
    populationCible: string
    prevalence: string
  }
  // Physiopathologie
  physiopathologie: {
    introduction: string
    etapes?: PhysiopathologieEtape[]
    subtypes?: {
      id: string
      label: string
      description: string
      etapes: PhysiopathologieEtape[]
    }[]
  }
  // Facteurs de risque
  facteursRisque: {
    groupe: string
    items: string[]
  }[]
  // Diagnostic
  diagnostic: {
    criteresDefinition: string[]
    examensClinic: string[]
    examensParacliniques: {
      nom: string
      detail: string
      valeursSeuil?: string
    }[]
  }
  // Signes cliniques
  signesCliniques: SigneClinique[]
  // Complications
  complications: Complication[]
  // Traitement
  traitement: {
    objectifs: string[]
    mesuresHygienoDiet: string[]
    medicaments?: Medicament[]
    autresTraitements?: string[]
    surveillance: string[]
  }
  // Diététique thérapeutique (à compléter plus tard)
  dietetique?: {
    objectifsNutritionnels: string[]
    aet?: string
    macros?: { label: string; recommandation: string }[]
    alimentsFavoriser?: string[]
    alimentsLimiter?: string[]
    conseilsPratiques?: string[]
  }
}

// ── Données ───────────────────────────────────────────────────────────────────

export const PATHOLOGIES: Pathologie[] = [
  {
    slug: "diabete",
    label: "Diabète (DT1 & DT2)",
    labelCourt: "Diabète",
    emoji: "🩸",
    description: "Ensemble de désordres métaboliques caractérisés par une hyperglycémie chronique résultant d'un déficit absolu ou relatif en insuline et/ou d'une résistance tissulaire à l'insuline.",
    tags: ["Métabolique", "Chronique", "DT1", "DT2"],
    gravite: "élevée",
    resume: {
      definition: "Hyperglycémie chronique par défaut de sécrétion d'insuline (DT1 — maladie auto-immune) ou par insulinorésistance + insulinodéficience progressive (DT2 — maladie métabolique).",
      mecanismeCle: "DT1 : destruction auto-immune des cellules β des îlots de Langerhans. DT2 : insulinorésistance des tissus périphériques + épuisement progressif des cellules β.",
      populationCible: "DT1 : enfants, adolescents, jeunes adultes (pics à 5–6, 11–13 et 16–20 ans). DT2 : adultes > 40 ans, surpoids fréquent — 90 % des diabètes.",
      prevalence: "422 millions de personnes dans le monde (OMS 2015). En France : 3,3 millions traités pour diabète. 700 000 personnes diabétiques sans le savoir.",
    },
    physiopathologie: {
      introduction: "Le diabète est toujours en rapport avec une anomalie du fonctionnement de l'insuline. Les deux principaux types ont des mécanismes physiopathologiques distincts.",
      subtypes: [
        {
          id: "dt1",
          label: "Diabète de type 1 (DT1 / DID)",
          description: "Maladie auto-immune dans laquelle le système immunitaire détruit les cellules β du pancréas, entraînant une carence absolue en insuline. Les cellules glucodépendantes (neurones, globules rouges) maintiennent leur accès au glucose, mais les autres cellules ne peuvent plus l'utiliser.",
          etapes: [
            {
              numero: 1,
              titre: "Antécédents : facteurs de risque",
              description: "Prédisposition génétique (phénotypes HLA-DR3 et DR4 — risque augmenté) combinée à des facteurs environnementaux déclenchants : infections virales (coxsackie B, rubéole, rougeole, cytomégalovirus, varicelle-zona), introduction précoce de protéines du lait de vache ou du gluten.",
            },
            {
              numero: 2,
              titre: "Réponse auto-immune",
              description: "Des homologies de séquences entre les antigènes viraux et la glutamate décarboxylase 65 humaine (GAD65, enzyme abondante dans les îlots de Langerhans) amènent le système immunitaire à confondre les cellules β avec des antigènes. Les lymphocytes T infiltrent et détruisent les cellules β.",
            },
            {
              numero: 3,
              titre: "Apparition d'auto-anticorps",
              description: "Des auto-anticorps anti-cellules β apparaissent : anti-IA2, anti-GAD, anti-insuline, ICA (anticorps anti-îlots). Ce sont des marqueurs de la maladie, pas la cause directe de la destruction (ce sont les lymphocytes T qui détruisent).",
            },
            {
              numero: 4,
              titre: "Élimination des cellules β",
              description: "Phase asymptomatique de pré-diabète (5 à 10 ans en moyenne) : inflammation d'abord autour des îlots de Langerhans, puis des îlots eux-mêmes. La production d'insuline diminue progressivement.",
            },
            {
              numero: 5,
              titre: "Production d'insuline insuffisante — voire nulle",
              description: "Quand 80 % des cellules β sont détruites, la production d'insuline devient insuffisante : hyperglycémie chronique, glycosurie (seuil > 10 mmol/L), lipolyse accrue, cétogenèse hépatique → acidocétose diabétique. Le diabète de type 1 est relativement brutal dans sa présentation clinique.",
            },
          ],
        },
        {
          id: "dt2",
          label: "Diabète de type 2 (DT2 / DNID)",
          description: "Maladie métabolique caractérisée par une insulinorésistance des tissus périphériques (foie, muscles, tissu adipeux) associée à une sécrétion d'insuline insuffisante et progressive. Survient en moyenne après 40 ans, très souvent associé au syndrome métabolique.",
          etapes: [
            {
              numero: 1,
              titre: "Facteurs génétiques et environnementaux",
              description: "Prédisposition polygénique (centaines de gènes potentiellement impliqués) + facteurs environnementaux : sédentarité, mauvaises habitudes alimentaires, surpoids, dysbioses intestinales, tabac, manque de sommeil.",
            },
            {
              numero: 2,
              titre: "Surcharge pondérale",
              description: "L'excès de tissu adipeux viscéral libère des acides gras libres et des cytokines pro-inflammatoires (adipokines) qui inhibent l'action de l'insuline au niveau musculaire, hépatique et adipeux.",
            },
            {
              numero: 3,
              titre: "Insulinorésistance",
              description: "Moindre efficacité de l'insuline sur ses tissus cibles. Au niveau musculaire : GLUT4 ne se déplace plus correctement vers la membrane → absorption réduite du glucose. Au niveau hépatique : néoglucogenèse non freinée → libération excessive de glucose. L'acétyl-CoA en excès (bêta-oxydation préférentielle) inhibe la glycolyse.",
            },
            {
              numero: 4,
              titre: "Hyperinsulinisme compensatoire",
              description: "Les cellules β répondent à l'hyperglycémie en surproduisant de l'insuline (hyperinsulinisme). Cela favorise le stockage du glucose sous forme de triglycérides dans le tissu adipeux, aggravant l'obésité.",
            },
            {
              numero: 5,
              titre: "Insulinodéficience progressive",
              description: "Après des années d'hyperstimulation, les cellules β s'épuisent : leur sensibilité à l'hyperglycémie diminue et leur production d'insuline se réduit (glucotoxicité + lipotoxicité). Les cellules α montrent aussi une anomalie (augmentation du glucagon) → hyperglycémie à jeun. Certains patients deviennent insulinodépendants (insulinorequérance).",
            },
          ],
        },
      ],
    },
    facteursRisque: [
      {
        groupe: "DT1 — Facteurs génétiques",
        items: [
          "Phénotypes HLA-DR3 et DR4 (prédisposants) — HLA-DR15 + DQ6 (protecteurs)",
          "Mère diabétique de type 1 : risque 2–3 % pour l'enfant",
          "Père diabétique de type 1 : risque 5–6 % pour l'enfant",
          "Terrain génétique sans mutation spécifique (susceptibilité aux processus auto-immuns)",
        ],
      },
      {
        groupe: "DT1 — Facteurs environnementaux",
        items: [
          "Infections virales (coxsackie B, rubéole, rougeole, cytomégalovirus, Epstein-Barr, varicelle-zona)",
          "Introduction précoce des protéines du lait de vache",
          "Introduction précoce du gluten",
          "Complications d'une maladie chronique pancréatique ou hépatique",
        ],
      },
      {
        groupe: "DT2 — Facteurs de risque principaux",
        items: [
          "Hérédité : parent proche (père, mère, fratrie) diabétique de type 2",
          "Surpoids et obésité — surtout obésité androïde (graisse abdominale viscérale)",
          "Sédentarité et manque d'activité physique",
          "Mauvaises habitudes alimentaires (sucres rapides, graisses, alcool)",
          "Hypertension artérielle (HTA)",
          "Dyslipidémies",
          "Antécédent de diabète gestationnel",
          "Dysbioses intestinales (déséquilibres du microbiote)",
          "Tabagisme actif et passif (insulinorésistance induite par la nicotine)",
          "Manque de sommeil (−20 % de sensibilité à l'insuline)",
        ],
      },
    ],
    signesCliniques: [
      { signe: "Polyurie", detail: "Augmentation du volume urinaire par effet osmotique du glucose (glycosurie)" },
      { signe: "Polydipsie", detail: "Soif intense par déshydratation secondaire à la polyurie" },
      { signe: "Polyphagie", detail: "Faim accrue par déficit énergétique intracellulaire" },
      { signe: "Asthénie", detail: "Fatigue par carence énergétique cellulaire" },
      { signe: "Amaigrissement", detail: "Fonte musculaire et lipolyse accrue (surtout DT1)" },
      { signe: "Fonte musculaire", detail: "Protéolyse augmentée en l'absence d'insuline" },
      { signe: "Vision trouble", detail: "Modification osmotique du cristallin" },
      { signe: "Cicatrisation lente", detail: "Altération immunitaire et vasculaire" },
      { signe: "Haleine fruitée", detail: "Corps cétoniques (acétone) — surtout DT1" },
      { signe: "Infections génitales récidivantes", detail: "Mycoses, prurit — surtout DT2" },
      { signe: "Nausées / vomissements", detail: "En cas d'acidocétose" },
      { signe: "Somnolence", detail: "Signe de décompensation" },
    ],
    diagnostic: {
      criteresDefinition: [
        "Glycémie à jeun ≥ 1,26 g/L (7 mmol/L) à au moins 2 reprises",
        "Glycémie postprandiale > 2 g/L (11,1 mmol/L) quelle que soit l'heure",
        "Glycémie > 1,4 g/L (7,8 mmol/L) à n'importe quel moment en présence de symptômes",
      ],
      examensClinic: [
        "Interrogatoire : antécédents personnels et familiaux, mode de vie, alimentation",
        "Enquête alimentaire : évaluation quantitative (AET, macros, vitamines, minéraux) et qualitative",
        "Mesures anthropométriques : poids, taille, IMC, tour de taille",
        "Examen physique : état général, syndrome polyuro-polydipsique, signes d'acidocétose",
      ],
      examensParacliniques: [
        {
          nom: "Glycémie à jeun",
          detail: "Examen de référence. Prélèvement veineux après 8h de jeûne.",
          valeursSeuil: "Normale < 1,10 g/L | Intolérance 1,10–1,26 g/L | Diabète ≥ 1,26 g/L à 2 reprises",
        },
        {
          nom: "HGPO (Hyperglycémie provoquée par voie orale)",
          detail: "75 g de glucose per os chez un sujet à jeun depuis 10h. Glycémie mesurée avant, à 1h et 2h. Indiqué si glycémie à jeun entre 1,10 et 1,26 g/L.",
          valeursSeuil: "Diabète si glycémie > 2 g/L à 2h | Intolérance si 1,40–2 g/L",
        },
        {
          nom: "HbA1c (hémoglobine glycosylée)",
          detail: "Reflet de la glycémie moyenne des 6 dernières semaines. Proportionnel au taux de glucose sanguin.",
          valeursSeuil: "Normale : 4–6 % | Objectif thérapeutique diabète : < 7 %",
        },
        {
          nom: "Glycosurie",
          detail: "Test urinaire non spécifique. Bandelette à la glucose-oxydase. Résultat qualitatif (présence/absence).",
          valeursSeuil: "Normale : absence | Apparaît si glycémie > 10 mmol/L",
        },
        {
          nom: "Cétonurie",
          detail: "Bandelette réactive urinaire détectant l'acéto-acétate. Résultat qualitatif.",
          valeursSeuil: "Normale : absence | Positive en cas d'acidocétose (DT1 ++)",
        },
        {
          nom: "Dosage de l'insuline et peptide C",
          detail: "Dosage sur sérum (EDTA ou héparine). Peptide C = marqueur de la sécrétion endogène d'insuline (clivage de la pro-insuline). Permet de différencier DID et DNID.",
          valeursSeuil: "Insulinémie à jeun normale < 15 mU/L",
        },
        {
          nom: "Auto-anticorps (DT1)",
          detail: "Marqueurs de l'auto-immunité pancréatique : anti-îlots de Langerhans (75 % des cas), anti-insuline, anti-GAD (glutamic acid decarboxylase), anti-IA2 (tyrosine phosphatase).",
        },
        {
          nom: "Bilan lipidique",
          detail: "Cholestérolémie, triglycéridémie, LDL-cholestérol, HDL-cholestérol, lipoprotéines A et B.",
        },
        {
          nom: "Bilan rénal et urinaire",
          detail: "Créatininémie, albuminémie, ECBU. Microalbuminurie = premier signe d'atteinte rénale.",
        },
      ],
    },
    complications: [
      {
        nom: "Acidocétose diabétique",
        type: "aiguë",
        description: "Surtout DT1. Absence d'insuline → lipolyse accrue → cétogenèse hépatique → corps cétoniques toxiques. Glycémie > 13,5 mmol/L, glycosurie ++, cétonurie, acidose métabolique, hypokaliémie. Peut conduire au coma. Traitement : insulinothérapie IV + réhydratation + électrolytes.",
      },
      {
        nom: "Hyperosmolarité (coma hyperosmolaire)",
        type: "aiguë",
        description: "Surtout DT2 âgé. Hyperglycémie massive (> 50 mmol/L) sans acidocétose. Déshydratation intense, trouble de la conscience. Facteurs favorisants : fièvre, diarrhée, apport insuffisant en eau, corticoïdes, diurétiques.",
      },
      {
        nom: "Acidose lactique",
        type: "aiguë",
        description: "Complication du DT2 sous biguanides. Les biguanides bloquent la néoglucogenèse hépatique et augmentent le pool d'acide lactique. Facteurs aggravants : insuffisance hépatique ou rénale, sujets âgés.",
      },
      {
        nom: "Coma hypoglycémique",
        type: "aiguë",
        description: "Déséquilibre entre apport alimentaire et thérapeutique hypoglycémiante. DT1 : diminution des besoins en insuline ou des apports glucidiques. DT2 : surdosage en antidiabétiques oraux. Hypoglycémie mineure (2,2–3,9 mmol/L) : sueurs, palpitations. Hypoglycémie majeure (< 2,2 mmol/L) : convulsions, coma.",
      },
      {
        nom: "Rétinopathie diabétique",
        type: "chronique",
        description: "1re cause de cécité. Épaississement et fragilisation de la paroi des capillaires rétiniens (micro-anévrysmes, hémorragies). Évolution : rétinopathie non proliférante → ischémie rétinienne → rétinopathie proliférante → cécité. HTA est un facteur aggravant majeur.",
      },
      {
        nom: "Néphropathie diabétique",
        type: "chronique",
        description: "Atteinte glomérulaire progressive. Premier signe : microalbuminurie. Évolution vers l'insuffisance rénale chronique. HTA est un facteur aggravant majeur. Prévention : contrôle glycémique + antihypertenseur agressif.",
      },
      {
        nom: "Neuropathie diabétique",
        type: "chronique",
        description: "Atteinte des gaines de myéline par activation de la voie des polyols (accumulation de sorbitol et fructose). Neuropathies périphériques (sensation de brûlures, marcher sur du coton, mal perforant plantaire) et centrales. Surveillance podologique indispensable.",
      },
      {
        nom: "Macroangiopathie diabétique",
        type: "chronique",
        description: "1re cause de décès des patients diabétiques. Athérosclérose + artériosclérose → obstruction vasculaire. Complications : AVC (infarctus lacunaires), ischémie myocardique indolore (arythmie, hypotension, asthénie d'effort), AOMI (artériopathie oblitérante des membres inférieurs).",
      },
      {
        nom: "Autres troubles",
        type: "chronique",
        description: "Cataracte et glaucome (glycosylation des protéines du cristallin), lipodystrophie aux sites d'injection, dyslipoprotéinémies (DT1 : ↑ LDL + hypertriglycéridémie ; DT2 : hypertriglycéridémie + ↓ HDL), problèmes psychologiques (dépression, découragement).",
      },
    ],
    traitement: {
      objectifs: [
        "Éviter les variations importantes de la glycémie et maintenir la glycémie proche de la normale",
        "Corriger les anomalies biologiques associées à l'hyperglycémie et à l'insulinorésistance",
        "Prévenir et ralentir les complications dégénératives",
        "Maintenir une qualité de vie satisfaisante",
      ],
      mesuresHygienoDiet: [
        "Alimentation équilibrée adaptée au type de diabète (DT1 : contrôlée en glucides ; DT2 : hypoénergétique, ↓ IG, ↑ fibres)",
        "Perte de poids si surpoids (DT2 : relation directe IMC / insulinorésistance — toute perte de poids est bénéfique)",
        "Activité physique régulière et adaptée (↓ besoins en insuline, ↑ sensibilité à l'insuline, améliore le profil lipidique)",
        "Autosurveillance glycémique (carnet de glycémie)",
        "Éducation thérapeutique personnalisée",
        "Suivi médical tous les 3 mois (médecin traitant / diabétologue)",
        "Consultation annuelle ophtalmologue, dentiste, podologue",
        "Soutien psychologique si besoin",
      ],
      medicaments: [
        {
          famille: "Insulinothérapie (DT1 obligatoire, DT2 si épuisement β)",
          exemples: ["Analogues rapides (Humalog®, Novorapid®, Apidra®) : 3–5h", "Insulines rapides humaines (Actrapid®) : 4–8h", "NPH intermédiaire : 9–16h", "Analogues lents (Lantus®) : 20–24h / (Levemir®) : 12–24h"],
          mecanisme: "Compensation du déficit en insuline. Deux schémas : conventionnel (2–3 injections rapides + 1–2 lentes/j) ou fonctionnel (4–5 injections/j ou pompe à insuline).",
        },
        {
          famille: "Biguanides",
          exemples: ["Metformine"],
          mecanisme: "Accroît la sensibilité à l'insuline, inhibe la néoglucogenèse hépatique. 1re intention dans le DT2.",
        },
        {
          famille: "Sulfamides hypoglycémiants",
          exemples: ["Glipizide", "Gliclazide", "Glibenclamide"],
          mecanisme: "Stimulent la sécrétion d'insuline par les cellules β du pancréas.",
        },
        {
          famille: "Inhibiteurs des alphaglucosidases",
          exemples: ["Acarbose (Glucor®)"],
          mecanisme: "Retardent l'absorption des glucides après les repas (↓ pics glycémiques postprandiaux).",
        },
        {
          famille: "Inhibiteurs DPP-4 (gliptines)",
          exemples: ["Sitagliptine", "Vildagliptine"],
          mecanisme: "Bloquent la dégradation du GLP-1, augmentant sa durée d'action → ↑ sécrétion d'insuline.",
        },
        {
          famille: "Agonistes GLP-1",
          exemples: ["Sémaglutide", "Liraglutide"],
          mecanisme: "Stimulent la sécrétion d'insuline glucose-dépendante, réduisent l'appétit. Induisent un amaigrissement notable.",
        },
        {
          famille: "Inhibiteurs SGLT2",
          exemples: ["Dapagliflozine", "Empagliflozine"],
          mecanisme: "Bloquent la réabsorption rénale du glucose → glycosurie volontaire → ↓ glycémie.",
        },
        {
          famille: "Glinides",
          exemples: ["Répaglinide"],
          mecanisme: "Stimulent rapidement la sécrétion d'insuline — action courte, pris avant les repas.",
        },
      ],
      autresTraitements: [
        "Pompe à insuline (DT1 surtout) : délivre en continu de l'insuline rapide + bolus aux repas",
        "Thérapie de boucle fermée (CGM + pompe + algorithme) : automatise la régulation glycémique",
        "Transplantation de cellules bêta ou de pancréas (DT1 grave)",
        "Immunothérapie (DT1 : prévenir/ralentir la destruction des cellules β — en cours de recherche)",
        "Transplantation de microbiote fécal (DT2 — en cours de recherche)",
      ],
      surveillance: [
        "Glycémie à jeun et postprandiale",
        "HbA1c tous les 3 mois (objectif < 7 %)",
        "Bilan lipidique annuel",
        "Fonction rénale : créatinine, albuminurie",
        "Fond d'œil annuel (rétinopathie)",
        "Bilan cardiovasculaire : ECG, tension artérielle",
        "Examen des pieds (neuropathie, mal perforant)",
        "Carnet de glycémie + carnet de traitement diabétique",
      ],
    },
    // Diététique thérapeutique — à compléter lors du prochain cours
    dietetique: undefined,
  },
]

export function getPathologie(slug: string): Pathologie | undefined {
  return PATHOLOGIES.find((p) => p.slug === slug)
}
