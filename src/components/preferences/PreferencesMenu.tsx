// components/PreferencesMenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { usePreferences } from "@/components/preferences/PreferencesContext";

function Switch({
  checked,
  onChange,
  leftLabel,
  rightLabel,
  disabled = false,
}: {
  checked: boolean; // false = position gauche, true = position droite
  onChange: () => void;
  leftLabel: string;
  rightLabel: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      aria-pressed={checked}
      className={`relative flex items-center h-8 w-full rounded-full border transition-colors ${
        disabled
          ? "bg-stone-50 border-stone-100 cursor-not-allowed"
          : "bg-stone-100 border-stone-200 cursor-pointer"
      }`}
    >
      <span
        className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-[calc(100%+4px)]" : "translate-x-0.5"
        }`}
      />
      <span
        className={`relative z-10 flex-1 text-center text-xs font-medium transition-colors ${
          !checked ? "text-stone-800" : "text-stone-400"
        }`}
      >
        {leftLabel}
      </span>
      <span
        className={`relative z-10 flex-1 text-center text-xs font-medium transition-colors ${
          checked ? "text-stone-800" : "text-stone-400"
        }`}
      >
        {rightLabel}
      </span>
    </button>
  );
}

export default function PreferencesMenu() {
  const { unit, toggleUnit, theme, toggleTheme } = usePreferences();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Préférences"
        className={`p-2 rounded-lg transition-all ${
          open ? "bg-stone-100 text-stone-800" : "text-stone-400 hover:text-stone-800 hover:bg-stone-50"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
          <path
            d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M16.17 12.5a1.4 1.4 0 00.28 1.53l.05.05a1.65 1.65 0 11-2.33 2.33l-.05-.05a1.4 1.4 0 00-1.53-.28 1.4 1.4 0 00-.84 1.28v.14a1.65 1.65 0 11-3.3 0v-.07a1.4 1.4 0 00-.91-1.28 1.4 1.4 0 00-1.53.28l-.05.05a1.65 1.65 0 11-2.33-2.33l.05-.05a1.4 1.4 0 00.28-1.53 1.4 1.4 0 00-1.28-.84h-.14a1.65 1.65 0 110-3.3h.07a1.4 1.4 0 001.28-.91 1.4 1.4 0 00-.28-1.53l-.05-.05A1.65 1.65 0 116 3.54l.05.05a1.4 1.4 0 001.53.28h.06a1.4 1.4 0 00.84-1.28V2.4a1.65 1.65 0 113.3 0v.07a1.4 1.4 0 00.84 1.28h.06a1.4 1.4 0 001.53-.28l.05-.05a1.65 1.65 0 112.33 2.33l-.05.05a1.4 1.4 0 00-.28 1.53v.06a1.4 1.4 0 001.28.84h.14a1.65 1.65 0 110 3.3h-.07a1.4 1.4 0 00-1.28.84z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-stone-200 rounded-xl shadow-lg p-4 z-30">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
            Préférences
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-stone-500 mb-1.5">Unité d&apos;énergie</p>
              <Switch
                checked={unit === "kJ"}
                onChange={toggleUnit}
                leftLabel="kcal"
                rightLabel="kJ"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <p className="text-xs text-stone-500">Thème</p>
                <span className="text-[10px] text-stone-300">(bientôt)</span>
              </div>
              <Switch
                checked={theme === "dark"}
                onChange={toggleTheme}
                leftLabel="Clair"
                rightLabel="Sombre"
                disabled
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}