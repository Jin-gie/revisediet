// components/AnnalesExplorer.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, FileX } from "lucide-react";
import { Matiere, getPdfUrl } from "@/data/annales-types";

export default function AnnalesExplorer({ matieres }: { matieres: Matiere[] }) {
  const [search, setSearch] = useState("");
  const [referentielTab, setReferentielTab] = useState<"ancien" | "nouveau">("ancien");
  const [matiereId, setMatiereId] = useState<string | null>(null);

  const matieresDuReferentiel = useMemo(
    () => matieres.filter((m) => m.referentiel === referentielTab),
    [matieres, referentielTab]
  );

  useEffect(() => {
    if (matieresDuReferentiel.length === 0) {
      setMatiereId(null);
      return;
    }
    if (!matieresDuReferentiel.some((m) => m.id === matiereId)) {
      setMatiereId(matieresDuReferentiel[0].id);
    }
  }, [matieresDuReferentiel, matiereId]);

  const matiereActive = matieresDuReferentiel.find((m) => m.id === matiereId);

  const sujetsFiltres = useMemo(() => {
    if (!matiereActive) return [];
    return matiereActive.sujets.filter((s) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        s.annee.toString().includes(q) ||
        s.titre?.toLowerCase().includes(q) ||
        s.themes.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [matiereActive, search]);

  return (
    <div>
      {/* Référentiel */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setReferentielTab("ancien")}
          className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
            referentielTab === "ancien"
              ? "bg-emerald-700 text-white border-emerald-700"
              : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
          }`}
        >
          Ancien référentiel (jusqu'en 2026)
        </button>
        <button
          onClick={() => setReferentielTab("nouveau")}
          className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
            referentielTab === "nouveau"
              ? "bg-emerald-700 text-white border-emerald-700"
              : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
          }`}
        >
          Nouveau référentiel (à partir de 2027)
        </button>
      </div>

      {matieresDuReferentiel.length === 0 ? (
        <div className="text-center py-16 text-stone-400 text-sm">
          Pas encore de sujets pour ce référentiel.
        </div>
      ) : (
        <>
          {/* Filtres : recherche + matières */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" fill="none" viewBox="0 0 16 16">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher un titre, un thème, une année…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-xl bg-white text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {matieresDuReferentiel.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMatiereId(m.id)}
                  className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
                    matiereId === m.id
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  {m.nom}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-stone-400 mb-5">
            {sujetsFiltres.length} sujet{sujetsFiltres.length > 1 ? "s" : ""}
          </p>

          {/* Liste */}
          {sujetsFiltres.length === 0 ? (
            <div className="text-center py-16 text-stone-400 text-sm">
              Aucun sujet ne correspond à ta recherche.
            </div>
          ) : (
            <div className="divide-y divide-stone-100 border border-stone-100 rounded-2xl overflow-hidden bg-white">
              {sujetsFiltres.map((sujet) => {
                const url = sujet.disponible ? getPdfUrl(sujet.fichier_path) : null;

                const contenu = (
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-widest shrink-0">
                        {sujet.annee}
                        {sujet.epreuve ? ` — ${sujet.epreuve}` : ""}
                      </span>
                      {sujet.titre && (
                        <span className="font-serif text-sm text-stone-800 break-words">
                          {sujet.titre}
                        </span>
                      )}
                    </div>
                    {sujet.themes.length > 0 && (
                      <div className="text-xs text-stone-400 break-words mt-0.5">
                        {sujet.themes.join(" · ")}
                      </div>
                    )}
                  </div>
                );

                return sujet.disponible && url ? (
                  <a
                    key={sujet.id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-stone-50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {contenu}
                  </a>
                ) : (
                  <div
                    key={sujet.id}
                    className="flex items-center gap-2 px-4 py-2.5 opacity-50"
                  >
                    <FileX className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                    {contenu}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}