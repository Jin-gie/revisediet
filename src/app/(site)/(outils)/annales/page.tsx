// app/outils/annales/page.tsx
import { getAnnales } from "@/lib/supabase/annales";
import AnnalesExplorer from "@/components/AnnalesExplorer";

export const revalidate = 3600;

export default async function AnnalesPage() {
  const matieres = await getAnnales();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-2">
          Outils
        </p>
        <h1 className="font-serif text-4xl text-stone-900 mb-3">Annales</h1>
        <p className="text-stone-400 text-sm max-w-lg">
          Tous les sujets du BTS Diététique depuis 2000, classés par matière et par thème.
        </p>
      </div>

      <AnnalesExplorer matieres={matieres} />
    </div>
  );
}