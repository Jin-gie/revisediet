import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="👥"
      title="Fiches populations"
      description="Une fiche par profil : AET, macronutriments, micronutriments clés, aliments phares."
      backHref="/apprendre"
      backLabel="Apprendre"
    />
  );
}
