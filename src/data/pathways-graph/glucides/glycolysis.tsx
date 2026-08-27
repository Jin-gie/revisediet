// glucides/glycolysis.tsx

import { type MetaboliteEdge } from '../types'
import { glycolysisOnlyMetabolites, metabolites } from '../metabolites'
import { autoHandles } from '../utils'

export const glycolysisNodes = [
  metabolites.glucose,
  metabolites.g6p,
  metabolites.pyruvate,
  metabolites.acetylcoa,
  metabolites.lactate,
  ...Object.values(glycolysisOnlyMetabolites),
]

export const glycolysisEdges: MetaboliteEdge[] = [
  {
    id: 'gly-e1',
    source: 'glucose',
    target: 'g6p',
    ...autoHandles('glucose', 'g6p'),
    type: 'enzyme',
    label: 'Hexokinase / Glucokinase',
    data: { 
      pathway: ['glycolysis'], 
      enzyme: 'Hexokinase (glucokinase dans le foie)', 
      cofactor: 'ATP → ADP', 
      description: 'Irréversible : séquestration et activation du glucose',
      reversible: false },
  },
  {
    id: 'gly-e2',
    source: 'g6p',
    target: 'f6p',
    ...autoHandles('g6p', 'f6p'),
    type: 'enzyme',
    label: 'Phosphoglucose isomérase',
    data: { pathway: ['glycolysis', 'ngg'], enzyme: 'Phosphoglucose isomérase' },
  },
  {
    id: 'gly-e3',
    source: 'f6p',
    target: 'fructose16bisphosphate',
    ...autoHandles('f6p', 'fructose16bisphosphate'),
    type: 'enzyme',
    label: 'PFK-1',
    data: { 
      pathway: ['glycolysis'], 
      enzyme: 'Phosphofructokinase-1', 
      cofactor: 'ATP → ADP', 
      description : "Irréversible : véritable engagement dans la glycolyse, principal siège de la régulation (=> PFK-1 est une enzyme clé de la glycolyse). Phosphoryle le fructose-6-P au détriment d'une molécule d'ATP.",
      reversible: false },
  },
  {
    id: 'gly-e4',
    source: 'fructose16bisphosphate',
    target: 'junction_f16bp_aldolase',
    type: 'enzyme',
    label: 'Aldolase',
    ...autoHandles('fructose16bisphosphate', 'junction_f16bp_aldolase'),
    sourceHandle: 'source-bottom',
    targetHandle: 'target-top',
    data: { 
      pathway: ['glycolysis', 'ngg'], 
      enzyme: 'Aldolase',
      description: "Dans la glycolyse : clivage du fructose-1,6-biP en 2 trioses phosphates (isomères l'un de l'autre)."
    },
  },
  {
    id: 'gly-e5',
    source: 'junction_f16bp_aldolase',
    target: 'dhap',
    label: '',
    ...autoHandles('junction_f16bp_aldolase', 'dhap'),
    data: { pathway: ['glycolysis', 'ngg'], enzyme: '' },
  },
  {
    id: 'gly-e5-2',
    source: 'junction_f16bp_aldolase',
    target: 'glyceraldehyde3phosphate',
    label: '',
    ...autoHandles('junction_f16bp_aldolase', 'glyceraldehyde3phosphate'),
    data: { pathway: ['glycolysis', 'ngg'], enzyme: '' },
  },
  {
    id: 'gly-e6',
    source: 'dhap',
    target: 'glyceraldehyde3phosphate',
    ...autoHandles('dhap', 'glyceraldehyde3phosphate'),
    type: 'enzyme',
    label: 'TPI',
    data: { 
      pathway: ['glycolysis', 'ngg'], 
      enzyme: 'Triose phosphate isomérase',
      description: "Seul le GAP peut subir les réactions de la glycolyse et de la NGG. Dans la glycolyse, l'isomérase transforme tous les DHAP et GAP."
    },
  },
  {
    id: 'gly-e7',
    source: 'glyceraldehyde3phosphate',
    target: 'bisphosphoglycerate13',
    ...autoHandles('glyceraldehyde3phosphate', 'bisphosphoglycerate13'),
    type: 'enzyme',
    label: 'GAP DH',
    data: { 
      pathway: ['glycolysis', 'ngg'], 
      enzyme: 'Glycéraldéhyde-3-phosphate déshydrogénase', 
      cofactor: 'Glycolyse NAD⁺ → NADH,H⁺ | NGG NADH,H⁺ → NAD⁺', 
      description: "Réaction d'oxydo-réduction" },
  },
  {
    id: 'gly-e8',
    source: 'bisphosphoglycerate13',
    target: 'phosphoglycerate3',
    ...autoHandles('bisphosphoglycerate13', 'phosphoglycerate3'),
    type: 'enzyme',
    label: 'Phosphoglycérate kinase',
    data: { 
      pathway: ['glycolysis', 'ngg'], 
      enzyme: 'Phosphoglycérate kinase', 
      cofactor: 'Glycolyse ADP → ATP | NGG ATP → ADP',
      description : "Dans la glycolyse, phosphoryle un ADP et ATP via le transfert du groupe phosphorule du 1,3-BPG qui devient le 3-PG. A cette étape on compense l'investissement initial de 2 ATP (étapes 1 et 3) en générant 2 ATP."
    },
  },
  {
    id: 'gly-e9',
    source: 'phosphoglycerate3',
    target: 'phosphoglycerate2',
    ...autoHandles('phosphoglycerate3', 'phosphoglycerate2'),
    type: 'enzyme',
    label: 'Phosphoglycérate mutase',
    data: { 
      pathway: ['glycolysis', 'ngg'], 
      enzyme: 'Phosphoglycérate mutase', 
      description: 'Réaction de réarrangement du groupement phosphate.' },
  },
  {
    id: 'gly-e10',
    source: 'phosphoglycerate2',
    target: 'phosphoenolpyruvate',
    ...autoHandles('phosphoglycerate2', 'phosphoenolpyruvate'),
    type: 'enzyme',
    label: 'Enolase',
    data: { 
      pathway: ['glycolysis', 'ngg'], 
      enzyme: 'Enolase', 
      cofactor: 'H₂O',
      description : "Dans la glycolyse, provoque une déshydratation, ce qui forme un PEP (composé à haut potentiel énergétique) : permet de récupérer de l'énergie à l'étape suivante." 
    },
  },
  {
    id: 'gly-e11',
    source: 'phosphoenolpyruvate',
    target: 'pyruvate',
    ...autoHandles('phosphoenolpyruvate', 'pyruvate'),
    type: 'enzyme',
    label: 'Pyruvate kinase',
    data: { 
      pathway: ['glycolysis'], 
      enzyme: 'Pyruvate kinase', 
      cofactor: 'ADP → ATP',
      description : "Irréversible, 10e et dernière étape de la glycolyse : oxydation des fragments tricarbonés et récupération de 2 ATP et 2 NADH,H⁺", 
      reversible: false },
  },
  {
    id: 'gly-e12',
    source: 'pyruvate',
    target: 'acetylcoa',
    ...autoHandles('pyruvate', 'acetylcoa'),
    type: 'enzyme',
    label: 'Pyruvate DH',
    data: { pathway: ['glycolysis'], enzyme: 'Pyruvate déshydrogénase', cofactor: 'NAD⁺ → NADH,H⁺ + CO₂', description: "Réaction de décarboxylation oxydative (irréversible). Se fait en milieu aérobie, dans la mitochondrie : le pyruvate entre dans la mitochondrie grâce à une protéine membranaire spécifique avec un transport de type facilité. Avec la décarboxilation oxidative, le glucose subit une oxydation totale en H2O et CO2", reversible: false },
  },
  {
    id: 'gly-e13',
    source: 'pyruvate',
    target: 'lactate',
    ...autoHandles('pyruvate', 'lactate'),
    type: 'enzyme',
    label: 'Lactate déshydrogénase',
    data: {
      pathway: ['glycolysis', 'ngg'],
      enzyme : 'Lactate déshydrogénase',
      cofactor: "NADH,H⁺ → NAD⁺",
      description: "Fermentation lactique : se fait en milieu anaérobie, dans les hématies et cellules musculaires. Dépend des enzymes et de la disponibilité en oxygène. Réaction importante car conduit à la réoxydation du NADH,H⁺, qui pourra de nouveau participer à la glycolyse. Permet de fournir de l'ATP aux cellules qui ne possèdent pas de mitochondries."
    }
  },
]