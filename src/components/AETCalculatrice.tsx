"use client";

import { useState } from "react";
import { calcAET, kcalToKj } from "@/lib/calculs";

export default function AETCalculatrice() {
  const [sexe, setSexe] = useState<"homme" | "femme">("femme");
  const [poids, setPoids] = useState("");
  const [taille, setTaille] = useState("");
  const [age, setAge] = useState("");
  const [NAP, setNAP] = useState("1.63");

  const aet = calcAET(
    sexe,
    parseFloat(poids),
    parseFloat(taille),
    parseFloat(age) || 30
  );
  
  console.log({aet})

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
        Calculer pour un patient
      </p>

      <div className="flex flex-wrap gap-2 items-end">
        {(["femme", "homme"] as const).map((s) => (
            <button
            key={s}
            onClick={() => setSexe(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                sexe === s
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
            }`}
            >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
        ))}

        {[
            { placeholder: "Poids", value: poids, onChange: setPoids, unit: "kg", width: "w-28" },
            { placeholder: "Taille", value: taille, onChange: setTaille, unit: "cm", width: "w-28" },
            { placeholder: "Âge", value: age, onChange: setAge, unit: "ans", width: "w-28" },
            { placeholder: "NAP", value: NAP, onChange: setNAP, unit: "NAP", width: "w-28" },
        ].map(({ placeholder, value, onChange, unit, width }) => (
            <div key={placeholder} className="flex flex-col gap-1">
            <label className="text-[11px] text-stone-400 font-medium px-1">{placeholder}</label>
            <div className={`${width} flex items-center border border-stone-200 rounded-lg overflow-hidden focus-within:border-emerald-400 transition-colors bg-white`}>
                <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 min-w-0 px-3 py-2 text-sm focus:outline-none bg-transparent"
                />
                <span className="pr-2.5 text-xs text-stone-400 flex-shrink-0">{unit}</span>
            </div>
            </div>
        ))}
        </div>

      {aet !== null && !isNaN(aet) && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4">
            <p className="text-xs text-emerald-600 mb-1">AET estimé (NAP {parseFloat(NAP) || 1.63})</p>
            <p className="font-serif text-3xl text-emerald-700">{aet.toLocaleString("fr-FR")} kcal/j</p>
            <p className="text-sm text-emerald-600 mt-0.5">{kcalToKj(aet).toLocaleString("fr-FR")} kJ/j</p>
        </div>
        )}
        {!aet && (
        <div className="bg-stone-50 border border-stone-100 rounded-xl px-5 py-4">
            <p className="text-sm text-stone-400">Remplissez tous les champs pour calculer l'AET.</p>
        </div>
        )}

      <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
          Formule utilisée
        </p>
        <p className="text-xs text-stone-500 font-mono leading-relaxed">
          {sexe === "femme"
            ? "MB = 9,740 × P + 172,9 × T − 4,737 × Â + 667,051"
            : "MB = 13,707 × P + 492,3 × T − 6,673 × Â + 77,607"}
          <br />
          AET = MB × NAP (1,63)
        </p>
        <p className="text-[11px] text-stone-400 mt-2">
          P = poids (kg) · T = taille (m) · Â = âge (ans)
          <br />
          Source : Harris &amp; Benedict révisé — Roche et al., 1984
        </p>
      </div>
    </div>
  );
}