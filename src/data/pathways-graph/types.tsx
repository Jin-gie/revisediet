import { type Node, type Edge } from '@xyflow/react'

export type Colors = {
  border: string;
  glow: string;
  badge: string;
  text: string;
}

export type Pathway = 'glycolysis' | 'krebs' | 'urea' | 'betaoxydation'

export type PathwayConfig = {
	id: Pathway
	label: string
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
}

export type MetaboliteEdge = Edge<MetaboliteEdgeData> & {
  type?: 'enzyme'
}

export type JunctionData = {
  pathways: Pathway[]
}
export type JunctionNode = Node<JunctionData>