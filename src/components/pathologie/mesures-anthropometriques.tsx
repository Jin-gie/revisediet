// components/pathologie/mesures-anthropometriques.tsx
import type { MesuresAnthropometriques as MesuresAnthropometriquesType } from "@/data/pathologies/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function MesuresAnthropometriques({
  data,
}: {
  data: MesuresAnthropometriquesType;
}) {
  if (!data.imc && !data.tourDeTaille) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.imc && (
        <div className="border border-stone-100 rounded-xl p-4">
          <p className="text-sm font-medium text-stone-800 mb-3">
            IMC{data.imc.formule ? ` = ${data.imc.formule}` : ""}
          </p>
          <Table>
            <TableHeader>
              <TableRow className="border-stone-100">
                <TableHead className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  IMC
                </TableHead>
                <TableHead className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Correspondance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.imc.seuils.map((s) => (
                <TableRow key={s.plage} className="border-stone-100">
                  <TableCell className="font-mono text-sm text-stone-600">{s.plage}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-white text-xs font-medium ${s.couleur}`}
                    >
                      {s.correspondance}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data.imc.note && (
            <p className="mt-3 text-xs text-stone-400 leading-relaxed">{data.imc.note}</p>
          )}
        </div>
      )}

      {data.tourDeTaille && (
        <div className="border border-stone-100 rounded-xl p-4">
          <p className="text-sm font-medium text-stone-800 mb-3">Tour de taille</p>
          <Table>
            <TableHeader>
              <TableRow className="border-stone-100">
                <TableHead className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Femme
                </TableHead>
                <TableHead className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Homme
                </TableHead>
                <TableHead className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Type
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.tourDeTaille.reperes.map((row) => (
                <TableRow key={row.type} className="border-stone-100">
                  <TableCell className="text-sm text-stone-600">{row.femme}</TableCell>
                  <TableCell className="text-sm text-stone-600">{row.homme}</TableCell>
                  <TableCell className="text-sm text-stone-600">{row.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data.tourDeTaille.note && (
            <p className="mt-3 text-xs text-stone-400 leading-relaxed">
              {data.tourDeTaille.note}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
