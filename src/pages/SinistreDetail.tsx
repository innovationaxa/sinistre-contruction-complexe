import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, User, Building, Calendar, AlertTriangle, Sparkles, Shield, Clock, TrendingUp, CheckCircle, Bot, Tag, FileCheck, Star, AlertCircle, Users } from "lucide-react";

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
    originalName: string;
    aiRenamed: string;
    aiClassification: string;
    aiSummary: string;
    confidence: number;
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
    { 
      nom: "Courrier de mise en cause", 
      type: "Courrier", 
      date: "25/09/2024",
      originalName: "courrier_mise_en_cause.pdf",
      aiRenamed: "Courrier_MiseEnCause_CommercePlus_BatiConstruct_25092024.pdf",
      aiClassification: "Document juridique - Mise en demeure",
      aiSummary: "Courrier officiel de mise en cause de la société SARL Bâti Construct par SAS Commerce Plus. Document détaillant les dommages constatés 3 ans après réception des travaux de rénovation du local commercial. Mentions légales conformes, délais respectés. Demande d'indemnisation chiffrée incluant les préjudices matériels et immatériels.",
      confidence: 95
    },
    { 
      nom: "Photos des dommages", 
      type: "Photos", 
      date: "27/09/2024",
      originalName: "photos_degats.zip",
      aiRenamed: "Photos_Dommages_LocalCommercial_RueCommerce_27092024.zip",
      aiClassification: "Documentation visuelle - Preuves dommages",
      aiSummary: "Archive photographique complète des dommages structurels. 15 photos haute résolution montrant les fissures dans les murs porteurs, l'affaissement du plancher et les infiltrations d'eau. Documentation technique exploitable pour expertise. Géolocalisation et métadonnées temporelles présentes.",
      confidence: 92
    },
    { 
      nom: "Devis de réparation", 
      type: "Devis", 
      date: "28/09/2024",
      originalName: "devis_reparation.pdf",
      aiRenamed: "Devis_Réparation_Structurelle_EntrepriseBTP_Lyon_28092024.pdf",
      aiClassification: "Document commercial - Estimation travaux",
      aiSummary: "Devis détaillé établi par entreprise spécialisée en réparation structurelle. Montant total : 85 000€ HT incluant reprises en sous-œuvre, renforcement structure, étanchéité. Délais d'exécution : 6 semaines. Entreprise certifiée RGE, garanties décennales à jour.",
      confidence: 88
    },
    { 
      nom: "Attestation RC Décennale", 
      type: "Attestation", 
      date: "28/09/2024",
      originalName: "attestation_assurance.pdf",
      aiRenamed: "Attestation_RCDecennale_BatiConstruct_AXA_Validite2024.pdf",
      aiClassification: "Document contractuel - Attestation assurance",
      aiSummary: "Attestation d'assurance RC Décennale valide couvrant la période des travaux litigieux (2021-2031). Plafonds de garantie conformes : 500 000€ dommages ouvrage, 150 000€ préjudice immatériel. Aucune exclusion particulière identifiée. Document authentifié par signature électronique AXA.",
      confidence: 98
    }
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
  
  const sinistre = mockSinistreData;

  const AIIndicator = () => (
    <Sparkles className="w-4 h-4 text-purple-600 inline ml-1" />
  );

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-600 bg-green-50 border-green-200";
    if (confidence >= 90) return "text-blue-600 bg-blue-50 border-blue-200";
    if (confidence >= 85) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const ComparisonRow = ({ label, contractValue, declarationValue, isMatch }: {
    label: string;
    contractValue: string;
    declarationValue: string;
    isMatch: boolean;
  }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-sm font-medium text-gray-600 w-32">{label}:</span>
      <div className="flex items-center gap-4 flex-1">
        <div className="flex-1">
          <span className="text-sm text-gray-800">{contractValue}</span>
          <span className="text-xs text-gray-500 block">Contrat</span>
        </div>
        <div className="flex items-center">
          {isMatch ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600" />
          )}
        </div>
        <div className="flex-1">
          <span className="text-sm text-gray-800">{declarationValue}</span>
          <span className="text-xs text-gray-500 block">Déclaration</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
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
          <h1 className="text-xl font-bold text-gray-900">Synthèse de la déclaration et du contrat</h1>
          <p className="text-sm text-gray-600">Réf. {sinistre.reference}</p>
        </div>
        <div className="ml-auto">
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-semibold">
            {sinistre.statut}
          </Badge>
        </div>
      </div>
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="synthese" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-blue-50 border-blue-200">
              <TabsTrigger value="synthese" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Contrat et garanties</TabsTrigger>
              <TabsTrigger value="contrat" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Désordres</TabsTrigger>
              <TabsTrigger value="historique" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Autres intervenants et Chantier</TabsTrigger>
              <TabsTrigger value="analyse" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Analyse IA</TabsTrigger>
            </TabsList>

            <TabsContent value="synthese" className="space-y-6">
              {/* Comparaison Souscripteur/Assuré vs Déclaration */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3 bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                    <Users className="w-5 h-5" />
                    Comparaison Souscripteur / Déclarant
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ComparisonRow 
                    label="Raison sociale"
                    contractValue={sinistre.assure.raisonSociale}
                    declarationValue={sinistre.assure.raisonSociale}
                    isMatch={true}
                  />
                  <ComparisonRow 
                    label="SIRET"
                    contractValue={sinistre.assure.siret}
                    declarationValue={sinistre.assure.siret}
                    isMatch={true}
                  />
                  <ComparisonRow 
                    label="Adresse"
                    contractValue={sinistre.assure.adresse}
                    declarationValue={sinistre.assure.adresse}
                    isMatch={true}
                  />
                  <ComparisonRow 
                    label="Secteur d'activité"
                    contractValue={sinistre.assure.secteurActivite}
                    declarationValue={sinistre.assure.secteurActivite}
                    isMatch={true}
                  />
                </CardContent>
              </Card>

              {/* Timeline de la vie du contrat */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3 bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                    <Clock className="w-5 h-5" />
                    Timeline de la vie du contrat
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="relative">
                    {/* Barre de progression verticale */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-orange-500"></div>
                    
                    <div className="space-y-4 pl-10">
                      {/* Souscription */}
                      <div className="relative flex items-center">
                        <div className="absolute -left-8 w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="bg-white rounded border border-green-200 p-3 w-full shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">Souscription du contrat</h4>
                            <Badge className="bg-green-100 text-green-800 text-xs">Actif</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">Date d'effet: {sinistre.contrat.dateEffet}</p>
                          <div className="text-xs text-gray-500">
                            <span>Prime: {sinistre.contrat.prime} • Produit: {sinistre.contrat.produit}</span>
                          </div>
                        </div>
                      </div>

                      {/* Travaux couverts */}
                      <div className="relative flex items-center">
                        <div className="absolute -left-8 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="bg-white rounded border border-blue-200 p-3 w-full shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">Réception des travaux</h4>
                            <Badge className="bg-blue-100 text-blue-800 text-xs">Couvert</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">Date de réception: {sinistre.sinistre.dateReceptionTravaux}</p>
                          <div className="text-xs text-gray-500">
                            <span>Début période garantie décennale • Chantier: {sinistre.sinistre.typeChantier}</span>
                          </div>
                        </div>
                      </div>

                      {/* Sinistre */}
                      <div className="relative flex items-center">
                        <div className="absolute -left-8 w-3 h-3 bg-orange-600 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="bg-white rounded border border-orange-200 p-3 w-full shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">Déclaration du sinistre</h4>
                            <Badge className="bg-orange-100 text-orange-800 text-xs">En cours</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">Date de déclaration: {sinistre.dateDeclaration}</p>
                          <div className="text-xs text-gray-500">
                            <span>Réf: {sinistre.reference} • Échéance traitement: {sinistre.echeance}</span>
                          </div>
                        </div>
                      </div>

                      {/* Échéance contrat */}
                      <div className="relative flex items-center">
                        <div className="absolute -left-8 w-3 h-3 bg-gray-400 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="bg-white rounded border border-gray-200 p-3 w-full shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">Échéance du contrat</h4>
                            <Badge className="bg-gray-100 text-gray-600 text-xs">À venir</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">Date d'échéance: {sinistre.contrat.dateEcheance}</p>
                          <div className="text-xs text-gray-500">
                            <span>Fin de couverture (garantie décennale continue jusqu'en 2031)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description du sinistre */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <AlertTriangle className="w-5 h-5" />
                    Description du sinistre
                    {sinistre.aiGenerated.description && <AIIndicator />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-800 leading-relaxed font-medium">{sinistre.sinistre.description}</p>
                </CardContent>
              </Card>

              {/* Maître d'ouvrage & Préjudices seulement */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-800">Maître d'ouvrage & Préjudices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div>
                    <span className="text-sm font-bold text-gray-600">Nom:</span>
                    <p className="text-gray-800 font-medium">{sinistre.sinistre.maitreOuvrage.nom}</p>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-600">Qualité:</span>
                    <p className="text-gray-800 font-medium">{sinistre.sinistre.maitreOuvrage.qualite}</p>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-600">Activité:</span>
                    <p className="text-gray-800 font-medium">{sinistre.sinistre.maitreOuvrage.activite}</p>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-600">Préjudice immatériel:</span>
                    <p className="text-red-600 font-bold">{sinistre.sinistre.maitreOuvrage.prejudiceImateriel}</p>
                    {sinistre.aiGenerated.evaluation && <AIIndicator />}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contrat" className="space-y-6">
              {/* Données du contrat */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-800">Données du contrat</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-bold text-gray-600">Numéro de contrat:</span>
                        <p className="text-gray-800 font-mono">{sinistre.contrat.numero}</p>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-gray-600">Produit:</span>
                        <p className="text-gray-800 font-medium">{sinistre.contrat.produit}</p>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-gray-600">Prime annuelle:</span>
                        <p className="text-gray-800 font-bold">{sinistre.contrat.prime}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-bold text-gray-600">Date d'effet:</span>
                        <p className="text-gray-800 font-medium">{sinistre.contrat.dateEffet}</p>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-gray-600">Date d'échéance:</span>
                        <p className="text-gray-800 font-medium">{sinistre.contrat.dateEcheance}</p>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-gray-600">Courtier:</span>
                        <p className="text-gray-800 font-medium">{sinistre.contrat.courtier}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline du contrat */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Clock className="w-5 h-5" />
                    Timeline du contrat
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">Souscription du contrat</p>
                        <p className="text-sm text-gray-600">01/01/2021 - Mise en place de la couverture RC Décennale</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">Réception des travaux couverts</p>
                        <p className="text-sm text-gray-600">15/06/2021 - Début de la période de garantie décennale</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
                      <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">Déclaration du sinistre</p>
                        <p className="text-sm text-gray-600">28/09/2024 - Mise en cause dans les délais</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Garanties du contrat */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Shield className="w-5 h-5" />
                    Garanties du contrat
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-bold text-gray-900">Dommages à l'ouvrage</p>
                          <p className="text-sm text-gray-600">Plafond: 500 000 €</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-bold text-gray-900">Préjudice immatériel</p>
                          <p className="text-sm text-gray-600">Plafond: 150 000 €</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-bold text-gray-900">Frais de démolition</p>
                          <p className="text-sm text-gray-600">Inclus dans le plafond principal</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-bold text-gray-900">Frais d'expertise</p>
                          <p className="text-sm text-gray-600">Pris en charge par AXA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historique" className="space-y-6">
              {/* Documents avec analyse IA */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <FileText className="w-5 h-5" />
                    Documents contractuels et assurantiels
                    <Badge className="bg-purple-100 text-purple-800 ml-2">
                      <Bot className="h-3 w-3 mr-1" />
                      Analyse IA
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-6">
                    {sinistre.documents.map((doc, index) => (
                      <div key={index} className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                        {/* En-tête du document */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <h3 className="text-lg font-semibold text-gray-900">{doc.nom}</h3>
                              <Badge variant="outline" className="text-sm">{doc.type}</Badge>
                              <Badge variant="outline" className="text-sm text-gray-500">{doc.date}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge className={`text-xs border ${getConfidenceColor(doc.confidence)}`}>
                              {doc.confidence}% confiance
                            </Badge>
                          </div>
                        </div>

                        {/* Analyse IA complète */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                          {/* Classification IA */}
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Tag className="h-4 w-4 text-purple-600" />
                              <span className="text-sm font-semibold text-purple-900">Classification IA</span>
                            </div>
                            <p className="text-sm text-purple-800 font-medium">
                              {doc.aiClassification}
                            </p>
                            <div className="flex items-center text-xs text-purple-700 mt-2">
                              <Bot className="h-3 w-3 mr-1" />
                              Catégorisé automatiquement
                            </div>
                          </div>

                          {/* Renommage IA */}
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <FileCheck className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-semibold text-blue-900">Renommage IA</span>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-gray-600 mb-1">Nom original :</p>
                                <p className="text-xs text-gray-800 bg-gray-100 p-2 rounded font-mono">
                                  {doc.originalName}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-blue-700 mb-1">Nom suggéré :</p>
                                <p className="text-xs text-blue-800 bg-blue-100 p-2 rounded font-mono">
                                  {doc.aiRenamed}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center text-xs text-blue-700 mt-2">
                              <Bot className="h-3 w-3 mr-1" />
                              Renommage intelligent
                            </div>
                          </div>

                          {/* Score de confiance */}
                          <div className={`border rounded-lg p-4 ${
                            doc.confidence >= 95 ? 'bg-green-50 border-green-200' :
                            doc.confidence >= 90 ? 'bg-blue-50 border-blue-200' :
                            doc.confidence >= 85 ? 'bg-yellow-50 border-yellow-200' :
                            'bg-red-50 border-red-200'
                          }`}>
                            <div className="flex items-center gap-2 mb-3">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className={`text-sm font-semibold ${
                                doc.confidence >= 95 ? 'text-green-900' :
                                doc.confidence >= 90 ? 'text-blue-900' :
                                doc.confidence >= 85 ? 'text-yellow-900' :
                                'text-red-900'
                              }`}>
                                Score de confiance
                              </span>
                            </div>
                            <div className="text-center">
                              <div className={`text-2xl font-bold mb-1 ${
                                doc.confidence >= 95 ? 'text-green-700' :
                                doc.confidence >= 90 ? 'text-blue-700' :
                                doc.confidence >= 85 ? 'text-yellow-700' :
                                'text-red-700'
                              }`}>
                                {doc.confidence}%
                              </div>
                              <p className={`text-xs ${
                                doc.confidence >= 95 ? 'text-green-600' :
                                doc.confidence >= 90 ? 'text-blue-600' :
                                doc.confidence >= 85 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {doc.confidence >= 95 ? 'Excellente analyse' :
                                 doc.confidence >= 90 ? 'Très bonne analyse' :
                                 doc.confidence >= 85 ? 'Bonne analyse' :
                                 'Analyse à vérifier'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Synthèse IA détaillée */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Bot className="h-5 w-5 text-green-600" />
                            <span className="text-base font-semibold text-green-900">Synthèse IA détaillée</span>
                          </div>
                          <p className="text-sm text-green-800 leading-relaxed">
                            {doc.aiSummary}
                          </p>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-green-200">
                            <div className="flex items-center text-xs text-green-700">
                              <Bot className="h-3 w-3 mr-1" />
                              Analyse générée automatiquement
                            </div>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Document analysé ✓
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sinistres passés */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-800">Sinistres passés et en cours</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-gray-900">Sinistre actuel - RC-DECA-2024-001</p>
                          <p className="text-sm text-gray-600">En cours de traitement depuis le 28/09/2024</p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">En cours</Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-gray-900">Aucun sinistre antérieur</p>
                          <p className="text-sm text-gray-600">Historique vierge sur ce contrat</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Bon risque</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analyse" className="space-y-6">
              {/* Analyse de conformité */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <TrendingUp className="w-5 h-5" />
                    Analyse et comparaison IA
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-800 mb-2">✓ Conformité de la déclaration</h4>
                    <p className="text-sm text-gray-700">La déclaration est conforme aux termes du contrat. Les dommages décrits entrent dans le champ de la garantie décennale.</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-800 mb-2">📊 Évaluation des risques</h4>
                    <p className="text-sm text-gray-700">Préjudice immatériel évalué à 45 000€. Montant cohérent avec l'activité commerciale du maître d'ouvrage. Risque de dépassement limité.</p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-bold text-orange-800 mb-2">⚠️ Points d'attention</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Délai entre réception (2021) et déclaration (2024) : 3 ans - dans les délais légaux</li>
                      <li>• Nature des dommages : structurels, nécessitent expertise approfondie</li>
                      <li>• Préjudice immatériel important à documenter précisément</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-800 mb-2">🎯 Recommandations</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Diligenter expertise technique rapidement</li>
                      <li>• Demander justificatifs du préjudice immatériel</li>
                      <li>• Vérifier la couverture des autres intervenants</li>
                      <li>• Constituer provision de 80 000€ (dommages + préjudice)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Bouton d'ouverture du sinistre */}
          <div className="flex justify-center py-6 border-t border-gray-200 mt-8">
            <Button 
              onClick={() => navigate('/sinistre/declaration')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
            >
              Ouvrir le sinistre
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
