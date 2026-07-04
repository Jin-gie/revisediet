import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { POPULATIONS } from "@/data/populations"
import { PATHOLOGIES } from "@/data/pathologies"
import SuiviClient from "@/components/SuiviClient"

export default async function SuiviPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/connexion?redirect=/suivi")

  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)

  const items = [
    ...POPULATIONS.map((p) => ({ type: "population" as const, slug: p.slug, label: p.label, emoji: p.emoji })),
    ...PATHOLOGIES.map((p) => ({ type: "pathologie" as const, slug: p.slug, label: p.label, emoji: p.emoji })),
  ]

  return <SuiviClient items={items} progress={progress ?? []} userId={user.id} />
}