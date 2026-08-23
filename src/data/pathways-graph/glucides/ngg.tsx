// glucides/ngg.tsx

import { type MetaboliteEdge } from "../types";
import { glycolysisOnlyMetabolites, metabolites } from "../metabolites";

// La NGG ne crée aucun métabolite propre : elle réutilise entièrement
// ceux de la glycolyse (dans l'autre sens) et de Krebs (pyruvate, oxaloacétate).
export const nggNodes = [
  metabolites.pyruvate,
  metabolites.oxaloacetate,
  metabolites.g6p,
  metabolites.glucose,
  ...Object.values(glycolysisOnlyMetabolites),
]

export const nggEdges: MetaboliteEdge[] = [

  {
    id: 'ngg-e1',
    source: 'pyruvate',
    target: 'oxaloacetate',
    sourceHandle: 'source-top',
    targetHandle: 'target-bottom',
    type: 'enzyme',
    label: 'Pyruvate carboxylase',
    data: {
      pathway: 'ngg',
      enzyme: 'Pyruvate carboxylase',
      ecNumber: 'EC 6.4.1.1',
      cofactor: 'ATP + CO₂ → ADP + Pi, Biotine (vit. B8)',
      description: "Première étape, dans la matrice mitochondriale. Contourne l'irréversibilité de la pyruvate kinase de la glycolyse.",
      reversible: false,
    },
  },

  {
    id: 'ngg-e2',
    source: 'oxaloacetate',
    target: 'phosphoenolpyruvate',
    sourceHandle: 'source-bottom',
    targetHandle: 'target-left',
    type: 'enzyme',
    label: 'PEPCK',
    data: {
      pathway: 'ngg',
      enzyme: 'Phosphoénolpyruvate carboxykinase (PEPCK)',
      ecNumber: 'EC 4.1.1.32',
      cofactor: 'GTP → GDP + CO₂',
      description: "L'oxaloacétate doit d'abord sortir de la mitochondrie (souvent sous forme de malate) avant cette étape cytosolique.",
      reversible: false,
    },
  },

  {
    id: 'ngg-e3',
    source: 'phosphoenolpyruvate',
    target: 'phosphoglycerate2',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    type: 'enzyme',
    label: 'Enolase',
    data: { pathway: 'ngg', enzyme: 'Enolase', cofactor: 'H₂O', description: 'Réaction réversible, identique à celle de la glycolyse mais dans le sens inverse.', labelOffset : { x : -125, y : 0} },
  },

  {
    id: 'ngg-e4',
    source: 'phosphoglycerate2',
    target: 'phosphoglycerate3',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    type: 'enzyme',
    label: 'Phosphoglycérate mutase',
    data: { pathway: 'ngg', enzyme: 'Phosphoglycérate mutase', description: 'Réaction réversible.', labelOffset : { x : -125, y : 0} },
  },

  {
    id: 'ngg-e5',
    source: 'phosphoglycerate3',
    target: 'bisphosphoglycerate13',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    type: 'enzyme',
    label: 'Phosphoglycérate kinase',
    data: { pathway: 'ngg', enzyme: 'Phosphoglycérate kinase', cofactor: 'ATP → ADP', description: 'Réaction réversible, coûte 1 ATP par molécule (donc 2 ATP pour 2 trioses par glucose formé).', labelOffset : { x : -125, y : 0} },
  },

  {
    id: 'ngg-e6',
    source: 'bisphosphoglycerate13',
    target: 'glyceraldehyde3phosphate',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    type: 'enzyme',
    label: 'GAPDH',
    data: { pathway: 'ngg', enzyme: 'Glycéraldéhyde-3-phosphate déshydrogénase', cofactor: 'NADH → NAD⁺', description: 'Réaction réversible, consomme du NADH (contrairement à la glycolyse qui en produit).', labelOffset : { x : -125, y : 0} },
  },

  {
    id: 'ngg-e7',
    source: 'glyceraldehyde3phosphate',
    target: 'dhap',
    sourceHandle: 'source-top',
    targetHandle: 'target-top',
    type: 'enzyme',
    label: 'TPI',
    data: { pathway: 'ngg', enzyme: 'Triose phosphate isomérase', description: 'Interconversion réversible, permet de récupérer les 2 trioses nécessaires à la condensation suivante.',  },
  },

  {
    id: 'ngg-e8a',
    source: 'dhap',
    target: 'junction_f16bp_aldolase',
    sourceHandle: 'source-right',
    targetHandle: 'target-left',
    data: { pathway: 'ngg', labelOffset : { x : -125, y : 0} },
  },
  {
    id: 'ngg-e8b',
    source: 'glyceraldehyde3phosphate',
    target: 'junction_f16bp_aldolase',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    data: { pathway: 'ngg', labelOffset : { x : -125, y : 0} },
  },
  {
    id: 'ngg-e8c',
    source: 'junction_f16bp_aldolase',
    target: 'fructose16bisphosphate',
    sourceHandle: 'source-top',
    targetHandle: 'target-bottom',
    type: 'enzyme',
    label: 'Aldolase',
    data: {
      pathway: 'ngg',
      enzyme: 'Fructose-1,6-bisphosphate aldolase',
      description: 'Même enzyme que dans la glycolyse, ici dans le sens condensation des deux trioses.',
      labelOffset : { x : -125, y : 0}
    },
  },

  {
    id: 'ngg-e9',
    source: 'fructose16bisphosphate',
    target: 'f6p',
    sourceHandle: 'source-left',
    targetHandle: 'target-left',
    type: 'enzyme',
    label: 'FBPase-1',
    data: {
      pathway: 'ngg',
      enzyme: 'Fructose-1,6-bisphosphatase (FBPase-1)',
      ecNumber: 'EC 3.1.3.11',
      cofactor: 'H₂O',
      description: "Étape irréversible et hautement régulée, contourne la PFK-1 de la glycolyse. Inhibée par le fructose-2,6-bisphosphate et l'AMP ; activée par le citrate. Point de régulation clé empêchant un cycle futile avec la glycolyse.",
      labelOffset : { x : -125, y : 0},
      reversible: false,
    },
  },

  {
    id: 'ngg-e10',
    source: 'f6p',
    target: 'g6p',
    sourceHandle: 'source-left',
    targetHandle: 'target-left',
    type: 'enzyme',
    label: 'Phosphoglucose isomérase',
    data: { pathway: 'ngg', enzyme: 'Phosphoglucose isomérase', description: 'Réaction réversible.', labelOffset : { x : -125, y : 0} },
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
      pathway: 'ngg',
      enzyme: 'Glucose-6-phosphatase',
      ecNumber: 'EC 3.1.3.9',
      cofactor: 'H₂O',
      description: "Dernière étape, irréversible. Présente uniquement dans le foie, le rein et l'intestin (organes gluconéogéniques) — permet de libérer du glucose libre dans le sang, contrairement au muscle qui en est dépourvu.",
      labelOffset : { x : -125, y : 0},
      reversible: false,
    },
  },
]