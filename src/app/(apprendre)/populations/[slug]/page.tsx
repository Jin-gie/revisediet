import { notFound } from "next/navigation";
import Link from "next/link";
import { getPopulation, POPULATIONS } from "@/data/populations";

export async function generateStaticParams() {
  return POPULATIONS.map((p) => ({ slug: p.slug }));
}

// ── Composant graphique AET (barres horizontales) ─────────────────────────────
function AETTable({ valeurs }: { valeurs: { profil: string; kcal: string }[] }) {
  return (
    <div className="divide-y divide-stone-100">
      {valeurs.map((v) => (
        <div key={v.profil} className="flex items-center justify-between py-2.5">
          <span className="text-sm text-stone-600">{v.profil}</span>
          <span className="text-sm font-semibold text-emerald-700 tabular-nums">{v.kcal}</span>
        </div>
      ))}
    </div>
  );
}

// ── Donut macronutriments (SVG pur) ──────────────────────────────────────────
function MacroDonut({ macros }: { macros: { label: string; percent: number; color: string }[] }) {
  const r = 56;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * r;
  const gap = 2; // degrés de séparation entre segments

  let cumulative = 0;
  const segments = macros.map((m) => {
    const start = cumulative;
    cumulative += m.percent;
    return { ...m, start };
  });

  return (
    <div className="flex items-center gap-8">
      <svg width="140" height="140" viewBox="0 0 140 140">
        {segments.map((seg) => {
          const startAngle = (seg.start / 100) * 360 - 90 + gap / 2;
          const endAngle = ((seg.start + seg.percent) / 100) * 360 - 90 - gap / 2;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const x1 = cx + r * Math.cos(startRad);
          const y1 = cy + r * Math.sin(startRad);
          const x2 = cx + r * Math.cos(endRad);
          const y2 = cy + r * Math.sin(endRad);
          const largeArc = seg.percent > 50 ? 1 : 0;
          return (
            <path
              key={seg.label}
              d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={seg.color}
              opacity={0.9}
            />
          );
        })}
        {/* Trou central */}
        <circle cx={cx} cy={cy} r={36} fill="white" />
        <text x={cx} y={cy - 4} textAnchor="middle" className="text-xs" fontSize="11" fill="#78716c" fontFamily="inherit">
          Répartition
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="10" fill="#78716c" fontFamily="inherit">
          des macros
        </text>
      </svg>

      <div className="space-y-3">
        {macros.map((m) => (
          <div key={m.label} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: m.color }} />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-stone-800">{m.percent}%</span>
                <span className="text-sm text-stone-500">{m.label}</span>
              </div>
              <div className="w-32 h-1.5 bg-stone-100 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${m.percent}%`, backgroundColor: m.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-6">
      <h2 className="font-serif text-xl text-stone-900 mb-5 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h2>
      {children}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function PopulationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;  
  const pop = getPopulation(slug);
  if (!pop) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-xs text-stone-400 mb-8">
        <Link href="/populations" className="hover:text-emerald-700 transition-colors">
          Fiches populations
        </Link>
        <span>/</span>
        <span className="text-stone-600">{pop.label}</span>
      </div>

      {/* En-tête fiche */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl">{pop.emoji}</span>
          <div>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {pop.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-serif text-4xl text-stone-900">{pop.label}</h1>
          </div>
        </div>
        <p className="text-stone-500 text-sm max-w-xl ml-[4.5rem]">{pop.description}</p>
      </div>

      <div className="space-y-5">
        {/* AET */}
        <Section title="Apport énergétique total (AET)" emoji="🔥">
          <p className="text-sm text-stone-400 mb-4">{pop.aet.description}</p>
          <AETTable valeurs={pop.aet.valeurs} />
        </Section>

        {/* Macronutriments */}
        <Section title="Répartition des macronutriments" emoji="📊">
          <MacroDonut macros={pop.macros} />
          <ul className="mt-6 space-y-1.5">
            {pop.macrosNotes.map((note) => (
              <li key={note} className="flex items-start gap-2 text-sm text-stone-500">
                <span className="text-emerald-400 mt-0.5">•</span>
                {note}
              </li>
            ))}
          </ul>
        </Section>

        {/* Micronutriments */}
        <Section title="Micronutriments clés" emoji="💊">
          <div className="space-y-4">
            {pop.micronutriments.map((m) => (
              <div key={m.nutrient} className="border border-stone-100 rounded-xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-stone-800">{m.nutrient}</h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg tabular-nums">
                    {m.valeur}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mb-2.5">{m.role}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.sources.map((s) => (
                    <span key={s} className="text-[11px] bg-stone-50 text-stone-500 px-2 py-0.5 rounded-md border border-stone-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Aliments */}
        <div className="grid md:grid-cols-2 gap-5">
          <Section title="Aliments à favoriser" emoji="✅">
            <div className="space-y-4">
              {pop.alimentsFavoriser.map((g) => (
                <div key={g.groupe}>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">{g.groupe}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <span key={item} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-100">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Aliments à limiter" emoji="⚠️">
            <ul className="space-y-2">
              {pop.alimentsLimiter.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                  {a}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Conseils + Points de vigilance */}
        <div className="grid md:grid-cols-2 gap-5">
          <Section title="Conseils pratiques" emoji="💡">
            <ul className="space-y-3">
              {pop.conseils.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-stone-600">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">→</span>
                  {c}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Points de vigilance" emoji="🔴">
            <ul className="space-y-3">
              {pop.pointsVigilance.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-stone-600">
                  <span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">!</span>
                  {p}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Navigation entre fiches */}
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/populations"
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-emerald-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Toutes les populations
          </Link>
          <Link
            href={`/s-entrainer/cas/aleatoire?population=${pop.slug}`}
            className="text-sm font-medium bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
          >
            S'entraîner sur ce profil →
          </Link>
        </div>
      </div>
    </div>
  );
}
