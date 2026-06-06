import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="📋"
      title="Catalogue de cas"
      description="Tous les cas cliniques, filtrables par population ou pathologie."
      backHref="/s-entrainer"
      backLabel="S'entraîner"
    />
  );
}
