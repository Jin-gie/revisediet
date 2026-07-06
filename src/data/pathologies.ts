// ── Types ─────────────────────────────────────────────────────────────────────

export type Gravite = "faible" | "modérée" | "élevée" | "très élevée"

export type Tags = "Métabolique" | "Chronique" | "Aiguë" | "Cardiovasculaire" | "Neurologique" | "Digestif" | "Rénal" | "Respiratoire" | "Infectieux" | "Auto-immun" | "Oncologique" | "Endocrinologie" | "Hématologique" | "Génétique" | "Dermatologique" | "Psychiatrique" | "Gynécologique" | "Pédiatrique" | "Gériatrique" | "Traumatique" | "Chirurgicale"


export type Traitement = {
  famille: string
  exemples?: string[]
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
  tags: Tags[]
  gravite?: Gravite 
  // Résumé rapide (pour la card en haut)
  resume: {
    definition: string
    mecanismeCle: string
    epidemiologie: string
    etiologie: string
  }
  // Physiopathologie
  physiopathologie: {
    introduction?: string
    etapes?: PhysiopathologieEtape[]
    subtypes?: {
      id: string
      label: string
      description: string
      etapes: PhysiopathologieEtape[]
    }[]
  }
  // Facteurs de risque
  facteursRisque?: {
    introduction?: string
    groupes: {
    groupe: string
    items: string[]
    }[]
  }
  // Diagnostic
  diagnostic: {
    criteresDefinition: string[]
    enqueteAlimentaire?: string[]
    clinique: {
      emoji?: string
      signe: string
      detail?: string
    }[]
    paraclinique: {
      nom: string
      detail: string
      type?: string
      valeursSeuil?: string
    }[]
  }
  // Complications
  complications: {
    emoji?: string
    nom: string
    type: string
    description?: string
  }[]
  // Traitement
  traitement: {
    objectifs: string[]
    surveillance: string[]
    mesuresHygienoDiet: string[]
    medicaments?: Traitement[]
    chirurgie?: Traitement[]
    autresTraitements?: Traitement[]
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
  // {
  //   slug: "diabete",
  //   label: "Diabète (DT1 & DT2)",
  //   labelCourt: "Diabète",
  //   emoji: "🩸",
  //   description: "Ensemble de désordres métaboliques caractérisés par une hyperglycémie chronique résultant d'un déficit absolu ou relatif en insuline et/ou d'une résistance tissulaire à l'insuline.",
  //   tags: ["Métabolique", "Chronique", "DT1", "DT2"],
  //   gravite: "élevée",
  //   resume: {
  //     definition: "Hyperglycémie chronique par défaut de sécrétion d'insuline (DT1 — maladie auto-immune) ou par insulinorésistance + insulinodéficience progressive (DT2 — maladie métabolique).",
  //     mecanismeCle: "DT1 : destruction auto-immune des cellules β des îlots de Langerhans. DT2 : insulinorésistance des tissus périphériques + épuisement progressif des cellules β.",
  //     epidemiologie: "DT1 : enfants, adolescents, jeunes adultes (pics à 5–6, 11–13 et 16–20 ans). DT2 : adultes > 40 ans, surpoids fréquent — 90 % des diabètes.",
  //     etiologie: "422 millions de personnes dans le monde (OMS 2015). En France : 3,3 millions traités pour diabète. 700 000 personnes diabétiques sans le savoir.",
  //   },
  //   physiopathologie: {
  //     introduction: "Le diabète est toujours en rapport avec une anomalie du fonctionnement de l'insuline. Les deux principaux types ont des mécanismes physiopathologiques distincts.",
  //     subtypes: [
  //       {
  //         id: "dt1",
  //         label: "Diabète de type 1 (DT1 / DID)",
  //         description: "Maladie auto-immune dans laquelle le système immunitaire détruit les cellules β du pancréas, entraînant une carence absolue en insuline. Les cellules glucodépendantes (neurones, globules rouges) maintiennent leur accès au glucose, mais les autres cellules ne peuvent plus l'utiliser.",
  //         etapes: [
  //           {
  //             numero: 1,
  //             titre: "Antécédents : facteurs de risque",
  //             description: "Prédisposition génétique (phénotypes HLA-DR3 et DR4 — risque augmenté) combinée à des facteurs environnementaux déclenchants : infections virales (coxsackie B, rubéole, rougeole, cytomégalovirus, varicelle-zona), introduction précoce de protéines du lait de vache ou du gluten.",
  //           },
  //           {
  //             numero: 2,
  //             titre: "Réponse auto-immune",
  //             description: "Des homologies de séquences entre les antigènes viraux et la glutamate décarboxylase 65 humaine (GAD65, enzyme abondante dans les îlots de Langerhans) amènent le système immunitaire à confondre les cellules β avec des antigènes. Les lymphocytes T infiltrent et détruisent les cellules β.",
  //           },
  //           {
  //             numero: 3,
  //             titre: "Apparition d'auto-anticorps",
  //             description: "Des auto-anticorps anti-cellules β apparaissent : anti-IA2, anti-GAD, anti-insuline, ICA (anticorps anti-îlots). Ce sont des marqueurs de la maladie, pas la cause directe de la destruction (ce sont les lymphocytes T qui détruisent).",
  //           },
  //           {
  //             numero: 4,
  //             titre: "Élimination des cellules β",
  //             description: "Phase asymptomatique de pré-diabète (5 à 10 ans en moyenne) : inflammation d'abord autour des îlots de Langerhans, puis des îlots eux-mêmes. La production d'insuline diminue progressivement.",
  //           },
  //           {
  //             numero: 5,
  //             titre: "Production d'insuline insuffisante — voire nulle",
  //             description: "Quand 80 % des cellules β sont détruites, la production d'insuline devient insuffisante : hyperglycémie chronique, glycosurie (seuil > 10 mmol/L), lipolyse accrue, cétogenèse hépatique → acidocétose diabétique. Le diabète de type 1 est relativement brutal dans sa présentation clinique.",
  //           },
  //         ],
  //       },
  //       {
  //         id: "dt2",
  //         label: "Diabète de type 2 (DT2 / DNID)",
  //         description: "Maladie métabolique caractérisée par une insulinorésistance des tissus périphériques (foie, muscles, tissu adipeux) associée à une sécrétion d'insuline insuffisante et progressive. Survient en moyenne après 40 ans, très souvent associé au syndrome métabolique.",
  //         etapes: [
  //           {
  //             numero: 1,
  //             titre: "Facteurs génétiques et environnementaux",
  //             description: "Prédisposition polygénique (centaines de gènes potentiellement impliqués) + facteurs environnementaux : sédentarité, mauvaises habitudes alimentaires, surpoids, dysbioses intestinales, tabac, manque de sommeil.",
  //           },
  //           {
  //             numero: 2,
  //             titre: "Surcharge pondérale",
  //             description: "L'excès de tissu adipeux viscéral libère des acides gras libres et des cytokines pro-inflammatoires (adipokines) qui inhibent l'action de l'insuline au niveau musculaire, hépatique et adipeux.",
  //           },
  //           {
  //             numero: 3,
  //             titre: "Insulinorésistance",
  //             description: "Moindre efficacité de l'insuline sur ses tissus cibles. Au niveau musculaire : GLUT4 ne se déplace plus correctement vers la membrane → absorption réduite du glucose. Au niveau hépatique : néoglucogenèse non freinée → libération excessive de glucose. L'acétyl-CoA en excès (bêta-oxydation préférentielle) inhibe la glycolyse.",
  //           },
  //           {
  //             numero: 4,
  //             titre: "Hyperinsulinisme compensatoire",
  //             description: "Les cellules β répondent à l'hyperglycémie en surproduisant de l'insuline (hyperinsulinisme). Cela favorise le stockage du glucose sous forme de triglycérides dans le tissu adipeux, aggravant l'obésité.",
  //           },
  //           {
  //             numero: 5,
  //             titre: "Insulinodéficience progressive",
  //             description: "Après des années d'hyperstimulation, les cellules β s'épuisent : leur sensibilité à l'hyperglycémie diminue et leur production d'insuline se réduit (glucotoxicité + lipotoxicité). Les cellules α montrent aussi une anomalie (augmentation du glucagon) → hyperglycémie à jeun. Certains patients deviennent insulinodépendants (insulinorequérance).",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   facteursRisque: [
  //     {
  //       groupe: "DT1 — Facteurs génétiques",
  //       items: [
  //         "Phénotypes HLA-DR3 et DR4 (prédisposants) — HLA-DR15 + DQ6 (protecteurs)",
  //         "Mère diabétique de type 1 : risque 2–3 % pour l'enfant",
  //         "Père diabétique de type 1 : risque 5–6 % pour l'enfant",
  //         "Terrain génétique sans mutation spécifique (susceptibilité aux processus auto-immuns)",
  //       ],
  //     },
  //     {
  //       groupe: "DT1 — Facteurs environnementaux",
  //       items: [
  //         "Infections virales (coxsackie B, rubéole, rougeole, cytomégalovirus, Epstein-Barr, varicelle-zona)",
  //         "Introduction précoce des protéines du lait de vache",
  //         "Introduction précoce du gluten",
  //         "Complications d'une maladie chronique pancréatique ou hépatique",
  //       ],
  //     },
  //     {
  //       groupe: "DT2 — Facteurs de risque principaux",
  //       items: [
  //         "Hérédité : parent proche (père, mère, fratrie) diabétique de type 2",
  //         "Surpoids et obésité — surtout obésité androïde (graisse abdominale viscérale)",
  //         "Sédentarité et manque d'activité physique",
  //         "Mauvaises habitudes alimentaires (sucres rapides, graisses, alcool)",
  //         "Hypertension artérielle (HTA)",
  //         "Dyslipidémies",
  //         "Antécédent de diabète gestationnel",
  //         "Dysbioses intestinales (déséquilibres du microbiote)",
  //         "Tabagisme actif et passif (insulinorésistance induite par la nicotine)",
  //         "Manque de sommeil (−20 % de sensibilité à l'insuline)",
  //       ],
  //     },
  //   ],
  //   diagnostic: {
  //     criteresDefinition: [
  //       "Glycémie à jeun ≥ 1,26 g/L (7 mmol/L) à au moins 2 reprises",
  //       "Glycémie postprandiale > 2 g/L (11,1 mmol/L) quelle que soit l'heure",
  //       "Glycémie > 1,4 g/L (7,8 mmol/L) à n'importe quel moment en présence de symptômes",
  //     ],
  //     enqueteAlimentaire: [
  //       "Interrogatoire : antécédents personnels et familiaux, mode de vie, alimentation",
  //       "Enquête alimentaire : évaluation quantitative (AET, macros, vitamines, minéraux) et qualitative",
  //     ],
  //     clinique: [
  //       { signe: "Polyurie", detail: "Augmentation du volume urinaire par effet osmotique du glucose (glycosurie)" },
  //       { signe: "Polydipsie", detail: "Soif intense par déshydratation secondaire à la polyurie" },
  //       { signe: "Polyphagie", detail: "Faim accrue par déficit énergétique intracellulaire" },
  //       { signe: "Asthénie", detail: "Fatigue par carence énergétique cellulaire" },
  //       { signe: "Amaigrissement", detail: "Fonte musculaire et lipolyse accrue (surtout DT1)" },
  //       { signe: "Fonte musculaire", detail: "Protéolyse augmentée en l'absence d'insuline" },
  //       { signe: "Vision trouble", detail: "Modification osmotique du cristallin" },
  //       { signe: "Cicatrisation lente", detail: "Altération immunitaire et vasculaire" },
  //       { signe: "Haleine fruitée", detail: "Corps cétoniques (acétone) — surtout DT1" },
  //       { signe: "Infections génitales récidivantes", detail: "Mycoses, prurit — surtout DT2" },
  //       { signe: "Nausées / vomissements", detail: "En cas d'acidocétose" },
  //       { signe: "Somnolence", detail: "Signe de décompensation" },
  //     ],
  //     paraclinique: [
  //       {
  //         nom: "Glycémie à jeun",
  //         detail: "Examen de référence. Prélèvement veineux après 8h de jeûne.",
  //         valeursSeuil: "Normale < 1,10 g/L | Intolérance 1,10–1,26 g/L | Diabète ≥ 1,26 g/L à 2 reprises",
  //       },
  //       {
  //         nom: "HGPO (Hyperglycémie provoquée par voie orale)",
  //         detail: "75 g de glucose per os chez un sujet à jeun depuis 10h. Glycémie mesurée avant, à 1h et 2h. Indiqué si glycémie à jeun entre 1,10 et 1,26 g/L.",
  //         valeursSeuil: "Diabète si glycémie > 2 g/L à 2h | Intolérance si 1,40–2 g/L",
  //       },
  //       {
  //         nom: "HbA1c (hémoglobine glycosylée)",
  //         detail: "Reflet de la glycémie moyenne des 6 dernières semaines. Proportionnel au taux de glucose sanguin.",
  //         valeursSeuil: "Normale : 4–6 % | Objectif thérapeutique diabète : < 7 %",
  //       },
  //       {
  //         nom: "Glycosurie",
  //         detail: "Test urinaire non spécifique. Bandelette à la glucose-oxydase. Résultat qualitatif (présence/absence).",
  //         valeursSeuil: "Normale : absence | Apparaît si glycémie > 10 mmol/L",
  //       },
  //       {
  //         nom: "Cétonurie",
  //         detail: "Bandelette réactive urinaire détectant l'acéto-acétate. Résultat qualitatif.",
  //         valeursSeuil: "Normale : absence | Positive en cas d'acidocétose (DT1 ++)",
  //       },
  //       {
  //         nom: "Dosage de l'insuline et peptide C",
  //         detail: "Dosage sur sérum (EDTA ou héparine). Peptide C = marqueur de la sécrétion endogène d'insuline (clivage de la pro-insuline). Permet de différencier DID et DNID.",
  //         valeursSeuil: "Insulinémie à jeun normale < 15 mU/L",
  //       },
  //       {
  //         nom: "Auto-anticorps (DT1)",
  //         detail: "Marqueurs de l'auto-immunité pancréatique : anti-îlots de Langerhans (75 % des cas), anti-insuline, anti-GAD (glutamic acid decarboxylase), anti-IA2 (tyrosine phosphatase).",
  //       },
  //       {
  //         nom: "Bilan lipidique",
  //         detail: "Cholestérolémie, triglycéridémie, LDL-cholestérol, HDL-cholestérol, lipoprotéines A et B.",
  //       },
  //       {
  //         nom: "Bilan rénal et urinaire",
  //         detail: "Créatininémie, albuminémie, ECBU. Microalbuminurie = premier signe d'atteinte rénale.",
  //       },
  //     ],
  //   },
  //   complications: [
  //     {
  //       nom: "Acidocétose diabétique",
  //       type: "aiguë",
  //       description: "Surtout DT1. Absence d'insuline → lipolyse accrue → cétogenèse hépatique → corps cétoniques toxiques. Glycémie > 13,5 mmol/L, glycosurie ++, cétonurie, acidose métabolique, hypokaliémie. Peut conduire au coma. Traitement : insulinothérapie IV + réhydratation + électrolytes.",
  //     },
  //     {
  //       nom: "Hyperosmolarité (coma hyperosmolaire)",
  //       type: "aiguë",
  //       description: "Surtout DT2 âgé. Hyperglycémie massive (> 50 mmol/L) sans acidocétose. Déshydratation intense, trouble de la conscience. Facteurs favorisants : fièvre, diarrhée, apport insuffisant en eau, corticoïdes, diurétiques.",
  //     },
  //     {
  //       nom: "Acidose lactique",
  //       type: "aiguë",
  //       description: "Complication du DT2 sous biguanides. Les biguanides bloquent la néoglucogenèse hépatique et augmentent le pool d'acide lactique. Facteurs aggravants : insuffisance hépatique ou rénale, sujets âgés.",
  //     },
  //     {
  //       nom: "Coma hypoglycémique",
  //       type: "aiguë",
  //       description: "Déséquilibre entre apport alimentaire et thérapeutique hypoglycémiante. DT1 : diminution des besoins en insuline ou des apports glucidiques. DT2 : surdosage en antidiabétiques oraux. Hypoglycémie mineure (2,2–3,9 mmol/L) : sueurs, palpitations. Hypoglycémie majeure (< 2,2 mmol/L) : convulsions, coma.",
  //     },
  //     {
  //       nom: "Rétinopathie diabétique",
  //       type: "chronique",
  //       description: "1re cause de cécité. Épaississement et fragilisation de la paroi des capillaires rétiniens (micro-anévrysmes, hémorragies). Évolution : rétinopathie non proliférante → ischémie rétinienne → rétinopathie proliférante → cécité. HTA est un facteur aggravant majeur.",
  //     },
  //     {
  //       nom: "Néphropathie diabétique",
  //       type: "chronique",
  //       description: "Atteinte glomérulaire progressive. Premier signe : microalbuminurie. Évolution vers l'insuffisance rénale chronique. HTA est un facteur aggravant majeur. Prévention : contrôle glycémique + antihypertenseur agressif.",
  //     },
  //     {
  //       nom: "Neuropathie diabétique",
  //       type: "chronique",
  //       description: "Atteinte des gaines de myéline par activation de la voie des polyols (accumulation de sorbitol et fructose). Neuropathies périphériques (sensation de brûlures, marcher sur du coton, mal perforant plantaire) et centrales. Surveillance podologique indispensable.",
  //     },
  //     {
  //       nom: "Macroangiopathie diabétique",
  //       type: "chronique",
  //       description: "1re cause de décès des patients diabétiques. Athérosclérose + artériosclérose → obstruction vasculaire. Complications : AVC (infarctus lacunaires), ischémie myocardique indolore (arythmie, hypotension, asthénie d'effort), AOMI (artériopathie oblitérante des membres inférieurs).",
  //     },
  //     {
  //       nom: "Autres troubles",
  //       type: "chronique",
  //       description: "Cataracte et glaucome (glycosylation des protéines du cristallin), lipodystrophie aux sites d'injection, dyslipoprotéinémies (DT1 : ↑ LDL + hypertriglycéridémie ; DT2 : hypertriglycéridémie + ↓ HDL), problèmes psychologiques (dépression, découragement).",
  //     },
  //   ],
  //   traitement: {
  //     objectifs: [
  //       "Éviter les variations importantes de la glycémie et maintenir la glycémie proche de la normale",
  //       "Corriger les anomalies biologiques associées à l'hyperglycémie et à l'insulinorésistance",
  //       "Prévenir et ralentir les complications dégénératives",
  //       "Maintenir une qualité de vie satisfaisante",
  //     ],
  //     mesuresHygienoDiet: [
  //       "Alimentation équilibrée adaptée au type de diabète (DT1 : contrôlée en glucides ; DT2 : hypoénergétique, ↓ IG, ↑ fibres)",
  //       "Perte de poids si surpoids (DT2 : relation directe IMC / insulinorésistance — toute perte de poids est bénéfique)",
  //       "Activité physique régulière et adaptée (↓ besoins en insuline, ↑ sensibilité à l'insuline, améliore le profil lipidique)",
  //       "Autosurveillance glycémique (carnet de glycémie)",
  //       "Éducation thérapeutique personnalisée",
  //       "Suivi médical tous les 3 mois (médecin traitant / diabétologue)",
  //       "Consultation annuelle ophtalmologue, dentiste, podologue",
  //       "Soutien psychologique si besoin",
  //     ],
  //     medicaments: [
  //       {
  //         famille: "Insulinothérapie (DT1 obligatoire, DT2 si épuisement β)",
  //         exemples: ["Analogues rapides (Humalog®, Novorapid®, Apidra®) : 3–5h", "Insulines rapides humaines (Actrapid®) : 4–8h", "NPH intermédiaire : 9–16h", "Analogues lents (Lantus®) : 20–24h / (Levemir®) : 12–24h"],
  //         mecanisme: "Compensation du déficit en insuline. Deux schémas : conventionnel (2–3 injections rapides + 1–2 lentes/j) ou fonctionnel (4–5 injections/j ou pompe à insuline).",
  //       },
  //       {
  //         famille: "Biguanides",
  //         exemples: ["Metformine"],
  //         mecanisme: "Accroît la sensibilité à l'insuline, inhibe la néoglucogenèse hépatique. 1re intention dans le DT2.",
  //       },
  //       {
  //         famille: "Sulfamides hypoglycémiants",
  //         exemples: ["Glipizide", "Gliclazide", "Glibenclamide"],
  //         mecanisme: "Stimulent la sécrétion d'insuline par les cellules β du pancréas.",
  //       },
  //       {
  //         famille: "Inhibiteurs des alphaglucosidases",
  //         exemples: ["Acarbose (Glucor®)"],
  //         mecanisme: "Retardent l'absorption des glucides après les repas (↓ pics glycémiques postprandiaux).",
  //       },
  //       {
  //         famille: "Inhibiteurs DPP-4 (gliptines)",
  //         exemples: ["Sitagliptine", "Vildagliptine"],
  //         mecanisme: "Bloquent la dégradation du GLP-1, augmentant sa durée d'action → ↑ sécrétion d'insuline.",
  //       },
  //       {
  //         famille: "Agonistes GLP-1",
  //         exemples: ["Sémaglutide", "Liraglutide"],
  //         mecanisme: "Stimulent la sécrétion d'insuline glucose-dépendante, réduisent l'appétit. Induisent un amaigrissement notable.",
  //       },
  //       {
  //         famille: "Inhibiteurs SGLT2",
  //         exemples: ["Dapagliflozine", "Empagliflozine"],
  //         mecanisme: "Bloquent la réabsorption rénale du glucose → glycosurie volontaire → ↓ glycémie.",
  //       },
  //       {
  //         famille: "Glinides",
  //         exemples: ["Répaglinide"],
  //         mecanisme: "Stimulent rapidement la sécrétion d'insuline — action courte, pris avant les repas.",
  //       },
  //     ],
  //     autresTraitements: [
  //       "Pompe à insuline (DT1 surtout) : délivre en continu de l'insuline rapide + bolus aux repas",
  //       "Thérapie de boucle fermée (CGM + pompe + algorithme) : automatise la régulation glycémique",
  //       "Transplantation de cellules bêta ou de pancréas (DT1 grave)",
  //       "Immunothérapie (DT1 : prévenir/ralentir la destruction des cellules β — en cours de recherche)",
  //       "Transplantation de microbiote fécal (DT2 — en cours de recherche)",
  //     ],
  //     surveillance: [
  //       "Glycémie à jeun et postprandiale",
  //       "HbA1c tous les 3 mois (objectif < 7 %)",
  //       "Bilan lipidique annuel",
  //       "Fonction rénale : créatinine, albuminurie",
  //       "Fond d'œil annuel (rétinopathie)",
  //       "Bilan cardiovasculaire : ECG, tension artérielle",
  //       "Examen des pieds (neuropathie, mal perforant)",
  //       "Carnet de glycémie + carnet de traitement diabétique",
  //     ],
  //   },
  //   // Diététique thérapeutique — à compléter lors du prochain cours
  //   dietetique: undefined,
  // },

  // Diabète de type 1 (DT1)
  {
    slug: "diabete-type-1",
    label: "Diabète de type 1",
    labelCourt: "DT1",
    emoji: "🩸",
    description: "Maladie chronique caractérisée par l'absence de sécrétion d'insuline par les cellules β du pancréas.",
    tags: ["Endocrinologie", "Chronique", "Auto-immun"],
    resume: {
      definition: "Le diabète est un ensemble de désordre métabolique caractérisé par une hyperglycémie chronique résultant d’un déficit absolu ou relatif en insuline et/ou d’une résistance tissulaire à l’insuline. Le DT1 est considéré comme maladie auto-immune.",
      mecanismeCle: "Destruction auto-immune des cellules β des îlots de Langerhans du pancréas, entraînant une carence absolue en insuline.",
      epidemiologie: "10% des diabètes sont de type 1. Incidence : 15–20/100 000/an en Europe. Prévalence : 0,3 % de la population générale. Souvent chez l’enfant et l’adolescent, mais peut survenir à tout âge.",
      etiologie: "Prédisposition génétique (HLA-DR3, DR4) + facteurs environnementaux sont souvent nécessaires pour déclencher la maladie chez les personnes génétiquement prédisposées (infections virales, introduction précoce de protéines du lait de vache ou du gluten).",
    },
    facteursRisque:{
      introduction: "Combinaison de prédisposition génétique et de facteurs environnementaux déclenchants.",
      groupes: [
        {
          groupe: "Facteurs de risques principaux",
          items: [
            "Hérédité : risque 2-3% mère, 5-6% père",
            "Prédisposition génétique : terrain génétique favorable aux processus auto-immuns (dont destruction des cellules β pancréatiques)",
            "Système HLA : phénotypes HLA-DR3 et DR4 (prédisposants) — HLA-DR15 + DQ6 (protecteurs)",
            "Infections virales (coxsackie B, rubéole, rougeole, cytomégalovirus, Epstein-Barr, varicelle-zona)",
            "Alimentation : Introduction précoce des protéines du lait de vache ou gluten",
            "Complications d'une maladie chronique pancréatique ou hépatique (cancer, insuffisance, ...)",
          ],
        }
      ]
    },
    physiopathologie: {
      introduction: "Le DT1 est une maladie auto-immune dans laquelle les cellules β des îlots de Langerhans sont détruites par le système immunitaire, entraînant une carence absolue en insuline. Seuls les hépatocytes, les neurones et les globules rouges peuvent assimiler le glucose en absence d'insuline (cellules glucodépendantes) — pour toutes les autres cellules, l'absence d'insuline entraîne une accumulation de glucose dans le sang : hyperglycémie chronique.",
      etapes: [
        {
          numero: 1,
          titre: "Facteurs de risque → Réponse auto-immune",
          description: "Les facteurs génétiques (HLA-DR3/DR4) et environnementaux (infections virales) déclenchent une réponse auto-immune : confusion entre les antigènes viraux et les enzymes présentes dans les îlots de Langerhans (notamment GAD65). Les lymphocytes T infiltrent et détruisent les cellules β en deux phases : 1. inflammation autour des îlots ; 2. inflammation des îlots eux-mêmes. Des auto-anticorps anti-cellules β apparaissent (anti-IA2, anti-GAD, anti-insuline, ICA) — ce sont des marqueurs de la maladie mais ne détruisent pas les cellules β.",
        },
        {
          numero: 2,
          titre: "Phase asymptomatique (pré-diabète) → Phase symptomatique",
          description: "Phase asymptomatique de 5 à 10 ans en moyenne. Quand 80 % des cellules β sont détruites, la production d'insuline devient insuffisante voire nulle → apparition des symptômes cliniques du DT1.",
        },
        {
          numero: 3,
          titre: "Conséquences de l'absence d'insuline — Métabolisme glucidique",
          description: "Sans insuline, le glucose ne peut plus être stocké : diminution de l'utilisation périphérique du glucose, augmentation de la néoglucogenèse (NGG) et de la glycogénolyse → hyperglycémie. Si glycémie > 10 mmol/L : les transporteurs rénaux sont dépassés → glycosurie.",
        },
        {
          numero: 4,
          titre: "Conséquences de l'absence d'insuline — Mécanismes compensatoires",
          description: "En l'absence de glucose pour alimenter les organes, l'organisme active : augmentation de la lipolyse, augmentation des acides gras libres (AGL), augmentation de la cétogenèse hépatique → cétonémie → acidose métabolique → cétonurie et acidocétose diabétique (douleurs abdominales, risque de coma). On observe également une augmentation de la protéolyse.",
        },
        {
          numero: 5,
          titre: "Retentissements biochimiques — Voie des polyols",
          description: "L'hyperglycémie augmente l'activité de la voie des polyols dans les neurones : Glucose →(aldose réductase)→ Sorbitol →(sorbitol déshydrogénase)→ Fructose. L'accumulation de sorbitol et fructose provoque des désordres intracellulaires : modification de la pression osmotique (micro-œdèmes), consommation de NADPH favorisant le stress oxydatif, perturbations des structures membranaires, diminution de l'activité Na+/K+ ATPase, dégradation des protéines par glycation (facilitée par l'excès de fructose). Le sorbitol est toxique notamment pour les cellules de Schwann qui dégénèrent → diminution de la sensibilité tactile et altération des réflexes ostéo-tendineux.",
        },
        {
          numero: 6,
          titre: "Retentissements biochimiques — Glycation des protéines",
          description: "Toxicité des produits terminaux de la glycation : liaison de la fonction aldéhyde du glucose avec la lysine ou la fonction amine N-terminale d'une protéine → base de Schiff transitoire → transformation en produit d'Amadori (ex. HbA1c), quasi-irréversible → stabilisation des liaisons glucides-protéines → produits de Maillard. Les protéines dénaturées perdent certaines fonctions, forment des liaisons intermoléculaires et des composés kéto-imine. Répercussions sur les tissus et cellules : altération de l'activité enzymatique, réticulation cellulaire avec formation d'agrégats, hyperperméabilité des membranes, agglutination de protéines circulantes (dépôt albumine et LDL), altération de la membrane basale glomérulaire, résistance aux enzymes protéolytiques (risque de fibrose), diminution de la reconnaissance des antigènes. Au final : durcissement de la matrice extracellulaire et altération des propriétés de fixation enzyme/cofacteur.",
        },
        {
          numero: 7,
          titre: "Retentissements biochimiques — Stress oxydatif",
          description: "Augmentation du stress oxydatif : les radicaux oxygène sont des facteurs d'agression tissulaire (vieillissement des protéines, altération de l'ADN). L'hyperglycémie chronique diminue les défenses anti-radicaux libres : diminution de l'activité de la vitamine C et de la glutathion réductase (essentielle à la résistance contre le stress oxydant et à la préservation du pH intracellulaire).",
        },
        {
          numero: 8,
          titre: "Retentissements physiologiques — Rénaux et hydriques",
          description: "L'activité osmotique du glucose dépasse la capacité de réabsorption des néphrocytes → glycosurie → augmentation de l'eau filtrée par les reins → polyurie → déshydratation qui stimule le centre hypothalamique de la soif → polydipsie.",
        },
        {
          numero: 9,
          titre: "Retentissements physiologiques — Énergétiques",
          description: "La diminution de l'utilisation cellulaire du glucose entraîne : asthénie, augmentation de la mobilisation des acides gras de réserve (perte pondérale si alimentation équilibrée), et stimulation des centres de la faim → polyphagie.",
        },
      ],
    },
    complications: [
      {
        emoji: "⚠️",
        nom: "acidocétose diabétique",
        type: "Aiguës métaboliques (= urgence métabolique)",
        description: "Absence d’insuline → lipolyse accrue → cétogenèse hépatique → corps cétoniques toxiques. Glycémie > 13,5 mmol/L, glycosurie ++, cétonurie, acidose métabolique, hypokaliémie. Peut conduire au coma. Traitement : insulinothérapie IV + réhydratation + électrolytes.",
      },
      {
        emoji: "⚠️",
        nom: "Coma hypoglycémique",
        type: "Aiguës métaboliques (= urgence métabolique)",
        description: "Déséquilibre entre apport alimentaire et thérapeutique hypoglycémiante. Hypoglycémie mineure (2,2–3,9 mmol/L) : sueurs, palpitations. Hypoglycémie majeure (< 2,2 mmol/L) : convulsions, coma.",
      },
      {
        emoji: "",
        nom: "Tuberculose",
        type: "Infectieuses",
      },
      {
        emoji: "",
        nom: "Infection virale",
        type: "Infectieuses",
      },
      {
        emoji: "",
        nom: "Infection à germes pyogènes",
        type: "Infectieuses",
        description: "Infections bactériennes (staphylocoques, streptocoques, E. coli, Pseudomonas, Klebsiella, Salmonella, Shigella, Campylobacter, Clostridium difficile).",
      },
      {
        emoji: "",
        nom: "Infections urinaires et mycoses récidivantes",
        type: "Infectieuses",
      },
      {
        emoji: "",
        nom: "Microangiopathies diabétiques",
        type: "Chroniques dégénératives",
        description: "Atteinte des petits vaisseaux (capillaires, artérioles) entraînant des complications rétiniennes, rénales et nerveuses => rétinopathie, néphropathie, neuropathie.",
      },
      {
        emoji: "",
        nom: "Macroangiopathies diabétiques",
        type: "Chroniques dégénératives",
        description: "Atteinte des gros vaisseaux (artères) entraînant des complications cardiovasculaires => athérosclérose + artériosclérose → obstruction vasculaire. Complications : AVC (infarctus lacunaires), ischémie myocardique indolore (arythmie, hypotension, asthénie d'effort), AOMI (artériopathie oblitérante des membres inférieurs).",
      },
      {
        emoji: "",
        nom: "Autres troubles",
        type: "Chroniques dégénératives",
        description: "Cataracte et glaucome (glycosylation des protéines du cristallin), lipodystrophie aux sites d'injection, dyslipoprotéinémies (DT1 : ↑ LDL + hypertriglycéridémie ; DT2 : hypertriglycéridémie + ↓ HDL), problèmes psychologiques (dépression, découragement), retard de croissance.",
      },
    ],
    diagnostic: {
      criteresDefinition: [
        "Glycémie à jeun ≥ 1,26 g/L (7 mmol/L) à au moins 2 reprises",
        "Glycémie postprandiale > 1,40 g/L (7,8 mmol/L)",
        "Glycémie > 2 g/L (11,1 mmol/L) à n'importe quel moment en présence de symptômes",
        "Si glycémie à jeun entre 1,1 et 1,26 g/L → intolérance au glucose → HGPO (75 g de glucose per os, mesure à jeun, 1h et 2h)",
      ],
      enqueteAlimentaire: [
        "Évaluation quantitative : grammage, énergie, P, L, G, vitamine, minéraux",
        "Évaluation qualitative : qualité des G, L, P",
        "Étude des fréquences",
        "Étude de surconsommation ou sous-consommations",
        "Répartitions alimentaires et grignotage"
      ],
      clinique: [
        { emoji: "⚡", signe: "Présentation", detail: "Symptômes souvent rapides, chez patient jeune, après épisode infectieux viral (2–4 semaines), souvent avec signes d'acidocétose. Mesures anthropométriques : âge, taille, poids, tour de taille → IMC." },
        { emoji: "🚽", signe: "Polyurie & polydipsie", detail: "Augmentation du volume urinaire par effet osmotique du glucose, entraînant une soif intense par déshydratation." },
        { emoji: "⚖️", signe: "Amaigrissement & polyphagie", detail: "Fonte musculaire par protéolyse accrue. Tendance à la polyphagie ou au contraire perte d'appétit." },
        { emoji: "😴", signe: "Asthénie & somnolence", detail: "Fatigue intense par carence énergétique cellulaire." },
        { emoji: "🩹", signe: "Cicatrisation lente", detail: "Altération immunitaire et vasculaire retardant la cicatrisation." },
        { emoji: "👁️", signe: "Vision trouble", detail: "Modification osmotique du cristallin par hyperglycémie." },
        { emoji: "🤢", signe: "Nausées & vomissements", detail: "Signe de décompensation, fréquent en cas d'acidocétose." },
        { emoji: "🍎", signe: "Haleine fruitée & urines anormales", detail: "Production de corps cétoniques (acétone) en l'absence d'insuline." },
        { emoji: "🔥", signe: "Démangeaisons génitales", detail: "Favorisées par la glycosurie et le terrain propice aux infections fongiques." },
      ],
      paraclinique: [
        {
          nom: "Glycémie à jeun",
          detail: "Examen de référence. Prélèvement veineux après 8h de jeûne. Confirme le diagnostic si ≥ 1,26 g/L à 2 reprises.",
          valeursSeuil: "Normale < 1,10 g/L | Intolérance 1,10–1,26 g/L | Diabète ≥ 1,26 g/L",
        },
        {
          nom: "HGPO",
          detail: "Hyperglycémie provoquée par voie orale : 75 g de glucose per os chez un sujet à jeun depuis 10h. Glycémie mesurée à jeun, à 1h et à 2h. Indiqué si glycémie à jeun entre 1,1 et 1,26 g/L.",
          valeursSeuil: "Diabète si glycémie > 2 g/L à 2h | Intolérance si 1,40–2 g/L à 2h",
        },
        {
          nom: "HbA1c (hémoglobine glycosylée)",
          detail: "Reflet de la glycémie moyenne des 6 dernières semaines.",
          valeursSeuil: "Normale : 4–6 %",
        },
        {
          nom: "Dosage de l'insuline & peptide C",
          detail: "Insulinémie à jeun. Peptide C = marqueur de la sécrétion endogène d'insuline (clivage de la pro-insuline). Permet de différencier DT1 (insulinémie effondrée) et DT2.",
          valeursSeuil: "Insulinémie à jeun normale < 15 mU/L",
        },
        {
          nom: "Auto-anticorps (DT1 spécifique)",
          detail: "Marqueurs de l'auto-immunité pancréatique : anti-îlots de Langerhans (positif dans 75 % des cas), auto-anticorps anti-insuline, anti-GAD (glutamic acid decarboxylase), anti-IA2 (tyrosine phosphatase).",
        },
        {
          nom: "Glycosurie",
          detail: "Test urinaire non spécifique. Bandelette à la glucose-oxydase. Résultat qualitatif (présence/absence). Apparaît si glycémie > 10 mmol/L.",
          valeursSeuil: "Normale : absence",
        },
        {
          nom: "Cétonurie",
          detail: "Bandelette réactive urinaire détectant l'acéto-acétate. Résultat qualitatif. Positive en cas d'acidocétose (DT1 ++).",
          valeursSeuil: "Normale : absence",
        },
        {
          nom: "Bilan lipidique",
          detail: "Cholestérolémie, triglycéridémie, LDL-cholestérol, HDL-cholestérol, lipoprotéines A et B.",
        },
        {
          nom: "Bilan rénal & urinaire",
          detail: "Créatininémie, albuminémie. ECBU à la recherche d'une atteinte rénale. Microalbuminurie = premier signe d'atteinte glomérulaire.",
        },
        {
          nom: "Bilan ophtalmologique",
          detail: "Consultation ophtalmologique avec fond d'œil. Dépistage de la rétinopathie diabétique.",
        },
        {
          nom: "Bilan hépatique",
          detail: "Recherche d'une atteinte hépatique associée.",
        },
        {
          nom: "Mesure de la tension artérielle",
          detail: "HTA fréquemment associée, facteur aggravant des complications vasculaires.",
        },
        {
          nom: "Examens cardiovasculaires",
          detail: "ECG avec éventuellement épreuve d'effort, échocardiographie Doppler, angiographie. Dépistage de la macroangiopathie.",
        },
        {
          nom: "Examen neurologique",
          detail: "Dépistage de la neuropathie diabétique périphérique et centrale.",
        },
      ],
    },
    traitement: {
      objectifs: [
        "Équilibre du taux de glucose",
        "Éviter les complications aiguës et chroniques, telles que l'acidocétose ou hypoglycémie",
      ],
      surveillance: [
        "Tous les 3 mois chez le médecin traitant et/ou diabétologue",
        "1x/an : ophtalmologue, dentiste, podologue",
        "Autosurveillance : Carnet de glycémie et carnet de traitement diabétique",
      ],
      mesuresHygienoDiet: [
        "Alimentation équilibrée adaptée au type de diabète (DT1 : contrôlée en glucides ; DT2 : hypoénergétique, ↓ IG, ↑ fibres)",
        "Activité physique régulière et adaptée (↓ besoins en insuline, ↑ sensibilité à l'insuline, améliore le profil lipidique)",
        "Soutien psychologique si besoin",
      ],
      medicaments: [
        {
          famille: "Insulinothérapie (DT1 obligatoire, DT2 si épuisement β)",
          exemples: ["Analogues rapides (Humalog®, Novorapid®, Apidra®) : 3–5h", "Insulines rapides humaines (Actrapid®) : 4–8h", "NPH intermédiaire : 9–16h", "Analogues lents (Lantus®) : 20–24h / (Levemir®) : 12–24h", "Action prolongée (Ultratard®, Tresiba®) : 24h"],
          mecanisme: "Compensation du déficit en insuline. Deux schémas : conventionnel (2–3 injections rapides + 1–2 lentes/j) ou fonctionnel (4–5 injections/j ou pompe à insuline).",
        }
      ], // facultatif
      chirurgie: [
        {
          famille: "Transplantation de cellules bêta ou de pancréas",
          mecanisme: "Indiquée dans les cas graves de DT1. Permet de restaurer la production d'insuline endogène.",
        }
      ], // facultatif
      autresTraitements: [
        {
          famille: "Thérapie de boucle fermée (CGM + pompe + algorithme)",
          mecanisme: "Automatise la régulation glycémique en ajustant la délivrance d'insuline en fonction des mesures de glucose en continu.",
        },
        {
          famille: "Immunothérapie",
          mecanisme: "En cours de recherche pour prévenir ou ralentir la destruction des cellules β dans le DT1.",
        }
      ], //facultatif
    },
    dietetique: undefined,
  },

  // Diabète de type 2
  {
    slug: "diabete-type-2",
    label: "Diabète de type 2",
    labelCourt: "DT2",
    emoji: "🍬",
    description: "Le diabète de type 2 est une maladie métabolique caractérisée par une résistance à l'insuline et une insuffisance de sécrétion d'insuline.",
    tags: ["Endocrinologie", "Métabolique", "Chronique",],
    resume: {
      definition: "Le diabète est un ensemble de désordre métabolique caractérisé par une hyperglycémie chronique résultant d’un déficit absolu ou relatif en insuline et/ou d’une résistance tissulaire à l’insuline. DT II généralement classé comme maladie métabolique.",
      mecanismeCle: "Résistance à l'insuline (diminution de la sensibilité des tissus périphériques à l'insuline) et insuffisance relative de sécrétion d'insuline par les cellules β du pancréas.",
      epidemiologie: "90% des diabètes sont de type 2. Incidence : 7–10/1000/an. Prévalence : 6–8 % de la population générale. Souvent chez l’adulte (> 40 ans), mais peut survenir à tout âge (généralement après 20 ans ou adolescence), notamment avec l’augmentation de l’obésité infantile.",
      etiologie: "Sécrétion d’insuline existante mais inadaptée (insuffisante ou inefficace) aux besoins métaboliques => diminution de la sensibilité des tissus à son action",
    },
    facteursRisque:{
      introduction: "Combinaison de prédisposition génétique et de facteurs environnementaux déclenchants.",
      groupes: [
        {
          groupe: "Facteurs de risques principaux",
          items: [
            "Hérédité : parent proche (père, mère, siblings) ; 10aine-100aine de gènes dans prédispo DT2 (donc dépistage génétique précoce impossible) ; facteur génétique ne suffit pas (combiné à mauvaises habitudes alim & sédentarité) mais joue rôle important",
            "Surpoids & obésité : présence TAV abdominal (& syndrome métabolique souvent associé à DT2)",
            "Manque activité physique / sédentarité",
            "HTA",
            "Dyslipidémies",
            "Antécédent diabète gestationnel",
            "Dysbioses intestinales : conso antibio trop souvent, apports fibres insuffisants (& peut entraîner infections)",
            "Tabac : favorise TAV (stimulation par nicotine)",
            "Manque de sommeil & privation sommeil ↘ de 20 % sensibilité à insuline"
          ],
        }
      ]
    }, // facultatif
    physiopathologie: {
      introduction: "",
      etapes: [
        {
          numero: 1,
          titre: "Facteurs de risque → Surcharge pondérale",
          description: "Les facteurs génétiques et environnementaux (sédentarité, alimentation déséquilibrée) entraînent une surcharge pondérale avec excès de tissu adipeux viscéral (TAV). Le TAV libère des cytokines pro-inflammatoires (adipokines) qui induisent une insulinorésistance.",
        },
        {
          numero: 2,
          titre: "Insulinorésistance",
          description: "Souvent héréditaire, aggravée par l'obésité et le manque d'activité physique. Elle se caractérise par un dysfonctionnement de GLUT4 (ne migre plus correctement vers la membrane cellulaire), entraînant : augmentation des acides gras libres (AGL), diminution de la captation du glucose, absence de stockage du glucose → hyperglycémie. En parallèle, le TAV libère des AGL pour compenser le manque d'énergie → augmentation de l'acétyl-CoA → inhibition de la glycolyse → oxydation préférentielle des AG plutôt que du glucose → hyperglycémie aggravée.",
        },
        {
          numero: 3,
          titre: "Hyperinsulinisme compensatoire",
          description: "L'hyperglycémie pousse les cellules β à surproduire de l'insuline → hyperinsulinisme. L'insuline en excès favorise le stockage du glucose sous forme de triglycérides dans le tissu adipeux, aggravant l'obésité et l'insulinorésistance. Cette phase asymptomatique (pré-diabète) dure en moyenne 10 à 20 ans.",
        },
        {
          numero: 4,
          titre: "Épuisement des cellules β → Insulinodéficience progressive",
          description: "Après des années d'hyperstimulation, les cellules β s'épuisent : diminution de leur sensibilité à l'hyperglycémie et diminution de leur production d'insuline. Conséquences : augmentation de la production hépatique de glucose à jeun (PHG) par hausse du glucagon (cellules α) et par lipolyse accrue (alimentation du foie en acétyl-CoA). L'effet des incrétines GLP-1 et GIP est également altéré (diminution de leur sécrétion intestinale). Apparition du DT2 symptomatique (glycémies > 2 g/L).",
        },
        {
          numero: 5,
          titre: "Glucotoxicité & lipotoxicité → Insulinodépendance possible",
          description: "L'hyperglycémie chronique provoque une glucotoxicité et une lipotoxicité qui endommagent progressivement les cellules β restantes. Certains patients DT2 évoluent vers l'insulinodépendance (insulinorequérance).",
        },
        {
          numero: 6,
          titre: "Retentissements biochimiques — Voie des polyols",
          description: "L'hyperglycémie augmente l'activité de la voie des polyols dans les neurones : Glucose →(aldose réductase)→ Sorbitol →(sorbitol déshydrogénase)→ Fructose. L'accumulation provoque des désordres intracellulaires : modification de la pression osmotique (micro-œdèmes), consommation de NADPH favorisant le stress oxydatif, perturbations des structures membranaires, diminution de l'activité Na+/K+ ATPase, dégradation des protéines par glycation facilitée par le fructose. Le sorbitol est toxique pour les cellules de Schwann qui dégénèrent → diminution de la sensibilité tactile et altération des réflexes ostéo-tendineux.",
        },
        {
          numero: 7,
          titre: "Retentissements biochimiques — Glycation des protéines",
          description: "Liaison de la fonction aldéhyde du glucose avec la lysine ou la fonction amine N-terminale d'une protéine → base de Schiff transitoire → produit d'Amadori (ex. HbA1c), quasi-irréversible → produits de Maillard. Les protéines dénaturées perdent certaines fonctions et forment des liaisons intermoléculaires. Répercussions : altération de l'activité enzymatique, réticulation cellulaire avec agrégats, hyperperméabilité des membranes, agglutination de protéines circulantes (dépôt albumine et LDL), altération de la membrane basale glomérulaire, résistance aux enzymes protéolytiques (risque de fibrose), diminution de la reconnaissance des antigènes → durcissement de la matrice extracellulaire et altération des propriétés de fixation enzyme/cofacteur.",
        },
        {
          numero: 8,
          titre: "Retentissements biochimiques — Stress oxydatif",
          description: "Augmentation du stress oxydatif : les radicaux oxygène agression les tissus (vieillissement des protéines, altération de l'ADN). Diminution des défenses anti-radicaux libres : diminution de l'activité de la vitamine C et de la glutathion réductase (essentielle à la résistance contre le stress oxydant et à la préservation du pH intracellulaire).",
        },
        {
          numero: 9,
          titre: "Retentissements physiologiques — Rénaux et hydriques",
          description: "L'activité osmotique du glucose dépasse la capacité de réabsorption des néphrocytes → glycosurie → augmentation de l'eau filtrée → polyurie → déshydratation stimulant le centre hypothalamique de la soif → polydipsie.",
        },
        {
          numero: 10,
          titre: "Retentissements physiologiques — Énergétiques",
          description: "La diminution de l'utilisation cellulaire du glucose entraîne : asthénie, augmentation de la mobilisation des acides gras de réserve (perte pondérale si alimentation équilibrée), et stimulation des centres de la faim → polyphagie.",
        },
      ],
    },
    complications: [
      {
        emoji: "", // facultatif
        nom: "Hyperosmolarité",
        type: "Aiguës métaboliques (= urgence métabolique)",
        description: "Hyperglycémie sévère (> 33 mmol/L) avec déshydratation extrême, hyperosmolarité plasmatique, absence de cétose. Risque de coma hyperosmolaire.",
      },
      {
        nom: "Acidose lactique",
        type: "Aiguës métaboliques (= urgence métabolique)",
        description: "Accumulation d’acide lactique dans le sang, souvent associée à l’utilisation de biguanides (ex. metformine) chez les patients avec insuffisance rénale ou hépatique.",
      },
      {
        nom: "Coma hypoglycémique",
        type: "Aiguës métaboliques (= urgence métabolique)",
        description: "Déséquilibre entre apport alimentaire et thérapeutique hypoglycémiante. Hypoglycémie mineure (2,2–3,9 mmol/L) : sueurs, palpitations. Hypoglycémie majeure (< 2,2 mmol/L) : convulsions, coma. Effet iatrogène des médicaments hypoglycémiants (sulfamides, glinides, insuline).",
      },
      {
        nom: "Tuberculose",
        type: "Infectieuses",
      },
      {
        nom: "Infection virale",
        type: "Infectieuses",
      },
      {
        nom: "Infection à germes pyogènes",
        type: "Infectieuses",
        description: "Infections bactériennes (staphylocoques, streptocoques, E. coli, Pseudomonas, Klebsiella, Salmonella, Shigella, Campylobacter, Clostridium difficile).",
      },
      {
        nom: "Infections urinaires et mycoses récidivantes",
        type: "Infectieuses",
      },
      {
        nom: "Microangiopathies diabétiques",
        type: "Chroniques dégénératives",
        description: "Atteinte des petits vaisseaux (capillaires, artérioles) entraînant des complications rétiniennes, rénales et nerveuses => rétinopathie, néphropathie, neuropathie.",
      },
      {
        nom: "Macroangiopathies diabétiques",
        type: "Chroniques dégénératives",
        description: "Atteinte des gros vaisseaux (artères) entraînant des complications cardiovasculaires => athérosclérose + artériosclérose → obstruction vasculaire. Complications : AVC (infarctus lacunaires), ischémie myocardique indolore (arythmie, hypotension, asthénie d'effort), AOMI (artériopathie oblitérante des membres inférieurs).",
      },
      {
        nom: "Autres troubles",
        type: "Chroniques dégénératives",
        description: "Cataracte et glaucome (glycosylation des protéines du cristallin), lipodystrophie aux sites d'injection, dyslipoprotéinémies (DT1 : ↑ LDL + hypertriglycéridémie ; DT2 : hypertriglycéridémie + ↓ HDL), problèmes psychologiques (dépression, découragement), retard de croissance."
      }
    ],
    diagnostic: {
      criteresDefinition: [
        "Glycémie à jeun ≥ 1,26 g/L (7 mmol/L) à au moins 2 reprises",
        "Glycémie postprandiale > 1,40 g/L (7,8 mmol/L)",
        "Glycémie > 2 g/L (11,1 mmol/L) à n'importe quel moment en présence de symptômes",
        "Si glycémie à jeun entre 1,1 et 1,26 g/L → intolérance au glucose → HGPO (75 g de glucose per os, mesure à jeun, 1h et 2h)",
      ],
      enqueteAlimentaire: [
        "Évaluation quantitative : grammage, énergie, P, L, G, vitamine, minéraux",
        "Évaluation qualitative : qualité des G, L, P",
        "Étude des fréquences",
        "Étude de surconsommation ou sous-consommations",
        "Répartitions alimentaires et grignotage"
      ],
      clinique: [
        { emoji: "⚡", signe: "Présentation", detail: "Souvent identifié au hasard. Souvent chez adulte en surpoids avec signes dégénératives de la maladie (infections urinaires à répétition, prurit génital ou mycoses génitales, troubles de la vision, risque de maladie coronarienne). Mesures anthropométriques : âge, taille, poids, tour de taille → IMC." },
        { emoji: "🚽", signe: "Polyurie & polydipsie", detail: "Augmentation du volume urinaire par effet osmotique du glucose, entraînant une soif intense par déshydratation." },
        { emoji: "⚖️", signe: "Amaigrissement & polyphagie", detail: "Fonte musculaire par protéolyse accrue. Tendance à la polyphagie ou au contraire perte d'appétit." },
        { emoji: "😴", signe: "Asthénie & somnolence", detail: "Fatigue intense par carence énergétique cellulaire." },
        { emoji: "🩹", signe: "Cicatrisation lente", detail: "Altération immunitaire et vasculaire retardant la cicatrisation." },
        { emoji: "👁️", signe: "Vision trouble", detail: "Modification osmotique du cristallin par hyperglycémie." },
        { emoji: "🤢", signe: "Nausées & vomissements", detail: "Signe de décompensation, fréquent en cas d'acidocétose." },
        { emoji: "🔥", signe: "Démangeaisons génitales", detail: "Favorisées par la glycosurie et le terrain propice aux infections fongiques." },
      ],
      paraclinique: [
        {
          nom: "Glycémie à jeun",
          detail: "Examen de référence. Prélèvement veineux après 8h de jeûne. Confirme le diagnostic si ≥ 1,26 g/L à 2 reprises.",
          valeursSeuil: "Normale < 1,10 g/L | Intolérance 1,10–1,26 g/L | Diabète ≥ 1,26 g/L",
        },
        {
          nom: "HGPO",
          detail: "Hyperglycémie provoquée par voie orale : 75 g de glucose per os chez un sujet à jeun depuis 10h. Glycémie mesurée à jeun, à 1h et à 2h. Indiqué si glycémie à jeun entre 1,1 et 1,26 g/L.",
          valeursSeuil: "Diabète si glycémie > 2 g/L à 2h | Intolérance si 1,40–2 g/L à 2h",
        },
        {
          nom: "HbA1c (hémoglobine glycosylée)",
          detail: "Reflet de la glycémie moyenne des 6 dernières semaines.",
          valeursSeuil: "Normale : 4–6 %",
        },
        {
          nom: "Dosage de l'insuline & peptide C",
          detail: "Insulinémie à jeun. Peptide C = marqueur de la sécrétion endogène d'insuline (clivage de la pro-insuline). Permet de différencier DT1 (insulinémie effondrée) et DT2.",
          valeursSeuil: "Insulinémie à jeun normale < 15 mU/L",
        },
        {
          nom: "Auto-anticorps (DT1 spécifique)",
          detail: "Marqueurs de l'auto-immunité pancréatique : anti-îlots de Langerhans (positif dans 75 % des cas), auto-anticorps anti-insuline, anti-GAD (glutamic acid decarboxylase), anti-IA2 (tyrosine phosphatase).",
        },
        {
          nom: "Glycosurie",
          detail: "Test urinaire non spécifique. Bandelette à la glucose-oxydase. Résultat qualitatif (présence/absence). Apparaît si glycémie > 10 mmol/L.",
          valeursSeuil: "Normale : absence",
        },
        {
          nom: "Cétonurie",
          detail: "Bandelette réactive urinaire détectant l'acéto-acétate. Résultat qualitatif. Positive en cas d'acidocétose (DT1 ++).",
          valeursSeuil: "Normale : absence",
        },
        {
          nom: "Bilan lipidique",
          detail: "Cholestérolémie, triglycéridémie, LDL-cholestérol, HDL-cholestérol, lipoprotéines A et B.",
        },
        {
          nom: "Bilan rénal & urinaire",
          detail: "Créatininémie, albuminémie. ECBU à la recherche d'une atteinte rénale. Microalbuminurie = premier signe d'atteinte glomérulaire.",
        },
        {
          nom: "Bilan ophtalmologique",
          detail: "Consultation ophtalmologique avec fond d'œil. Dépistage de la rétinopathie diabétique.",
        },
        {
          nom: "Bilan hépatique",
          detail: "Recherche d'une atteinte hépatique associée.",
        },
        {
          nom: "Mesure de la tension artérielle",
          detail: "HTA fréquemment associée, facteur aggravant des complications vasculaires.",
        },
        {
          nom: "Examens cardiovasculaires",
          detail: "ECG avec éventuellement épreuve d'effort, échocardiographie Doppler, angiographie. Dépistage de la macroangiopathie.",
        },
        {
          nom: "Examen neurologique",
          detail: "Dépistage de la neuropathie diabétique périphérique et centrale.",
        },
      ],
    },
    traitement: {
      objectifs: [
        "Éviter ls variations importantes de glycémie",
        "Corriger les anomalies biologiques associées à l'hyperglycémie et à l'insulinorésistance (dyslipidémie, HTA, hyperuricémie), éviter les récidives",
        "Ralentir l'évolution des complications dégénératives (rétinopathie, néphropathie, neuropathie, macroangiopathie)",
      ],
      surveillance: [
        "Tous les 3 mois chez le médecin traitant et/ou diabétologue",
        "1x/an : ophtalmologue, dentiste, podologue",
        "Autosurveillance : Carnet de glycémie et carnet de traitement diabétique",
      ],
      mesuresHygienoDiet: [
        "Dans 80% des cas avec DT2 avec poids excessif -> relation directe entre IMC et insulinorésistance. Toute perte de poids, même faible, sera bénéfique → amélioration de la sensibilité à l'insuline et du contrôle glycémique.",
        "En cas de surpoids/obésité : réduire les apports énergétiques globaux de 10-15% (principalement lipides, glucides, alcool) -> régime hypoénergétique",
        "Favoriser les aliments à faible indice glycémique (IG) et riches en fibres (légumes, fruits, légumineuses, céréales complètes) -> avoir une alimentation équilibrée",
        "Activité physique doit être maintenur avec triple objectif : favoriser la perte de poids, améliorer la sensibilité à l'insuline et réduire le risque cardiovasculaire. L'activité physique doit être régulière (au moins 150 min/semaine) et adaptée aux capacités du patient.",
      ],
      medicaments: [
        {
          famille: "Médicaments antidiabétiques oraux",
          exemples: ["Biguanides (ex. metformine) : ↑ sensibilité à l'insuline, ↓ production hépatique de glucose", "Sulfonylurées (ex. glibenclamide) : ↑ sécrétion d'insuline par les cellules β", "Inhibiteurs de la DPP-4 (ex. sitagliptine) : ↑ action des incrétines, ↑ sécrétion d'insuline et ↓ sécrétion de glucagon", "Agonistes des récepteurs GLP-1 (ex. liraglutide) : ↑ sécrétion d'insuline, ↓ sécrétion de glucagon, ralentit la vidange gastrique", "Inhibiteurs du SGLT2 (ex. empagliflozine) : ↑ excrétion urinaire de glucose"],
          mecanisme: "Différents mécanismes selon la classe de médicament, visant à améliorer la régulation glycémique et à réduire les complications associées au diabète de type 2.",
        },
        {
          famille: "Insulinothérapie (si échec des traitements oraux ou insulinodépendance)",
          exemples: ["Analogues rapides (Humalog®, Novorapid®, Apidra®) : 3–5h", "Insulines rapides humaines (Actrapid®) : 4–8h", "NPH intermédiaire : 9–16h", "Analogues lents (Lantus®) : 20–24h / (Levemir®) : 12–24h", "Action prolongée (Ultratard®, Tresiba®) : 24h"],
          mecanisme: "Compensation du déficit en insuline. Deux schémas : conventionnel (2–3 injections rapides + 1–2 lentes/j) ou fonctionnel (4–5 injections/j ou pompe à insuline).",
        },
        {
          famille: "Transplantation de microbiote fécal (TMF)",
          mecanisme: "En cours de recherche pour moduler la composition du microbiote intestinal et améliorer la sensibilité à l'insuline.",
        },
        {
          famille: "Traitement à base de cellules souches",
          mecanisme: "En cours de recherche pour traiter le diabète de type 2.",
        },
        {
          famille: "Inhibiteur des récepteurs des minéralocorticoïdes (ex. spironolactone)",
          mecanisme: "Peut améliorer la sensibilité à l'insuline et réduire l'inflammation dans le diabète de type 2.",
        }
      ], // facultatif
      autresTraitements: [
        {
          famille : "Approches moléculaires pour développer et rééquilibrer le microbiote intestinal",
          mecanisme : "Mécanismes impliqués dans apparition maladie : processus inflammatoires intestinaux, sécrétion et action incrétines (GLP1 et GIP), immunité intestinale, système nerveux entérique"
        },
        {
          famille : "Dual GIP/GLP-1 agonistes (ex. tirzepatide)",
          mecanisme : "Agonistes des récepteurs GIP et GLP-1, améliorant la sécrétion d'insuline, réduisant la sécrétion de glucagon et favorisant la perte de poids. Peptide synthétique de 39 acides aminés, administré par injection sous-cutanée hebdomadaire. En cours d'évaluation pour le traitement du diabète de type 2 et de l'obésité."
        }
      ], //facultatif
    },
    dietetique: undefined,
  },

  // Obésité
  {
    slug: "obesite",
    label: "Obésité",
    labelCourt: "Obésité",
    emoji: "⚖️",
    description: "Maladie chronique caractérisée par une accumulation anormale ou excessive de matières grasses dans l'organisme, entraînant des risques pour la santé.",
    tags: ["Endocrinologie", "Métabolique", "Chronique",],
    resume: {
      definition: "Maladie chronique caractérisée par une accumulation anormale ou excessive de matières grasses dans l'organisme, entraînant des risques pour la santé. Phases de l'obésité : dynamique ascendante -> statique -> chronicisation -> complications. Comorbidités associées : DT2 (44%), MCV (23%), cancers (7-14%)",
      mecanismeCle: "Résistance à l'insuline, hyperinsulinisme, inflammation chronique de bas grade, déséquilibre hormonal (leptine, ghréline), perturbation du microbiote intestinal.",
      epidemiologie: "Le surpoids touche plus les hommes, l'obésité plus les femmes. Prévalence en augmentation dans le monde entier, avec des variations selon les régions et les populations. En France 17% de la population adulte est obèse, 32% en surpoids. L'obésité infantile est également en hausse.",
      etiologie: "",
    },
    facteursRisque:{
      introduction: "",
      groupes: [
        {
          groupe: "Liés à la personne",
          items: [
            "Génétique : obésité monogénique (rare), antécédents familiaux (mutation récepteur MC4, anomalie gène Ob, anomalie récepteur β adipocytes, ...)",
            "Épigénétique : surcharge pondérale maternelle, diabète gestationnel, tabac, stress, perturbateurs endocriniens",
            "Origine ethnique : certaines populations plus à risque (ex. populations d'origine africaine, hispanique, sud-asiatique)",
            "Âge : prolifération des adipocytes plus importante chez l'enfant et l'adolescent, ralentissement du métabolisme basal avec l'âge",
            "Sexe : femmes plus à risque d'obésité gynoïde, hommes plus à risque d'obésité androïde",
            "Facteurs psychologiques : stress, dépression, troubles du comportement alimentaire (TCA), manque de sommeil",
          ],
        },
        {
          groupe: "Qualité alimentaire",
          items: [
            "Style alimentaire",
            "100 premiers jours de la vie : prénatal, consommation excessive de protéines la 1ère année, rebon adypocitaire précoce, ...",
            "Facteurs nutritionnels : excès de lipides et glucides simples, association d'additifs alimentaires, consommation d'aliments ultra-transformés, boissons sucrées, grignotage, ...",
          ]
        },
        {
          groupe: "Environnement",
          items: [
            "Sédentarité et inactivité physique",
            "Désynchronisation circadienne : travail de nuit, décalage horaire, perturbation du rythme veille-sommeil",
            "Influence du microbiote intestinal : composition du microbiote, dysbiose, antibiotiques, alimentation, ...",
            "Médicaments et prise de poids : corticoïdes, antidépresseurs, antipsychotiques, antidiabétiques, antihypertenseurs, ...",
            "Polluants environnementaux : perturbateurs endocriniens, pesticides, métaux lourds, ...",
          ]
        },
        {
          groupe: "Psychologie et comportement alimentaire",
          items: [
            "Stress chronique et anxiété : modification des prises alimentaires",
            "Obésité ancienne",
          ]
        }
      ]
    }, // facultatif
    physiopathologie: {
      introduction: "",
      etapes: [], // facultatif
      subtypes: [], // facultatif
    },
    complications: [
      {
        nom: "Cardiovasculaires",
        emoji: "", // facultatif
        type: "Principales",
        description: "Probabilité mortalité : athérosclérose, HTA, insuffisance cardique, infarctus du myocarde, AVC, troubles de la vue. Aussi varices, accidents de phlébite.",
      },
      {
        nom: "Métaboliques",
        emoji: "", // facultatif
        type: "Principales",
        description: "DT2, diabète gestationnel, dyslipidémies, syndrome métabolique, hyperuricémie",
      },
      {
        nom: "Hépatiques",
        emoji: "", // facultatif
        type: "Principales",
        description: "Stéatose hépatique, stéatose hépatique inflammatoire non-alcoolique (NASH), lithiase biliaire",
      },
      {
        nom: "Mécaniques",
        emoji: "", // facultatif
        type: "Principales",
        description: "respiratoire (↗ périmètre abdominal, aplatissement diaphragme, ↗ poids thoracique), hypoxie progressive (apnée dusommeil, apnée sommeil, ↘ efficacité respiratoire, hypercapnie), ostéo-articulaire (arthrose (hanches, genoux = gonarthrose, rachis), hyperuricémie), autre (reflux gastro-œsophagien, fuites urinaires et incontinence urinaire)",
      },
      {
        nom: "Cancer",
        emoji: "", // facultatif
        type: "Principales",
        description: "Sein (après ménopause), endomètre, ovaire, œsophage, carrefour aérodigestif, pancréas, côlon, rectum, vésicule biliaire, foie, rein, prostate",
      },
      {
        nom: "Psychologique",
        emoji: "", // facultatif
        type: "Principales",
        description: "Frustration, discrimination, dépression, anxiété et baisse de l’estime de soi",
      },
      {
        nom: "Endocrinien",
        emoji: "", // facultatif
        type: "Principales",
        description: "Démasculinisation (dysfonctionnement érection, ↘ spermatogenèse), infertilité, SOPK, hyperthyroïdie",
      },
      {
        nom: "Cutanées",
        emoji: "", // facultatif
        type: "Principales",
        description: "Infections cutanées dans les plis (mycoses)",
      },
      {
        nom: "Anesthésique & chirurgicales",
        emoji: "", // facultatif
        type: "Principales",
        description: "Troubles neuro ou conscience au réveil, mauvaise cicatrisation",
      },
      {
        nom: "Grossesse",
        emoji: "", // facultatif
        type: "Périnatal & développement de l'enfant",
        description: "3x plus risques complications sévères, diabète gestationnel, HTA, pré-éclampsies, césarienne",
      },
      {
        nom: "Fœtus",
        emoji: "", // facultatif
        type: "Périnatal & développement de l'enfant",
        description: "Macrosomie fœtale, mort in utero, prématurité x2 ou 3, dvpt malformations congénitales, sur-dvpt anormal graisse chez fœtus ",
      },
      {
        nom: "Infantile",
        emoji: "", // facultatif
        type: "Périnatal & développement de l'enfant",
        description: "Psychopathologiques (troubles dépressifs, troubles anxieux, TCA, addictions, troubles du comportement), cutanées (vergetures, hypertrichose, mycose, maladie de Scheuermann), cardio-respi (HTA, déconditionnement effort, troubles respiratoires sommeil), endocriniennes (puberté avancée, SOPK, retard pubertaire, verge enfouie, gynécomastie), orthopédiques (épiphysiolyse de la tête fémorale, pieds pats, syndrome fémoro-patellaire, ante torsion fémorale, rachialgie, troubles de la statique vertébrale, épiphysite de croissance), métaboliques (dyslipidélies, stéatose hépatique, insulinorésistance, intolérance au glucose, DT2)",
      },
    ],
    diagnostic: {
      criteresDefinition: [],
      enqueteAlimentaire: [
        "Évaluation quantitative : grammage, énergie, P, L, G, vitamine, minéraux",
        "Évaluation qualitative : qualité des G, L, P",
        "Étude des fréquences",
        "Étude de surconsommation ou sous-consommations",
        "Répartitions alimentaires et grignotage"
      ],
      clinique: [
        {
          signe: "Tour de taille -> type d'obésité", 
          detail: "Obésité androïde niveau 1 (♀ TT>80cm, ♂ TT>94cm), Obésité androïde niveau 2 (♀ TT>88cm, ♂ TT>102cm), Obésité androïde (♀ TT/TH>0.8, ♂ TT/TH>1)" , // facultatif
          emoji: "" // facultatif
        },
        {
          signe: "IMC", 
          detail: "25-30 (surpoids) ; 30-35 (obésité modérée) ; 35-40 (obésité sévère) ; >40 (obésité morbide ou massive)" , // facultatif
          emoji: "" // facultatif
        },
        {
          signe: "Formule de Deurenberg", 
          emoji: "" // facultatif
        },
        {
          signe: "Impédancemètre & Répartition de la masse grasse", 
          emoji: "" // facultatif
        },{
          signe: "Pli cutané", 
          emoji: "" // facultatif
        },{
          signe: "Circonférence des membres", 
          emoji: "" // facultatif
        },{
          signe: "Score d'Edmonton (EDSM)", 
          emoji: "", // facultatif,
          detail: "Échelle de 0 à 10 évaluant la sévérité de l'obésité et les comorbidités associées (complications fonctionnelles, impact psy). Score ≥ 5 : obésité sévère avec complications."
        },
      ],
      paraclinique: [
        {
          nom: "Glycémie à jeun et postprandiale (2h après repas) -> comorbidités",
          detail: "",
          type: "1er temps",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "Cholestérol total, HDL, LDL, triglycérides",
          detail: "",
          type: "1er temps",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "Uricémie",
          detail: "",
          type: "1er temps",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "Fonction rénale pour sujets plus âgés",
          detail: "Urée, créatinémie, calcul de clairance à la créatinine",
          type: "1er temps",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "Bilan hépatique",
          detail: "ASAT, ALAT -> NASH",
          type: "1er temps",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "TSH",
          detail: "Suspicion hypothyroïdie",
          type: "1er temps",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "LDL-cholestérol, HDL-cholestérol, lipoprotéines A et B",
          detail: "",
          type: "2e temps (f° type d'obésité, âge du malade, antécédents personnels, familiaux)",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "Mesure tension artérielle",
          detail: "",
          type: "2e temps (f° type d'obésité, âge du malade, antécédents personnels, familiaux)",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "Fond de l'œil",
          detail: "Détecter une HTA",
          type: "2e temps (f° type d'obésité, âge du malade, antécédents personnels, familiaux)",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "Examens par enregistrement graphique",
          detail: "Électrocardiogramme, échographie Doppler",
          type: "2e temps (f° type d'obésité, âge du malade, antécédents personnels, familiaux)",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "Examens d'imagerie indirecte",
          detail: "Radio du thorax",
          type: "2e temps (f° type d'obésité, âge du malade, antécédents personnels, familiaux)",
          valeursSeuil: "" // facultatif 
        },
        {
          nom: "Examen apnée du sommeil",
          detail: "",
          type: "2e temps (f° type d'obésité, âge du malade, antécédents personnels, familiaux)",
          valeursSeuil: "" // facultatif 
        },
      ],
    },
    traitement: {
      objectifs: [],
      surveillance: [
        "Bien-être global : soutenir l'estime de soi, faciliter l'intégration sociale",
        "Supoids sans comorbidités : perte de poids pas nécessaire, mais prévenir toute prise de poids supplémentaire (surtout si ♀ TT>80cm, ♂ TT>94cm)",
        "Surpoids avec comorbidités : gérer le poids (perte de poids / ↘tour de taille)",
        "Obésité : perte pondérale de 5-15% par rapport au poids initial, priorité de prise en charge des comorbidités associées, si échec thérapeutique stabiliser le poids"
      ],
      mesuresHygienoDiet: [],
      medicaments: [], // facultatif
      chirurgie: [], // facultatif
      autresTraitements: [], //facultatif
    },
    dietetique: undefined,
  }

  // ----------------------------
  // ---------- MODELE ----------
  // ----------------------------
  // {
  //   slug: "",
  //   label: "",
  //   labelCourt: "",
  //   emoji: "",
  //   description: "",
  //   tags: [],
  //   resume: {
  //     definition: "",
  //     mecanismeCle: "",
  //     epidemiologie: "",
  //     etiologie: "",
  //   },
  //   facteursRisque:{
  //     introduction: "",
  //     groupes: [
  //       {
  //         groupe: "",
  //         items: [],
  //       }
  //     ]
  //   }, // facultatif
  //   physiopathologie: {
  //     introduction: "",
  //     etapes: [], // facultatif
  //     subtypes: [], // facultatif
  //   },
  //   complications: [
  //     {
  //       emoji: "", // facultatif
  //       nom: "",
  //       type: "aiguë",
  //       description: "",
  //     },
  //   ],
  //   diagnostic: {
  //     criteresDefinition: [],
  //     enqueteAlimentaire: [],
  //     clinique: [
  //       {
  //         signe: "", 
  //         detail: "" , // facultatif
  //         emoji: "" // facultatif
  //       },
  //     ],
  //     paraclinique: [
  //       {
  //         nom: "",
  //         detail: "",
  //         valeursSeuil: "" // facultatif 
  //       },
  //     ],
  //   },
  //   traitement: {
  //     objectifs: [],
  //     surveillance: [],
  //     mesuresHygienoDiet: [],
  //     medicaments: [], // facultatif
  //     chirurgie: [], // facultatif
  //     autresTraitements: [], //facultatif
  //   },
  //   dietetique: undefined,
  // }
]

export function getPathologie(slug: string): Pathologie | undefined {
  return PATHOLOGIES.find((p) => p.slug === slug)
}
