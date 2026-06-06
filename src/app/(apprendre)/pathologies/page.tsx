import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="🩺"
      title="Fiches pathologies"
      description="Diabète, IRC, obésité, TCA, dénutrition, MCV — les pathologies du programme BTS."
      backHref="/apprendre"
      backLabel="Apprendre"
    />
  );
}
