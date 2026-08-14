// components/AETCalculatrice.tsx
"use client";

import { useState } from "react";
import { calcAET, kcalToKj, parseDecimal, FormuleSexe, kjToKcal } from "@/lib/calculs";
import { PopulationSlug } from "@/data/populations";

type AETCalculatriceProps = {
  /** Nom / source de la formule, ex: "Harris & Benedict révisé — Roche et al., 1984" */
  formuleNom: string;
  formuleFemme: FormuleSexe;
  formuleHomme: FormuleSexe;
  status : PopulationSlug;
};

type Trimestre = 1 | 2 | 3;

const SUPPLEMENT_TRIMESTRE_MJ: Record<Trimestre, number> = {
  1: 300,
  2: 1100,
  3: 2000
}

export default function AETCalculatrice({ formuleNom, formuleFemme, formuleHomme, status }: AETCalculatriceProps) {
  const [sexe, setSexe] = useState<"homme" | "femme">("femme");
  const [poids, setPoids] = useState("");
  const [taille, setTaille] = useState("");
  const [age, setAge] = useState("");
  const [NAP, setNAP] = useState("1.63");
  const [trimestre, setTrimestre] = useState<Trimestre>(1)

  const poidsNum = parseDecimal(poids);
  const tailleNum = parseDecimal(taille); // en mètres, ex: 1.75
  const ageNum = parseDecimal(age);
  const napNum = parseDecimal(NAP) || 1.63;

  const formule = status === "grossesse" || status === "allaitement" || sexe === "femme" ? formuleFemme : formuleHomme;
  const aetBase = calcAET(poidsNum, tailleNum, ageNum || 30, formule, napNum);
  const supplement = status === "grossesse" ? SUPPLEMENT_TRIMESTRE_MJ[trimestre] : 0;
  const aet = aetBase !== null ? aetBase + supplement : null;

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
        Calculer pour un patient
      </p>

      <div className="flex flex-wrap gap-2 items-end" suppressHydrationWarning>
        {status === "grossesse" ? (
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-stone-400 font-medium px-1">Trimestre</label>
            <select
              value={trimestre}
              onChange={(e) => setTrimestre(Number(e.target.value) as Trimestre)}
              className="px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white text-stone-700 focus:outline-none focus:border-emerald-400 transition-colors"
            >
              <option value={1}>Trimestre 1</option>
              <option value={2}>Trimestre 2</option>
              <option value={3}>Trimestre 3</option>
            </select>
          </div>

        ) : (["femme", "homme"] as const).map((s) => (
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
          { placeholder: "Poids (kg)", value: poids, onChange: setPoids, unit: "kg", width: "w-28" },
          { placeholder: "Taille (m)", value: taille, onChange: setTaille, unit: "m", width: "w-28" },
          { placeholder: "Âge (ans)", value: age, onChange: setAge, unit: "ans", width: "w-28" },
          { placeholder: "NAP", value: NAP, onChange: setNAP, unit: "NAP", width: "w-28" },
        ].map(({ placeholder, value, onChange, unit, width }) => (
          <div key={placeholder} className="flex flex-col gap-1">
            <label className="text-[11px] text-stone-400 font-medium px-1">{placeholder}</label>
            <div
              className={`${width} flex items-center border border-stone-200 rounded-lg overflow-hidden focus-within:border-emerald-400 transition-colors bg-white`}
            >
              <input
                type="text"
                inputMode="decimal"
                placeholder={placeholder === "Taille (m)" ? "1,75" : undefined}
                value={value}
                onChange={(e) => {
                  // n'autorise que chiffres, virgule et point
                  const v = e.target.value.replace(/[^0-9.,]/g, "");
                  onChange(v);
                }}
                className="flex-1 min-w-0 px-3 py-2 text-sm focus:outline-none bg-transparent"
              />
              <span className="pr-2.5 text-xs text-stone-400 flex-shrink-0">{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {aet !== null && !isNaN(aet) ? (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4">
          <p className="text-xs text-emerald-600 mb-1">AET estimé (NAP {napNum})</p>
          {/* <p className="font-serif text-3xl text-emerald-700">{aet.toLocaleString("fr-FR")} kcal/j</p>
          <p className="text-sm text-emerald-600 mt-0.5">{kcalToKj(aet).toLocaleString("fr-FR")} kJ/j</p> */}

          <p className="font-serif text-3xl text-emerald-700">{aet.toLocaleString("fr-FR")} kJ/j</p>
          <p className="text-sm text-emerald-600 mt-0.5">{kjToKcal(aet).toLocaleString("fr-FR")} kcal/j</p>
        </div>
      ) : (
        <div className="bg-stone-50 border border-stone-100 rounded-xl px-5 py-4">
          <p className="text-sm text-stone-400">Remplissez tous les champs pour calculer l'AET.</p>
        </div>
      )}

      <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
          Formule utilisée
        </p>
        <p className="text-xs text-stone-500 font-mono leading-relaxed">
          {formule.text}
          <br />
          AET = MB × NAP ({napNum}) {status === "grossesse" && supplement > 0 ? ` + ${supplement} kJ` : ''} {status === "allaitement" && ' + 2000 kJ'}
        </p>
        <p className="text-[11px] text-stone-400 mt-2">
          P = poids (kg) · T = taille (m) · Â = âge (ans)
          <br />
          Source : {formuleNom}
        </p>
      </div>
    </div>
  );
}