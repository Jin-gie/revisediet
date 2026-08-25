// glucides/glycogen.tsx

import { type MetaboliteEdge } from "../types";
import { glycogenOnlyMetabolites, galactoseOnlyMetabolites, metabolites } from "../metabolites";
import { autoHandles } from "../utils";

export const glycogenNodes = [
  metabolites.g6p,
  metabolites.glucose,
  galactoseOnlyMetabolites.glucose1phosphate,
  galactoseOnlyMetabolites.udpglucose,
  ...Object.values(glycogenOnlyMetabolites),
]

export const glycogenEdges: MetaboliteEdge[] = [

  // ── Glycogénogenèse ────────────────────────────────────────────────────────
  {
    id: 'glyc-syn-e1',
    source: 'glucose1phosphate',
    target: 'udpglucose',
    ...autoHandles('glucose1phosphate', 'udpglucose'),
    type: 'enzyme',
    label: 'UDP-glucose pyrophosphorylase',
    data: {
      pathway: ['glycogenogenesis'],
      enzyme: 'UDP-glucose pyrophosphorylase',
      cofactor: 'UTP → PPi',
      description: "Active le glucose-1-phosphate en UDP-glucose, donneur de glucose pour la glycogène synthase. L'hydrolyse du PPi rend la réaction pratiquement irréversible.",
      reversible: false,
    },
  },
  {
    id: 'glyc-syn-e2',
    source: 'udpglucose',
    target: 'glycogen',
    ...autoHandles('udpglucose', 'glycogen'),
    type: 'enzyme',
    label: 'Glycogène synthase',
    data: {
      pathway: ['glycogenogenesis'],
      enzyme: 'Glycogène synthase',
      description: "Étape régulatrice clé, irréversible. Ajoute le glucose de l'UDP-glucose en liaison α-1,4 sur une chaîne de glycogène préexistante (amorcée par la glycogénine). Activée par l'insuline, inhibée par le glucagon/adrénaline (via phosphorylation).",
      reversible: false,
    },
  },

  // ── Glycogénolyse ─────────────────────────────────────────────────────────
  {
    id: 'glyc-deg-e1',
    source: 'glycogen',
    target: 'glucose1phosphate',
    ...autoHandles('glycogen', 'glucose1phosphate'),
    type: 'enzyme',
    label: 'Glycogène phosphorylase',
    data: {
      pathway: ['glycogenolysis'],
      enzyme: 'Glycogène phosphorylase',
      cofactor: 'Pi',
      description: "Phosphorolyse (pas d'hydrolyse) des liaisons α-1,4, libérant du glucose-1-phosphate sans consommer d'ATP. Étape régulatrice clé, activée par le glucagon/adrénaline (cascade des kinases), inhibée par l'insuline. Les points de branchement α-1,6 nécessitent une enzyme débranchante additionnelle.",
      reversible: false,
    },
  },
]