// lib/mdx-loader.ts
import type { ComponentType } from "react";

type MdxSection = "physiopathologie" | "traitement" | "dietetique";

/**
 * Charge dynamiquement data/pathologies/<slug>/<section>.mdx
 * Le chemin est partiellement dynamique (slug + section variables) :
 * webpack supporte ce pattern (context module) tant que le dossier
 * data/pathologies/<slug>/ existe avec un fichier <section>.mdx dedans.
 *
 * Retourne null si le fichier n'existe pas (pathologie sans ce MDX),
 * pour permettre à la page de simplement ne pas rendre la section.
 */
export async function loadPathologieMdx(
  slug: string,
  section: MdxSection
): Promise<ComponentType | null> {
  try {
    const mod = await import(`@/data/pathologies/${slug}/${section}.mdx`);
    return mod.default as ComponentType;
  } catch {
    return null;
  }
}
