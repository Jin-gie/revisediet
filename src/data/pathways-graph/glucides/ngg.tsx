// glucides/ngg.tsx

import { type MetaboliteEdge } from "../types";
import { glycolysisOnlyMetabolites, metabolites, NGGOnlyMetabolites } from "../metabolites";
import { autoHandles } from "../utils";

export const nggNodes = [
  metabolites.pyruvate,
  metabolites.oxaloacetate,
  metabolites.g6p,
  metabolites.glucose,
  metabolites.lactate,
  metabolites.glycerol,
  metabolites.alphaketoglutarate,
  ...Object.values(glycolysisOnlyMetabolites),
  ...Object.values(NGGOnlyMetabolites),
]

export const nggEdges: MetaboliteEdge[] = [
  {
    id: 'ngg-glycerol-glycerol3P',
    source: 'glycerol',
    target: 'glycerol3phosphate',
    ...autoHandles('glycerol', 'glycerol3phosphate'),
    type: 'enzyme',
    label: 'Glycérol kinase',
    data: {
      pathway: ['ngg'],
      enzyme: 'Glycérol kinase',
      cofactor: 'ATP → ADP',
      description: "Phosphorylation du glycérol, principalement dans le foie (peu ou pas active dans le tissu adipeux, qui ne peut donc pas réutiliser le glycérol qu'il libère).",
      reversible: false,
    },
  },
  {
    id: 'ngg-glycerol3P-dhap',
    source: 'glycerol3phosphate',
    target: 'dhap',
    ...autoHandles('glycerol3phosphate', 'dhap'),
    type: 'enzyme',
    label: 'Glycérol-P déshydrogénase',
    data: {
      pathway: ['ngg'],
      enzyme: 'Glycérol-phosphate déshydrogénase',
      cofactor: 'NAD⁺ → NADH,H⁺',
      reversible: false,
    },
  },
  {
    id: 'ngg-e1',
    source: 'pyruvate',
    target: 'oxaloacetate',
    sourceHandle: 'source-bottom',
    targetHandle: 'target-top',
    type: 'enzyme',
    label: 'Pyruvate carboxylase',
    data: {
      pathway: ['ngg'],
      enzyme: 'Pyruvate carboxylase',
      ecNumber: 'EC 6.4.1.1',
      cofactor: 'ATP + CO₂ → ADP + Pi, Biotine (vit. B8)',
      description: "Se trouve uniquement dans la mitochondrie. Première étape de la néoglucogenèse, dans la matrice mitochondriale (le pyruvate y entre). Contourne l'irréversibilité de la pyruvate kinase de la glycolyse.",
      reversible: false,
    },
  },
  {
    id: 'ngg-e2',
    source: 'oxaloacetate',
    target: 'phosphoenolpyruvate',
    sourceHandle: 'source-left',
    targetHandle: 'target-bottom',
    type: 'enzyme',
    label: 'PEP CK',
    data: {
      pathway: ['ngg'],
      enzyme: 'Phosphoénolpyruvate carboxykinase (PEPCK)',
      ecNumber: 'EC 4.1.1.32',
      cofactor: 'GTP → GDP + CO₂',
      description: "Irréversible. Première étate de la NGG. L'oxaloacétate doit d'abord sortir de la mitochondrie (souvent sous forme de malate) avant cette étape cytosolique : pyruvate (entre dans la mitochondrie) -> oxaloacétate -> malade (sort de la mitochondrie) -> oxaloacétate (dans le cytosol) -> phosphoénolpyruvate.",
      reversible: false,
    },
  },
  {
    id: 'ngg-e9',
    source: 'fructose16bisphosphate',
    target: 'f6p',
    sourceHandle: 'source-left',
    targetHandle: 'target-left',
    type: 'enzyme',
    label: 'Fructose-1,6-biphosphatase',
    data: {
      pathway: ['ngg'],
      enzyme: 'Fructose-1,6-bisphosphatase',
      ecNumber: 'EC 3.1.3.11',
      cofactor: 'H₂O',
      description: "Étape irréversible et hautement régulée, contourne la PFK-1 de la glycolyse. Inhibée par le fructose-2,6-bisphosphate et l'AMP ; activée par le citrate. Point de régulation clé empêchant un cycle futile avec la glycolyse.",
      labelOffset : { x : -125, y : 0},
      reversible: false,
    },
  },
  {
    id: 'ngg-e11',
    source: 'g6p',
    target: 'glucose',
    sourceHandle: 'source-left',
    targetHandle: 'target-left',
    type: 'enzyme',
    label: 'Glucose-6-phosphatase',
    data: {
      pathway: ['ngg', 'glycogenolysis'],
      enzyme: 'Glucose-6-phosphatase',
      ecNumber: 'EC 3.1.3.9',
      cofactor: 'H₂O',
      description: "Dernière étape de la NGG, irréversible. Présente uniquement dans le foie, le rein et l'intestin (organes gluconéogéniques - pas les muscles), au niveau du réticulum endoplasmique. Permet de libérer du glucose libre dans le sang, que ce soit depuis la NGG ou depuis la glycogénolyse hépatique.",
      labelOffset : { x : -125, y : 0},
      reversible: false,
    },
  },

  // ── Précurseur alanine : cycle glucose-alanine ────────────────────────────
  {
    id: 'ngg-alanine-pyruvate',
    source: 'alanine',
    target: 'pyruvate',
    sourceHandle: 'source-top',
    targetHandle: 'target-left',
    type: 'enzyme',
    label: 'ALAT',
    data: {
      pathway: ['ngg'],
      enzyme: 'Alanine aminotransférase (ALAT)',
      cofactor: 'α-Cétoglutarate ⇌ Glutamate',
      description: "Transamination réversible. Libère le squelette carboné (pyruvate) directement injectable dans la néoglucogenèse ; le groupement aminé est transféré à l'α-cétoglutarate pour former du glutamate, qui alimente ensuite le cycle de l'urée.",
    },
  },

  // // ── Précurseur glutamine → glutamate → α-cétoglutarate ────────────────────
  // {
  //   id: 'ngg-glutamine-glutamate',
  //   source: 'glutamine',
  //   target: 'glutamate',
  //   ...autoHandles('glutamine', 'glutamate'),
  //   type: 'enzyme',
  //   label: 'Glutaminase',
  //   data: {
  //     pathway: ['ngg'],
  //     enzyme: 'Glutaminase',
  //     cofactor: 'H₂O → NH₄⁺',
  //     description: "Hydrolyse irréversible de la fonction amide. Réaction majeure dans le rein et le foie, libérant un ion ammonium.",
  //     reversible: false,
  //   },
  // },
  // {
  //   id: 'ngg-glutamate-alphakg',
  //   source: 'glutamate',
  //   target: 'alphaketoglutarate',
  //   ...autoHandles('glutamate', 'alphaketoglutarate'),
  //   type: 'enzyme',
  //   label: 'Glutamate DH',
  //   data: {
  //     pathway: ['ngg'],
  //     enzyme: 'Glutamate déshydrogénase',
  //     cofactor: 'NAD⁺ → NADH,H⁺ + NH₄⁺',
  //     description: "Désamination oxydative réversible. Produit l'α-cétoglutarate, qui rejoint ensuite le cycle de Krebs (α-cétoglutarate → succinyl-CoA → succinate → fumarate → malate → oxaloacétate) pour alimenter la néoglucogenèse via la PEPCK.",
  //   },
  // },
]