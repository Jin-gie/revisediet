export type Macro = {
  label: string;
  percent: number;
  color: string;
};

export type Micronutrient = {
  nutrient: string;
  valeur: string;
  role: string;
  sources: string[];
};

export type AlimentGroupe = {
  groupe: string;
  items: string[];
};

export type Population = {
  slug: string;
  label: string;
  emoji: string;
  description: string;
  tags: string[];
  aet: {
    description: string;
    valeurs: { profil: string; kcal: string }[];
  };
  macros: Macro[];
  macrosNotes: string[];
  micronutriments: Micronutrient[];
  alimentsFavoriser: AlimentGroupe[];
  alimentsLimiter: string[];
  conseils: string[];
  pointsVigilance: string[];
};

export const POPULATIONS: Population[] = [
  {
    slug: "adulte",
    label: "Adulte sain",
    emoji: "🧑",
    description: "Homme ou femme de 18 à 59 ans sans pathologie particulière.",
    tags: ["Référence", "18–59 ans"],
    aet: {
      description: "L'AET varie selon le sexe, l'âge et le NAP. Valeurs pour NAP modéré (1,6).",
      valeurs: [
        { profil: "Femme (NAP 1,4)", kcal: "1 800 kcal" },
        { profil: "Femme (NAP 1,6)", kcal: "2 000 kcal" },
        { profil: "Femme (NAP 1,8)", kcal: "2 200 kcal" },
        { profil: "Homme (NAP 1,4)", kcal: "2 200 kcal" },
        { profil: "Homme (NAP 1,6)", kcal: "2 500 kcal" },
        { profil: "Homme (NAP 1,8)", kcal: "2 700 kcal" },
      ],
    },
    macros: [
      { label: "Glucides", percent: 50, color: "#f59e0b" },
      { label: "Lipides", percent: 35, color: "#10b981" },
      { label: "Protéines", percent: 15, color: "#6366f1" },
    ],
    macrosNotes: [
      "Protéines : 0,83 g/kg/j (ANSES 2019)",
      "Lipides : AGS < 12 %, AGMI ~20 %, AGPI ~5 %",
      "Fibres : ≥ 25 g/j",
      "Sucres simples < 10 % de l'AET",
    ],
    micronutriments: [
      { nutrient: "Fer", valeur: "9 mg/j (H) — 16 mg/j (F)", role: "Transport de l'O₂, métabolisme énergétique", sources: ["Viande rouge", "Abats", "Légumineuses", "Céréales enrichies"] },
      { nutrient: "Calcium", valeur: "950 mg/j", role: "Minéralisation osseuse, contraction musculaire", sources: ["Produits laitiers", "Choux", "Sardines", "Eaux calciques"] },
      { nutrient: "Vitamine D", valeur: "15 µg/j", role: "Absorption du calcium, immunité", sources: ["Poissons gras", "Œufs", "Exposition solaire"] },
      { nutrient: "Magnésium", valeur: "380 mg/j (H) — 300 mg/j (F)", role: "Métabolisme énergétique, transmission neuromusculaire", sources: ["Oléagineux", "Légumineuses", "Céréales complètes", "Chocolat noir"] },
      { nutrient: "Vitamine C", valeur: "110 mg/j", role: "Antioxydant, collagène, absorption du fer non-héminique", sources: ["Agrumes", "Poivron", "Kiwi", "Brocoli"] },
      { nutrient: "Folates (B9)", valeur: "330 µg/j", role: "Synthèse de l'ADN, division cellulaire", sources: ["Légumes verts", "Légumineuses", "Foie", "Levure de bière"] },
    ],
    alimentsFavoriser: [
      { groupe: "Céréales & féculents", items: ["Pain complet", "Riz brun", "Pâtes complètes", "Quinoa", "Avoine"] },
      { groupe: "Protéines", items: ["Viandes maigres", "Poissons 2×/sem dont 1 gras", "Œufs", "Légumineuses", "Tofu"] },
      { groupe: "Fruits & légumes", items: ["5 portions/j", "Variété de couleurs", "Crus et cuits"] },
      { groupe: "Produits laitiers", items: ["3 portions/j", "Yaourt nature", "Fromages à pâte cuite"] },
      { groupe: "Matières grasses", items: ["Huile d'olive", "Huile de colza", "Oléagineux"] },
    ],
    alimentsLimiter: [
      "Charcuteries (< 150 g/sem)",
      "Viande rouge (< 500 g/sem)",
      "Produits ultra-transformés",
      "Boissons sucrées",
      "Alcool",
      "Sel (< 8 g/j)",
    ],
    conseils: [
      "Répartir les apports en 3 repas principaux",
      "Boire 1,5 L d'eau par jour minimum",
      "Privilégier la cuisson vapeur ou à l'étouffée",
      "Lire les étiquettes : sucres cachés et graisses saturées",
      "30 min d'activité physique modérée par jour",
    ],
    pointsVigilance: [
      "Carence en fer fréquente chez la femme en âge de procréer",
      "Apports en vitamine D souvent insuffisants en France",
      "Consommation de fibres trop faible (moyenne ~18 g/j vs 25 g recommandés)",
      "Excès de sel lié aux plats préparés et charcuteries",
    ],
  },
  {
    slug: "enfant",
    label: "Enfant & adolescent",
    emoji: "👶",
    description: "De 3 à 17 ans, période de croissance intense avec des besoins nutritionnels élevés.",
    tags: ["Croissance", "3–17 ans"],
    aet: {
      description: "Les besoins augmentent fortement avec l'âge et le pic de croissance pubertaire.",
      valeurs: [
        { profil: "Enfant 3–5 ans", kcal: "1 250 kcal" },
        { profil: "Enfant 6–9 ans", kcal: "1 600 kcal" },
        { profil: "Enfant 10–12 ans", kcal: "1 900 kcal" },
        { profil: "Ado fille 13–17 ans", kcal: "2 000 kcal" },
        { profil: "Ado garçon 13–17 ans", kcal: "2 400 kcal" },
      ],
    },
    macros: [
      { label: "Glucides", percent: 52, color: "#f59e0b" },
      { label: "Lipides", percent: 33, color: "#10b981" },
      { label: "Protéines", percent: 15, color: "#6366f1" },
    ],
    macrosNotes: [
      "Protéines : 0,9–1,0 g/kg/j selon l'âge",
      "Oméga-3 prioritaires pour le développement cérébral",
      "4 repas recommandés (goûter structuré inclus)",
      "Glucides complexes à privilégier pour l'énergie scolaire",
    ],
    micronutriments: [
      { nutrient: "Calcium", valeur: "700 mg/j (3–9 ans) — 1 150 mg/j (10–17 ans)", role: "Minéralisation osseuse (pic de masse osseuse à l'adolescence)", sources: ["Lait", "Yaourt", "Fromage", "Sardines", "Brocoli"] },
      { nutrient: "Fer", valeur: "7–11 mg/j (enfant) — 13 mg/j (ado fille)", role: "Croissance, transport O₂, développement cognitif", sources: ["Viande", "Poisson", "Légumineuses", "Pain complet"] },
      { nutrient: "Zinc", valeur: "5–11 mg/j selon âge", role: "Croissance cellulaire, immunité, maturation sexuelle", sources: ["Viandes", "Fruits de mer", "Céréales complètes"] },
      { nutrient: "Vitamine D", valeur: "15 µg/j", role: "Croissance osseuse, immunité", sources: ["Poissons gras", "Œufs", "Exposition solaire"] },
      { nutrient: "Iode", valeur: "90–150 µg/j", role: "Développement cérébral, fonctions thyroïdiennes", sources: ["Poissons", "Produits laitiers", "Sel iodé"] },
      { nutrient: "Folates (B9)", valeur: "270 µg/j (ado)", role: "Division cellulaire, synthèse ADN", sources: ["Légumes verts", "Légumineuses", "Agrumes"] },
    ],
    alimentsFavoriser: [
      { groupe: "Produits laitiers", items: ["3 à 4 portions/j", "Lait demi-écrémé", "Yaourts nature", "Fromages"] },
      { groupe: "Protéines", items: ["Viandes maigres", "Poissons 2×/sem", "Œufs", "Légumineuses"] },
      { groupe: "Féculents", items: ["À chaque repas", "Pain complet", "Pâtes", "Riz", "Pommes de terre"] },
      { groupe: "Fruits & légumes", items: ["5 portions/j", "Fruits entiers préférés aux jus"] },
    ],
    alimentsLimiter: [
      "Sodas et boissons sucrées",
      "Confiseries et bonbons",
      "Chips et snacks salés",
      "Fast-food et plats préparés",
      "Boissons énergisantes (interdites < 18 ans)",
    ],
    conseils: [
      "Le petit-déjeuner est indispensable pour les apprentissages",
      "Le goûter est un vrai repas : fruit + produit laitier + féculent",
      "Impliquer l'enfant dans la cuisine",
      "Éviter les écrans pendant les repas",
      "Encourager la pratique sportive régulière",
    ],
    pointsVigilance: [
      "Carences en calcium et vitamine D fréquentes à l'adolescence",
      "Risque de carence en fer chez l'adolescente",
      "Développement de TCA à surveiller chez l'ado",
      "Sauts de repas fréquents chez les adolescents",
    ],
  },
  {
    slug: "personne-agee",
    label: "Personne âgée",
    emoji: "👴",
    description: "Personnes de 65 ans et plus. Risque de dénutrition, sarcopénie et carences spécifiques.",
    tags: ["65 ans et +", "Dénutrition"],
    aet: {
      description: "L'AET diminue avec l'âge mais les besoins en protéines restent élevés pour prévenir la sarcopénie.",
      valeurs: [
        { profil: "Femme 65–74 ans", kcal: "1 800 kcal" },
        { profil: "Femme 75 ans et +", kcal: "1 600 kcal" },
        { profil: "Homme 65–74 ans", kcal: "2 100 kcal" },
        { profil: "Homme 75 ans et +", kcal: "1 900 kcal" },
      ],
    },
    macros: [
      { label: "Glucides", percent: 45, color: "#f59e0b" },
      { label: "Lipides", percent: 35, color: "#10b981" },
      { label: "Protéines", percent: 20, color: "#6366f1" },
    ],
    macrosNotes: [
      "Protéines : 1,0–1,2 g/kg/j (ANSES) voire 1,5 g/kg/j en situation de stress",
      "Protéines à haute valeur biologique (viandes, œufs, laitages)",
      "Densité nutritionnelle : qualité > quantité",
      "Hydratation souvent insuffisante (sensation de soif diminuée)",
    ],
    micronutriments: [
      { nutrient: "Vitamine D", valeur: "20 µg/j (800 UI)", role: "Prévention des chutes, santé osseuse, immunité", sources: ["Poissons gras", "Œufs", "Supplémentation souvent nécessaire"] },
      { nutrient: "Calcium", valeur: "1 000 mg/j", role: "Prévention de l'ostéoporose", sources: ["Produits laitiers", "Eaux calciques", "Sardines"] },
      { nutrient: "Vitamine B12", valeur: "4 µg/j", role: "Fonctions neurologiques, synthèse de l'ADN", sources: ["Viandes", "Poissons", "Œufs", "Produits laitiers"] },
      { nutrient: "Folates (B9)", valeur: "330 µg/j", role: "Prévention de l'anémie, fonctions cognitives", sources: ["Légumes verts", "Légumineuses"] },
      { nutrient: "Zinc", valeur: "11 mg/j", role: "Immunité, cicatrisation, goût et appétit", sources: ["Viandes", "Fruits de mer", "Légumineuses"] },
      { nutrient: "Magnésium", valeur: "380 mg/j (H) — 300 mg/j (F)", role: "Fonctions musculaires, prévention des crampes", sources: ["Oléagineux", "Céréales complètes", "Légumineuses"] },
    ],
    alimentsFavoriser: [
      { groupe: "Protéines (priorité absolue)", items: ["Viandes 1×/j", "Poissons 2×/sem", "Œufs 3–4×/sem", "Légumineuses", "Fromage"] },
      { groupe: "Produits laitiers", items: ["3 à 4 portions/j", "Yaourt enrichi", "Lait entier si dénutrition"] },
      { groupe: "Féculents", items: ["À chaque repas", "Pommes de terre", "Pain", "Riz bien cuit"] },
      { groupe: "Fruits & légumes", items: ["Bien cuits si problèmes de mastication", "Soupes et veloutés", "Compotes sans sucre ajouté"] },
    ],
    alimentsLimiter: [
      "Alcool (interactions médicamenteuses)",
      "Sel en excès (hypertension fréquente)",
      "Aliments secs ou durs (problèmes de mastication)",
      "Boissons sucrées (pas de valeur nutritionnelle)",
    ],
    conseils: [
      "Fractionner les repas : 4 à 5 prises alimentaires/jour si appétit faible",
      "Enrichir les plats : beurre, crème, fromage, poudre de lait",
      "Soigner la présentation et le contexte convivial",
      "Surveiller le poids régulièrement (perte > 5% en 1 mois = alarme)",
      "Assurer 1,5 L d'eau/j même sans soif",
    ],
    pointsVigilance: [
      "Dénutrition : IMC < 21 chez la PA est un signe d'alerte",
      "Sarcopénie : protéines et activité physique essentiels",
      "Carence en vitamine D quasi universelle sans supplémentation",
      "Carence en B12 par malabsorption (gastrite atrophique fréquente)",
      "Déshydratation : risque accru en été, sensation de soif émoussée",
      "Dysphagie : adapter les textures si besoin",
    ],
  },
  {
    slug: "grossesse",
    label: "Femme enceinte",
    emoji: "🤰",
    description: "Grossesse unique sans complication. Besoins augmentés pour la croissance fœtale et les modifications maternelles.",
    tags: ["Grossesse", "Prénatal"],
    aet: {
      description: "Le surplus calorique est modeste et évolue selon le trimestre. La qualité prime sur la quantité.",
      valeurs: [
        { profil: "1er trimestre (+0 kcal)", kcal: "≈ 2 000 kcal" },
        { profil: "2e trimestre (+300 kcal)", kcal: "≈ 2 300 kcal" },
        { profil: "3e trimestre (+500 kcal)", kcal: "≈ 2 500 kcal" },
      ],
    },
    macros: [
      { label: "Glucides", percent: 50, color: "#f59e0b" },
      { label: "Lipides", percent: 33, color: "#10b981" },
      { label: "Protéines", percent: 17, color: "#6366f1" },
    ],
    macrosNotes: [
      "Protéines : +10 g/j au 2e trimestre, +28 g/j au 3e trimestre",
      "DHA : +250 mg/j pour le développement cérébral fœtal",
      "Glucides : éviter les IG élevés (prévention diabète gestationnel)",
      "Hydratation : 2 L/j",
    ],
    micronutriments: [
      { nutrient: "Folates (B9)", valeur: "400 µg/j avant conception — 600 µg/j pendant", role: "Fermeture du tube neural, prévention des malformations", sources: ["Légumes verts", "Légumineuses", "Supplémentation recommandée dès la conception"] },
      { nutrient: "Fer", valeur: "25–35 mg/j", role: "Croissance fœtale, prévention anémie maternelle", sources: ["Viandes", "Légumineuses", "Associer vitamine C"] },
      { nutrient: "Calcium", valeur: "1 000 mg/j", role: "Minéralisation osseuse fœtale", sources: ["Produits laitiers 4 portions/j", "Eaux calciques"] },
      { nutrient: "Iode", valeur: "200 µg/j", role: "Développement cérébral et thyroïde fœtale", sources: ["Poissons", "Produits laitiers", "Sel iodé"] },
      { nutrient: "Vitamine D", valeur: "15 µg/j + 100 000 UI au 6e mois", role: "Minéralisation osseuse, immunité", sources: ["Poissons gras", "Supplémentation systématique"] },
      { nutrient: "DHA (oméga-3)", valeur: "+250 mg/j", role: "Développement cérébral et rétinien fœtal", sources: ["Poissons gras 2×/sem", "Huile de colza"] },
    ],
    alimentsFavoriser: [
      { groupe: "Protéines", items: ["Viandes bien cuites", "Poissons cuits 2×/sem", "Œufs bien cuits", "Légumineuses", "Produits laitiers pasteurisés"] },
      { groupe: "Féculents", items: ["Pain complet", "Riz", "Pâtes complètes", "Légumineuses"] },
      { groupe: "Fruits & légumes", items: ["5 portions/j", "Bien lavés", "Épinards, brocoli, lentilles (folates)"] },
      { groupe: "Produits laitiers", items: ["4 portions/j", "Pasteurisés uniquement", "Yaourt, lait, fromages à pâte cuite"] },
    ],
    alimentsLimiter: [
      "Alcool (zéro alcool — aucune dose sans risque)",
      "Fromages à pâte molle / croûte fleurie (listériose)",
      "Charcuteries crues (toxoplasmose, listériose)",
      "Poissons crus et sushis",
      "Poissons riches en mercure (requin, espadon)",
      "Foie et abats en excès (hypervitaminose A)",
      "Caféine > 200 mg/j",
    ],
    conseils: [
      "Supplémenter en folates dès le désir de grossesse (4 sem avant minimum)",
      "Supplémentation en vitamine D au 6e mois — systématique",
      "Respecter les règles d'hygiène alimentaire strictes",
      "Prise de poids recommandée : 10–12 kg pour un IMC normal",
      "Ne pas chercher à perdre du poids pendant la grossesse",
    ],
    pointsVigilance: [
      "Carence en folates : risque de spina bifida — supplémentation préconceptionnelle",
      "Anémie ferriprive : fréquente au 3e trimestre",
      "Diabète gestationnel : dépistage entre 24 et 28 SA",
      "Nausées du 1er trimestre : fractionner, éviter les odeurs fortes",
      "Listériose et toxoplasmose : infections graves pour le fœtus",
    ],
  },
  {
    slug: "sportif",
    label: "Sportif",
    emoji: "🏃",
    description: "Pratique sportive régulière et intensive. Besoins énergétiques et en macronutriments augmentés.",
    tags: ["Sport", "Performance"],
    aet: {
      description: "L'AET dépend de la discipline, de l'intensité et du volume. Valeurs indicatives pour un sport d'endurance.",
      valeurs: [
        { profil: "Sportive endurance (modéré)", kcal: "2 200–2 500 kcal" },
        { profil: "Sportif endurance (modéré)", kcal: "2 700–3 000 kcal" },
        { profil: "Sportif endurance (intense)", kcal: "3 500–4 500 kcal" },
        { profil: "Sport de force / musculation", kcal: "3 000–4 000 kcal" },
      ],
    },
    macros: [
      { label: "Glucides", percent: 55, color: "#f59e0b" },
      { label: "Lipides", percent: 25, color: "#10b981" },
      { label: "Protéines", percent: 20, color: "#6366f1" },
    ],
    macrosNotes: [
      "Protéines : 1,2–1,6 g/kg/j (endurance) — 1,6–2,0 g/kg/j (force)",
      "Glucides : 5–7 g/kg/j (modéré) — 8–10 g/kg/j (intense)",
      "Lipides : ne pas descendre sous 20 % de l'AET",
      "Timing : glucides avant, protéines après effort (fenêtre de 30 min)",
    ],
    micronutriments: [
      { nutrient: "Fer", valeur: "Besoins augmentés (endurance ++)", role: "Transport O₂, prévention anémie du sportif", sources: ["Viandes rouges", "Boudin noir", "Légumineuses", "Céréales enrichies"] },
      { nutrient: "Magnésium", valeur: "400–500 mg/j", role: "Contraction musculaire, prévention crampes, énergie", sources: ["Oléagineux", "Banane", "Céréales complètes", "Chocolat noir"] },
      { nutrient: "Vitamine D", valeur: "15–20 µg/j", role: "Force musculaire, santé osseuse, immunité", sources: ["Poissons gras", "Soleil", "Supplémentation hivernale"] },
      { nutrient: "Calcium", valeur: "1 000 mg/j", role: "Solidité osseuse, contraction musculaire", sources: ["Produits laitiers", "Sardines", "Choux"] },
      { nutrient: "Antioxydants (C, E, béta-carotène)", valeur: "Apports augmentés", role: "Neutralisation des ROS générés à l'effort", sources: ["Fruits et légumes colorés", "Oléagineux", "Huile d'olive"] },
      { nutrient: "Électrolytes (Na, K)", valeur: "Selon pertes sudorales", role: "Équilibre hydrique, transmission neuromusculaire", sources: ["Eau minérale", "Fruits", "Sel de table"] },
    ],
    alimentsFavoriser: [
      { groupe: "Glucides (carburant)", items: ["Pâtes", "Riz", "Pain complet", "Pommes de terre", "Flocons d'avoine", "Banane"] },
      { groupe: "Protéines (récupération)", items: ["Poulet", "Dinde", "Poisson", "Œufs", "Fromage blanc", "Légumineuses"] },
      { groupe: "Lipides de qualité", items: ["Huile d'olive et colza", "Avocat", "Oléagineux", "Poissons gras"] },
      { groupe: "Hydratation", items: ["1,5 L/j + 500 mL/h d'effort", "Eau + électrolytes si > 1h", "Boisson récupération : protéines + glucides"] },
    ],
    alimentsLimiter: [
      "Graisses saturées avant effort (digestion lente)",
      "Alcool (nuit à la récupération musculaire)",
      "Fibres en excès avant compétition (risque digestif)",
      "Suppléments non contrôlés (dopage involontaire)",
    ],
    conseils: [
      "Repas pré-effort : 3h avant, riche en glucides complexes, pauvre en fibres et lipides",
      "Collation post-effort dans les 30 min : protéines + glucides (ratio 1:3)",
      "Hydratation : boire avant d'avoir soif, surveiller la couleur des urines",
      "Augmenter les glucides les jours d'entraînement intensif",
      "Éviter les régimes restrictifs pendant les périodes d'entraînement",
    ],
    pointsVigilance: [
      "Anémie du sportif : fréquente en endurance (hémolyse plantaire, pertes sudorales)",
      "RED-S : restriction calorique involontaire nuisant aux performances",
      "Crampes : déshydratation et/ou carence en magnésium",
      "Troubles digestifs à l'effort : adapter le repas pré-compétition",
      "Compléments alimentaires : encadrer l'usage (risque dopant)",
    ],
  },
  {
    slug: "vegetarien",
    label: "Végétarien / vegan",
    emoji: "🌿",
    description: "Régime végétarien (sans viande ni poisson) ou vegan (sans aucun produit animal). Carences spécifiques à prévenir.",
    tags: ["Végétarien", "Vegan"],
    aet: {
      description: "L'AET est identique à la population générale. Les ajustements portent sur la qualité et la complémentarité des protéines.",
      valeurs: [
        { profil: "Femme végétarienne/vegan", kcal: "2 000 kcal" },
        { profil: "Homme végétarien/vegan", kcal: "2 500 kcal" },
      ],
    },
    macros: [
      { label: "Glucides", percent: 50, color: "#f59e0b" },
      { label: "Lipides", percent: 33, color: "#10b981" },
      { label: "Protéines", percent: 17, color: "#6366f1" },
    ],
    macrosNotes: [
      "Protéines : 0,9–1,0 g/kg/j — majorer de 20 % (digestibilité réduite)",
      "Complémentarité : légumineuses + céréales (acides aminés essentiels)",
      "Oméga-3 : ALA (lin, colza) + DHA d'algue pour les végans",
      "Surveiller la densité nutritionnelle (risque de carences multiples)",
    ],
    micronutriments: [
      { nutrient: "Vitamine B12", valeur: "4 µg/j — supplémentation obligatoire chez le vegan", role: "Fonctions neurologiques, synthèse ADN, hématopoïèse", sources: ["Produits laitiers et œufs (végétarien)", "Supplémentation (vegan)", "Aliments enrichis"] },
      { nutrient: "Fer", valeur: "Majorer de 80 % chez le vegan (fer non-héminique moins absorbé)", role: "Transport O₂", sources: ["Légumineuses", "Graines de courge", "Tofu", "Céréales enrichies + vitamine C"] },
      { nutrient: "Zinc", valeur: "Majorer de 50 % (phytates réduisent l'absorption)", role: "Immunité, cicatrisation, métabolisme", sources: ["Légumineuses", "Noix", "Graines", "Céréales complètes"] },
      { nutrient: "Calcium", valeur: "950 mg/j", role: "Santé osseuse (pas de laitages chez le vegan)", sources: ["Lait végétal enrichi", "Tofu au calcium", "Choux", "Amandes"] },
      { nutrient: "Iode", valeur: "150 µg/j", role: "Fonctions thyroïdiennes — absent des végétaux terrestres", sources: ["Algues (variable)", "Sel iodé", "Supplémentation conseillée"] },
      { nutrient: "DHA / EPA", valeur: "250 mg/j", role: "Santé cardiovasculaire, cerveau", sources: ["Huile de lin / colza (ALA)", "Supplémentation DHA d'algue"] },
    ],
    alimentsFavoriser: [
      { groupe: "Légumineuses (protéines)", items: ["Lentilles", "Pois chiches", "Haricots rouges", "Edamame", "Tofu", "Tempeh"] },
      { groupe: "Céréales (complémentarité)", items: ["Quinoa (protéine complète)", "Riz brun", "Pain complet", "Avoine"] },
      { groupe: "Calcium végétal (vegan)", items: ["Laits végétaux enrichis", "Tofu coagulé au calcium", "Brocoli", "Amandes", "Kale"] },
      { groupe: "Graisses de qualité", items: ["Huile de lin et colza", "Noix", "Graines de chia et lin", "Avocat"] },
    ],
    alimentsLimiter: [
      "Thé et café avec les repas (inhibent l'absorption du fer)",
      "Produits ultra-transformés végans (souvent pauvres en nutriments)",
      "Alcool",
      "Sucres simples en excès",
    ],
    conseils: [
      "B12 : supplémenter systématiquement si régime vegan — obligatoire",
      "Bilan annuel : B12, vitamine D, fer, zinc",
      "Combiner légumineuses + céréales à chaque repas",
      "Consommer de la vitamine C avec les sources de fer (absorption ×2 à ×3)",
      "Faire tremper les légumineuses avant cuisson (réduit les phytates)",
    ],
    pointsVigilance: [
      "Carence en B12 : risque neurologique grave — non négociable chez le vegan",
      "Carence en fer : anémie fréquente, surtout chez la femme",
      "Carence en iode : risque hypothyroïdie",
      "Carence en calcium et vitamine D chez le vegan sans enrichissement",
      "Grossesse vegan : encadrement diététique obligatoire",
    ],
  },
];

export function getPopulation(slug: string): Population | undefined {
  return POPULATIONS.find((p) => p.slug === slug);
}
