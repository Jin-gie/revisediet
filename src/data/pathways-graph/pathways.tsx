import { Pathway, PathwayCategory, type PathwayConfig } from './types'

export const PATHWAYS: PathwayConfig[] = [
  {
    id: 'glycolysis',
    label: 'Glycolyse',
    category: 'glucides',
    description: '1 Glucose (6C) + 2 NAD+ + 2 ADP + 2 Pi → 2 pyruvate (3C) + 2 ATP + 2 H2O + 2 NADH, H+. Dégradation du glucose en pyruvate, produisant 2 ATP et 2 NADH. Se déroule dans le cytosol. Régulation par disponibilité des substrats (glucose), régulation allostérique par les produits (des réactions irréversibles, et ATP inhibe glycolyse, AMP la stimule), régulation hormonale (insuline - glucagon).',
    defaultEnabled: true,
    border: '#34d399',
    glow: 'rgba(52, 211, 153, 0.3)',
    badge: 'rgba(52, 211, 153, 0.15)',
    text: 'rgba(52, 211, 153, 1)',
  },
  {
    id: 'ngg',
    label: 'Néoglugogenèse',
    category: 'glucides',
    description: "2 pyruvate + 4 ATP + 2 GTP + 2 NADH,H+ + 6 H2O → glucose + 4 ADP + 2 GDP + 6 Pi + 2 NAD+. Permet la synthèse du glucose par l'organisme à partir de lactate (≈ 40%), d'acides aminés (alanine, glutamine ; ≈ 50%) ou glycérol. Plus coûteux que la glycolyse, donc intérêt à la faire que quand on en a vraiment besoin, d'où forte régulation. C'est une voie antagoniste à la glycolyse. A principalement lieu dans le foie et en moindre mesure dans les reins et l'intestin.",
    defaultEnabled: true,
    border: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.3)',
    badge: 'rgba(167, 139, 250, 0.15)',
    text: 'rgba(167, 139, 250, 1)',
  },
  {
    id: 'galactose',
    label: 'Galactose',
    category: 'glucides',
    description: "Utilisation du galactose, notamment pour la production d'ATP en rejoignant la glycolyse, stockage sous forme de glycogène.",
    defaultEnabled: true,
    border: '#22d3ee',   // cyan
    glow: 'rgba(34, 211, 238, 0.3)',
    badge: 'rgba(34, 211, 238, 0.15)',
    text: 'rgba(34, 211, 238, 1)',
  },
  {
    id: 'fructose',
    label: 'Fructose',
    category: 'glucides',
    description: "Apporté par les fruits et capté par le transporteur GLUT-5 au niveau des entérocytes de l'intestin grêle. La capture par les cellules est indépendante de l'insuline, contrairement à la capture du glucose. Le fructose peut servir à produire de l'énergie par la glycolyse, mise en réserve dans le glycogène, ou production d'acétyl-CoA (précurseur des AG).",
    defaultEnabled: true,
    border: '#f472b6',   // rose
    glow: 'rgba(244, 114, 182, 0.3)',
    badge: 'rgba(244, 114, 182, 0.15)',
    text: 'rgba(244, 114, 182, 1)',
  },
   {
    id: 'glycogenogenesis',
    label: 'Glycogénogenèse',
    category: 'glucides',
    description: "Synthèse du glycogène à partir du glucose-6-phosphate, principalement dans le foie et le muscle. Stimulée par l'insuline en période post-prandiale. Le glucose-1-phosphate est activé en UDP-glucose avant d'être ajouté à la chaîne de glycogène par la glycogène synthase.",
    defaultEnabled: true,
    border: '#4ade80',   // vert clair
    glow: 'rgba(74, 222, 128, 0.3)',
    badge: 'rgba(74, 222, 128, 0.15)',
    text: 'rgba(74, 222, 128, 1)',
  },
  {
    id: 'glycogenolysis',
    label: 'Glycogénolyse',
    category: 'glucides',
    description: "Dégradation du glycogène en glucose-1-phosphate par phosphorolyse (glycogène phosphorylase), stimulée par le glucagon et l'adrénaline. Dans le foie, aboutit à la libération de glucose libre dans le sang (glucose-6-phosphatase) ; dans le muscle, le G6P reste piégé et alimente directement la glycolyse locale.",
    defaultEnabled: true,
    border: '#facc15',   // jaune
    glow: 'rgba(250, 204, 21, 0.3)',
    badge: 'rgba(250, 204, 21, 0.15)',
    text: 'rgba(250, 204, 21, 1)',
  },
  {
    id: 'krebs',
    label: 'Cycle de Krebs',
    category: 'glucides',
    description: 'Cycle de l\'acide citrique. Oxydation de l\'acétyl-CoA en CO₂, produisant NADH, FADH₂ et GTP. Se déroule dans la matrice mitochondriale.',
    defaultEnabled: true,
    border: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.3)',
    badge: 'rgba(245, 158, 11, 0.15)',
    text: 'rgba(245, 158, 11, 1)',
  },
  {
    id: 'urea',
    label: 'Cycle de l\'urée',
    category: 'protides',
    description: 'Détoxification de l\'ammoniaque en urée. Se déroule entre le cytoplasme et la mitochondrie hépatique.',
    defaultEnabled: true,
    border: '#818cf8',
    glow: 'rgba(129, 140, 248, 0.3)',
    badge: 'rgba(129, 140, 248, 0.15)',
    text: 'rgba(129, 140, 248, 1)',
  },
  {
    id: 'betaoxydation',
    label: 'Bêta Oxydation',
    category: 'lipides',
    description: "Aussi appelée hélice de Lynen. Réctions en chaîne (qui se répètent) pour faire une dégradation oxydative complète, 2 carbones par 2 carbones, des acides gras en acétyl-CoA. Elle nécessite des coenzymes FAD et NAD+. Elle a lieu dans la matrice mitochrondriale, ce qui nécessite un transport préalable de l'AG du cytoplasme vers la mitochondrie grâce à la carnitine (AA). Au préalable il y a une activation de l'AG en acyl-CoA.",
    defaultEnabled: true,
    border: '#f87171',
    glow: 'rgba(248, 113, 113, 0.3)',
    badge: 'rgba(248, 113, 113, 0.15)',
    text: 'rgba(248, 113, 113, 1)',
  },
  {
    id: 'AGbiosynthesis',
    label: 'Biosynthèse des AG',
    category: 'lipides',
    description: 'Synthèse des acides gras à partir de l\'acétyl-CoA. Comprend la formation du malonyl-CoA (ACC), l\'hélice de Wakil (7 cycles) catalysée par l\'acide gras synthase, et l\'élongation par les élongases dans le REL.',
    defaultEnabled: true,
    border: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.3)',
    badge: 'rgba(56, 189, 248, 0.15)',
    text: 'rgba(56, 189, 248, 1)',
  },
]

export const SHARED_COLOR = {
  border: '#e879f9',
  glow: 'rgba(232, 121, 249, 0.4)',
  badge: 'rgba(232, 121, 249, 0.15)',
  text: '#e879f9',
}

export const PATHWAYS_BY_ID = Object.fromEntries(
  PATHWAYS.map(p => [p.id, p])
) as Record<Pathway, PathwayConfig>

export function getPathwaysByCategory(): Record<PathwayCategory, PathwayConfig[]> {
  return PATHWAYS.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {} as Record<PathwayCategory, PathwayConfig[]>)
}