import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SuiviClient from "@/components/SuiviClient"

export default async function SuiviPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/connexion?redirect=/suivi")

  console.log(user.id)

  const [{ data: subjects }, { data: modules }, { data: exercices }] = await Promise.all([
    supabase
      .from("subjects")
      .select("*")
      .eq("user_id", user.id)
      .order("position", { ascending: true }),
    supabase
      .from("modules")
      .select("*")
      .eq("user_id", user.id)
      .order("position", { ascending: true }),
    supabase
      .from("corrected_exercises")
      .select("*")
      .eq("user_id", user.id)
      .order("position", { ascending: true }),
  ])

  return (
    <SuiviClient
      userId={user.id}
      initialSubjects={subjects ?? []}
      initialModules={modules ?? []}
      initialExercices={exercices ?? []}
    />
  )
}