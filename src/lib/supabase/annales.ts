// lib/supabase/annales.ts
// SERVEUR UNIQUEMENT — ne jamais importer ce fichier depuis un composant "use client"
import { createClient } from "@/lib/supabase/server";
import { Matiere } from "@/data/annales-types";

export async function getAnnales(): Promise<Matiere[]> {
  const supabase = await createClient();

  const { data: matieres, error: mErr } = await supabase
    .from("matieres")
    .select("*")
    .order("referentiel", { ascending: false })
    .order("ordre");

  if (mErr || !matieres) throw mErr;

  const { data: sujets, error: sErr } = await supabase
    .from("sujets")
    .select("*")
    .order("annee", { ascending: false });

  if (sErr) throw sErr;

  const fichiersExistants = new Set<string>();

  for (const m of matieres) {
    const { data: files, error: listErr } = await supabase.storage
      .from("annales-bts")
      .list(m.slug);

    if (listErr) {
      console.error(`Erreur listing bucket pour ${m.slug}:`, listErr);
      continue;
    }

    for (const f of files ?? []) {
      if (f.name === ".emptyFolderPlaceholder") continue;
      fichiersExistants.add(`${m.slug}/${f.name}`);
    }
  }

  return matieres.map((m) => ({
    ...m,
    sujets: (sujets ?? [])
      .filter((s) => s.matiere_id === m.id)
      .map((s) => ({
        ...s,
        disponible: fichiersExistants.has(s.fichier_path),
      })),
  }));
}