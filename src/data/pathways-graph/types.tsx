import { type Node, type Edge } from '@xyflow/react'

export type Colors = {
  border: string;
  glow: string;
  badge: string;
  text: string;
}

export type Pathway = 'glycolysis' | 'ngg' | 'krebs' | 'urea' | 'betaoxydation' | 'AGbiosynthesis'

export type PathwayCategory = 'glucides' | 'lipides' | 'protides'

export type PathwayConfig = {
	id: Pathway
	label: string
  category: PathwayCategory
	description: string
	defaultEnabled: boolean
  border: string
  glow: string
  badge: string
  text: string
}

export type MetaboliteData = {
  label: string
  pathways: Pathway[]           // tableau — un métabolite peut appartenir à plusieurs
  description?: string
  formula?: string
}

export type MetaboliteNode = Node<MetaboliteData>

export type MetaboliteEdgeData = {
  pathway: Pathway              // une réaction appartient toujours à un seul pathway
  enzyme?: string
  cofactor?: string
  description?: string
  ecNumber?: string
  reversible?: boolean
  labelOffset?: {x: number, y: number}
}

export type MetaboliteEdge = Edge<MetaboliteEdgeData> & {
  type?: 'enzyme'
}

export type JunctionData = {
  pathways: Pathway[]
}
export type JunctionNode = Node<JunctionData>