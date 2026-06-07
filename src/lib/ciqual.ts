export type CiqualEntry = {
  alim_grp_code: string
  alim_ssgrp_code: string
  alim_ssssgrp_code: string
  alim_grp_nom_fr: string
  alim_ssgrp_nom_fr: string
  alim_ssssgrp_nom_fr: string
  alim_code: number
  alim_nom_fr: string
  alim_nom_sci: string
  [key: string]: string | number
}

// Colonnes affichées par défaut (macros)
export const DEFAULT_COLUMNS: ColumnDef[] = [
  { key: "Energie, Règlement UE N° 1169/2011 (kcal/100 g)", label: "Énergie (kcal)", unit: "kcal", group: "macro" },
  { key: "Energie, Règlement UE N° 1169/2011 (kJ/100 g)", label: "Énergie (kJ)", unit: "kJ", group: "macro" },
  { key: "Protéines, N x facteur de Jones (g/100 g)", label: "Protéines", unit: "g", group: "macro" },
  { key: "Glucides (g/100 g)", label: "Glucides", unit: "g", group: "macro" },
  { key: "Lipides (g/100 g)", label: "Lipides", unit: "g", group: "macro" },
  { key: "Sucres (g/100 g)", label: "Sucres", unit: "g", group: "macro" },
  { key: "Fibres alimentaires (g/100 g)", label: "Fibres", unit: "g", group: "macro" },
  { key: "Sel chlorure de sodium (g/100 g)", label: "Sel", unit: "g", group: "macro" },
]

// Colonnes micronutriments disponibles
export const MICRO_COLUMNS: ColumnDef[] = [
  { key: "Calcium (mg/100 g)", label: "Calcium", unit: "mg", group: "mineral" },
  { key: "Fer (mg/100 g)", label: "Fer", unit: "mg", group: "mineral" },
  { key: "Magnésium (mg/100 g)", label: "Magnésium", unit: "mg", group: "mineral" },
  { key: "Phosphore (mg/100 g)", label: "Phosphore", unit: "mg", group: "mineral" },
  { key: "Potassium (mg/100 g)", label: "Potassium", unit: "mg", group: "mineral" },
  { key: "Sodium (mg/100 g)", label: "Sodium", unit: "mg", group: "mineral" },
  { key: "Zinc (mg/100 g)", label: "Zinc", unit: "mg", group: "mineral" },
  { key: "Cuivre (mg/100 g)", label: "Cuivre", unit: "mg", group: "mineral" },
  { key: "Manganèse (mg/100 g)", label: "Manganèse", unit: "mg", group: "mineral" },
  { key: "Iode (µg/100 g)", label: "Iode", unit: "µg", group: "mineral" },
  { key: "Sélénium (µg/100 g)", label: "Sélénium", unit: "µg", group: "mineral" },
  { key: "Cholestérol (mg/100 g)", label: "Cholestérol", unit: "mg", group: "mineral" },
  { key: "Vitamine C (mg/100 g)", label: "Vit. C", unit: "mg", group: "vitamin" },
  { key: "Vitamine D (µg/100 g)", label: "Vit. D", unit: "µg", group: "vitamin" },
  { key: "Vitamine E (mg/100 g)", label: "Vit. E", unit: "mg", group: "vitamin" },
  { key: "Rétinol (µg/100 g)", label: "Rétinol (A)", unit: "µg", group: "vitamin" },
  { key: "Beta-Carotène (µg/100 g)", label: "Béta-carotène", unit: "µg", group: "vitamin" },
  { key: "Vitamine B1 ou Thiamine (mg/100 g)", label: "Vit. B1", unit: "mg", group: "vitamin" },
  { key: "Vitamine B2 ou Riboflavine (mg/100 g)", label: "Vit. B2", unit: "mg", group: "vitamin" },
  { key: "Vitamine B3 ou PP ou Niacine (mg/100 g)", label: "Vit. B3", unit: "mg", group: "vitamin" },
  { key: "Vitamine B5 ou Acide pantothénique (mg/100 g)", label: "Vit. B5", unit: "mg", group: "vitamin" },
  { key: "Vitamine B6 (mg/100 g)", label: "Vit. B6", unit: "mg", group: "vitamin" },
  { key: "Vitamine B9 ou Folates totaux (µg/100 g)", label: "Vit. B9 (Folates)", unit: "µg", group: "vitamin" },
  { key: "Vitamine B12 (µg/100 g)", label: "Vit. B12", unit: "µg", group: "vitamin" },
  { key: "Vitamine K1 (µg/100 g)", label: "Vit. K1", unit: "µg", group: "vitamin" },
  { key: "AG saturés (g/100 g)", label: "AGS", unit: "g", group: "lipid" },
  { key: "AG monoinsaturés (g/100 g)", label: "AGMI", unit: "g", group: "lipid" },
  { key: "AG polyinsaturés (g/100 g)", label: "AGPI", unit: "g", group: "lipid" },
  { key: "AG 18:2 9c,12c (n-6), linoléique (g/100 g)", label: "Linoléique (n-6)", unit: "g", group: "lipid" },
  { key: "AG 18:3 c9,c12,c15 (n-3), alpha-linolénique (g/100 g)", label: "Alpha-linolénique (n-3)", unit: "g", group: "lipid" },
  { key: "AG 20:5 5c,8c,11c,14c,17c (n-3) EPA (g/100 g)", label: "EPA (n-3)", unit: "g", group: "lipid" },
  { key: "AG 22:6 4c,7c,10c,13c,16c,19c (n-3) DHA (g/100 g)", label: "DHA (n-3)", unit: "g", group: "lipid" },
  { key: "Eau (g/100 g)", label: "Eau", unit: "g", group: "other" },
  { key: "Alcool (g/100 g)", label: "Alcool", unit: "g", group: "other" },
]

export const ALL_COLUMNS = [...DEFAULT_COLUMNS, ...MICRO_COLUMNS]

export type ColumnDef = {
  key: string
  label: string
  unit: string
  group: "macro" | "mineral" | "vitamin" | "lipid" | "other"
}

// Parse une valeur Ciqual (virgule décimale, tiret = null)
export function parseVal(val: string | number | undefined): number | null {
  if (val === undefined || val === "" || val === "-") return null
  if (typeof val === "number") return val
  const n = parseFloat(val.replace(",", "."))
  return isNaN(n) ? null : n
}

// Affiche une valeur pour l'UI
export function formatVal(val: string | number | undefined, portion = 100): string {
  const n = parseVal(val)
  if (n === null) return "—"
  const adjusted = (n * portion) / 100
  // Arrondi intelligent
  if (adjusted >= 10) return adjusted.toFixed(1)
  if (adjusted >= 1) return adjusted.toFixed(2)
  return adjusted.toFixed(3)
}

// Groupes alimentaires uniques depuis les données
export function getGroups(data: CiqualEntry[]): string[] {
  const set = new Set(data.map((d) => d.alim_grp_nom_fr).filter(Boolean))
  return Array.from(set).sort()
}

export function getSousGroupes(data: CiqualEntry[], grp: string): string[] {
  const set = new Set(
    data
      .filter((d) => d.alim_grp_nom_fr === grp)
      .map((d) => d.alim_ssgrp_nom_fr)
      .filter(Boolean)
  )
  return Array.from(set).sort()
}