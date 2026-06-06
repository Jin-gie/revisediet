import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  return (
    <ComingSoon
      emoji="📖"
      title="Glossaire"
      description="Les termes clés de la diététique et de la nutrition, définis clairement."
      backHref="/apprendre"
      backLabel="Apprendre"
    />
  );
}
