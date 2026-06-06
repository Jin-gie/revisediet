import { type MetaboliteNode } from './types'

export const glycolysisOnlyMetabolites: Record<string, MetaboliteNode> = {
  f6p: {
    id: 'f6p',
    position: { x: 250, y: 240 },
    type: 'metabolite',
    data: { label: 'Fructose-6-phosphate', pathways: ['glycolysis'], formula: 'C₆H₁₃O₉P' },
  },
  fructose16bisphosphate: {
    id: 'fructose16bisphosphate',
    position: { x: 250, y: 360 },
    type: 'metabolite',
    data: { label: 'Fructose-1,6-bisphosphate', pathways: ['glycolysis'], formula: 'C₆H₁₄O₁₂P₂' },
  },
  dhap: {
    id: 'dhap',
    position: { x: 50, y: 480 },
    type: 'metabolite',
    data: { label: 'Dihydroxyacétone phosphate', pathways: ['glycolysis'], formula: 'C₃H₇O₆P' },
  },
  glyceraldehyde3phosphate: {
    id: 'glyceraldehyde3phosphate',
    position: { x: 450, y: 480 },
    type: 'metabolite',
    data: { label: 'Glycéraldéhyde-3-phosphate', pathways: ['glycolysis'], formula: 'C₃H₇O₆P' },
  },
  bisphosphoglycerate13: {
    id: 'bisphosphoglycerate13',
    position: { x: 450, y: 600 },
    type: 'metabolite',
    data: { label: '1,3-Bisphosphoglycérate', pathways: ['glycolysis'], formula: 'C₃H₈O₁₀P₂' },
  },
  phosphoglycerate3: {
    id: 'phosphoglycerate3',
    position: { x: 450, y: 720 },
    type: 'metabolite',
    data: { label: '3-Phosphoglycérate', pathways: ['glycolysis'], formula: 'C₃H₇O₇P' },
  },
  phosphoglycerate2: {
    id: 'phosphoglycerate2',
    position: { x: 450, y: 840 },
    type: 'metabolite',
    data: { label: '2-Phosphoglycérate', pathways: ['glycolysis'], formula: 'C₃H₇O₇P' },
  },
  phosphoenolpyruvate: {
    id: 'phosphoenolpyruvate',
    position: { x: 450, y: 960 },
    type: 'metabolite',
    data: { label: 'Phosphoénolpyruvate', pathways: ['glycolysis'], formula: 'C₃H₅O₆P' },
  },
  junction_f16bp_aldolase: {
    id: 'junction_f16bp_aldolase',
    type: 'junction',
    position: { x: 330, y: 480 },  // entre fructose-1,6-biphospahte et les 2 métabolites
    data: {
      pathways: ['glycolysis'],
      label: ''
    },
  },
}

export const krebsOnlyMetabolites: Record<string, MetaboliteNode> = {
  citrate: {
    id: 'citrate',
    type: 'metabolite',
    position: { x: 1450, y: 1100 },
    data: { label: 'Citrate', pathways: ['krebs'], formula: 'C₆H₈O₇' },
  },
  isocitrate: {
    id: 'isocitrate',
    type: 'metabolite',
    position: { x: 1650, y: 1300 },
    data: { label: 'Isocitrate', pathways: ['krebs'], formula: 'C₆H₈O₇' },
  },
  succinylcoa: {
    id: 'succinylcoa',
    type: 'metabolite',
    position: { x: 1450, y: 1700 },
    data: { label: 'Succinyl-CoA', pathways: ['krebs'], formula: 'C₂₅H₄₀N₇O₁₉P₃S' },
  },
  succinate: {
    id: 'succinate',
    type: 'metabolite',
    position: { x: 1050, y: 1700 },
    data: { label: 'Succinate', pathways: ['krebs'], formula: 'C₄H₆O₄' },
  },
  malate: {
    id: 'malate',
    type: 'metabolite',
    position: { x: 850, y: 1300 },
    data: { label: 'Malate', pathways: ['krebs'], formula: 'C₄H₆O₅' },
  },
  junction_citrate_synthase: {
    id: 'junction_citrate_synthase',
    type: 'junction',
    position: { x: 1300, y: 1117 },  // entre acetylcoa et oxaloacetate
    data: {
      pathways: ['krebs'],
      label: ''
    },
  },
}

