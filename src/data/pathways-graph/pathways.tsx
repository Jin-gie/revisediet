import { Pathway, PathwayCategory, type PathwayConfig } from './types'

export const PATHWAYS: PathwayConfig[] = [
  {
    id: 'glycolysis',
    label: 'Glycolyse',
    category: 'glucides',
    description: '1 Glucose (6C) + 2 NAD+ + 2 ADP + 2 Pi → 2 pyruvate (3C) + 2 ATP + 2 H2O + 2 NADH, H+. Dégradation du glucose en pyruvate, produisant 2 ATP et 2 NADH. Se déroule dans le cytoplasme.',
    defaultEnabled: true,
    border: '#34d399',  // vert émeraude
    glow: 'rgba(52, 211, 153, 0.3)',
    badge: 'rgba(52, 211, 153, 0.15)',
    text: 'rgba(52, 211, 153, 1)',
  },
  {
    id: 'ngg',
    label: 'Néoglugogenèse',
    category: 'glucides',
    description: "2 pyruvate + 4 ATP + 2 GTP + 2 NADH,H+ + 6 H2O → glucose + 4 ADP + 2 GDP + 6 Pi + 2 NAD+. Permet la synthèse du glucose par l'organisme à partir de lactate, d'acides aminés (alanine, glutamine) ou glycérol. Plus coûteux que la glycolyse, donc intérêt à la faire que quand on en a vraiment besoin, d'où forte régulation. C'est une voie antagoniste à la glycolyse.",
    defaultEnabled: true,
    border: '#a78bfa',  // violet
    glow: 'rgba(167, 139, 250, 0.3)',
    badge: 'rgba(167, 139, 250, 0.15)',
    text: 'rgba(167, 139, 250, 1)',
  },
  {
    id: 'krebs',
    label: 'Cycle de Krebs',
    category: 'glucides',
    description: 'Cycle de l\'acide citrique. Oxydation de l\'acétyl-CoA en CO₂, produisant NADH, FADH₂ et GTP. Se déroule dans la matrice mitochondriale.',
    defaultEnabled: true,
    border: '#f59e0b',  // ambre
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
    border: '#818cf8',  // indigo
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
    border: '#f87171',  // rouge corail
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
    border: '#38bdf8',   // bleu ciel
    glow: 'rgba(56, 189, 248, 0.3)',
    badge: 'rgba(56, 189, 248, 0.15)',
    text: 'rgba(56, 189, 248, 1)',
  },
]

export const SHARED_COLOR = {
  border: '#e879f9',   // rose/fuchsia pour les métabolites partagés
  glow: 'rgba(232, 121, 249, 0.4)',
  badge: 'rgba(232, 121, 249, 0.15)',
  text: '#e879f9',
}

// Accès rapide par id si besoin
export const PATHWAYS_BY_ID = Object.fromEntries(
  PATHWAYS.map(p => [p.id, p])
) as Record<Pathway, PathwayConfig>

// Groupement par catégorie, dans l'ordre où les catégories apparaissent dans PATHWAYS
export function getPathwaysByCategory(): Record<PathwayCategory, PathwayConfig[]> {
  return PATHWAYS.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {} as Record<PathwayCategory, PathwayConfig[]>)
}