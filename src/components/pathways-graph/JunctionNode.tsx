import { memo } from 'react'
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { type JunctionData } from '@/data/pathways-graph/types'

export const JunctionNode = memo(({ }: NodeProps<Node<JunctionData>>) => {
  return (
    <div style={{ width: 1, height: 1, background: 'transparent', border: 'none' }}>
      <Handle type="target" position={Position.Top}    id="target-top"    />
      <Handle type="target" position={Position.Left}   id="target-left"   />
      <Handle type="target" position={Position.Right}  id="target-right"  />
      <Handle type="target" position={Position.Bottom} id="target-bottom" />
      <Handle type="source" position={Position.Bottom} id="source-bottom" />
      <Handle type="source" position={Position.Top}    id="source-top"    />
      <Handle type="source" position={Position.Left}   id="source-left"   />
      <Handle type="source" position={Position.Right}  id="source-right"  />
    </div>
  )
})
JunctionNode.displayName = 'JunctionNode'