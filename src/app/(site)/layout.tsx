import Navbar from "@/components/Navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <footer className="border-t border-stone-100 bg-white mt-24">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">R</span>
              </div>
              <span className="font-serif text-base text-stone-900">RéviseDiet</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Outil pédagogique pour étudiants en BTS Diététique. Contenus basés sur les référentiels ANSES & PNNS.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">S'entraîner</p>
            <ul className="space-y-2 text-sm text-stone-500">
              <li><a href="/cas/du-jour" className="hover:text-emerald-700 transition-colors">Cas du jour</a></li>
              <li><a href="/cas" className="hover:text-emerald-700 transition-colors">Catalogue de cas</a></li>
              <li><a href="/rations" className="hover:text-emerald-700 transition-colors">Atelier rations</a></li>
              <li><a href="/quiz" className="hover:text-emerald-700 transition-colors">Quiz rapide</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Apprendre</p>
            <ul className="space-y-2 text-sm text-stone-500">
              <li><a href="/populations" className="hover:text-emerald-700 transition-colors">Fiches populations</a></li>
              <li><a href="/pathologies" className="hover:text-emerald-700 transition-colors">Fiches pathologies</a></li>
              <li><a href="/flashcards" className="hover:text-emerald-700 transition-colors">Flashcards</a></li>
              <li><a href="/glossaire" className="hover:text-emerald-700 transition-colors">Glossaire</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Outils</p>
            <ul className="space-y-2 text-sm text-stone-500">
              <li><a href="/calculateur" className="hover:text-emerald-700 transition-colors">Calculateur</a></li>
              <li><a href="/ciqual" className="hover:text-emerald-700 transition-colors">Table Ciqual</a></li>
              <li><a href="/metabolisme" className="hover:text-emerald-700 transition-colors">Voies métaboliques</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-100 px-6 py-4 max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-xs text-stone-400">© 2026 RéviseDiet</p>
          <a href="/mentions-legales" className="text-xs text-stone-400 hover:text-stone-600 transition-colors">Mentions légales</a>
        </div>
      </footer>
    </>
  );
}