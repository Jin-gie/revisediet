export function calcAET(
  sexe: "homme" | "femme",
  poids: number,
  taille: number,
  age: number,
  nap: number = 1.63
): number | null {
  if (poids <= 0 || taille <= 0 || age <= 0) return null;
  const mb =
    sexe === "homme"
      ? 13.707 * poids + 492.3 * (taille / 100) - 6.673 * age + 77.607
      : 9.74 * poids + 172.9 * (taille / 100) - 4.737 * age + 667.051;
  return Math.round(mb * nap);
}

export function kcalToKj(kcal: number): number {
  return Math.round(kcal * 4.184);
}

export function kjToKcal(kj: number): number {
  return Math.round(kj / 4.184);
}