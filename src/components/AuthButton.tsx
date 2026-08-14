"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export default function AuthButton() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/suivi"
          className="text-sm font-medium text-stone-500 hover:text-stone-800 px-3 py-2 rounded-lg hover:bg-stone-50 transition-all"
        >
          Mes révisions
        </Link>
        <button
          onClick={signOut}
          className="text-sm font-medium text-stone-400 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all"
        >
          Déconnexion
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/connexion"
        className="hidden sm:block text-sm font-medium text-stone-500 hover:text-stone-800 px-3 py-2 rounded-lg hover:bg-stone-50 transition-all"
      >
        Se connecter
      </Link>
      <Link
        href="/connexion?mode=register"
        className="text-sm font-medium bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
      >
        Créer un compte
      </Link>
    </div>
  )
}