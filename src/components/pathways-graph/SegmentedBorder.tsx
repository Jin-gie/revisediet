// SegmentedBorder.tsx

'use client'
import { useEffect, useRef, useState } from 'react'

type SegmentedBorderProps = {
  colors: string[]       // une couleur par pathway actif, dans l'ordre à afficher
  strokeWidth?: number
  radius?: number
}

// Dessine le contour d'un rectangle arrondi divisé en N arcs égaux,
// un par couleur fournie. Se pose en overlay absolu par-dessus le nœud.
export function SegmentedBorder({ colors, strokeWidth = 1.5, radius = 8 }: SegmentedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(entries => {
      const entry = entries[0]
      if (entry) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const n = colors.length

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {size && n > 0 && (() => {
        const { width: w, height: h } = size
        // Le stroke reste entièrement à l'intérieur de la box pour ne pas
        // être coupé par l'overflow:hidden du nœud parent.
        const inset = strokeWidth
        const rectW = Math.max(w - inset * 2, 0)
        const rectH = Math.max(h - inset * 2, 0)
        const r = Math.max(Math.min(radius - inset, rectW / 2, rectH / 2), 0)

        // Périmètre exact d'un rectangle aux coins arrondis
        const total = 2 * (rectW - 2 * r) + 2 * (rectH - 2 * r) + 2 * Math.PI * r
        const segLen = total / n

        return (
          <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {colors.map((color, i) => (
              <rect
                key={i}
                x={inset}
                y={inset}
                width={rectW}
                height={rectH}
                rx={r}
                ry={r}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segLen} ${total - segLen}`}
                strokeDashoffset={-i * segLen}
              />
            ))}
          </svg>
        )
      })()}
    </div>
  )
}