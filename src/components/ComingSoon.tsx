import Link from "next/link";

interface ComingSoonProps {
  emoji: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}

export default function ComingSoon({
  emoji,
  title,
  description,
  backHref = "/",
  backLabel = "Retour à l'accueil",
}: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <span className="text-5xl mb-5">{emoji}</span>
      <h1 className="font-serif text-3xl text-stone-900 mb-3">{title}</h1>
      <p className="text-stone-400 text-sm max-w-sm leading-relaxed mb-8">{description}</p>
      {/* <Link
        href={backHref}
        className="text-sm font-medium text-emerald-700 hover:underline"
      >
      </Link> */}
    </div>
  );
}
