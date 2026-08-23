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
    sourceHandle: 'source-bottom',
    targetHandle: 'target-top',
    type: 'enzyme',
    label: 'Pyruvate carboxylase',
    data: {
      pathway: ['ngg'],
      enzyme: 'Pyruvate carboxylase',
      ecNumber: 'EC 6.4.1.1',
      cofactor: 'ATP + CO₂ → ADP + Pi, Biotine (vit. B8)',
      description: "Première étape de la néoglucogenèse, dans la matrice mitochondriale (l'enzyme se trouve uniquement dans la mitochondrie). Contourne l'irréversibilité de la pyruvate kinase de la glycolyse.",
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
    label: 'PEPCK',
    data: {
      pathway: ['ngg'],
      enzyme: 'Phosphoénolpyruvate carboxykinase (PEPCK)',
      ecNumber: 'EC 4.1.1.32',
      cofactor: 'GTP → GDP + CO₂',
      description: "L'oxaloacétate doit d'abord sortir de la mitochondrie (souvent sous forme de malate) avant cette étape cytosolique : pyruvate (entre dans la mitochondrie) -> oxaloacétate -> malade (sort de la mitochondrie) -> oxaloacétate (dans le cytosol) -> phosphoénolpyruvate.",
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
    label: 'FBPase-1',
    data: {
      pathway: ['ngg'],
      enzyme: 'Fructose-1,6-bisphosphatase (FBPase-1)',
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
      pathway: ['ngg'],
      enzyme: 'Glucose-6-phosphatase',
      ecNumber: 'EC 3.1.3.9',
      cofactor: 'H₂O',
      description: "Dernière étape, irréversible. Présente uniquement dans le foie, le rein et l'intestin (organes gluconéogéniques - pas les muscles), au niveau du réticulum endoplasmique. Permet de libérer du glucose libre dans le sang.",
      labelOffset : { x : -125, y : 0},
      reversible: false,
    },
  },
]