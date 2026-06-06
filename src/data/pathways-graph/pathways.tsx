import { Pathway, type PathwayConfig } from './types'

export const PATHWAYS: PathwayConfig[] = [
  {
    id: 'glycolysis',
    label: 'Glycolyse',
    description: 'Dégradation du glucose en pyruvate, produisant 2 ATP et 2 NADH. Se déroule dans le cytoplasme.',
    defaultEnabled: true,
    border: '#34d399',  // vert émeraude
    glow: 'rgba(52, 211, 153, 0.3)',
    badge: 'rgba(52, 211, 153, 0.15)',
    text: 'rgba(52, 211, 153, 1)',
  },
  {
    id: 'krebs',
    label: 'Cycle de Krebs',
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
    description: "Aussi appelée hélice de Lynen. Réctions en chaîne (qui se répètent) pour faire une dégradation oxydative complète, 2 carbones par 2 carbones, des acides gras en acétyl-CoA. Elle nécessite des coenzymes FAD et NAD+. Elle a lieu dans la matrice mitochrondriale, ce qui nécessite un transport préalable de l'AG du cytoplasme vers la mitochondrie grâce à la carnitine (AA). Au préalable il y a une activation de l'AG en acyl-CoA.",
    defaultEnabled: true,
    border: '#f87171',  // rouge corail
    glow: 'rgba(248, 113, 113, 0.3)',
    badge: 'rgba(248, 113, 113, 0.15)',
    text: 'rgba(248, 113, 113, 1)',
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