import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="🧮"
      title="Calculateur de besoins"
      description="Calcule l'AET, l'IMC et les besoins en macronutriments à partir d'un profil patient."
      backHref="/outils"
      backLabel="Outils"
    />
  );
}
