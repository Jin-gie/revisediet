import { type MetaboliteEdge } from "./types";
import { betaoxydationOnlyMetabolites, metabolites } from "./metabolites";

export const betaoxydationNodes = [
  // Métabolites partagés depuis metabolites.ts
  metabolites.acetylcoa,
  // Métabolites propres à la bêta-oxydation
  ...Object.values(betaoxydationOnlyMetabolites),
]

export const betaoxydationEdges: MetaboliteEdge[] = [

  // ── Activation de l'acide gras ────────────────────────────────────────────

  {
    id: 'beta-e1',
    source: 'fattyacid',
    target: 'acylcoa',
    label: 'Acyl-CoA synthétase',
    type: 'enzyme',
    data: {
      pathway: 'betaoxydation',
      enzyme: 'Acyl-CoA synthétase',
      cofactor: 'ATP + CoA → AMP + PPi',
      description: 'Activation de l\'acide gras en acyl-CoA dans le cytoplasme. Nécessite le transport vers la mitochondrie via la carnitine.',
    },
  },

  // ── Tour 1 du cycle ───────────────────────────────────────────────────────

  // Étape 1 : Oxydation → trans-Δ2-énoyl-CoA
  {
    id: 'beta-e2',
    source: 'acylcoa',
    target: 'trans2enoylcoa',
    label: 'Acyl-CoA DH',
    type: 'enzyme',
    sourceHandle: 'source-right',
    targetHandle: 'target-top',
    data: {
      pathway: 'betaoxydation',
      enzyme: 'Acyl-CoA déshydrogénase',
      cofactor: 'FAD → FADH₂',
      ecNumber: 'EC 1.3.99.3',
    },
  },

  // Étape 2 : Hydratation → L-3-hydroxyacyl-CoA
  {
    id: 'beta-e3',
    source: 'trans2enoylcoa',
    target: 'hydroxyacylcoa',
    label: 'Énoyl-CoA hydratase',
    type: 'enzyme',
    data: {
      pathway: 'betaoxydation',
      enzyme: 'Énoyl-CoA hydratase',
      cofactor: 'H₂O',
      ecNumber: 'EC 4.2.1.17',
    },
  },

  // Étape 3 : Oxydation → 3-cétoacyl-CoA
  {
    id: 'beta-e4',
    source: 'hydroxyacylcoa',
    target: 'ketoacylcoa',
    label: 'L-β-hydroxyacyl-CoA DH',
    type: 'enzyme',
    sourceHandle: 'source-bottom',
    targetHandle: 'target-right',
    data: {
      pathway: 'betaoxydation',
      enzyme: 'L-β-hydroxyacyl-CoA déshydrogénase',
      cofactor: 'NAD⁺ → NADH',
      ecNumber: 'EC 1.1.1.35',
    },
  },

  // Étape 4 : Thiolyse → acétyl-CoA + acyl-CoA (n-2)
  // 3-cétoacyl-CoA → junction_thiolase
  {
    id: 'beta-e5a',
    source: 'ketoacylcoa',
    target: 'junction_thiolase',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    data: { pathway: 'betaoxydation' },
  },
  // junction_thiolase → acétyl-CoA (vers Krebs)
  {
    id: 'beta-e5b',
    source: 'junction_thiolase',
    target: 'acetylcoa',
    label: 'Thiolase',
    type: 'enzyme',
    sourceHandle: 'source-left',
    targetHandle: 'target-right',
    data: {
      pathway: 'betaoxydation',
      enzyme: 'Thiolase (acyl-CoA acétyltransférase)',
      cofactor: 'CoA',
      ecNumber: 'EC 2.3.1.16',
      description: 'Clivage thiolytique libérant un acétyl-CoA et un acyl-CoA raccourci de 2 carbones.',
    },
  },
  // junction_thiolase → acyl-CoA (n-2) (rebouclage)
  {
    id: 'beta-e5c',
    source: 'junction_thiolase',
    target: 'acylcoa_shortened',
    label: 'Thiolase',
    type: 'enzyme',
    sourceHandle: 'source-left',
    targetHandle: 'target-bottom',
    data: {
      pathway: 'betaoxydation',
      enzyme: 'Thiolase (acyl-CoA acétyltransférase)',
      cofactor: 'CoA',
    },
  },

  // ── Rebouclage du cycle ───────────────────────────────────────────────────

  {
    id: 'beta-e6',
    source: 'acylcoa_shortened',
    target: 'acylcoa',
    type: 'enzyme',
    label: 'Tour suivant',
    sourceHandle: 'source-top',
    targetHandle: 'target-left',
    data: {
      pathway: 'betaoxydation',
      description: 'L\'acyl-CoA raccourci de 2 carbones repart dans un nouveau cycle de bêta-oxydation jusqu\'à épuisement complet de la chaîne.',
    },
  },
]