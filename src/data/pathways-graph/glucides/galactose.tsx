// glucides/galactose.tsx

import { type MetaboliteEdge } from "../types";
import { galactoseOnlyMetabolites, metabolites } from "../metabolites";
import { autoHandles } from "../utils";

export const galactoseNodes = [
  metabolites.g6p,
  ...Object.values(galactoseOnlyMetabolites),
]

export const galactoseEdges: MetaboliteEdge[] = [
  {
    id: 'gal-e1',
    source: 'galactose',
    target: 'galactose1phosphate',
    ...autoHandles('galactose', 'galactose1phosphate'),
    type: 'enzyme',
    label: 'Galactokinase',
    data: {
      pathway: ['galactose'],
      enzyme: 'Galactokinase',
      cofactor: 'ATP → ADP',
      description: "Phosphorylation du galactose, première étape de la voie de Leloir.",
      reversible: false,
    },
  },
  {
    id: 'gal-e2a',
    source: 'galactose1phosphate',
    target: 'junction_galt',
    ...autoHandles('galactose1phosphate', 'junction_galt'),
    data: { pathway: ['galactose'] },
  },
  {
    id: 'gal-e2b',
    source: 'udpglucose',
    target: 'junction_galt',
    ...autoHandles('udpglucose', 'junction_galt'),
    data: { pathway: ['galactose'] },
  },
  {
    id: 'gal-e2c',
    source: 'junction_galt',
    target: 'glucose1phosphate',
    ...autoHandles('junction_galt', 'glucose1phosphate'),
    type: 'enzyme',
    label: 'GALT',
    data: {
      pathway: ['galactose'],
      enzyme: 'Galactose-1-phosphate uridylyltransférase (GALT)',
      description: "Échange le groupement UDP entre le galactose-1-phosphate et l'UDP-glucose, produisant du glucose-1-phosphate et de l'UDP-galactose. Le déficit en GALT cause la galactosémie classique.",
      reversible: false,
    },
  },
  {
    id: 'gal-e2d',
    source: 'junction_galt',
    target: 'udpgalactose',
    ...autoHandles('junction_galt', 'udpgalactose'),
    type: 'enzyme',
    data: {
      pathway: ['galactose'],
      reversible: false,
    },
  },
  {
    id: 'gal-e3',
    source: 'udpgalactose',
    target: 'udpglucose',
    ...autoHandles('udpgalactose', 'udpglucose'),
    type: 'enzyme',
    label: 'UDP-gal 4-épimérase',
    data: {
      pathway: ['galactose'],
      enzyme: 'UDP-galactose 4-épimérase',
      description: "Régénère l'UDP-glucose consommé par la GALT, permettant au cycle de continuer sans épuiser le stock.",
    },
  },
  {
    id: 'gal-e4',
    source: 'glucose1phosphate',
    target: 'g6p',
    ...autoHandles('glucose1phosphate', 'g6p'),
    type: 'enzyme',
    label: 'Phosphoglucomutase',
    data: {
      pathway: ['galactose', 'glycogenogenesis', 'glycogenolysis'],
      enzyme: 'Phosphoglucomutase',
      description: "Interconversion réversible G6P ⇌ G1P. Rejoint la glycolyse (voie du galactose), ou active le G1P vers l'UDP-glucose (glycogénogenèse), ou reçoit le G1P issu de la glycogène phosphorylase (glycogénolyse).",
    },
  },
]