export const ureaOnlyMetabolites: Record<string, MetaboliteNode> = {
  // ── Métabolites ────────────────────────────────────────────────────────────

  carbamoylphosphate: {
    id: 'carbamoylphosphate',
    type: 'metabolite',
    position: { x: -200, y: 1000 },  // haut du cercle
    data: { label: 'Carbamoyl-phosphate', pathways: ['urea'], formula: 'CH₄N₂O₄P' },
  },
  citrulline: {
    id: 'citrulline',
    type: 'metabolite',
    position: { x: 250, y: 1100 },   // haut droite
    data: { label: 'Citrulline', pathways: ['urea'], formula: 'C₆H₁₃N₃O₃' },
  },
  argininosuccinate: {
    id: 'argininosuccinate',
    type: 'metabolite',
    position: { x: 450, y: 1300 },   // bas droite — aligné avec fumarate
    data: { label: 'Argininosuccinate', pathways: ['urea'], formula: 'C₁₀H₁₈N₄O₆' },
  },
  arginine: {
    id: 'arginine',
    type: 'metabolite',
    position: { x: 250, y: 1540 },  // bas du cercle
    data: { label: 'Arginine', pathways: ['urea'], formula: 'C₆H₁₄N₄O₂' },
  },
  ornithine: {
    id: 'ornithine',
    type: 'metabolite',
    position: { x: -50, y: 1300 },  // bas gauche
    data: { label: 'Ornithine', pathways: ['urea'], formula: 'C₅H₁₂N₂O₂' },
  },
  aspartate: {
    id: 'aspartate',
    type: 'metabolite',
    position: { x: 650, y: 1100 },  // haut gauche
    data: { label: 'Aspartate', pathways: ['urea'], formula: 'C₄H₇NO₄' },
  },
  urea: {
    id: 'urea',
    type: 'metabolite',
    position: { x: -300, y: 1400 },  // extérieur bas gauche — produit final éjecté
    data: { label: 'Urée', pathways: ['urea'], formula: 'CH₄N₂O' },
  },

  // ── Junctions ──────────────────────────────────────────────────────────────

  junction_otc: {
    id: 'junction_otc',
    type: 'junction',
    position: { x: 100, y: 1150 },   // entre carbamoylphosphate et citrulline
    data: { label: '', pathways: ['urea'] },
  },
  junction_ass: {
    id: 'junction_ass',
    type: 'junction',
    position: { x: 525, y: 1200 },   // entre citrulline et argininosuccinate
    data: { label: '', pathways: ['urea'] },
  },
  junction_asl: {
    id: 'junction_asl',
    type: 'junction',
    position: { x: 500, y: 1450 },   // entre argininosuccinate et arginine
    data: { label: '', pathways: ['urea'] },
  },
  junction_arginase: {
    id: 'junction_arginase',
    type: 'junction',
    position: { x: 100, y: 1450 },  // entre arginine et ornithine
    data: { label: '', pathways: ['urea'] },
  },
}

