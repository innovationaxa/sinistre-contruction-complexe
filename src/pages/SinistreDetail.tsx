
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, User, Building, Calendar, AlertTriangle, Sparkles, Clock, Shield, TrendingUp, CheckCircle, XCircle } from "lucide-react";

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
    dateCreation: string;
    anciennete: string;
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
  
  // Timeline du contrat
  timeline: {
    date: string;
    evenement: string;
    type: 'creation' | 'modification' | 'sinistre' | 'renouvellement';
  }[];
  
  // Sinistres passés
  sinistresPassés: {
    reference: string;
    date: string;
    statut: string;
    montant: string;
    nature: string;
  }[];
  
  // Garanties
  garanties: {
    nom: string;
    montant: string;
    franchise: string;
    statut: 'active' | 'inactive';
  }[];
  
  // Documents
  documents: {
    nom: string;
    type: string;
    date: string;
    synthese?: string;
  }[];
  
  // Synthèse IA
  syntheseIA: {
    conformite: 'conforme' | 'non-conforme' | 'attention';
    points: string[];
    risques: string[];
    recommandations: string[];
  };
  
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
    courtier: "Agent AXA Lyon Centre - M. Dubois",
    dateCreation: "15/12/2020",
    anciennete: "3 ans 9 mois"
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
  
  timeline: [
    { date: "15/12/2020", evenement: "Création du contrat", type: "creation" },
    { date: "01/01/2021", evenement: "Prise d'effet", type: "creation" },
    { date: "01/01/2022", evenement: "Renouvellement automatique", type: "renouvellement" },
    { date: "15/03/2022", evenement: "Sinistre RC-DECA-2022-045 (Clos)", type: "sinistre" },
    { date: "01/01/2023", evenement: "Renouvellement automatique", type: "renouvellement" },
    { date: "01/01/2024", evenement: "Renouvellement automatique", type: "renouvellement" },
    { date: "28/09/2024", evenement: "Déclaration sinistre RC-DECA-2024-001", type: "sinistre" }
  ],
  
  sinistresPassés: [
    {
      reference: "RC-DECA-2022-045",
      date: "15/03/2022",
      statut: "Clos",
      montant: "12 500 €",
      nature: "Infiltrations - Maison individuelle"
    },
    {
      reference: "RC-DECA-2023-087",
      date: "22/08/2023", 
      statut: "Clos",
      montant: "8 200 €",
      nature: "Fissures - Extension garage"
    }
  ],
  
  garanties: [
    { nom: "RC Décennale", montant: "1 200 000 €", franchise: "1 500 €", statut: "active" },
    { nom: "RC Biennale", montant: "300 000 €", franchise: "500 €", statut: "active" },
    { nom: "Garantie Parfait Achèvement", montant: "150 000 €", franchise: "300 €", statut: "active" },
    { nom: "Dommages aux ouvrages", montant: "500 000 €", franchise: "1 000 €", statut: "inactive" }
  ],
  
  documents: [
    { 
      nom: "Courrier de mise en cause", 
      type: "Courrier", 
      date: "25/09/2024",
      synthese: "Mise en demeure formelle du maître d'ouvrage réclamant réparation des dommages constatés"
    },
    { 
      nom: "Photos des dommages", 
      type: "Photos", 
      date: "27/09/2024",
      synthese: "7 photos haute résolution montrant fissures structurelles et infiltrations"
    },
    { 
      nom: "Devis de réparation", 
      type: "Devis", 
      date: "28/09/2024",
      synthese: "Évaluation des travaux de réparation : 67 500€ HT (entreprise Réparation Pro)"
    },
    { 
      nom: "Attestation RC Décennale", 
      type: "Attestation", 
      date: "28/09/2024",
      synthese: "Attestation valide couvrant la période des travaux et les dommages constatés"
    }
  ],
  
  syntheseIA: {
    conformite: "attention",
    points: [
      "Déclaration dans les délais contractuels",
      "Dommages couverts par la garantie RC Décennale",
      "Période de garantie respectée (3 ans < 10 ans)",
      "Documentation complète fournie"
    ],
    risques: [
      "Préjudice immatériel élevé (45 000€)",
      "Dommages structurels importants", 
      "Potentiel recours du maître d'ouvrage",
      "Coût de réparation substantiel (67 500€)"
    ],
    recommandations: [
      "Expertise technique rapide recommandée",
      "Négociation amiable privilégiée",
      "Suivi rapproché du dossier requis",
      "Évaluation du préjudice immatériel à affiner"
    ]
  },
  
  aiGenerated: {
    description: true,
    surtype: true,
    evaluation: true
  }
};

