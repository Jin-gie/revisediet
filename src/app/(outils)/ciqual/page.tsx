import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="🥦"
      title="Table Ciqual"
      description="Recherche les valeurs nutritionnelles des aliments issus de la base Ciqual ANSES."
      backHref="/outils"
      backLabel="Outils"
    />
  );
}
