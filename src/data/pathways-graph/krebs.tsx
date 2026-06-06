import { krebsOnlyMetabolites, metabolites } from "./metabolites";
import { MetaboliteEdge } from "./types";

export const krebsNodes = [
  // Métabolites partagés depuis metabolites.ts
  metabolites.acetylcoa,
  metabolites.oxaloacetate,
  metabolites.alphaketoglutarate,
  metabolites.fumarate,
  // Métabolites propres au cycle de Krebs
  ...Object.values(krebsOnlyMetabolites),
]

export const krebsEdges: MetaboliteEdge[] = [
  // Jonction glycolyse → Krebs
  {
    id: 'krebs-e1',
    source: 'pyruvate',
    target: 'acetylcoa',
    type: 'enzyme',
    label: 'Pyruvate DH',
    sourceHandle: 'source-right',
    targetHandle: 'target-left',
    data: { pathway: 'krebs', enzyme: 'Pyruvate déshydrogénase', cofactor: 'NAD⁺ → NADH + CO₂', ecNumber: 'EC 1.2.4.1' },
  },
  // Entrée dans le cycle
  // Acétyl-CoA → junction
  {
    id: 'krebs-j1a',
    source: 'acetylcoa',
    target: 'junction_citrate_synthase',
    sourceHandle: 'source-bottom',
    data: { pathway: 'krebs' },
  },
  // Oxaloacétate → junction
  {
    id: 'krebs-j1b',
    source: 'oxaloacetate',
    target: 'junction_citrate_synthase',
    sourceHandle: 'source-right',
    targetHandle: 'target-left',
    data: { pathway: 'krebs' },
  },
  // junction → Citrate (avec le label de l'enzyme ici)
  {
    id: 'krebs-j1c',
    source: 'junction_citrate_synthase',
    target: 'citrate',
    type: 'enzyme',
    label: 'Citrate synthase',
    sourceHandle: 'source-right',
    targetHandle: 'target-left',
    data: { pathway: 'krebs', enzyme: 'Citrate synthase' },
  },


  {
    id: 'krebs-e3',
    source: 'citrate',
    target: 'isocitrate',
    type: 'enzyme',
    label: 'Aconitase',
    sourceHandle: 'source-right',
    data: { pathway: 'krebs', enzyme: 'Aconitase', cofactor: 'H₂O' },
  },
  {
    id: 'krebs-e4',
    source: 'isocitrate',
    target: 'alphaketoglutarate',
    type: 'enzyme',
    label: 'Isocitrate DH',
    data: { pathway: 'krebs', enzyme: 'Isocitrate déshydrogénase', cofactor: 'NAD⁺ → NADH + CO₂' },
  },
  {
    id: 'krebs-e5',
    source: 'alphaketoglutarate',
    target: 'succinylcoa',
    targetHandle: 'target-right',
    type: 'enzyme',
    label: 'α-Cétoglutarate DH',
    data: { pathway: 'krebs', enzyme: 'α-Cétoglutarate déshydrogénase', cofactor: 'NAD⁺ → NADH + CO₂' },
  },
  {
    id: 'krebs-e6',
    source: 'succinylcoa',
    target: 'succinate',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    type: 'enzyme',
    label: 'Succinyl-CoA synthétase',
    data: { pathway: 'krebs', enzyme: 'Succinyl-CoA synthétase', cofactor: 'ADP → ATP' },
  },
  {
    id: 'krebs-e7',
    source: 'succinate',
    target: 'fumarate',
    sourceHandle: 'source-left',
    targetHandle: 'target-bottom',
    type: 'enzyme',
    label: 'Succinate DH',
    data: { pathway: 'krebs', enzyme: 'Succinate déshydrogénase', cofactor: 'FAD → FADH₂' },
  },
  {
    id: 'krebs-e8',
    source: 'fumarate',
    target: 'malate',
    type: 'enzyme',
    label: 'Fumarase',
    data: { pathway: 'krebs', enzyme: 'Fumarase', cofactor: 'H₂O' },
  },
  {
    id: 'krebs-e9',
    source: 'malate',
    target: 'oxaloacetate',
    sourceHandle: 'source-top',
    targetHandle: 'target-left',
    type: 'enzyme',
    label: 'Malate DH',
    data: { pathway: 'krebs', enzyme: 'Malate déshydrogénase', cofactor: 'NAD⁺ → NADH' },
  },
]