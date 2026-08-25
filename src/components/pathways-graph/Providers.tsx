'use client'
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { PATHWAYS, getPathwaysByCategory } from '@/data/pathways-graph/pathways'
import { type Pathway, type PathwayCategory } from '@/data/pathways-graph/types'
import { useState, createContext, useContext } from "react"
import { Beef, Candy, Droplets, PanelLeftClose, PanelLeftOpen, type LucideIcon } from "lucide-react"
import { PathwayGroup } from "./GraphSidebarPathwayGroup"


type PathwayContextType = {
  active: Pathway[]
  toggle: (pathway: Pathway) => void
  toggleCategory: (pathways: Pathway[], enable: boolean) => void
}

export const PathwayContext = createContext<PathwayContextType>({
  active: PATHWAYS.filter(p => p.defaultEnabled).map(p => p.id),
  toggle: () => {},
  toggleCategory: () => {},
})

export function usePathways() {
  const ctx = useContext(PathwayContext)
  if (!ctx) throw new Error('usePathways must be used within Providers')
  return ctx
}

const CATEGORY_CONFIG: Record<PathwayCategory, { label: string; icon: LucideIcon }> = {
  glucides: { label: 'Glucides', icon: Candy },
  lipides: { label: 'Lipides', icon: Droplets },
  protides: { label: 'Protides', icon: Beef },
}

function SidebarToggleButton() {
  const { toggleSidebar, open } = useSidebar()
  return (
    <button
      onClick={toggleSidebar}
      className="absolute top-3 left-3 z-50 flex items-center justify-center w-8 h-8 rounded-md transition-colors"
      style={{
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid #1e293b',
        color: '#94a3b8',
      }}
    >
      {open
        ? <PanelLeftClose size={16} />
        : <PanelLeftOpen size={16} />
      }
    </button>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Pathway[]>(
    PATHWAYS.filter(p => p.defaultEnabled).map(p => p.id)
  )

  function toggle(pathway: Pathway) {
    setActive(prev =>
      prev.includes(pathway)
        ? prev.filter(p => p !== pathway)
        : [...prev, pathway]
    )
  }

  // Active ou désactive en bloc tous les pathways passés en argument
  // (typiquement tous ceux d'une catégorie)
  function toggleCategory(pathways: Pathway[], enable: boolean) {
    setActive(prev => {
      if (enable) {
        // Ajoute ceux qui ne sont pas déjà actifs, sans doublon
        const toAdd = pathways.filter(p => !prev.includes(p))
        return [...prev, ...toAdd]
      } else {
        // Retire tous les pathways de la catégorie
        return prev.filter(p => !pathways.includes(p))
      }
    })
  }

  const byCategory = getPathwaysByCategory()

  return (
    <PathwayContext.Provider value={{ active, toggle, toggleCategory }}>
      <SidebarProvider className="border-r-0">
        <Sidebar className="border-r-0">
          <div style={{
            height: '100%',
            background: '#020817',
            borderRight: '1px solid #1e293b',
            display: 'flex',
            flexDirection: 'column',
          }}>

            <SidebarHeader style={{ borderBottom: '1px solid #1e293b', padding: '20px 16px 14px' }}>
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#f1f5f9',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                Voies métaboliques
              </div>
            </SidebarHeader>
            <SidebarContent style={{ padding: '12px 0' }}>
              {(Object.entries(byCategory) as [PathwayCategory, typeof byCategory[PathwayCategory]][]).map(([category, pathways]) => (
                <PathwayGroup
                  key={category}
                  label={CATEGORY_CONFIG[category].label}
                  icon={CATEGORY_CONFIG[category].icon}
                  pathways={pathways}
                  active={active}
                  toggle={toggle}
                  toggleCategory={toggleCategory}
                />
              ))}
            </SidebarContent>
          </div>
        </Sidebar>

        <main className="relative flex-1 overflow-hidden min-h-0">
          <SidebarToggleButton />
          {children}
        </main>
      </SidebarProvider>
    </PathwayContext.Provider>
  )
}