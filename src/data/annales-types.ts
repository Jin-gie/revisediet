// lib/supabase/annales-types.ts
// Types et helpers partagés entre composants serveur et client (aucune dépendance à next/headers)
 
export type Sujet = {
  id: string;
  annee: number;
  epreuve: string | null;
  titre: string | null;
  themes: string[];
  fichier_path: string;
  disponible: boolean;
};
 
export type Matiere = {
  id: string;
  code: string;
  nom: string;
  slug: string;
  referentiel: "ancien" | "nouveau";
  ordre: number;
  sujets: Sujet[];
};
 
// Le bucket est public : pas besoin d'un client Supabase pour construire l'URL.
export function getPdfUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/annales-bts/${path}`;
}
 