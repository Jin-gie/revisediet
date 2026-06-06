import Link from "next/link";

// ── Données ──────────────────────────────────────────────────────────────────

const STATS = [
  { value: "12", label: "Populations" },
  { value: "18", label: "Pathologies" },
  { value: "∞",  label: "Cas générés" },
  { value: "100%", label: "Gratuit" },
];

const SECTIONS = [
  {
    tag: "S'entraîner",
    tagColor: "bg-emerald-50 text-emerald-700",
    title: "Pense comme\nune diét'",
    description:
      "Des profils patients générés aléatoirement. Tu calcules, tu construis, tu justifies. L'app te dit ce qui cloche.",
    cta: "Lancer un cas →",
    ctaHref: "/s-entrainer/cas/aleatoire",
    ctaStyle: "bg-emerald-700 text-white hover:bg-emerald-800",
    items: [
      { emoji: "🎯", label: "Cas cliniques interactifs", href: "/cas" },
      { emoji: "🍽️", label: "Atelier rations", href: "/rations" },
      { emoji: "🔍", label: "Ration à corriger", href: "/rations/corriger" },
      { emoji: "⚡", label: "Quiz rapide", href: "/quiz" },
    ],
  },
  {
    tag: "Apprendre",
    tagColor: "bg-amber-50 text-amber-700",
    title: "Les bases,\nbien posées",
    description:
      "Fiches synthétiques par population et pathologie. Flashcards, glossaire, formules. Pour que les fondamentaux rentrent.",
    cta: "Explorer les fiches →",
    ctaHref: "/apprendre",
    ctaStyle: "bg-stone-900 text-white hover:bg-stone-800",
    items: [
      { emoji: "👥", label: "Fiches populations", href: "/populations" },
      { emoji: "🩺", label: "Fiches pathologies", href: "/pathologies" },
      { emoji: "🃏", label: "Flashcards ANC & valeurs", href: "/flashcards" },
      { emoji: "📐", label: "Références & formules", href: "/references" },
    ],
  },
];

const POPULATIONS = [
  { emoji: "🧑", label: "Adulte sain", href: "/populations/adulte" },
  { emoji: "👶", label: "Enfant / ado", href: "/populations/enfant" },
  { emoji: "🤰", label: "Femme enceinte", href: "/populations/grossesse" },
  { emoji: "👴", label: "Personne âgée", href: "/populations/personne-agee" },
  { emoji: "🏃", label: "Sportif", href: "/populations/sportif" },
  { emoji: "🌿", label: "Végétarien / vegan", href: "/populations/vegetarien" },
];

const PATHOLOGIES = [
  { emoji: "🩸", label: "Diabète (1 & 2)", href: "/pathologies/diabete" },
  { emoji: "⚖️", label: "Obésité / surpoids", href: "/pathologies/obesite" },
  { emoji: "❤️", label: "MCV", href: "/pathologies/mcv" },
  { emoji: "🫘", label: "IRC / maladies rénales", href: "/pathologies/irc" },
  { emoji: "📉", label: "Dénutrition", href: "/pathologies/denutrition" },
  { emoji: "🔄", label: "TCA", href: "/pathologies/tca" },
];

const TOOLS = [
  { emoji: "🧮", label: "Calculateur de besoins", sub: "AET, IMC, NAP", href: "/calculateur" },
  { emoji: "🥦", label: "Table Ciqual", sub: "Valeurs nutritionnelles", href: "/ciqual" },
  { emoji: "🔬", label: "Voies métaboliques", sub: "Visualisation React Flow", href: "/metabolisme" },
];

// ── Composants ────────────────────────────────────────────────────────────────

