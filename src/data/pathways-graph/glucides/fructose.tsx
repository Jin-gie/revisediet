// glucides/fructose.tsx

import { type MetaboliteEdge } from "../types";
import { fructoseOnlyMetabolites, metabolites } from "../metabolites";
import { autoHandles } from "../utils";

export const fructoseNodes = [
  metabolites.dhap,
  metabolites.glyceraldehyde3phosphate,
  ...Object.values(fructoseOnlyMetabolites),
]

export const fructoseEdges: MetaboliteEdge[] = [
  {
    id: 'fru-e1',
    source: 'fructose',
    target: 'fructose1phosphate',
    ...autoHandles('fructose', 'fructose1phosphate'),
    type: 'enzyme',
    label: 'Fructokinase',
    data: {
      pathway: ['fructose'],
      enzyme: 'Fructokinase (cétohexokinase)',
      cofactor: 'ATP → ADP',
      description: "Réaction hépatique, indépendante de la PFK-1 : contourne le principal point de régulation de la glycolyse (« porte dérobée »), ce qui explique la conversion rapide du fructose en graisse en cas d'excès.",
      reversible: false,
    },
  },
  {
    id: 'fru-e2a',
    source: 'fructose1phosphate',
    target: 'junction_aldolaseB',
    type: 'enzyme',
    label: 'Aldolase B',
    ...autoHandles('fructose1phosphate', 'junction_aldolaseB'),
    data: { 
      pathway: ['fructose'],
      enzyme: 'Aldolase B (fructose-1-phosphate aldolase)',
      description: "Clive le fructose-1-phosphate en DHAP et glycéraldéhyde. Spécifique du foie (isoforme différente de l'aldolase A de la glycolyse musculaire).",
    },
  },
  {
    id: 'fru-e2b',
    source: 'junction_aldolaseB',
    target: 'dhap',
    ...autoHandles('junction_aldolaseB', 'dhap'),
    label: 'Aldolase B',
    data: {
      pathway: ['fructose'],
      reversible: false,
    },
  },
  {
    id: 'fru-e2c',
    source: 'junction_aldolaseB',
    target: 'glyceraldehyde',
    ...autoHandles('junction_aldolaseB', 'glyceraldehyde'),
    data: {
      pathway: ['fructose'],
      reversible: false,
    },
  },
  {
    id: 'fru-e3',
    source: 'glyceraldehyde',
    target: 'glyceraldehyde3phosphate',
    ...autoHandles('glyceraldehyde', 'glyceraldehyde3phosphate'),
    type: 'enzyme',
    label: 'Triose kinase',
    data: {
      pathway: ['fructose'],
      enzyme: 'Triose kinase',
      cofactor: 'ATP → ADP',
      description: "Phosphoryle le glycéraldéhyde en glycéraldéhyde-3-phosphate (GAP), qui rejoint la glycolyse.",
      reversible: false,
    },
  },
]