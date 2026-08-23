import { type Pathway, type MetaboliteNode, type MetaboliteEdge } from './types'
import { glycolysisNodes, glycolysisEdges } from './glucides/glycolysis'
import { krebsNodes, krebsEdges } from './glucides/krebs'
import { ureaNodes, ureaEdges } from './protides/urea'
import { betaoxydationEdges, betaoxydationNodes } from './lipides/betaoxydation'
import { AGbiosynthesisEdges, AGbiosynthesisNodes } from './lipides/agbiosynthesis'
import { nggEdges, nggNodes } from './glucides/ngg'

// Dédoublonnage des nœuds par id (un métabolite partagé ne doit apparaître qu'une fois)
function deduplicateNodes(nodes: MetaboliteNode[]): MetaboliteNode[] {
  return [...new Map(nodes.map(n => [n.id, n])).values()]
}

const allNodes = deduplicateNodes([
  ...glycolysisNodes, 
  ...krebsNodes, 
  ...ureaNodes,
  ...betaoxydationNodes,
  ...AGbiosynthesisNodes,
  ...nggNodes
])

const allEdges: MetaboliteEdge[] = [
  ...glycolysisEdges, 
  ...krebsEdges, 
  ...ureaEdges,
  ...betaoxydationEdges,
  ...AGbiosynthesisEdges,
  ...nggEdges
]

export function getPathwayElements(active: Pathway[]) {
  // Un nœud est visible si AU MOINS UN de ses pathways est actif
  const nodes = allNodes.filter(n =>
    n.data.pathways.some(p => active.includes(p))
  )
  const nodeIds = new Set(nodes.map(n => n.id))

  // Un edge est visible si son pathway est actif ET ses deux nœuds sont visibles
  const edges = allEdges.filter(e =>
    e.data && active.includes(e.data.pathway) &&
    nodeIds.has(e.source) &&
    nodeIds.has(e.target)
  )

  return { nodes, edges }
}

export type SourcePosition = 'source-top' | 'source-bottom' | 'source-left' | 'source-right';
export type TargetPosition = 'target-top' | 'target-bottom' | 'target-left' | 'target-right';

