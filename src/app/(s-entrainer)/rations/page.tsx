import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="🍽️"
      title="Atelier rations"
      description="Construire et vérifier un menu complet pour un patient donné, en temps réel."
      backHref="/s-entrainer/rations"
      backLabel="Atelier rations"
    />
  );
}