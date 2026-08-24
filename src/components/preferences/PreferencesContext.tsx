// lib/preferences/PreferencesContext.tsx
"use client";

// Préférences globales du site (unité d'énergie, thème).
// - Utilisateur invité : persistées en localStorage.
// - Utilisateur connecté : persistées dans la table `profiles` (Supabase),
//   qui prend le dessus sur le localStorage dès que la session est chargée.

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export type EnergyUnit = "kcal" | "kJ";
export type Theme = "light" | "dark";

const UNIT_STORAGE_KEY = "revisediet:unit";
const THEME_STORAGE_KEY = "revisediet:theme";

type PreferencesContextValue = {
  unit: EnergyUnit;
  setUnit: (unit: EnergyUnit) => void;
  toggleUnit: () => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const [unit, setUnitState] = useState<EnergyUnit>("kcal");
  const [theme, setThemeState] = useState<Theme>("light");

  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    const storedUnit = window.localStorage.getItem(UNIT_STORAGE_KEY);
    if (storedUnit === "kcal" || storedUnit === "kJ") setUnitState(storedUnit);

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") setThemeState(storedTheme);
  }, []);

  useEffect(() => {
    async function loadFromSupabase(user: User) {
      const { data } = await supabase
        .from("profiles")
        .select("energy_unit, theme")
        .eq("id", user.id)
        .maybeSingle();

      if (data?.energy_unit === "kcal" || data?.energy_unit === "kJ") {
        setUnitState(data.energy_unit);
      }
      if (data?.theme === "light" || data?.theme === "dark") {
        setThemeState(data.theme);
      }
    }

    supabase.auth.getUser().then(({ data }) => {
      userIdRef.current = data.user?.id ?? null;
      if (data.user) loadFromSupabase(data.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      userIdRef.current = session?.user?.id ?? null;
      if (session?.user) loadFromSupabase(session.user);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const persist = useCallback(
    async (patch: { energy_unit?: EnergyUnit; theme?: Theme }) => {
      const userId = userIdRef.current;
      if (!userId) return;
      await supabase
        .from("profiles")
        .upsert({ id: userId, ...patch, updated_at: new Date().toISOString() });
    },
    [supabase]
  );

  const setUnit = useCallback(
    (next: EnergyUnit) => {
      setUnitState(next);
      window.localStorage.setItem(UNIT_STORAGE_KEY, next);
      persist({ energy_unit: next });
    },
    [persist]
  );

  const toggleUnit = useCallback(() => {
    setUnit(unit === "kcal" ? "kJ" : "kcal");
  }, [unit, setUnit]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      persist({ theme: next });
    },
    [persist]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    <PreferencesContext.Provider
      value={{ unit, setUnit, toggleUnit, theme, setTheme, toggleTheme }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences() doit être utilisé sous <PreferencesProvider>");
  return ctx;
}