"use client";
// components/pathologie/apports-comparatif.tsx
//
// Tableau unique : chaque cellule contient la valeur chiffrée ET sa
// justification. Pas d'onglets séparés.

import type { FicheApports } from "@/data/pathologies/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ApportsComparatif({ populations }: { populations: FicheApports[] }) {
  if (populations.length === 0) return null;
  const nbLignes = populations[0].lignes.length;

  return (
    <div className="border border-stone-100 rounded-xl overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-stone-100">
            <TableHead className="w-[160px] align-bottom text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Apports
            </TableHead>
            {populations.map((fiche) => (
              <TableHead key={fiche.population} className="align-bottom">
                <div className="text-sm font-medium text-stone-800 normal-case tracking-normal">
                  {fiche.titre}
                </div>
                {fiche.sousTitre && (
                  <div className="text-xs font-normal text-stone-400 italic normal-case tracking-normal">
                    {fiche.sousTitre}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: nbLignes }).map((_, i) => (
            <TableRow key={i} className="border-stone-100">
              <TableCell className="font-medium text-sm text-stone-600 align-top">
                {populations[0].lignes[i]?.label}
              </TableCell>
              {populations.map((fiche) => {
                const ligne = fiche.lignes[i];
                return (
                  <TableCell
                    key={fiche.population}
                    className="align-top text-sm min-w-[220px]"
                  >
                    {ligne ? (
                      <div className="space-y-1">
                        <p className="font-medium text-emerald-700">{ligne.valeur}</p>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          {ligne.justification}
                        </p>
                      </div>
                    ) : (
                      <span className="text-stone-300">—</span>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
