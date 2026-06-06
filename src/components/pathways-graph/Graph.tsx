'use client'
import { Controls, ReactFlow } from '@xyflow/react'
import { getPathwayElements } from '@/data/pathways-graph'
import '@xyflow/react/dist/style.css'
import { MetaboliteNode } from './MetaboliteNode'
import { usePathways } from './Providers'
import { JunctionNode } from "./JunctionNode"
import { EnzymeEdge } from './EnzymeEdge'

const nodeTypes = {
  metabolite: MetaboliteNode,
  junction: JunctionNode,
}

const edgeTypes = {
  enzyme: EnzymeEdge,
}

const defaultEdgeOptions = {
  animated: false,   // ← flux animé sur tous les edges
}

export function Flow() {
  const {active} = usePathways();
  const { nodes, edges } = getPathwayElements(active)

  return (
    <div className="h-full w-full">
      {/* Graphe */}
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  )
}