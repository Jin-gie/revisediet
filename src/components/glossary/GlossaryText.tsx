// components/GlossaryText.tsx
"use client";

import { Fragment, useMemo } from "react";
import { GLOSSAIRE, getGlossaryEntry } from "@/data/glossaire";
import GlossaryPopoverTrigger from "./GlossaryPopoverTrigger";

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Affiche un texte brut en rendant cliquables les mots présents dans le
 * glossaire (data/glossaire.ts). Utilisable partout sur le site :
 *
 *   <GlossaryText text="Choix du NAP selon 3 critères..." />
 *
 * Si le texte ne contient aucun terme du glossaire, il est rendu tel quel.
 */
export default function GlossaryText({ text }: { text: string }) {
  const regex = useMemo(() => {
    if (GLOSSAIRE.length === 0) return null;
    const terms = [...GLOSSAIRE]
      .sort((a, b) => b.term.length - a.term.length)
      .map((g) => escapeRegex(g.term));
    return new RegExp(`\\b(${terms.join("|")})\\b`, "g");
  }, []);

  if (!regex) return <>{text}</>;

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const entry = getGlossaryEntry(part);
        return entry ? (
          <GlossaryPopoverTrigger key={i} entry={entry} />
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}