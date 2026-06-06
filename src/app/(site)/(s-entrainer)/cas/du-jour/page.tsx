import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="📅"
      title="Cas du jour"
      description="Un nouveau profil patient chaque matin. Reviens demain si tu l'as déjà fait !"
      backHref="/s-entrainer/cas"
      backLabel="Catalogue de cas"
    />
  );
}
