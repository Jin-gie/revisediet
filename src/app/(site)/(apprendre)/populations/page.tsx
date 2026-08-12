"use client";

import { useState } from "react";
import { POPULATIONS } from "@/data/populations";
import { getJustification } from "@/data/justifications";
import AETCalculatrice from "@/components/AETCalculatrice";
import JustificationTable from "@/components/JustificationTable";
import { kcalToKj } from "@/lib/calculs";

export default function PopulationsPage() {
  const [activeSlug, setActiveSlug] = useState(POPULATIONS[0].slug);

  const pop = POPULATIONS.find((p) => p.slug === activeSlug) ?? POPULATIONS[0];
  const justif = getJustification(activeSlug);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* En-tête */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-2">
          Apprendre
        </p>
        <h1 className="font-serif text-4xl text-stone-900 mb-3">Fiches populations</h1>
        <p className="text-stone-400 text-sm max-w-lg">
          Sélectionne une population pour calculer son AET et consulter le tableau de
          justification nutritionnelle correspondant.
        </p>
      </div>

      {/* Switch entre populations */}
      <div className="flex flex-wrap gap-2 mb-10">
        {POPULATIONS.map((p) => (
          <button
            key={p.slug}
            onClick={() => setActiveSlug(p.slug)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${
              activeSlug === p.slug
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
            }`}
          >
            <span className="text-base">{p.emoji}</span>
            {p.label}
          </button>
        ))}
      </div>

      {/* Description de la population sélectionnée */}
      <div className="mb-8">
        <p className="text-stone-500 text-sm max-w-xl">{pop.description}</p>
      </div>

      <div className="space-y-5">
        {/* Section calcul */}
        <div className="bg-white border border-stone-100 rounded-2xl p-6">
          <h2 className="font-serif text-xl text-stone-900 mb-5 flex items-center gap-2">
            <span>🔥</span> Apport énergétique total (AET)
          </h2>
          <p className="text-sm text-stone-400 mb-4">{pop.aet.description}</p>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {pop.aet.valeurs.map((v) => {
              const kcal = parseInt(v.kcal.replace(/[^\d]/g, ""));
              const kj = isNaN(kcal) ? null : kcalToKj(kcal);
              return (
                <div
                  key={v.profil}
                  className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100"
                >
                  <p className="text-xs text-stone-400 mb-1">{v.profil}</p>
                  {kj && <p className="font-serif text-xl text-emerald-700">{kj.toLocaleString("fr-FR")} kJ</p>}
                  <p className="text-xs text-stone-400 mt-0.5">{v.kcal}</p>
                </div>
              );
            })}
          </div>

          <AETCalculatrice 
            formuleNom= {pop.formule.nom}
            formuleFemme={pop.formule.femme}
            formuleHomme={pop.formule.homme}
          />
        </div>

        {/* Tableau de justification */}
        <div>
          <h2 className="font-serif text-xl text-stone-900 mb-5 flex items-center gap-2">
            <span>📋</span> Justification nutritionnelle
          </h2>
          {justif ? (
            <>
              {justif.intro && <p className="text-sm text-stone-400 mb-4">{justif.intro}</p>}
              <JustificationTable rows={justif.rows} />
            </>
          ) : (
            <div className="bg-stone-50 border border-stone-100 rounded-2xl px-6 py-10 text-center">
              <p className="text-sm text-stone-400">
                Le tableau de justification pour « {pop.label} » n'est pas encore disponible.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}