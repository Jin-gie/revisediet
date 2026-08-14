"use client";
import AuthButton from "@/components/AuthButton"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Logo from "@/assets/logo.svg";

const NAV_ITEMS = [
  {
    label: "S'entraîner",
    href: "/s-entrainer",
    sections: [
      {
        title: "Cas cliniques",
        items: [
          { emoji: "🎯", label: "Cas du jour", sub: "Un profil patient chaque matin", href: "/cas/du-jour" },
          { emoji: "📋", label: "Catalogue de cas", sub: "Filtrer par population ou pathologie", href: "/cas" },
          { emoji: "🎲", label: "Cas aléatoire", sub: "Profil généré à la volée", href: "/cas/aleatoire" },
        ],
      },
      {
        title: "S'exercer",
        items: [
          { emoji: "🍽️", label: "Atelier rations", sub: "Construire et vérifier un menu", href: "/rations" },
          { emoji: "🔍", label: "Ration à corriger", sub: "Trouver les erreurs d'un menu", href: "/rations/corriger" },
          { emoji: "⚡", label: "Quiz rapide", sub: "5 questions en 3 minutes", href: "/quiz" },
        ],
      },
    ],
  },
  {
    label: "Apprendre",
    href: "/apprendre",
    sections: [
      {
        title: "Fiches",
        items: [
          { emoji: "👥", label: "Par population", sub: "Adulte, enfant, sportif, senior…", href: "/populations" },
          { emoji: "🩺", label: "Par pathologie", sub: "Diabète, IRC, obésité, TCA…", href: "/pathologies" },
        ],
      },
      {
        title: "Outils de révision",
        items: [
          { emoji: "🃏", label: "Flashcards", sub: "ANC, formules, valeurs clés", href: "/flashcards" },
          { emoji: "📖", label: "Glossaire", sub: "Termes & définitions", href: "/glossaire" },
          { emoji: "📐", label: "Références & formules", sub: "PNNS, ANSES, Harris-Benedict…", href: "/references" },
        ],
      },
    ],
  },
  {
    label: "Outils",
    href: "/outils",
    sections: [
      {
        title: "Calculateurs",
        items: [
          { emoji: "🧮", label: "Besoins énergétiques", sub: "AET, IMC, NAP", href: "/calculateur" },
          { emoji: "🥦", label: "Table Ciqual", sub: "Valeurs nutritionnelles des aliments", href: "/ciqual" },
        ],
      },
      {
        title: "Autres",
        items: [
          { emoji: "🔬", label: "Voies métaboliques", sub: "Visualisation React Flow", href: "/metabolisme" },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setOpen(null);
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-999 bg-white/90 backdrop-blur-md border-b border-stone-100"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div> */}
          <Logo className="w-7 h-7" />
          <span className="font-serif text-lg text-stone-900 group-hover:text-emerald-700 transition-colors">
            RéviseDiet
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.sections
                .flatMap(s => s.items)
                .some(i => pathname.startsWith(i.href));
            const isOpen = open === item.label;

            return (
              <div key={item.label} className="relative">
                <button
                  onClick={() => setOpen(isOpen ? null : item.label)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive || isOpen
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                  }`}
                >
                  {item.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Dropdown */}
                {isOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 bg-white border border-stone-100 rounded-2xl shadow-sm shadow-stone-100 p-2 min-w-[260px] z-50">
                    {item.sections.map((section, si) => (
                      <div key={section.title}>
                        {si > 0 && <div className="h-px bg-stone-100 my-2" />}
                        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest px-2.5 pt-2 pb-1">
                          {section.title}
                        </p>
                        {section.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-stone-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-base flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                              {sub.emoji}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-stone-800">{sub.label}</p>
                              <p className="text-xs text-stone-400">{sub.sub}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right */}
        <AuthButton />
      </div>
    </nav>
  );
}
