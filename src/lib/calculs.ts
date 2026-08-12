// lib/calculs.ts
import type { ReactNode } from "react";

/**
 * Parse un nombre saisi par l'utilisateur, en acceptant la virgule ou le
 * point comme séparateur décimal (ex: "1,75" ou "1.75" → 1.75).
 * Retourne NaN si la valeur n'est pas un nombre valide (à tester avec isNaN).
 */
export function parseDecimal(value: string): number {
  return parseFloat(value.replace(",", "."));
}

/**
 * Une formule de métabolisme de base, pour un sexe donné.
 * `calcMB` porte directement le calcul : peu importe que la formule soit
 * additive (Harris & Benedict), en puissance (Black et al.), ou toute autre
 * forme — il suffit d'écrire la fonction correspondante, sans toucher au
 * reste du code.
 */
export type FormuleSexe = {
  /** Texte affiché (peut contenir du JSX, ex: exposants avec <sup>) */
  text: ReactNode;
  /** poids en kg, taille en m, âge en ans → métabolisme de base en kcal/j */
  calcMB: (poids: number, taille: number, age: number) => number;
};

export type Formule = {
  /** Nom / source de la formule, ex: "Harris & Benedict révisé — Roche et al., 1984" */
  nom: string;
  femme: FormuleSexe;
  homme: FormuleSexe;
};

export function calcAET(
  poids: number,
  taille: number, // m (ex: 1.75)
  age: number,
  formuleSexe: FormuleSexe,
  nap: number = 1.63
): number | null {
  if (!poids || !taille || !age || poids <= 0 || taille <= 0 || age <= 0) return null;
  const mb = formuleSexe.calcMB(poids, taille, age);
  console.log(0.963 * Math.pow(poids, 0.48) * Math.pow(taille, 0.5) * Math.pow(age, -0.13))
  console.log("mb : ", mb*nap)
  return Math.round(mb * nap * 10) / 10;
}

export function kcalToKj(kcal: number): number {
  return Math.round(kcal * 4.184 * 10) / 10;
}

export function kjToKcal(kj: number): number {
  return Math.round(kj / 4.184 * 10) / 10;
}