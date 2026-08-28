// components/ReferenceCard.tsx
import Link from "next/link"
import { Reference } from "@/data/references"

export default function ReferenceCard({ reference }: { reference: Reference }) {

  return (
    <div className="border border-stone-100 rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl flex-shrink-0">{reference.emoji}</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-stone-900 leading-snug">
            {reference.acronyme}
          </p>
          <p className="text-xs text-stone-400 leading-snug">{reference.nom}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="px-2 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-700 rounded-full">
          {reference.organisme}
        </span>
        <span className="px-2 py-0.5 text-[11px] font-medium bg-stone-50 text-stone-500 rounded-full">
          {reference.periode}
        </span>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed mb-3">{reference.description}</p>

      {reference.pointsCles.length > 0 && (
        <ul className="space-y-1.5 mb-3 pt-2 border-t border-stone-100">
          {reference.pointsCles.map((pt) => (
            <li key={pt} className="flex items-start gap-2 text-xs text-stone-500">
              <span className="text-emerald-400 mt-0.5 flex-shrink-0">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Liens : site officiel / PDF / page interne */}
      <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-stone-100">
        {reference.lienOfficiel && (
          <a
            href={reference.lienOfficiel}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Site officiel ↗
          </a>
        )}

        {reference.lienPdf && (
          <a
            href={reference.lienPdf}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path d="M10 12.5a.75.75 0 0 0 .75-.75V4a.75.75 0 0 0-1.5 0v7.75a.75.75 0 0 0 .75.75Z" />
              <path d="M6.28 8.72a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 1 0-1.06-1.06L10 12.44 6.28 8.72Z" />
              <path d="M4 13.25a.75.75 0 0 0-1.5 0v1A2.75 2.75 0 0 0 5.25 17h9.5A2.75 2.75 0 0 0 17.5 14.25v-1a.75.75 0 0 0-1.5 0v1c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-1Z" />
            </svg>
            Télécharger le PDF
          </a>
        )}

        {reference.lienInterne && (
          <Link
            href={reference.lienInterne}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-emerald-700 transition-colors"
          >
            {reference.lienInterneLabel || "Voir sur le site →"}
          </Link>
        )}
      </div>
    </div>
  )
}