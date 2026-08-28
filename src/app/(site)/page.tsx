import Link from "next/link";
import { POPULATIONS } from "@/data/populations";
import { PATHOLOGIES } from "@/data/pathologies";

// ── Données ──────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    tag: "Conception alimentation",
    tagColor: "bg-emerald-50 text-emerald-700",
    title: "Construire une\nalimentation équilibrée",
    description:
      "Besoins énergétiques, repères journaliers, tailles de portions — une fiche par population, de l'adulte à la personne âgée.",
    cta: "Voir les fiches populations →",
    ctaHref: "/population",
    items: POPULATIONS.slice(0, 4).map((p) => ({
      emoji: p.emoji,
      label: p.label,
      href: `/population/${p.slug}`,
    })),
  },
  {
    tag: "Thérapeutique",
    tagColor: "bg-stone-100 text-stone-700",
    title: "Adapter un régime\nà une pathologie",
    description:
      "Physiopathologie, diagnostic, complications puis prise en charge diététique — pour comprendre avant de prescrire.",
    cta: "Voir les fiches pathologies →",
    ctaHref: "/pathologies",
    items: PATHOLOGIES.map((p) => ({
      emoji: p.emoji,
      label: p.labelCourt,
      href: `/pathologies/${p.slug}`,
    })),
  },
];

const TOOLS = [
  { emoji: "🧮", label: "Calculateur de besoins", sub: "AET, IMC, NAP", href: "/calculateur" },
  { emoji: "🥦", label: "Table Ciqual", sub: "Valeurs nutritionnelles des aliments", href: "/ciqual" },
  { emoji: "🔬", label: "Voies métaboliques", sub: "Visualisation des voies à connaître", href: "/metabolisme" },
  { emoji: "📐", label: "Références", sub: "PNNS, GEMRCN, ANSES, HAS…", href: "/references" },
];

// ── Composants ────────────────────────────────────────────────────────────────

function PillarCard({ pillar }: { pillar: typeof PILLARS[0] }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-7 flex flex-col">
      <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5 ${pillar.tagColor}`}>
        {pillar.tag}
      </span>
      <h2 className="font-serif text-2xl leading-tight mb-3 whitespace-pre-line">
        {pillar.title}
      </h2>
      <p className="text-sm text-stone-400 leading-relaxed mb-6">{pillar.description}</p>
      <ul className="space-y-2 mb-7 flex-1">
        {pillar.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 text-sm font-medium text-stone-700 hover:text-emerald-800 transition-all group"
            >
              <span>{item.emoji}</span>
              {item.label}
              <svg className="ml-auto w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={pillar.ctaHref}
        className="text-center text-sm font-medium px-5 py-3 rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-colors"
      >
        {pillar.cta}
      </Link>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-7 fade-up" style={{ animationDelay: "0ms" }}>
          <span>🌱</span> Outil de révision · BTS Diététique
        </div>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.08] text-stone-900 mb-5 fade-up" style={{ animationDelay: "60ms" }}>
          Révise le BTS diététique
        </h1>
        <p className="text-base text-stone-400 max-w-md mx-auto leading-relaxed mb-8 fade-up" style={{ animationDelay: "120ms" }}>
          Repères par population, prise en charge par pathologie, outils de calcul — construit à partir du programme.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap fade-up" style={{ animationDelay: "180ms" }}>
          <Link
            href="/population"
            className="bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-emerald-800 transition-colors text-sm"
          >
            Voir les fiches populations →
          </Link>
          <Link
            href="/pathologies"
            className="bg-white border border-stone-200 text-stone-700 font-medium px-6 py-3 rounded-xl hover:border-stone-300 hover:bg-stone-50 transition-all text-sm"
          >
            Fiches pathologies
          </Link>
        </div>
      </section>

      {/* ── LES DEUX PILIERS ── */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-2 gap-5">
          {PILLARS.map((p) => (
            <PillarCard key={p.tag} pillar={p} />
          ))}
        </div>
      </section>

      {/* ── OUTILS ── */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-stone-900">Outils</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-white border border-stone-100 rounded-2xl p-5 hover:border-emerald-200 hover:shadow-sm transition-all group"
            >
              <span className="text-2xl block mb-3">{tool.emoji}</span>
              <p className="font-medium text-stone-800 text-sm mb-1 group-hover:text-emerald-800 transition-colors">
                {tool.label}
              </p>
              <p className="text-xs text-stone-400">{tool.sub}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA COMPTE ── */}
      <section className="max-w-4xl mx-auto px-6 mt-16 mb-4">
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl text-stone-900 mb-3">
            kcal ou kJ, à toi de choisir
          </h2>
          <p className="text-stone-500 text-sm mb-6 max-w-sm mx-auto">
            Crée un compte gratuit pour fixer ta préférence d'unité une fois pour toutes — elle te suit sur tout le site, à chaque connexion.
          </p>
          <Link
            href="/connexion?mode=register"
            className="inline-flex bg-emerald-700 text-white font-medium text-sm px-6 py-3 rounded-xl hover:bg-emerald-800 transition-colors"
          >
            Créer un compte gratuitement →
          </Link>
        </div>
      </section>
    </div>
  );
}