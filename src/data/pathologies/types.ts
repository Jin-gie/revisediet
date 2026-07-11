export type Tags = "Métabolique" | "Chronique" | "Aiguë" | "Cardiovasculaire" | "Neurologique" | "Digestif" | "Rénal" | "Respiratoire" | "Infectieux" | "Auto-immun" | "Oncologique" | "Endocrinologie" | "Hématologique" | "Génétique" | "Dermatologique" | "Psychiatrique" | "Gynécologique" | "Pédiatrique" | "Gériatrique" | "Traumatique" | "Chirurgicale"


export type Traitement = {
  famille: string
  exemples?: string[]
  mecanisme: string
}

export type PhysiopathologieEtape = {
  numero: number
  titre: string
  description: string
}

export type Pathologie = {
  slug: string
  label: string
  labelCourt: string
  emoji: string
  description: string
  tags: Tags[]
  // Résumé rapide (pour la card en haut)
  resume: {
    definition: string
    mecanismeCle: string
    epidemiologie: string
    etiologie: string
  }
  // Physiopathologie
  physiopathologie?: {
    introduction?: string
    etapes?: PhysiopathologieEtape[]
    subtypes?: {
      id: string
      label: string
      description: string
      etapes: PhysiopathologieEtape[]
    }[]
  }
  // Facteurs de risque
  facteursRisque?: {
    introduction?: string
    groupes: {
    groupe: string
    items: string[]
    }[]
  }
  // Diagnostic
  diagnostic: {
    criteresDefinition: string[]
    enqueteAlimentaire?: string[]
    clinique: {
      emoji?: string
      signe: string
      detail?: string
    }[]
    paraclinique: {
      emoji?: string
      nom: string
      detail: string
      type?: string
      valeursSeuil?: string
    }[]
  }
  // Complications
  complications: {
    emoji?: string
    nom: string
    type: string
    description?: string
  }[]
  // Traitement
  traitement?: {
    objectifs: string[]
    surveillance: string[]
    mesuresHygienoDiet: string[]
    medicaments?: Traitement[]
    chirurgie?: Traitement[]
    autresTraitements?: Traitement[]
  }
  // Diététique thérapeutique (à compléter plus tard)
  dietetique?: {
    objectifsNutritionnels: string[]
    aet?: string
    macros?: { label: string; recommandation: string }[]
    alimentsFavoriser?: string[]
    alimentsLimiter?: string[]
    conseilsPratiques?: string[]
  }

  // Sections MDX - chargées séparément
  mdx?: {
    physiopathologie?: boolean
    traitement?: boolean
    dietetique?: boolean
  }
}