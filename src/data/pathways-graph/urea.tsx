import { type MetaboliteEdge } from "./types";
import { ureaOnlyMetabolites, metabolites } from "./metabolites";

export const ureaNodes = [
  // Métabolites partagés depuis metabolites.ts
  metabolites.oxaloacetate,
  metabolites.alphaketoglutarate,
  metabolites.fumarate,
  metabolites.nh4,
  // Métabolites propres au cycle de l'urée
  ...Object.values(ureaOnlyMetabolites),
]

export const ureaEdges: MetaboliteEdge[] = [
  {
    id: 'nh4-carbomyP',
    source: 'nh4',
    target: 'carbamoylphosphate',
    data: {pathway: 'urea'}
  },

  // ── Réaction 1 : OTC ──────────────────────────────────────────────────────
  // Carbamoyl-phosphate → junction_otc
  {
    id: 'urea-e1a',
    source: 'carbamoylphosphate',
    target: 'junction_otc',
    data: { pathway: 'urea' },
  },
  // Ornithine → junction_otc
  {
    id: 'urea-e1b',
    source: 'ornithine',
    target: 'junction_otc',
    sourceHandle: 'source-top',
    targetHandle: 'target-left',
    data: { pathway: 'urea' },
  },
  // junction_otc → Citrulline
  {
    id: 'urea-e1c',
    source: 'junction_otc',
    target: 'citrulline',
    type: 'enzyme',
    label: 'OTC',
    sourceHandle: "source-right",
    targetHandle: "target-left",
    data: { pathway: 'urea', enzyme: 'Ornithine transcarbamylase', cofactor: 'ATP' },
  },

  // ── Réaction 2 : ASS ──────────────────────────────────────────────────────
  // Citrulline → junction_ass
  {
    id: 'urea-e2a',
    source: 'citrulline',
    target: 'junction_ass',
    sourceHandle: "source-right",
    data: { pathway: 'urea' },
  },
  // Aspartate → junction_ass
  {
    id: 'urea-e2b',
    source: 'aspartate',
    target: 'junction_ass',
    sourceHandle: 'source-left',
    data: { pathway: 'urea' },
  },
  // junction_ass → Argininosuccinate
  {
    id: 'urea-e2c',
    source: 'junction_ass',
    target: 'argininosuccinate',
    type: 'enzyme',
    label: 'ASS',
    data: { pathway: 'urea', enzyme: 'Argininosuccinate synthétase', cofactor: 'ATP → AMP + PPi' },
  },

  // ── Réaction 3 : ASL ──────────────────────────────────────────────────────
  // Argininosuccinate → junction_asl
  {
    id: 'urea-e3a',
    source: 'argininosuccinate',
    target: 'junction_asl',
    data: { pathway: 'urea' },
  },
  // junction_asl → Arginine
  {
    id: 'urea-e3b',
    source: 'junction_asl',
    target: 'arginine',
    type: 'enzyme',
    label: 'ASL',
    targetHandle: 'target-right',
    data: { pathway: 'urea', enzyme: 'Argininosuccinate lyase' },
  },
  // junction_asl → Fumarate (jonction avec Krebs)
  {
    id: 'urea-e3c',
    source: 'junction_asl',
    target: 'fumarate',
    sourceHandle: 'source-right',
    targetHandle: 'target-left',
    data: { pathway: 'urea', enzyme: 'Argininosuccinate lyase', cofactor: '→ Krebs' },
  },

  // ── Réaction 4 : Arginase ─────────────────────────────────────────────────
  // Arginine → junction_arginase
  {
    id: 'urea-e4a',
    source: 'arginine',
    target: 'junction_arginase',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    data: { pathway: 'urea' },
  },
  // junction_arginase → Ornithine (bouclage)
  {
    id: 'urea-e4b',
    source: 'junction_arginase',
    target: 'ornithine',
    type: 'enzyme',
    label: 'Arginase',
    targetHandle: 'target-bottom',
    sourceHandle: 'source-left',
    data: { pathway: 'urea', enzyme: 'Arginase', cofactor: 'H₂O' },
  },
  // junction_arginase → Urée (produit final)
  {
    id: 'urea-e4c',
    source: 'junction_arginase',
    target: 'urea',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    data: { pathway: 'urea', enzyme: 'Arginase' },
  },

  // ── Jonction Krebs → Urée ─────────────────────────────────────────────────
  // Oxaloacétate → Aspartate (transamination)
  {
    id: 'urea-e5a',
    source: 'oxaloacetate',
    target: 'aspartate',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    type: 'enzyme',
    label: 'Transaminase',
    data: { pathway: 'urea', enzyme: 'Aspartate aminotransférase', cofactor: 'Glutamate → α-Cétoglutarate' },
  },
]