import type { MDXComponents } from "mdx/types"
import { Etape, EtapesList, InfoBox, Reaction } from "@/components/mdx"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Etape,
    EtapesList,
    InfoBox,
    Reaction,
    ...components,
  }
}