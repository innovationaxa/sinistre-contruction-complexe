export interface DossierInfo {
  reference: string;
  assure: string;
  typeContrat: string;
  dateOuverture: string;
  adresse: string;
  gestionnaire: string;
}

export interface ActeContentieux {
  type: string;
  date: string;
  status: string;
  partie: string;
}

export interface AlerteIA {
  id: number;
  type: "urgent" | "warning" | "info";
  titre: string;
  description: string;
  impact: string;
  confidence: number;
}

export interface NextAction {
  id: number;
  action: string;
  priorite: "haute" | "moyenne" | "basse";
  delai: string;
  assignee: string;
  description: string;
}

export interface DossierAssocie {
  id: string;
  nom: string;
  assure: string;
  relation: string;
  statut: string;
  syntheseIA: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface TimelineEvent {
  date: string;
  titre: string;
  description: string;
  statut: "completed" | "upcoming" | "pending";
  acteur: string;
  duree: string;
  details: {
    montant: string | null;
    documents: string[];
    delaiReglementaire: string;
  };
}
