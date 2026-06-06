import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="🃏"
      title="Flashcards"
      description="ANC, seuils, formules, valeurs de référence — les données à mémoriser en format carte."
      backHref="/apprendre"
      backLabel="Apprendre"
    />
  );
}
