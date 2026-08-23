// lipides/agbiosynthesis.tsx

import { type MetaboliteEdge } from "../types";
import { AGbiosynthesisOnlyMetabolites, metabolites } from "../metabolites";

export const AGbiosynthesisNodes = [
  metabolites.acetylcoa,
  ...Object.values(AGbiosynthesisOnlyMetabolites),
]

export const AGbiosynthesisEdges: MetaboliteEdge[] = [

  {
    id: 'bio-e1',
    source: 'acetylcoa',
    target: 'junction_acc',
    type: 'enzyme',
    label: 'ACC',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'Acétyl-CoA carboxylase (ACC)',
      ecNumber: 'EC 6.4.1.2',
      cofactor: 'ATP + CO₂ + Biotine (vitamine B8)',
      description: 'Étape régulatrice et irréversible. Addition d\'un groupement carboxyle (-COOH) sur l\'acétyl-CoA. Inhibée par le glucagon et les acides gras ; activée par l\'insuline et le citrate.',
      reversible: false,
    },
  },
  {
    id: 'bio-e1b',
    source: 'junction_acc',
    target: 'malonylcoa',
    type: 'enzyme',
    label: '',
    data: { pathway: 'AGbiosynthesis', reversible: false },
  },

  {
    id: 'bio-e2a',
    source: 'junction_acc',
    target: 'acetyl_ec',
    type: 'enzyme',
    label: 'Acyl transférase',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'Acyl transférase',
      description: 'Transfert de l\'acétyl-CoA sur le site EC (enzyme de condensation) de l\'acide gras synthase.',
    },
  },
  {
    id: 'bio-e2b',
    source: 'malonylcoa',
    target: 'malonyl_acp',
    type: 'enzyme',
    label: 'Acyl transférase',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'Acyl transférase',
      description: 'Transfert du groupement malonyl du CoA vers l\'ACP (protéine de transport d\'acyle, liée à la vitamine B5 — acide pantothénique).',
    },
  },

  {
    id: 'bio-e3a',
    source: 'acetyl_ec',
    target: 'junction_condensation',
    data: { pathway: 'AGbiosynthesis' },
  },
  {
    id: 'bio-e3b',
    source: 'malonyl_acp',
    target: 'junction_condensation',
    data: { pathway: 'AGbiosynthesis' },
  },
  {
    id: 'bio-e3c',
    source: 'junction_condensation',
    target: 'ketoacyl_acp',
    type: 'enzyme',
    label: 'EC (condensation)',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'Enzyme de condensation (EC) — β-cétoacyl-ACP synthase',
      ecNumber: 'EC 2.3.1.41',
      description: 'Condensation de l\'acétyl-EC et du malonyl-ACP avec décarboxylation (libération CO₂). Addition nette de 2 carbones à la chaîne.',
      reversible: false,
    },
  },

  {
    id: 'bio-e4',
    source: 'ketoacyl_acp',
    target: 'hydroxyacyl_acp',
    type: 'enzyme',
    label: 'β-cétoacyl réductase',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'β-cétoacyl-ACP réductase',
      ecNumber: 'EC 1.1.1.100',
      cofactor: 'NADPH → NADP⁺',
      description: 'Réduction de la fonction cétone en hydroxyle. Produit le stéréoisomère D (à l\'inverse de la β-oxydation qui produit le L).',
    },
  },

  {
    id: 'bio-e5',
    source: 'hydroxyacyl_acp',
    target: 'enoyl_acp',
    type: 'enzyme',
    label: 'Déshydratase',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'β-hydroxyacyl-ACP déshydratase',
      ecNumber: 'EC 4.2.1.59',
      description: 'Déshydratation : élimination d\'eau et formation d\'une double liaison trans en Δ2.',
    },
  },

  {
    id: 'bio-e6',
    source: 'enoyl_acp',
    target: 'acyl_acp',
    type: 'enzyme',
    label: 'Énoyl réductase',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'Énoyl-ACP réductase',
      ecNumber: 'EC 1.3.1.9',
      cofactor: 'NADPH → NADP⁺',
      description: 'Réduction de la double liaison. Chaîne saturée allongée de 2 carbones. Fin d\'un cycle de l\'hélice de Wakil.',
    },
  },

  {
    id: 'bio-e7a',
    source: 'acyl_acp',
    target: 'junction_wakil_loop',
    type: 'enzyme',
    label: 'Acyl transférase',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'Acyl transférase',
      description: 'L\'acyl-ACP est transféré sur le site EC de l\'autre sous-unité de l\'AG synthase. Un nouveau malonyl-CoA se fixe sur l\'ACP pour débuter un nouveau cycle.',
    },
  },
  {
    id: 'bio-e7b',
    source: 'junction_wakil_loop',
    target: 'ketoacyl_acp',
    type: 'enzyme',
    label: '× 7 cycles',
    data: {
      pathway: 'AGbiosynthesis',
      description: '7 cycles au total pour obtenir le palmityl-ACP (C16). Bilan par cycle : 1 malonyl-CoA + 2 NADPH consommés.',
      reversible: false,
    },
  },

  {
    id: 'bio-e8a',
    source: 'acyl_acp',
    target: 'palmityl_acp',
    data: {
      pathway: 'AGbiosynthesis',
      description: 'Après 7 cycles, l\'acyl-ACP correspond au palmityl-ACP (C16:0).',
    },
  },
  {
    id: 'bio-e8b',
    source: 'palmityl_acp',
    target: 'junction_thioesterase',
    data: { pathway: 'AGbiosynthesis' },
  },
  {
    id: 'bio-e8c',
    source: 'junction_thioesterase',
    target: 'palmiticacid',
    type: 'enzyme',
    label: 'Palmityl thioestérase',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'Palmityl thioestérase',
      ecNumber: 'EC 3.1.2.14',
      description: 'Hydrolyse la liaison thioester entre le palmityl et l\'ACP. Libère l\'acide palmitique (C16:0) libre. Met fin à l\'action de l\'acide gras synthase.',
      reversible: false,
    },
  },

  {
    id: 'bio-e9a',
    source: 'palmiticacid',
    target: 'junction_elongase_1',
    data: { pathway: 'AGbiosynthesis' },
  },
  {
    id: 'bio-e9b',
    source: 'junction_elongase_1',
    target: 'stearicacid',
    type: 'enzyme',
    label: 'Élongase (REL)',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'Élongase (ELOVL)',
      cofactor: 'Malonyl-CoA (+2C) + 2 NADPH',
      description: 'Allongement dans le réticulum endoplasmique lisse (principalement). Les 2C proviennent du malonyl-CoA. Peut aussi se produire dans la mitochondrie (acétyl-CoA).',
      reversible: false,
    },
  },
  {
    id: 'bio-e10a',
    source: 'stearicacid',
    target: 'junction_elongase_2',
    data: { pathway: 'AGbiosynthesis' },
  },
  {
    id: 'bio-e10b',
    source: 'junction_elongase_2',
    target: 'arachidicacid',
    type: 'enzyme',
    label: 'Élongase (REL)',
    data: {
      pathway: 'AGbiosynthesis',
      enzyme: 'Élongase (ELOVL)',
      cofactor: 'Malonyl-CoA (+2C) + 2 NADPH',
      description: 'Deuxième élongation dans le REL. Produit l\'acide arachidique (C20:0).',
      reversible: false,
    },
  },
]