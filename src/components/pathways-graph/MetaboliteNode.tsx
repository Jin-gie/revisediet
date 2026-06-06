import { memo } from 'react'
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { type MetaboliteData } from '@/data/pathways-graph/types'
import { PATHWAYS, PATHWAYS_BY_ID, SHARED_COLOR } from '@/data/pathways-graph/pathways'
import { DESCRIPTION_BASE_STYLE, DescriptionToolTip, FormulaTooltip, LABEL_BASE_STYLE, LabelTooltip, TOOLTIP_BOX_BASE_STYLE, TOP_BAR_BASE_STYLE } from "./CustomTooltip"
import { NodeTooltip, NodeTooltipContent, NodeTooltipTrigger } from './node-tooltip'


export const MetaboliteNode = memo(({ data, selected }: NodeProps<Node<MetaboliteData>>) => {
  const isShared = data.pathways.length > 1;
  const colors = isShared ? SHARED_COLOR : PATHWAYS_BY_ID[data.pathways[0]];
  
  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 6px 1px ${colors.glow}; }
          50% { box-shadow: 0 0 14px 4px ${colors.glow}; }
        }
        .metabolite-node {
          animation: ${isShared ? 'pulse-glow 2.5s ease-in-out infinite' : 'none'};
        }
      `}</style>

      {/* HANDLES */}
      {/* Handles d'entrée */}
      <Handle type="target" position={Position.Top}    id="target-top"    />
      <Handle type="target" position={Position.Left}   id="target-left"   />
      <Handle type="target" position={Position.Right}  id="target-right"  />
      <Handle type="target" position={Position.Bottom} id="target-bottom" />

      {/* Handles de sortie */}
      <Handle type="source" position={Position.Bottom} id="source-bottom" />
      <Handle type="source" position={Position.Top}    id="source-top"    />
      <Handle type="source" position={Position.Left}   id="source-left"   />
      <Handle type="source" position={Position.Right}  id="source-right"  />


      <NodeTooltip>
        {/* Contenu du tooltip */}
        <NodeTooltipContent 
          colors={colors}
        >
          {/* Barre colorée en haut */}
          <div style={{
            ...TOP_BAR_BASE_STYLE,
            background: isShared
              ? `linear-gradient(90deg, ${data.pathways.map(p => PATHWAYS_BY_ID[p].border).join(', ')})`
              : colors.border,
          }} />

          <div style={{ ...TOOLTIP_BOX_BASE_STYLE, }}>
            {/* Label */}
            <LabelTooltip label={data.label} />

            {/* Formule chimique */}
            {data.formula &&
              <FormulaTooltip 
                colors={colors}
                formula={data.formula}
                hasDescription={!!data.description}
                isShared={isShared}
              />  
            }

            {/* Description */}
            {data.description && 
              <DescriptionToolTip
                description={data.description}
                isShared={isShared}
              />
            }

            {/* Badges pathways si partagé */}
            {isShared && (
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {data.pathways.map(p => (
                  <span key={p} style={{
                    fontSize: 9,
                    padding: '1px 6px',
                    borderRadius: 4,
                    background: PATHWAYS_BY_ID[p].badge,
                    color: PATHWAYS_BY_ID[p].text,
                    border: `1px solid ${PATHWAYS_BY_ID[p].border}`,
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {PATHWAYS_BY_ID[p]?.label ?? p}
                  </span>
                ))}
              </div>
            )}
          </div>
        </NodeTooltipContent>

        {/* Nœud */}
        <NodeTooltipTrigger>
          <div
            className="metabolite-node"
            style={{
              width: 160,
              background: 'rgba(15, 23, 42, 0.92)',
              border: `1.5px solid ${colors.border}`,
              borderRadius: 8,
              boxShadow: selected
                ? `0 0 0 2px ${colors.border}, 0 0 20px 4px ${colors.glow}`
                : `0 0 8px 1px ${colors.glow}`,
              backdropFilter: 'blur(8px)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            {/* Barre colorée en haut */}
            <div style={{
              height: 3,
              background: isShared
                ? `linear-gradient(90deg, ${data.pathways.map(p => PATHWAYS_BY_ID[p].border).join(', ')})`
                : colors.border,
            }} />

            {/* Label uniquement */}
            <div style={{
              padding: '8px 10px',
              fontSize: 12,
              fontWeight: 600,
              color: '#f1f5f9',
              lineHeight: 1.3,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {data.label}
            </div>
          </div>
        </NodeTooltipTrigger>
      </NodeTooltip>
    </>
  )
})

MetaboliteNode.displayName = 'MetaboliteNode'
