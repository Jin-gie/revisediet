import { Colors } from "@/data/pathways-graph/types"

/* COMMON STYLES ------------------------------------------------------------ */
export const TOP_BAR_BASE_STYLE = {
  height: 3,
}

export const TOOLTIP_BOX_BASE_STYLE = {
  padding: '8px 10px 10px',
}

export const LABEL_BASE_STYLE = {
  fontSize: 13,
  fontWeight: 600,
  color: '#f1f5f9',
  lineHeight: 1.3,
  marginBottom: 4,
  fontFamily: "'DM Sans', sans-serif",
}

export const DESCRIPTION_BASE_STYLE = {
  fontSize: 13,
  color: '#c1c4c9',
  fontFamily: "'DM Sans', sans-serif",
  marginTop: 4,
}

export const getToolbarBaseStyle = (colors: Colors) => ({
  background: 'rgba(2, 8, 23, 0.97)',
  borderRadius: 8,
  padding: 0,
  overflow: 'hidden',
  maxWidth: 300,
  minWidth: 160,
  width: 'max-content',
  border: `1px solid ${colors.border}`,
  boxShadow: `0 0 12px 2px ${colors.glow}`,
})


export const LabelTooltip = ({label}: {label:string}) => {
  return (
    <div style={{...LABEL_BASE_STYLE}}>
      {label}
    </div>
  )
}

export const FormulaTooltip = ({
  formula, colors, isShared, hasDescription
} : {
  formula : string,
  colors : Colors,
  isShared: boolean,
  hasDescription: boolean
}) => {
  return (
    <div style={{
      fontSize: 12,
      color: colors.text,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      opacity: 0.9,
      letterSpacing: '0.02em',
      marginBottom: isShared || hasDescription ? 6 : 0,
    }}>
      {formula}
    </div>
)}

export const DescriptionToolTip = ({
  description, isShared
}: {
  description: string,
  isShared: boolean
}) => {
  return (
    <div style={{
      ...DESCRIPTION_BASE_STYLE,
      marginBottom: isShared ? 6 : 0,
    }}>
      {description}
    </div>
  )
}