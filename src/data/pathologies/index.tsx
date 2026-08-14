import { diabeteType1 } from "./diabete-type-1"
import { rgo } from "./rgo"

export const PATHOLOGIES = [diabeteType1, rgo]

export function getPathologie(slug: string) {
  return PATHOLOGIES.find((p) => p.slug === slug)
}

export type { Pathologie } from "./types"