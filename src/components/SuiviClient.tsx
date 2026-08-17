"use client"

import { useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"

// ------------------------------------------------------------------
// Types (miroir des tables Supabase : subjects / modules / corrected_exercises)
// ------------------------------------------------------------------

type SubjectRow = {
  id: string
  user_id: string
  label: string
  position: number
  has_etude_cas: boolean
  created_at: string
}

type ModuleRow = {
  id: string
  user_id: string
  subject_id: string
  label: string
  position: number
  has_exercice: boolean
  cours_vu: boolean
  cours_vu_le: string | null
  fiche_faite: boolean
  fiche_faite_le: string | null
  exercice_fait: boolean
  exercice_fait_le: string | null
  has_etude_cas: boolean
  etude_cas_faite: boolean
  etude_cas_faite_le: string | null
}

type ExerciceRow = {
  id: string
  user_id: string
  subject_id: string
  label: string
  position: number
  rendu: boolean
  rendu_le: string | null
  corrige: boolean
  corrige_le: string | null
}

type ModuleField = "cours_vu" | "fiche_faite" | "exercice_fait" | "etude_cas_faite"
type ExerciceField = "rendu" | "corrige"

// ------------------------------------------------------------------
// Petits composants UI réutilisables
// ------------------------------------------------------------------

function TrashIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

function Check({
  checked,
  onChange,
  title,
}: {
  checked: boolean
  onChange: () => void
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      title={title}
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
        checked ? "bg-emerald-600 border-emerald-600" : "border-stone-300 hover:border-emerald-400"
      }`}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

function ProgressBar({ label, done, total }: { label: string; done: number; total: number }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div className="flex-1 min-w-[140px]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-medium text-stone-500">{label}</span>
        <span className="text-[11px] text-stone-400 tabular-nums">
          {done}/{total}
        </span>
      </div>
      <div className="bg-stone-100 rounded-full h-1.5 overflow-hidden">
        <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function EditableText({
  value,
  onSave,
  placeholder,
  className,
  inputClassName,
}: {
  value: string
  onSave: (v: string) => void
  placeholder?: string
  className?: string
  inputClassName?: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const commit = () => {
    setEditing(false)
    const trimmed = draft.trim()
    if (trimmed && trimmed !== value) onSave(trimmed)
    else setDraft(value)
  }

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur()
          if (e.key === "Escape") {
            setDraft(value)
            setEditing(false)
          }
        }}
        className={inputClassName ?? "text-sm bg-white border border-emerald-300 rounded-md px-2 py-1 outline-none"}
      />
    )
  }

  return (
    <button type="button" onClick={() => { setDraft(value); setEditing(true) }} className={className} title="Cliquer pour modifier">
      {value || placeholder}
    </button>
  )
}

// ------------------------------------------------------------------
// Formulaires d'ajout
// ------------------------------------------------------------------

function AddModuleForm({
  subjectHasEtudeCas,
  onAdd,
}: {
  subjectHasEtudeCas: boolean
  onAdd: (label: string, hasExercice: boolean, hasEtudeCas: boolean) => void
}) {
  const [label, setLabel] = useState("")
  const [hasExercice, setHasExercice] = useState(true)
  const [hasEtudeCas, setHasEtudeCas] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = label.trim()
    if (!trimmed) return
    onAdd(trimmed, hasExercice, subjectHasEtudeCas ? hasEtudeCas : false)
    setLabel("")
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-center gap-3 px-4 py-3 border-t border-stone-50">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Nouveau module…"
        className="flex-1 min-w-[160px] text-sm px-3 py-1.5 rounded-lg border border-stone-200 outline-none focus:border-emerald-400"
      />
      <label className="flex items-center gap-1.5 text-xs text-stone-500 flex-shrink-0">
        <input
          type="checkbox"
          checked={hasExercice}
          onChange={(e) => setHasExercice(e.target.checked)}
          className="rounded accent-emerald-600"
        />
        avec exercice
      </label>
      {subjectHasEtudeCas && (
        <label className="flex items-center gap-1.5 text-xs text-stone-500 flex-shrink-0">
          <input
            type="checkbox"
            checked={hasEtudeCas}
            onChange={(e) => setHasEtudeCas(e.target.checked)}
            className="rounded accent-emerald-600"
          />
          avec étude de cas
        </label>
      )}
      <button type="submit" className="text-xs font-medium text-emerald-700 hover:text-emerald-800 flex-shrink-0 px-2">
        Ajouter
      </button>
    </form>
  )
}

function AddExerciceForm({ onAdd }: { onAdd: (label: string) => void }) {
  const [label, setLabel] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = label.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setLabel("")
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-3 px-4 py-3">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Nouvel exercice corrigé…"
        className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-stone-200 bg-white outline-none focus:border-emerald-400"
      />
      <button type="submit" className="text-xs font-medium text-emerald-700 hover:text-emerald-800 flex-shrink-0 px-2">
        Ajouter
      </button>
    </form>
  )
}

function AddSubjectForm({ onAdd }: { onAdd: (label: string, hasEtudeCas: boolean) => void }) {
  const [label, setLabel] = useState("")
  const [hasEtudeCas, setHasEtudeCas] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = label.trim()
    if (!trimmed) return
    onAdd(trimmed, hasEtudeCas)
    setLabel("")
    setHasEtudeCas(false)
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-center gap-3 bg-white border border-dashed border-stone-200 rounded-2xl px-5 py-4">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Nouvelle matière…"
        className="flex-1 min-w-[180px] text-sm px-3 py-2 rounded-lg border border-stone-200 outline-none focus:border-emerald-400"
      />
      <label className="flex items-center gap-1.5 text-xs text-stone-500 flex-shrink-0">
        <input
          type="checkbox"
          checked={hasEtudeCas}
          onChange={(e) => setHasEtudeCas(e.target.checked)}
          className="rounded accent-emerald-600"
        />
        cette matière a des études de cas
      </label>
      <button type="submit" className="text-sm font-medium text-emerald-700 hover:text-emerald-800 px-3 flex-shrink-0">
        + Ajouter
      </button>
    </form>
  )
}

// ------------------------------------------------------------------
// Lignes module / exercice
// ------------------------------------------------------------------

function ModuleRow({
  module: m,
  subjectHasEtudeCas,
  onRename,
  onToggleHasExercice,
  onToggleHasEtudeCas,
  onToggleField,
  onDelete,
}: {
  module: ModuleRow
  subjectHasEtudeCas: boolean
  onRename: (id: string, label: string) => void
  onToggleHasExercice: (id: string) => void
  onToggleHasEtudeCas: (id: string) => void
  onToggleField: (id: string, field: ModuleField) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-2.5 group">
      <div className="flex-1 min-w-0">
        <EditableText
          value={m.label}
          onSave={(v) => onRename(m.id, v)}
          className="text-sm text-stone-800 font-medium hover:text-emerald-700 text-left truncate block w-full"
          inputClassName="text-sm bg-white border border-emerald-300 rounded-md px-2 py-1 outline-none w-full"
        />
        <div className="flex items-center gap-2.5 mt-0.5">
          <button type="button" onClick={() => onToggleHasExercice(m.id)} className="text-[10px] text-stone-400 hover:text-emerald-600">
            {m.has_exercice ? "retirer l'exercice" : "+ ajouter un exercice"}
          </button>
          {subjectHasEtudeCas && (
            <button type="button" onClick={() => onToggleHasEtudeCas(m.id)} className="text-[10px] text-stone-400 hover:text-emerald-600">
              {m.has_etude_cas ? "retirer l'étude de cas" : "+ ajouter une étude de cas"}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0 pt-0.5">
        <Check checked={m.cours_vu} onChange={() => onToggleField(m.id, "cours_vu")} title="Cours vu" />
        <Check checked={m.fiche_faite} onChange={() => onToggleField(m.id, "fiche_faite")} title="Fiche faite" />
        {m.has_exercice ? (
          <Check checked={m.exercice_fait} onChange={() => onToggleField(m.id, "exercice_fait")} title="Exercice fait" />
        ) : (
          <div className="w-5 h-5" />
        )}
        {subjectHasEtudeCas && (
          m.has_etude_cas ? (
            <Check checked={m.etude_cas_faite} onChange={() => onToggleField(m.id, "etude_cas_faite")} title="Étude de cas faite" />
          ) : (
            <div className="w-5 h-5" />
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => onDelete(m.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-300 hover:text-red-500 flex-shrink-0 pt-0.5"
        title="Supprimer le module"
      >
        <TrashIcon />
      </button>
    </div>
  )
}

function ExerciceRow({
  exercice: ex,
  onRename,
  onToggleField,
  onDelete,
}: {
  exercice: ExerciceRow
  onRename: (id: string, label: string) => void
  onToggleField: (id: string, field: ExerciceField) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 group">
      <EditableText
        value={ex.label}
        onSave={(v) => onRename(ex.id, v)}
        className="flex-1 min-w-0 text-sm text-stone-800 font-medium hover:text-emerald-700 text-left truncate block"
        inputClassName="flex-1 text-sm bg-white border border-emerald-300 rounded-md px-2 py-1 outline-none"
      />
      <div className="flex items-center gap-4 flex-shrink-0">
        <Check checked={ex.rendu} onChange={() => onToggleField(ex.id, "rendu")} title="Rendu" />
        <Check checked={ex.corrige} onChange={() => onToggleField(ex.id, "corrige")} title="Corrigé" />
      </div>
      <button
        type="button"
        onClick={() => onDelete(ex.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-300 hover:text-red-500 flex-shrink-0"
        title="Supprimer l'exercice"
      >
        <TrashIcon />
      </button>
    </div>
  )
}

// ------------------------------------------------------------------
// Carte matière
// ------------------------------------------------------------------

function SubjectCard({
  subject,
  modules,
  exercices,
  onRenameSubject,
  onDeleteSubject,
  onAddModule,
  onRenameModule,
  onToggleHasExercice,
  onToggleModuleHasEtudeCas,
  onToggleSubjectHasEtudeCas,
  onToggleModuleField,
  onDeleteModule,
  onAddExercice,
  onRenameExercice,
  onToggleExerciceField,
  onDeleteExercice,
}: {
  subject: SubjectRow
  modules: ModuleRow[]
  exercices: ExerciceRow[]
  onRenameSubject: (id: string, label: string) => void
  onDeleteSubject: (id: string) => void
  onAddModule: (subjectId: string, label: string, hasExercice: boolean, hasEtudeCas: boolean) => void
  onRenameModule: (id: string, label: string) => void
  onToggleHasExercice: (id: string) => void
  onToggleModuleHasEtudeCas: (id: string) => void
  onToggleSubjectHasEtudeCas: (id: string) => void
  onToggleModuleField: (id: string, field: ModuleField) => void
  onDeleteModule: (id: string) => void
  onAddExercice: (subjectId: string, label: string) => void
  onRenameExercice: (id: string, label: string) => void
  onToggleExerciceField: (id: string, field: ExerciceField) => void
  onDeleteExercice: (id: string) => void
}) {
  const coursTotal = modules.length
  const coursDone = modules.filter((m) => m.cours_vu).length

  const exoModules = modules.filter((m) => m.has_exercice)
  const exoTotal = exoModules.length
  const exoDone = exoModules.filter((m) => m.exercice_fait).length

  const casModules = modules.filter((m) => m.has_etude_cas)
  const casTotal = casModules.length
  const casDone = casModules.filter((m) => m.etude_cas_faite).length

  const corrTotal = exercices.length
  const corrDone = exercices.filter((e) => e.corrige).length

  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="text-stone-400 hover:text-emerald-600 flex-shrink-0"
          title={collapsed ? "Déplier" : "Replier"}
        >
          <ChevronIcon open={!collapsed} />
        </button>
        <EditableText
          value={subject.label}
          onSave={(v) => onRenameSubject(subject.id, v)}
          className="font-serif text-xl text-stone-900 hover:text-emerald-700 text-left flex-1 min-w-0 truncate"
          inputClassName="font-serif text-xl bg-white border border-emerald-300 rounded-md px-2 py-0.5 outline-none flex-1 min-w-0"
        />
        {!collapsed && (
          <button
            type="button"
            onClick={() => onDeleteSubject(subject.id)}
            className="text-stone-300 hover:text-red-500 flex-shrink-0"
            title="Supprimer la matière"
          >
            <TrashIcon />
          </button>
        )}
      </div>

      <div className={`px-5 pb-3 ${collapsed ? "" : "border-b border-stone-50"}`}>
        <div className="flex flex-wrap gap-4 mb-3">
          <ProgressBar label="Cours vus" done={coursDone} total={coursTotal} />
          <ProgressBar label="Exercices faits" done={exoDone} total={exoTotal} />
          {subject.has_etude_cas && <ProgressBar label="Études de cas faites" done={casDone} total={casTotal} />}
          <ProgressBar label="Exercices corrigés" done={corrDone} total={corrTotal} />
        </div>
        {!collapsed && (
          <button
            type="button"
            onClick={() => onToggleSubjectHasEtudeCas(subject.id)}
            className="text-[11px] text-stone-400 hover:text-emerald-600"
          >
            {subject.has_etude_cas ? "désactiver les études de cas pour cette matière" : "+ activer les études de cas pour cette matière"}
          </button>
        )}
      </div>

      {!collapsed && (
        <>
          {modules.length > 0 && (
            <div>
              <div className="flex items-center gap-3 px-4 pt-3 pb-1">
                <div className="flex-1" />
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="w-5 text-center text-[10px] text-stone-400">Cours</span>
                  <span className="w-5 text-center text-[10px] text-stone-400">Fiche</span>
                  <span className="w-5 text-center text-[10px] text-stone-400">Exo</span>
                  {subject.has_etude_cas && <span className="w-5 text-center text-[10px] text-stone-400">Étude</span>}
                </div>
                <div className="w-4" />
              </div>
              <div className="divide-y divide-stone-50">
                {modules.map((m) => (
                  <ModuleRow
                    key={m.id}
                    module={m}
                    subjectHasEtudeCas={subject.has_etude_cas}
                    onRename={onRenameModule}
                    onToggleHasExercice={onToggleHasExercice}
                    onToggleHasEtudeCas={onToggleModuleHasEtudeCas}
                    onToggleField={onToggleModuleField}
                    onDelete={onDeleteModule}
                  />
                ))}
              </div>
            </div>
          )}

          <AddModuleForm
            subjectHasEtudeCas={subject.has_etude_cas}
            onAdd={(label, hasExercice, hasEtudeCas) => onAddModule(subject.id, label, hasExercice, hasEtudeCas)}
          />

          <div className="px-5 pt-4 pb-1 bg-stone-50/60 border-t border-stone-100">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Exercices corrigés à rendre</h3>
          </div>

          {exercices.length > 0 && (
            <div className="bg-stone-50/60">
              <div className="flex items-center gap-3 px-4 pt-2 pb-1">
                <div className="flex-1" />
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="w-5 text-center text-[10px] text-stone-400">Rendu</span>
                  <span className="w-5 text-center text-[10px] text-stone-400">Corrigé</span>
                </div>
                <div className="w-4" />
              </div>
              <div className="divide-y divide-stone-100">
                {exercices.map((ex) => (
                  <ExerciceRow
                    key={ex.id}
                    exercice={ex}
                    onRename={onRenameExercice}
                    onToggleField={onToggleExerciceField}
                    onDelete={onDeleteExercice}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="bg-stone-50/60">
            <AddExerciceForm onAdd={(label) => onAddExercice(subject.id, label)} />
          </div>
        </>
      )}
    </div>
  )
}

// ------------------------------------------------------------------
// Composant principal
// ------------------------------------------------------------------

export default function SuiviClient({
  userId,
  initialSubjects,
  initialModules,
  initialExercices,
}: {
  userId: string
  initialSubjects: SubjectRow[]
  initialModules: ModuleRow[]
  initialExercices: ExerciceRow[]
}) {
  const supabase = createClient()

  const [subjects, setSubjects] = useState<SubjectRow[]>(initialSubjects)
  const [modules, setModules] = useState<ModuleRow[]>(initialModules)
  const [exercices, setExercices] = useState<ExerciceRow[]>(initialExercices)

  const bySubject = useMemo(() => {
    const map = new Map<string, { modules: ModuleRow[]; exercices: ExerciceRow[] }>()
    for (const s of subjects) map.set(s.id, { modules: [], exercices: [] })
    for (const m of modules) map.get(m.subject_id)?.modules.push(m)
    for (const e of exercices) map.get(e.subject_id)?.exercices.push(e)
    return map
  }, [subjects, modules, exercices])

  // ---- Matières ----

  const addSubject = async (label: string, hasEtudeCas: boolean) => {
    const position = subjects.length
    const { data, error } = await supabase
      .from("subjects")
      .insert({ user_id: userId, label, position, has_etude_cas: hasEtudeCas })
      .select()
      .single()
    if (error || !data) {
      alert("Impossible d'ajouter la matière.")
      return
    }
    setSubjects((prev) => [...prev, data as SubjectRow])
  }

  const renameSubject = async (id: string, label: string) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, label } : s)))
    await supabase.from("subjects").update({ label }).eq("id", id)
  }

  const toggleSubjectHasEtudeCas = async (id: string) => {
    const subject = subjects.find((s) => s.id === id)
    if (!subject) return
    const hasEtudeCas = !subject.has_etude_cas
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, has_etude_cas: hasEtudeCas } : s)))
    await supabase.from("subjects").update({ has_etude_cas: hasEtudeCas }).eq("id", id)
  }

  const deleteSubject = async (id: string) => {
    if (!confirm("Supprimer cette matière ainsi que tous ses modules et exercices ?")) return
    setSubjects((prev) => prev.filter((s) => s.id !== id))
    setModules((prev) => prev.filter((m) => m.subject_id !== id))
    setExercices((prev) => prev.filter((e) => e.subject_id !== id))
    await supabase.from("subjects").delete().eq("id", id)
  }

  // ---- Modules ----

  const addModule = async (subjectId: string, label: string, hasExercice: boolean, hasEtudeCas: boolean) => {
    const position = bySubject.get(subjectId)?.modules.length ?? 0
    const { data, error } = await supabase
      .from("modules")
      .insert({
        user_id: userId,
        subject_id: subjectId,
        label,
        position,
        has_exercice: hasExercice,
        has_etude_cas: hasEtudeCas,
      })
      .select()
      .single()
    if (error || !data) {
      alert("Impossible d'ajouter le module.")
      return
    }
    setModules((prev) => [...prev, data as ModuleRow])
  }

  const renameModule = async (id: string, label: string) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, label } : m)))
    await supabase.from("modules").update({ label }).eq("id", id)
  }

  const toggleHasExercice = async (id: string) => {
    const mod = modules.find((m) => m.id === id)
    if (!mod) return
    const hasExercice = !mod.has_exercice
    const patch: Partial<ModuleRow> = { has_exercice: hasExercice }
    if (!hasExercice) {
      patch.exercice_fait = false
      patch.exercice_fait_le = null
    }
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)))
    await supabase.from("modules").update(patch).eq("id", id)
  }

  const toggleModuleHasEtudeCas = async (id: string) => {
    const mod = modules.find((m) => m.id === id)
    if (!mod) return
    const hasEtudeCas = !mod.has_etude_cas
    const patch: Partial<ModuleRow> = { has_etude_cas: hasEtudeCas }
    if (!hasEtudeCas) {
      patch.etude_cas_faite = false
      patch.etude_cas_faite_le = null
    }
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)))
    await supabase.from("modules").update(patch).eq("id", id)
  }

  const toggleModuleField = async (id: string, field: ModuleField) => {
    const mod = modules.find((m) => m.id === id)
    if (!mod) return
    const newValue = !mod[field]
    const dateField = `${field}_le` as const
    const now = new Date().toISOString()
    setModules((prev) =>
      prev.map((m) => (m.id === id ? ({ ...m, [field]: newValue, [dateField]: newValue ? now : null } as ModuleRow) : m))
    )
    await supabase
      .from("modules")
      .update({ [field]: newValue, [dateField]: newValue ? now : null })
      .eq("id", id)
  }

  const deleteModule = async (id: string) => {
    if (!confirm("Supprimer ce module ?")) return
    setModules((prev) => prev.filter((m) => m.id !== id))
    await supabase.from("modules").delete().eq("id", id)
  }

  // ---- Exercices corrigés ----

  const addExercice = async (subjectId: string, label: string) => {
    const position = bySubject.get(subjectId)?.exercices.length ?? 0
    const { data, error } = await supabase
      .from("corrected_exercises")
      .insert({ user_id: userId, subject_id: subjectId, label, position })
      .select()
      .single()
    if (error || !data) {
      alert("Impossible d'ajouter l'exercice.")
      return
    }
    setExercices((prev) => [...prev, data as ExerciceRow])
  }

  const renameExercice = async (id: string, label: string) => {
    setExercices((prev) => prev.map((e) => (e.id === id ? { ...e, label } : e)))
    await supabase.from("corrected_exercises").update({ label }).eq("id", id)
  }

  const toggleExerciceField = async (id: string, field: ExerciceField) => {
    const ex = exercices.find((e) => e.id === id)
    if (!ex) return
    const newValue = !ex[field]
    const dateField = `${field}_le` as const
    const now = new Date().toISOString()
    setExercices((prev) =>
      prev.map((e) => (e.id === id ? ({ ...e, [field]: newValue, [dateField]: newValue ? now : null } as ExerciceRow) : e))
    )
    await supabase
      .from("corrected_exercises")
      .update({ [field]: newValue, [dateField]: newValue ? now : null })
      .eq("id", id)
  }

  const deleteExercice = async (id: string) => {
    if (!confirm("Supprimer cet exercice ?")) return
    setExercices((prev) => prev.filter((e) => e.id !== id))
    await supabase.from("corrected_exercises").delete().eq("id", id)
  }

  const globalStats = useMemo(() => {
    const coursTotal = modules.length
    const coursDone = modules.filter((m) => m.cours_vu).length

    const exoModules = modules.filter((m) => m.has_exercice)
    const exoTotal = exoModules.length
    const exoDone = exoModules.filter((m) => m.exercice_fait).length

    const corrTotal = exercices.length
    const corrDone = exercices.filter((e) => e.corrige).length

    return { coursTotal, coursDone, exoTotal, exoDone, corrTotal, corrDone }
  }, [modules, exercices])

  // ---- Render ----

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-2">Mon espace</p>
        <h1 className="font-serif text-4xl text-stone-900">Suivi des révisions</h1>
      </div>

      <div className="bg-white border border-stone-100 rounded-2xl px-5 py-4 mb-8">
        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Vue d'ensemble</p>
        <div className="flex flex-wrap gap-4">
          <ProgressBar label="Cours vus" done={globalStats.coursDone} total={globalStats.coursTotal} />
          <ProgressBar label="Exercices faits" done={globalStats.exoDone} total={globalStats.exoTotal} />
          <ProgressBar label="Exercices corrigés" done={globalStats.corrDone} total={globalStats.corrTotal} />
        </div>
      </div>

      <div className="space-y-8">
        {subjects.map((s) => (
          <SubjectCard
            key={s.id}
            subject={s}
            modules={bySubject.get(s.id)?.modules ?? []}
            exercices={bySubject.get(s.id)?.exercices ?? []}
            onRenameSubject={renameSubject}
            onDeleteSubject={deleteSubject}
            onAddModule={addModule}
            onRenameModule={renameModule}
            onToggleHasExercice={toggleHasExercice}
            onToggleModuleHasEtudeCas={toggleModuleHasEtudeCas}
            onToggleSubjectHasEtudeCas={toggleSubjectHasEtudeCas}
            onToggleModuleField={toggleModuleField}
            onDeleteModule={deleteModule}
            onAddExercice={addExercice}
            onRenameExercice={renameExercice}
            onToggleExerciceField={toggleExerciceField}
            onDeleteExercice={deleteExercice}
          />
        ))}

        {subjects.length === 0 && (
          <p className="text-sm text-stone-400 text-center py-8">Aucune matière pour l'instant. Ajoute la première ci-dessous.</p>
        )}
      </div>

      <div className="mt-8">
        <AddSubjectForm onAdd={addSubject} />
      </div>
    </div>
  )
}