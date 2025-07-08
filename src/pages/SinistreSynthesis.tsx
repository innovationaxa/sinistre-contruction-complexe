import { Header } from "@/components/Header";
import { SynthesisHeader } from "@/components/SinistreSynthesis/SynthesisHeader";
import { OverviewSection } from "@/components/SinistreSynthesis/OverviewSection";
import { AssociatedFiles } from "@/components/SinistreSynthesis/AssociatedFiles";
import { Timeline } from "@/components/SinistreSynthesis/Timeline";
import { DocumentsSection } from "@/components/SinistreSynthesis/DocumentsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  // Dossiers associés - Enhanced version with longer syntheses
  const dossiersAssocies: DossierAssocie[] = [
    {
      id: "CON-2023-456123",
      nom: "BATIMEX - Sinistre antérieur",
      assure: "Société BATIMEX SARL",
      relation: "Même assuré",
      statut: "Clos",
      syntheseIA: "Dossier similaire traité avec succès en 2023. Même typologie de dégâts des eaux dans les locaux techniques, montant final réglé à 12 000€. La procédure standard a été respectée avec un délai total de 38 jours. Aucun contentieux n'est survenu, expertise contradictoire menée sans opposition. L'assuré avait fourni tous les justificatifs dans les délais, permettant un règlement rapide et satisfaisant pour toutes les parties."
    },
    {
      id: "CON-2024-123789",
      nom: "Chantier Avenue des Chantiers",
      assure: "Entreprise Générale du Bâtiment",
      relation: "Même adresse",
      statut: "En cours",
      syntheseIA: "Sinistre complexe en parallèle sur le même site de construction. Problématique de malfaçons structurelles touchant les fondations et la charpente. Une expertise contradictoire est actuellement en cours avec trois experts mandatés. Le montant potentiel est estimé entre 50 000€ et 80 000€. Des recours croisés sont envisagés entre les différents intervenants du chantier, nécessitant une coordination juridique approfondie."
    }
  ];

  // Timeline enrichie avec données réalistes
  const timeline: TimelineEvent[] = [
    {
      date: "15/03/2024",
      titre: "Déclaration du sinistre",
      description: "Réception déclaration par téléphone puis confirmation écrite",
      statut: "completed",
      acteur: "Marie Dubois",
      duree: "Immédiat",
      details: {
        montant: null,
        documents: ["Déclaration initiale", "Photos des dégâts"],
        delaiReglementaire: "Respecté (J+1)"
      }
    },
    {
      date: "18/03/2024",
      titre: "Mission d'expertise",
      description: "Mandat expert et prise de contact avec l'assuré",
      statut: "completed",
      acteur: "Expert Technique",
      duree: "3 jours",
      details: {
        montant: "2 500€",
        documents: ["Lettre de mission", "Contact assuré"],
        delaiReglementaire: "Standard (J+3)"
      }
    },
    {
      date: "20/03/2024",
      titre: "Expertise sur site",
      description: "Évaluation des dégâts et chiffrage des réparations",
      statut: "upcoming",
      acteur: "Expert + Assuré",
      duree: "1 jour",
      details: {
        montant: "15 000€ (estimé)",
        documents: ["Rapport d'expertise", "Devis réparations"],
        delaiReglementaire: "En cours"
      }
    },
    {
      date: "25/03/2024",
      titre: "Validation du règlement",
      description: "Analyse du rapport et décision de prise en charge",
      statut: "pending",
      acteur: "Service Indemnisation",
      duree: "5 jours",
      details: {
        montant: "À confirmer",
        documents: ["Rapport final", "Décision de règlement"],
        delaiReglementaire: "J+10 après expertise"
      }
    },
    {
      date: "05/04/2024",
      titre: "Clôture du dossier",
      description: "Paiement effectué et archivage complet",
      statut: "pending",
      acteur: "Comptabilité",
      duree: "2 jours",
      details: {
        montant: "Montant final",
        documents: ["Bordereau de règlement", "Quittance"],
        delaiReglementaire: "J+45 total"
      }
    }
  ];

  const documentsData = [
    {
      id: "DOC-001",
      nom: "Rapport Amiable de notre expert 2.pdf",
      type: "pdf",
      description: "Rapport amiable expert 2",
      dateModification: "27/06/2024",
      taille: "2.1 MB"
    },
    {
      id: "DOC-002", 
      nom: "Rapport Amiable de notre expert 1.pdf",
      type: "pdf",
      description: "Rapport amiable expert 1",
      dateModification: "26/06/2024",
      taille: "1.8 MB"
    },
    {
      id: "DOC-003",
      nom: "CR Expert 5 JUN REJ.pdf",
      type: "pdf",
      description: "Rapport sur la rejection",
      dateModification: "05/06/2024",
      taille: "1.2 MB"
    },
    {
      id: "DOC-004",
      nom: "CR Expert 5.pdf",
      type: "pdf",
      description: "Rapport complémentaire",
      dateModification: "22/06/2024",
      taille: "950 KB"
    },
    {
      id: "DOC-005",
      nom: "Jugement PDF",
      type: "pdf",
      description: "Jugement du tribunal",
      dateModification: "15/06/2024",
      taille: "3.2 MB"
    },
    {
      id: "DOC-006",
      nom: "CR Expert 2.pdf",
      type: "pdf",
      description: "Rapport expert",
      dateModification: "18/06/2024",
      taille: "1.5 MB"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <SynthesisHeader dossierInfo={dossierInfo} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Tabs defaultValue="synthese" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-blue-50 border-blue-200">
              <TabsTrigger value="synthese" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Synthèse
              </TabsTrigger>
              <TabsTrigger value="documents" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="synthese" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <DocumentsSection documents={documentsData} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SinistreSynthesis;
