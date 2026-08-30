// data/pathologies/types.ts

export interface ChiffreCle {
  valeur: string;
  label: string;
}

export interface FacteurRisqueGroupe {
  groupe: string;
  items: string[];
}

export interface SigneClinique {
  emoji: string;
  signe: string;
  detail: string;
}

export interface ExamenParaclinique {
  emoji: string;
  nom: string;
  detail: string;
  valeursSeuil?: string;
}

export interface SeuilIMC {
  plage: string;
  correspondance: string;
  couleur: string; // classe tailwind, ex: "bg-red-700"
}

export interface RepereTourDeTaille {
  femme: string;
  homme: string;
  type: string;
}

export interface MesuresAnthropometriques {
  imc?: {
    formule?: string; // ex: "Poids (kg) / Taille² (m)"
    seuils: SeuilIMC[];
    note?: string;
  };
  tourDeTaille?: {
    reperes: RepereTourDeTaille[];
    note?: string;
  };
}

export interface Complication {
  emoji?: string;
  nom: string;
  type: string; // sert de groupe (ex: "Aiguës métaboliques", "Infectieuses"...)
  description?: string;
}

// --- Diététique thérapeutique ---

export interface ApportLigne {
  label: string;
  valeur: string;
  justification: string;
}

export interface FicheApports {
  population: string; // slug interne, ex: "adulte" | "enceinte" | "personneAgee"
  titre: string;
  sousTitre?: string;
  lignes: ApportLigne[];
}

export interface DiagnosticDietetiquePES {
  etiologie: string[];
  problemesNutritionnels: string[];
  signesSymptomes: string[];
}

export interface AccordionItem {
  titre: string;
  contenu: string;
}

export interface CasParticulierDietetique {
  titre: string;
  description?: string;
  scoff?: string[]; // questionnaire de dépistage type SCOFF, réutilisable pour d'autres TCA
  points?: AccordionItem[];
}

export interface Dietetique {
  intro?: string;
  pes?: DiagnosticDietetiquePES;
  objectifsSoin?: AccordionItem[];
  populations?: FicheApports[];
  casParticuliers?: CasParticulierDietetique[];
}

// --- MDX flags : indique quelles sections sont écrites en MDX
// plutôt qu'en données structurées (pattern déjà utilisé pour DT1 / RGO)

export interface PathologieMdxFlags {
  physiopathologie?: boolean;
  traitement?: boolean;
  dietetique?: boolean;
}

export interface Pathologie {
  slug: string;
  label: string;
  labelCourt: string;
  emoji: string;
  description: string;
  tags: string[];

  mdx?: PathologieMdxFlags;

  resume: {
    definition: string;
    mecanismeCle: string;
    epidemiologie: string;
    etiologie: string;
    chiffresCles?: ChiffreCle[];
  };

  facteursRisque?: {
    introduction: string;
    groupes: FacteurRisqueGroupe[];
  };

  diagnostic?: {
    criteresDefinition?: string[];
    mesuresAnthropometriques?: MesuresAnthropometriques;
    enqueteAlimentaire?: string[];
    clinique?: SigneClinique[];
    paraclinique?: ExamenParaclinique[];
  };

  complications?: Complication[];

  // structuré si mdx.dietetique n'est pas true, sinon le contenu vient
  // du fichier data/pathologies/<slug>/dietetique.mdx
  dietetique?: Dietetique;

  flash: {
    definition: string;
    motsClés: string[];
    sections: { titre: string; items: string[] }[];
  };
}