export const betaoxydationOnlyMetabolites: Record<string, MetaboliteNode> = {

  // ── Entrée ─────────────────────────────────────────────────────────────────

  fattyacid: {
    id: 'fattyacid',
    type: 'metabolite',
    position: { x: 2200, y: 600 },
    data: { label: 'Acide gras', pathways: ['betaoxydation'], formula: 'R-COOH' },
  },
  acylcoa: {
    id: 'acylcoa',
    type: 'metabolite',
    position: { x: 2200, y: 750 },
    data: {
      label: 'Acyl-CoA',
      pathways: ['betaoxydation'],
      formula: 'R-CO-SCoA',
      description: 'Forme activée de l\'acide gras. Activation par l\'acyl-CoA synthétase dans le cytoplasme, puis transport vers la mitochondrie via la carnitine.',
    },
  },

  // ── Cycle (hélice de Lynen) ────────────────────────────────────────────────

  trans2enoylcoa: {
    id: 'trans2enoylcoa',
    type: 'metabolite',
    position: { x: 2500, y: 900 },
    data: {
      label: 'Trans-Δ2-énoyl-CoA',
      pathways: ['betaoxydation'],
      formula: 'R-CH=CH-CO-SCoA',
      description: 'Intermédiaire insaturé formé par oxydation de l\'acyl-CoA. Liaison double en position Δ2 en configuration trans.',
    },
  },
  hydroxyacylcoa: {
    id: 'hydroxyacylcoa',
    type: 'metabolite',
    position: { x: 2500, y: 1100 },
    data: {
      label: 'L-β-hydroxyacyl-CoA',
      pathways: ['betaoxydation'],
      formula: 'R-CHOH-CH₂-CO-SCoA',
      description: 'Formé par hydratation du trans-énoyl-CoA. Stéréoisomère L (S).',
    },
  },
  ketoacylcoa: {
    id: 'ketoacylcoa',
    type: 'metabolite',
    position: { x: 2200, y: 1250 },
    data: {
      label: 'β-cétoacyl-CoA',
      pathways: ['betaoxydation'],
      formula: 'R-CO-CH₂-CO-SCoA',
      description: 'Formé par oxydation du L-β-hydroxyacyl-CoA. Substrat de la thiolyse.',
    },
  },
  acylcoa_shortened: {
    id: 'acylcoa_shortened',
    type: 'metabolite',
    position: { x: 1950, y: 1100 },
    data: {
      label: 'Acyl-CoA (n-2) C',
      pathways: ['betaoxydation'],
      formula: 'R\'-CO-SCoA',
      description: 'Acyl-CoA raccourci de 2 carbones. Repart dans un nouveau cycle de bêta-oxydation.',
    },
  },

  // ── Junctions ─────────────────────────────────────────────────────────────

  junction_thiolase: {
    id: 'junction_thiolase',
    type: 'junction',
    position: { x: 2050, y: 1250 },
    data: { label: '', pathways: ['betaoxydation'] },
    width: 1,
    height: 1,
  },
}

// Tous les métabolites, sans doublon
export const metabolites: Record<string, MetaboliteNode> = {
  glucose: {
    id: 'glucose',
    position: { x: 250, y: 0 },
    type: 'metabolite',
    data: { label: 'Glucose', pathways: ['glycolysis'], formula: 'C₆H₁₂O₆', description: 'Glucose is the primary source of energy for most cells.' },
  },
  g6p: {
    id: 'g6p',
    position: {x: 250, y:120},
    type: 'metabolite',
    data: {label: 'Glucose 6-P', pathways: ['glycolysis'], formula: 'C₆H₁₂O₆'}
  },
  pyruvate: {
    id: 'pyruvate',
    position: { x: 850, y: 960 },
    type: 'metabolite',
    data: { label: 'Pyruvate', pathways: ['glycolysis', 'krebs'], formula: 'C₃H₄O₃', description: 'Pyruvate is the end product of glycolysis and can be further metabolized in the mitochondria.' },
  },
  acetylcoa: {
    id: 'acetylcoa',
    position: { x: 1250, y: 960 },
    type: 'metabolite',
    data: { label: 'Acétyl-CoA', pathways: ['glycolysis', 'krebs', 'betaoxydation'], formula: 'C₂₃H₃₈N₇O₁₇P₃S' },
  },
  oxaloacetate: {
    id: 'oxaloacetate',
    position: { x: 1050, y: 1100 },
    type: 'metabolite',
    data: { label: 'Oxaloacétate', pathways: ['krebs', 'urea'], formula: 'C₄H₄O₅' },
  },
  alphaketoglutarate: {
    id: 'alphaketoglutarate',
    position: { x: 1650, y: 1540 },
    type: 'metabolite',
    data: { label: 'α-Cétoglutarate', pathways: ['krebs', 'urea'], formula: 'C₅H₆O₅' },
  },
  fumarate: {
    id: 'fumarate',
    type: 'metabolite',
    position: { x: 850, y: 1540 },
    data: { label: 'Fumarate', pathways: ['krebs', 'urea'], formula: 'C₄H₄O₄' },
  },
  nh4: {
    id: 'nh4',
    type: 'metabolite',
    position: { x: -200, y: 880 },  // extérieur bas gauche — produit final éjecté
    data: { label: 'NH₄⁺', pathways: ['urea'], formula: 'NH₄⁺' },
  },


  ...glycolysisOnlyMetabolites,
  ...krebsOnlyMetabolites,
  ...ureaOnlyMetabolites,
  ...betaoxydationOnlyMetabolites,
}