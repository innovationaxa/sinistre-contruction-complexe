
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, User, Building, Calendar, AlertTriangle, Sparkles } from "lucide-react";

interface SinistreData {
  id: string;
  reference: string;
  statut: string;
  dateDeclaration: string;
  dateReception: string;
  echeance: string;
  
  // Informations Assuré
  assure: {
    raisonSociale: string;
    siret: string;
    secteurActivite: string;
    adresse: string;
    telephone: string;
    email: string;
  };
  
  // Informations Contrat
  contrat: {
    numero: string;
    produit: string;
    dateEffet: string;
    dateEcheance: string;
    prime: string;
    courtier: string;
  };
  
  // Informations Sinistre  
  sinistre: {
    description: string;
    typeChantier: string;
    adresseTravaux: string;
    dateReceptionTravaux: string;
    natureDommages: string;
    origineReclamation: string;
    maitreOuvrage: {
      nom: string;
      qualite: string;
      activite: string;
      prejudiceImateriel: string;
    };
  };
  
  // Documents
  documents: {
    nom: string;
    type: string;
    date: string;
  }[];
  
  aiGenerated: {
    description: boolean;
    surtype: boolean;
    evaluation: boolean;
  };
}

const mockSinistreData: SinistreData = {
  id: "1",
  reference: "RC-DECA-2024-001",
  statut: "En cours de traitement",
  dateDeclaration: "28/09/2024",
  dateReception: "28/09/2024 14:30",
  echeance: "15/10/2024",
  
  assure: {
    raisonSociale: "SARL Bâti Construct",
    siret: "123 456 789 00012",
    secteurActivite: "Construction de bâtiments résidentiels et non résidentiels",
    adresse: "15 Avenue de la Construction, 69000 Lyon",
    telephone: "04 78 12 34 56",
    email: "contact@bati-construct.fr"
  },
  
  contrat: {
    numero: "DECA-2021-4567",
    produit: "RC Décennale Tous Corps d'État",
    dateEffet: "01/01/2021",
    dateEcheance: "31/12/2024",
    prime: "8 500 € HT/an",
    courtier: "Agent AXA Lyon Centre - M. Dubois"
  },
  
  sinistre: {
    description: "Sinistre amiable RC Décennale suite à l'apparition de dommages structurels 3 ans après la réception des travaux de rénovation d'un local commercial",
    typeChantier: "Rénovation lourde - Local commercial",
    adresseTravaux: "42 Rue du Commerce, 69002 Lyon",
    dateReceptionTravaux: "15/06/2021",
    natureDommages: "Fissures importantes dans les murs porteurs, affaissement partiel du plancher, infiltrations",
    origineReclamation: "Courrier du maître d'ouvrage reçu par l'assuré le 25/09/2024",
    maitreOuvrage: {
      nom: "SAS Commerce Plus",
      qualite: "Propriétaire exploitant",
      activite: "Commerce de détail - Prêt-à-porter",
      prejudiceImateriel: "Fermeture boutique 2 mois estimée = 45 000€ de CA perdu"
    }
  },
  
  documents: [
    { nom: "Courrier de mise en cause", type: "Courrier", date: "25/09/2024" },
    { nom: "Photos des dommages", type: "Photos", date: "27/09/2024" },
    { nom: "Devis de réparation", type: "Devis", date: "28/09/2024" },
    { nom: "Attestation RC Décennale", type: "Attestation", date: "28/09/2024" }
  ],
  
  aiGenerated: {
    description: true,
    surtype: true,
    evaluation: true
  }
};

export default function SinistreDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const sinistre = mockSinistreData; // En réalité, on récupérerait les données selon l'ID

  const AIIndicator = () => (
    <Sparkles className="w-4 h-4 text-purple-600 inline ml-1" />
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gray-100">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* En-tête avec navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la corbeille
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sinistre RC Décennale</h1>
                    <p className="text-gray-600">Réf. {sinistre.reference}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {sinistre.statut}
                </Badge>
              </div>

              {/* Informations principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="w-5 h-5" />
                      Dates clés
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Déclaration:</span>
                      <span className="font-medium">{sinistre.dateDeclaration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Réception:</span>
                      <span className="font-medium">{sinistre.dateReception}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Échéance:</span>
                      <span className="font-medium text-red-600">{sinistre.echeance}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building className="w-5 h-5" />
                      Assuré
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="font-medium">{sinistre.assure.raisonSociale}</div>
                    <div className="text-gray-600">SIRET: {sinistre.assure.siret}</div>
                    <div className="text-gray-600">{sinistre.assure.secteurActivite}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="w-5 h-5" />
                      Contrat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="font-medium">{sinistre.contrat.numero}</div>
                    <div className="text-gray-600">{sinistre.contrat.produit}</div>
                    <div className="text-gray-600">Prime: {sinistre.contrat.prime}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Description du sinistre */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Description du sinistre
                    {sinistre.aiGenerated.description && <AIIndicator />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 leading-relaxed">{sinistre.sinistre.description}</p>
                </CardContent>
              </Card>

              {/* Détails du sinistre */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations chantier</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Type de chantier:</span>
                      <p className="text-gray-800">{sinistre.sinistre.typeChantier}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Adresse des travaux:</span>
                      <p className="text-gray-800">{sinistre.sinistre.adresseTravaux}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Date de réception:</span>
                      <p className="text-gray-800">{sinistre.sinistre.dateReceptionTravaux}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Nature des dommages:</span>
                      <p className="text-gray-800">{sinistre.sinistre.natureDommages}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Maître d'ouvrage & Préjudices</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Nom:</span>
                      <p className="text-gray-800">{sinistre.sinistre.maitreOuvrage.nom}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Qualité:</span>
                      <p className="text-gray-800">{sinistre.sinistre.maitreOuvrage.qualite}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Activité:</span>
                      <p className="text-gray-800">{sinistre.sinistre.maitreOuvrage.activite}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Préjudice immatériel:</span>
                      <p className="text-red-600 font-medium">{sinistre.sinistre.maitreOuvrage.prejudiceImateriel}</p>
                      {sinistre.aiGenerated.evaluation && <AIIndicator />}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Documents associés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {sinistre.documents.map((doc, index) => (
                      <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">{doc.nom}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {doc.type} • {doc.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
