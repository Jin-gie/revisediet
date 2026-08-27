'use client'
import { type LucideIcon } from 'lucide-react'
import { CircleHelp, Eye, EyeOff } from 'lucide-react'
import {
  SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { PopOver } from "@/components/pathways-graph/Popover"
import { type PathwayConfig, type Pathway } from '@/data//pathways-graph/types'

type PathwayGroupProps = {
  label: string
  icon: LucideIcon
  pathways: PathwayConfig[]
  active: Pathway[]
  toggle: (pathway: Pathway) => void
  toggleCategory: (pathways: Pathway[], enable: boolean) => void
}

export function PathwayGroup({ label, icon: Icon, pathways, active, toggle, toggleCategory }: PathwayGroupProps) {
  const categoryPathwayIds = pathways.map(p => p.id)
  const allActive = categoryPathwayIds.every(id => active.includes(id))
  const someActive = categoryPathwayIds.some(id => active.includes(id))

  return (
    <SidebarGroup>
      <SidebarGroupLabel style={{
        fontSize: 12,
        color: '#64748b',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '0 16px',
        marginBottom: 6,
        fontFamily: 'monospace',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 6,
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon size={12} />
          {label}
        </span>

        <button
          onClick={() => toggleCategory(categoryPathwayIds, !allActive)}
          title={allActive ? `Masquer ${label.toLowerCase()}` : `Afficher ${label.toLowerCase()}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            borderRadius: 4,
            border: 'none',
            background: 'transparent',
            color: someActive ? '#94a3b8' : '#475569',
            cursor: 'pointer',
            transition: 'color 0.15s ease, background 0.15s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)'
            e.currentTarget.style.color = '#f1f5f9'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = someActive ? '#94a3b8' : '#475569'
          }}
        >
          {allActive ? <Eye size={13} /> : <EyeOff size={13} />}
        </button>
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <FieldGroup className="flex flex-col gap-1 px-2">
          {pathways.map(pathway => {
            const isActive = active.includes(pathway.id)
            return (
              <Field
                key={pathway.id}
                orientation="horizontal"
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all"
                style={{
                  background: isActive ? pathway.badge : 'transparent',
                  border: `1px solid ${isActive ? pathway.glow : 'transparent'}`,
                }}
                onClick={() => toggle(pathway.id)}
              >
                {/* Indicateur couleur */}
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: isActive ? pathway.border : 'transparent',
                  border: `1.5px solid ${pathway.border}`,
                  boxShadow: isActive ? `0 0 6px 2px ${pathway.glow}` : 'none',
                  transition: 'all 0.2s ease',
                }} />

                <FieldLabel
                  htmlFor={pathway.id}
                  className="flex-1 cursor-pointer select-none"
                  style={{
                    fontSize: 14,
                    color: isActive ? '#f1f5f9' : '#475569',
                    fontWeight: isActive ? 500 : 400,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {pathway.label}
                </FieldLabel>

                <PopOver
                  trigger={
                    <span
                      onClick={e => e.stopPropagation()}
                      style={{
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px',
                        borderRadius: 4,
                        cursor: 'pointer',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#64748b')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#334155')}
                    >
                      <CircleHelp size={18} />
                    </span>
                  }
                  title={pathway.label}
                  description={pathway.description}
                />
              </Field>
            )
          })}
        </FieldGroup>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}