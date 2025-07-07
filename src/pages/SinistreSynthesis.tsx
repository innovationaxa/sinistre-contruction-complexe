
import { Header } from "@/components/Header";
import { SynthesisHeader } from "@/components/SinistreSynthesis/SynthesisHeader";
import { OverviewSection } from "@/components/SinistreSynthesis/OverviewSection";
import { AssociatedFiles } from "@/components/SinistreSynthesis/AssociatedFiles";
import { Timeline } from "@/components/SinistreSynthesis/Timeline";
import { DossierInfo, ActeContentieux, AlerteIA, NextAction, DossierAssocie, TimelineEvent } from "@/types/sinistre";

const SinistreSynthesis = () => {
  // Données du dossier
  const dossierInfo: DossierInfo = {
    reference: "CON-2024-789456",
    assure: "Société BATIMEX SARL",
    typeContrat: "RC Décennale",
    dateOuverture: "15/03/2024",
    adresse: "15 Avenue des Chantiers, 75015 Paris",
    gestionnaire: "Marie Dubois"
  };

  // Synthèse IA
  const syntheseIA = "Sinistre RC Décennale suite à des dégâts des eaux survenus dans l'atelier principal de BATIMEX SARL. Montant estimé : 15 000€. Expertise programmée le 20/03/2024. Couverture confirmée, pas d'exclusion identifiée. Délai de traitement normal : 45 jours.";

  // Actes contentieux
  const actesContentieux: ActeContentieux[] = [
    {
      type: "Mise en demeure",
      date: "10/03/2024",
      status: "Reçue",
      partie: "Maître d'ouvrage"
    },
    {
      type: "Assignation",
      date: "En attente",
      status: "Potentielle",
      partie: "Tribunal de commerce"
    }
  ];

  // Alertes IA
  const alertesIA: AlerteIA[] = [
    {
      id: 1,
      type: "urgent",
      titre: "Documents manquants",
      description: "Factures de réparation non fournies",
      impact: "Retard possible dans le règlement",
      confidence: 92
    },
    {
      id: 2,
      type: "warning",
      titre: "Incohérence montants",
      description: "Écart de 2 000€ entre devis initial et final",
      impact: "Vérification expertise requise",
      confidence: 87
    },
    {
      id: 3,
      type: "info",
      titre: "Délai prescription",
      description: "Recours possible jusqu'au 15/09/2024",
      impact: "Action préventive recommandée",
      confidence: 95
    }
  ];

  // Next Best Actions
  const nextActions: NextAction[] = [
    {
      id: 1,
      action: "Relancer les factures manquantes",
      priorite: "haute",
      delai: "2 jours",
      assignee: "Gestionnaire",
      description: "Contacter l'assuré pour obtenir les justificatifs de réparation"
    },
    {
      id: 2,
      action: "Programmer contre-expertise",
      priorite: "moyenne",
      delai: "1 semaine",
      assignee: "Expert",
      description: "Organiser une seconde évaluation des dégâts"
    },
    {
      id: 3,
      action: "Vérifier garanties annexes",
      priorite: "basse",
      delai: "2 semaines",
      assignee: "Souscripteur",
      description: "Contrôler l'étendue des couvertures applicables"
    }
  ];

  // Dossiers associés
  const dossiersAssocies: DossierAssocie[] = [
    {
      id: "CON-2023-456123",
      nom: "BATIMEX - Sinistre antérieur",
      score: 85,
      relation: "Même assuré",
      statut: "Clos"
    },
    {
      id: "CON-2024-123789",
      nom: "Chantier Avenue des Chantiers",
      score: 72,
      relation: "Même adresse",
      statut: "En cours"
    },
    {
      id: "CON-2024-987456",
      nom: "Expert M. Dubois - Autres dossiers",
      score: 68,
      relation: "Même expert",
      statut: "Récent"
    }
  ];

  // Timeline
  const timeline: TimelineEvent[] = [
    {
      date: "15/03/2024 14:30",
      titre: "Ouverture du dossier",
      description: "Déclaration reçue et dossier créé",
      statut: "completed"
    },
    {
      date: "16/03/2024 09:00",
      titre: "Première évaluation",
      description: "Évaluation préliminaire effectuée",
      statut: "completed"
    },
    {
      date: "20/03/2024 14:00",
      titre: "Expertise programmée",
      description: "Rendez-vous avec expert M. Dubois",
      statut: "upcoming"
    },
    {
      date: "25/03/2024",
      titre: "Rapport d'expertise",
      description: "Réception du rapport technique",
      statut: "pending"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <SynthesisHeader dossierInfo={dossierInfo} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <OverviewSection 
            syntheseIA={syntheseIA}
            actesContentieux={actesContentieux}
            alertesIA={alertesIA}
            nextActions={nextActions}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AssociatedFiles dossiersAssocies={dossiersAssocies} />
            <Timeline timeline={timeline} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SinistreSynthesis;
