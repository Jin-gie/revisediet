"use client";

import { usePreferences } from "@/components/preferences/PreferencesContext";

export function useEnergyValue(kcal: string, kJ: string): string {
  const { unit } = usePreferences();
  return unit === "kcal" ? kcal : kJ;
}