export default function SinistreDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const sinistre = mockSinistreData;

  const AIIndicator = () => (
    <Sparkles className="w-4 h-4 text-purple-600 inline ml-1" />
  );

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'creation': return <Building className="w-4 h-4 text-blue-600" />;
      case 'renouvellement': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'sinistre': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-4 lg:p-6">
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

              {/* Tabs principales */}
              <Tabs defaultValue="synthese" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="synthese">Synthèse</TabsTrigger>
                  <TabsTrigger value="contrat">Vie du contrat</TabsTrigger>
                  <TabsTrigger value="historique">Historique</TabsTrigger>
                  <TabsTrigger value="analyse">Analyse IA</TabsTrigger>
                </TabsList>

                {/* Onglet Synthèse */}
                <TabsContent value="synthese" className="space-y-6">
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
                </TabsContent>

                {/* Onglet Vie du contrat */}
                <TabsContent value="contrat" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Données du contrat */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Données du contrat
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">N° contrat:</span>
                            <p>{sinistre.contrat.numero}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Produit:</span>
                            <p>{sinistre.contrat.produit}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Date création:</span>
                            <p>{sinistre.contrat.dateCreation}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Ancienneté:</span>
                            <p>{sinistre.contrat.anciennete}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Date effet:</span>
                            <p>{sinistre.contrat.dateEffet}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Date échéance:</span>
                            <p>{sinistre.contrat.dateEcheance}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Prime:</span>
                            <p className="font-semibold">{sinistre.contrat.prime}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Intermédiaire:</span>
                            <p>{sinistre.contrat.courtier}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Garanties */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          Garanties du contrat
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {sinistre.garanties.map((garantie, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{garantie.nom}</span>
                                  {garantie.statut === 'active' ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  )}
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                  Montant: {garantie.montant} • Franchise: {garantie.franchise}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Timeline du contrat
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sinistre.timeline.map((event, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 border-l-2 border-blue-200 bg-blue-50/30">
                            {getTimelineIcon(event.type)}
                            <div className="flex-1">
                              <div className="font-medium text-sm">{event.evenement}</div>
                              <div className="text-xs text-gray-600">{event.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Onglet Historique */}
                <TabsContent value="historique" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sinistres passés */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Sinistres passés et en cours
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {sinistre.sinistresPassés.map((sinistre, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-sm">{sinistre.reference}</span>
                                <Badge variant={sinistre.statut === 'Clos' ? 'secondary' : 'destructive'}>
                                  {sinistre.statut}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600 space-y-1">
                                <div>Date: {sinistre.date}</div>
                                <div>Nature: {sinistre.nature}</div>
                                <div className="font-medium">Montant: {sinistre.montant}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Documents */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Documents contractuels
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {sinistre.documents.map((doc, index) => (
                            <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium">{doc.nom}</span>
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                {doc.type} • {doc.date}
                              </div>
                              {doc.synthese && (
                                <div className="text-xs text-gray-700 bg-blue-50 p-2 rounded">
                                  <strong>Synthèse:</strong> {doc.synthese}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Onglet Analyse IA */}
                <TabsContent value="analyse" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        Analyse et comparaison IA
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Conformité */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                              sinistre.syntheseIA.conformite === 'conforme' ? 'bg-green-500' :
                              sinistre.syntheseIA.conformite === 'attention' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <h3 className="font-semibold">Points de conformité</h3>
                          </div>
                          <ul className="space-y-2">
                            {sinistre.syntheseIA.points.map((point, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Risques */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <h3 className="font-semibold">Risques identifiés</h3>
                          </div>
                          <ul className="space-y-2">
                            {sinistre.syntheseIA.risques.map((risque, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                {risque}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Recommandations */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <h3 className="font-semibold">Recommandations</h3>
                          </div>
                          <ul className="space-y-2">
                            {sinistre.syntheseIA.recommandations.map((reco, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                {reco}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
