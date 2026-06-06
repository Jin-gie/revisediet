'use client'
import { type LucideIcon } from 'lucide-react'
import { CircleHelp } from 'lucide-react'
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
}

export function PathwayGroup({ label, icon: Icon, pathways, active, toggle }: PathwayGroupProps) {
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
        gap: 6,
      }}>
        <Icon size={12} />
        {label}
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