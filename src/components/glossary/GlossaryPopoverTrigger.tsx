// components/GlossaryPopoverTrigger.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { GlossaryEntry } from "@/data/glossaire";

export default function GlossaryPopoverTrigger({ entry }: { entry: GlossaryEntry }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <span className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="font-semibold text-emerald-700 underline decoration-dotted decoration-emerald-300 underline-offset-2 hover:text-emerald-800 hover:decoration-emerald-500 transition-colors"
      >
        {entry.term}
      </button>
      {open && (
        <div className="absolute z-20 left-0 top-full mt-2 w-72 max-w-[80vw] bg-white border border-stone-200 rounded-xl shadow-lg p-4 text-left">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {entry.title}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-stone-300 hover:text-stone-500 text-xs leading-none"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
          <ul className="space-y-1.5">
            {entry.items.map((it, i) => (
              <li key={i} className="text-xs text-stone-600 leading-relaxed">
                {it}
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
}