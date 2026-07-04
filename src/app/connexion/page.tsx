"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function ConnexionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/suivi"

  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  const handleSubmit = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError("Email ou mot de passe incorrect.")
      else router.push(redirect)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError("Erreur lors de la création du compte.")
      else setSuccess("Compte créé ! Vérifie ton email pour confirmer.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-stone-900 mb-2">
            {mode === "login" ? "Se connecter" : "Créer un compte"}
          </h1>
          <p className="text-sm text-stone-400">
            {mode === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null) }}
              className="text-emerald-700 hover:underline font-medium"
            >
              {mode === "login" ? "Créer un compte" : "Se connecter"}
            </button>
          </p>
        </div>

        <div className="bg-white border border-stone-100 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.fr"
              className="w-full px-3 py-2.5 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}
          {success && (
            <p className="text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">{success}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
            className="w-full bg-emerald-700 text-white font-medium text-sm py-2.5 rounded-xl hover:bg-emerald-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Chargement…" : mode === "login" ? "Se connecter" : "Créer le compte"}
          </button>
        </div>
      </div>
    </div>
  )
}