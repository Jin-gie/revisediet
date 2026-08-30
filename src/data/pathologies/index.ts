// data/pathologies/index.ts

import type { Pathologie } from "./types";
import { obesite } from "./obesite/data";

// Ajoute chaque nouvelle pathologie ici (une seule ligne suffit)
export const PATHOLOGIES: Record<string, Pathologie> = {
  [obesite.slug]: obesite,
};

export function getPathologie(slug: string): Pathologie | undefined {
  return PATHOLOGIES[slug];
}

export function getAllPathologieSlugs(): string[] {
  return Object.keys(PATHOLOGIES);
}

export function getAllPathologies(): Pathologie[] {
  return Object.values(PATHOLOGIES);
}
