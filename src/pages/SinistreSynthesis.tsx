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

  // Alertes IA améliorées - plus minimalistes et pertinentes
  const alertesIA: AlerteIA[] = [
    {
      id: 1,
      type: "urgent",
      titre: "Factures manquantes",
      description: "Justificatifs de réparation non fournis",
      impact: "Blocage du règlement",
      confidence: 95
    },
    {
      id: 2,
      type: "warning",
      titre: "Délai expertise dépassé",
      description: "Rapport attendu depuis 5 jours",
      impact: "Retard procédure",
      confidence: 88
    },
    {
      id: 3,
      type: "info",
      titre: "Prescription proche",
      description: "Recours possible jusqu'au 15/09/2024",
      impact: "Action à programmer",
      confidence: 92
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

  // Dossiers associés - Simplified version
  const dossiersAssocies: DossierAssocie[] = [
    {
      id: "CON-2023-456123",
      nom: "BATIMEX - Sinistre antérieur",
      assure: "Société BATIMEX SARL",
      relation: "Même assuré",
      statut: "Clos",
      syntheseIA: "Dossier similaire clos avec succès. Même type de dégâts des eaux, montant 12K€. Procédure standard respectée, délai 38 jours. Aucun contentieux."
    },
    {
      id: "CON-2024-123789",
      nom: "Chantier Avenue des Chantiers",
      assure: "Entreprise Générale du Bâtiment",
      relation: "Même adresse",
      statut: "En cours",
      syntheseIA: "Sinistre en parallèle sur le même site. Problématique de malfaçons structurelles. Expertise contradictoire en cours. Montant potentiel élevé."
    }
  ];

  // Timeline simplifiée à 5 macro étapes
  const timeline: TimelineEvent[] = [
    {
      date: "15/03/2024",
      titre: "Déclaration",
      description: "Sinistre déclaré et dossier ouvert",
      statut: "completed"
    },
    {
      date: "18/03/2024",
      titre: "Expertise",
      description: "Mission d'expertise confiée",
      statut: "completed"
    },
    {
      date: "20/03/2024",
      titre: "Évaluation",
      description: "Visite et évaluation des dégâts",
      statut: "upcoming"
    },
    {
      date: "30/03/2024",
      titre: "Décision",
      description: "Validation du règlement",
      statut: "pending"
    },
    {
      date: "05/04/2024",
      titre: "Clôture",
      description: "Paiement et archivage",
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
