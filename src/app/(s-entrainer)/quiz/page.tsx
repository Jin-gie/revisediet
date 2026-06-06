import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="⚡"
      title="Quiz rapide"
      description="5 questions, 3 minutes. ANC, formules, aliments clés — teste tes connaissances."
      backHref="/s-entrainer"
      backLabel="S'entraîner"
    />
  );
}
