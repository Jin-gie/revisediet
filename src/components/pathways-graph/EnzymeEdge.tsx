// EnzymeEdge.tsx

'use client'
import { memo, useState, useRef } from 'react'
import {
  useReactFlow,
  BaseEdge, EdgeLabelRenderer, getBezierPath,
  type EdgeProps, type Edge,
} from '@xyflow/react'
import { type MetaboliteEdgeData } from '@/data/pathways-graph/types'
import {
  TOP_BAR_BASE_STYLE, TOOLTIP_BOX_BASE_STYLE,
  getToolbarBaseStyle, LabelTooltip, DescriptionToolTip,
} from './CustomTooltip'

export const EnzymeEdge = memo(({
  id,
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
  data,
  label,
  style,
}: EdgeProps<Edge<MetaboliteEdgeData>>) => {
  const [visible, setVisible] = useState(false)
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { getZoom } = useReactFlow()
  const zoom = getZoom()

  const [defaultPath, defaultLabelX, defaultLabelY] = getBezierPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  })

  // Décalage manuel optionnel du label, défini dans data.labelOffset
  const offsetX = data?.labelOffset?.x ?? 0
  const offsetY = data?.labelOffset?.y ?? 0
  const hasOffset = offsetX !== 0 || offsetY !== 0

  const waypointX = defaultLabelX + offsetX
  const waypointY = defaultLabelY + offsetY

  let edgePath = defaultPath
  let labelX = defaultLabelX
  let labelY = defaultLabelY

  if (hasOffset) {
    const controlX = 2 * waypointX - 0.5 * (sourceX + targetX)
    const controlY = 2 * waypointY - 0.5 * (sourceY + targetY)

    edgePath = `M ${sourceX},${sourceY} Q ${controlX},${controlY} ${targetX},${targetY}`
    labelX = waypointX
    labelY = waypointY
  }

  const reversible = data?.reversible ?? true
  const markerId = `enzyme-arrow-end-${id}`
  const markerStartId = `enzyme-arrow-start-${id}`

  const ENZYME_COLORS = {
    border: '#64748b',                    // slate-500 au lieu de #334155
    glow: 'rgba(100, 116, 139, 0.3)',
    badge: 'rgba(100, 116, 139, 0.15)',
    text: '#cbd5e1',  
  }

  function show() {
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    setVisible(true)
  }
  function hide() {
    hideTimeout.current = setTimeout(() => setVisible(false), 150)
  }

  return (
    <>
      {/* Définitions des flèches, propres à cet edge (ids uniques) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
          </marker>
          {reversible && (
            <marker
              id={markerStartId}
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          )}
        </defs>
      </svg>

      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={`url(#${markerId})`}
        markerStart={reversible ? `url(#${markerStartId})` : undefined}
        style={{
          stroke: '#64748b',
          strokeWidth: 1.5,
          ...style,
        }}
      />

      <EdgeLabelRenderer>
        <div 
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
            zIndex: visible ? 9999 : 1,
          }}
          className="nopan nodrag nowheel" 
          onMouseEnter={show} 
          onMouseLeave={hide}
        >

          {/* Label enzyme — gris */}
          {label && (
            <div style={{
              fontSize: 11,
              padding: '2px 7px',
              borderRadius: 4,
              background: 'rgba(2, 8, 23, 0.9)',
              border: `1px solid #64748b`,
              color: '#cbd5e1',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.02em',
              cursor: 'default',
              whiteSpace: 'nowrap',
            }}>
              {label as string}
            </div>
          )}

          {/* Tooltip — gris */}
          {visible && data && (data.enzyme || data.cofactor || data.description) && (
            <div
              style={{
                position: 'absolute',
                left: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                marginLeft: 8,
                transformOrigin: 'left center',
                scale: `${1 / zoom}`, // annule le zoom du viewport
                cursor: 'text',
                ...getToolbarBaseStyle(ENZYME_COLORS),
              }}
              className="nopan nodrag nowheel select-text"
              onMouseEnter={show}
              onMouseLeave={hide}
            >
              <div style={{
                ...TOP_BAR_BASE_STYLE,
                background: `repeating-linear-gradient(
                  90deg,
                  #64748b 0px, #64748b 6px,
                  transparent 6px, transparent 10px
                )`,
              }} />

              {/* Badge enzyme */}
              <div style={{ ...TOOLTIP_BOX_BASE_STYLE }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 10,
                  padding: '1px 6px',
                  borderRadius: 4,
                  background: ENZYME_COLORS.badge,
                  color: ENZYME_COLORS.text,
                  border: `1px solid ${ENZYME_COLORS.border}`,
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 6,
                }}>
                  ⚗ enzyme
                </div>

                {data.enzyme && <LabelTooltip label={data.enzyme} />}

                {data.ecNumber && (
                  <div style={{
                    fontSize: 12,
                    color: ENZYME_COLORS.text,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    opacity: 0.8,
                    letterSpacing: '0.02em',
                    marginBottom: data.cofactor ? 4 : 0,
                  }}>
                    {data.ecNumber}
                  </div>
                )}

                {data.cofactor && (
                  <div style={{
                    fontSize: 12,
                    color: ENZYME_COLORS.text,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    opacity: 0.9,
                    letterSpacing: '0.02em',
                    borderTop: `1px solid #334155`,
                    paddingTop: 6,
                    marginTop: 4,
                  }}>
                    {data.cofactor}
                  </div>
                )}

                {data.description && (
                  <DescriptionToolTip description={data.description} isShared={false} />
                )}
              </div>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  )
})

EnzymeEdge.displayName = 'EnzymeEdge'