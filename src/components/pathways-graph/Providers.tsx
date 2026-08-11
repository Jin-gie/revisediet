'use client'
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { PATHWAYS } from '@/data/pathways-graph/pathways'
import { type Pathway } from '@/data/pathways-graph/types'
import { useState, createContext, useContext } from "react"
import { Beef, Candy, Droplets, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { PathwayGroup } from "./GraphSidebarPathwayGroup"


type PathwayContextType = {
  active: Pathway[]
  toggle: (pathway: Pathway) => void
}

export const PathwayContext = createContext<PathwayContextType>({
  active: PATHWAYS.filter(p => p.defaultEnabled).map(p => p.id),
  toggle: () => {},
})

export function usePathways() {
  const ctx = useContext(PathwayContext)
  if (!ctx) throw new Error('usePathways must be used within Providers')
  return ctx
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

  const glucides = PATHWAYS.filter(p => ['glycolysis', 'krebs'].includes(p.id))
  const lipides = PATHWAYS.filter(p => ['betaoxydation', 'AGbiosynthesis'].includes(p.id))
  const protides = PATHWAYS.filter(p => ['urea'].includes(p.id))
  
  return (
    <PathwayContext.Provider value={{active, toggle}}>
      <SidebarProvider className="border-r-0">
        {/* Sidebar */}
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
            
            {/* Content */}
            <SidebarContent style={{ padding: '12px 0' }}>
              <PathwayGroup 
                label="Glucides" 
                icon={Candy} 
                pathways={glucides}
                active={active}
                toggle={toggle}
              />
              <PathwayGroup 
                label="Lipides" 
                icon={Droplets} 
                pathways={lipides}
                active={active}
                toggle={toggle}
              />
              <PathwayGroup 
                label="Protides" 
                icon={Beef} 
                pathways={protides}
                active={active}
                toggle={toggle}
              />
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