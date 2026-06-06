import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="🎲"
      title="Cas aléatoire"
      description="Un profil patient généré à la volée. Population, pathologie, contexte — tout est aléatoire."
      backHref="/s-entrainer/cas"
      backLabel="Catalogue de cas"
    />
  );
}
