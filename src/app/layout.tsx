import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "RéviseDiet — Révise la diététique autrement",
  description:
    "Cas cliniques interactifs, fiches populations & pathologies, atelier rations. Tout ce qu'il faut pour le BTS Diététique.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`light ${dmSans.variable} ${dmSerif.variable}`} style={{ colorScheme: "light" }}>
      <body className="bg-white text-stone-900 antialiased" style={{ colorScheme: "light" }}>
        <Navbar />
        <main>{children}</main>
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
                <li><a href="/s-entrainer/cas/du-jour" className="hover:text-emerald-700 transition-colors">Cas du jour</a></li>
                <li><a href="/s-entrainer/cas" className="hover:text-emerald-700 transition-colors">Catalogue de cas</a></li>
                <li><a href="/s-entrainer/rations" className="hover:text-emerald-700 transition-colors">Atelier rations</a></li>
                <li><a href="/s-entrainer/quiz" className="hover:text-emerald-700 transition-colors">Quiz rapide</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Apprendre</p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><a href="/apprendre/populations" className="hover:text-emerald-700 transition-colors">Fiches populations</a></li>
                <li><a href="/apprendre/pathologies" className="hover:text-emerald-700 transition-colors">Fiches pathologies</a></li>
                <li><a href="/apprendre/flashcards" className="hover:text-emerald-700 transition-colors">Flashcards</a></li>
                <li><a href="/apprendre/glossaire" className="hover:text-emerald-700 transition-colors">Glossaire</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Outils</p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><a href="/outils/calculateur" className="hover:text-emerald-700 transition-colors">Calculateur</a></li>
                <li><a href="/outils/ciqual" className="hover:text-emerald-700 transition-colors">Table Ciqual</a></li>
                <li><a href="/outils/metabolisme" className="hover:text-emerald-700 transition-colors">Voies métaboliques</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-100 px-6 py-4 max-w-6xl mx-auto flex items-center justify-between">
            <p className="text-xs text-stone-400">© 2026 RéviseDiet</p>
            <a href="/mentions-legales" className="text-xs text-stone-400 hover:text-stone-600 transition-colors">Mentions légales</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
