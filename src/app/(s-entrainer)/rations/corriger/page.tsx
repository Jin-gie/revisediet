import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="🔍"
      title="Ration à corriger"
      description="Une ration avec des erreurs à identifier. Sauras-tu les trouver toutes ?"
      backHref="/s-entrainer/rations"
      backLabel="Atelier rations"
    />
  );
}