function StatBar() {
  return (
    <div className="border-t border-stone-100 mt-12">
      <div className="max-w-2xl mx-auto px-6 py-8 flex justify-around">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-serif text-3xl text-emerald-700">{s.value}</p>
            <p className="text-xs text-stone-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionCard({ section }: { section: typeof SECTIONS[0] }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-7 flex flex-col">
      <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5 ${section.tagColor}`}>
        {section.tag}
      </span>
      <h2 className="font-serif text-2xl leading-tight mb-3 whitespace-pre-line">
        {section.title}
      </h2>
      <p className="text-sm text-stone-400 leading-relaxed mb-6">{section.description}</p>
      <ul className="space-y-2 mb-7 flex-1">
        {section.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 text-sm font-medium text-stone-700 hover:text-emerald-800 transition-all group"
            >
              <span>{item.emoji}</span>
              {item.label}
              <svg className="ml-auto w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={section.ctaHref}
        className={`text-center text-sm font-medium px-5 py-3 rounded-xl transition-colors ${section.ctaStyle}`}
      >
        {section.cta}
      </Link>
    </div>
  );
}

function FicheGrid({ title, items }: { title: string; items: typeof POPULATIONS }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2.5 px-3.5 py-3 bg-white border border-stone-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/40 transition-all group"
          >
            <span className="text-lg">{item.emoji}</span>
            <span className="text-sm font-medium text-stone-700 group-hover:text-emerald-800 transition-colors">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-4 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-7 animate-fade-in">
          <span>🌱</span> Outil de révision BTS Diététique
        </div>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.08] text-stone-900 mb-5 animate-fade-up">
          Révise la nutrition
          <br />
          <em className="text-emerald-700">comme en stage</em>
        </h1>
        <p className="text-base text-stone-400 max-w-md mx-auto leading-relaxed mb-8 animate-fade-up animation-delay-100">
          Cas cliniques interactifs, fiches populations & pathologies, atelier rations. Tout ce qu'il faut pour le BTS — sans s'ennuyer.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap animate-fade-up animation-delay-200">
          <Link
            href="/s-entrainer/cas/aleatoire"
            className="bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-emerald-800 transition-colors text-sm"
          >
            Lancer un cas clinique →
          </Link>
          <Link
            href="/apprendre"
            className="bg-white border border-stone-200 text-stone-700 font-medium px-6 py-3 rounded-xl hover:border-stone-300 hover:bg-stone-50 transition-all text-sm"
          >
            Explorer les fiches
          </Link>
        </div>
      </section>

      <StatBar />

      {/* ── SECTIONS PRINCIPALES ── */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-2 gap-5">
          {SECTIONS.map((s) => (
            <SectionCard key={s.tag} section={s} />
          ))}
        </div>
      </section>

      {/* ── ACCÈS RAPIDE FICHES ── */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-stone-900">Accès rapide aux fiches</h2>
          <Link href="/apprendre" className="text-sm text-emerald-700 hover:underline">
            Voir tout →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <FicheGrid title="Populations" items={POPULATIONS} />
          <FicheGrid title="Pathologies" items={PATHOLOGIES} />
        </div>
      </section>

      {/* ── CAS DU JOUR ── */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="bg-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Décoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600 rounded-full -translate-y-1/2 translate-x-1/4 opacity-50" />
          <div className="absolute bottom-0 right-16 w-24 h-24 bg-emerald-800 rounded-full translate-y-1/2 opacity-40" />

          <div className="relative">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200 block mb-3">
              📅 Cas du jour
            </span>
            <h2 className="font-serif text-2xl md:text-3xl mb-2">
              Un nouveau profil patient chaque matin
            </h2>
            <p className="text-emerald-100 text-sm mb-6 max-w-md">
              Femme, 72 ans, IRC stade 3, diabétique de type 2 — calcule ses besoins et construis sa ration.
            </p>
            <Link
              href="/s-entrainer/cas/du-jour"
              className="inline-flex items-center gap-2 bg-white text-emerald-800 font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Commencer le cas du jour →
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUTILS ── */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-stone-900">Outils</h2>
          <Link href="/outils" className="text-sm text-emerald-700 hover:underline">
            Voir tout →
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
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
            Suis ta progression
          </h2>
          <p className="text-stone-500 text-sm mb-6 max-w-sm mx-auto">
            Crée un compte gratuit pour sauvegarder tes résultats, tes fiches favorites et suivre tes révisions.
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
