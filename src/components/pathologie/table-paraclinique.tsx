// components/pathologie/table-paraclinique.tsx
import type { ExamenParaclinique } from "@/data/pathologies/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableParaclinique({ items }: { items: ExamenParaclinique[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-stone-800 mb-2.5">Paraclinique</p>
      <div className="border border-stone-100 rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-stone-100">
              <TableHead className="w-10" />
              <TableHead className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Examen
              </TableHead>
              <TableHead className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Détail
              </TableHead>
              <TableHead className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Valeurs / seuils
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((e) => (
              <TableRow key={e.nom} className="border-stone-100">
                <TableCell className="text-lg">{e.emoji}</TableCell>
                <TableCell className="font-medium text-sm text-stone-800">{e.nom}</TableCell>
                <TableCell className="text-sm text-stone-600">{e.detail}</TableCell>
                <TableCell className="text-sm text-stone-600">
                  {e.valeursSeuil ?? "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
