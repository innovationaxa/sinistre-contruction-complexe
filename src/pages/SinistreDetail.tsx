import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, User, Building, Calendar, AlertTriangle, Sparkles, Shield, Clock, TrendingUp, CheckCircle } from "lucide-react";

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
  
  const sinistre = mockSinistreData;

  const AIIndicator = () => (
    <Sparkles className="w-4 h-4 text-purple-600 inline ml-1" />
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
          <h1 className="text-xl font-bold text-gray-900">Synthèse du contrat RC Décennale</h1>
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
              <TabsTrigger value="synthese" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="contrat" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Vie du contrat</TabsTrigger>
              <TabsTrigger value="historique" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Historique & Documents</TabsTrigger>
              <TabsTrigger value="analyse" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Analyse IA</TabsTrigger>
            </TabsList>

            <TabsContent value="synthese" className="space-y-6">
              {/* Informations principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-blue-200">
                  <CardHeader className="pb-3 bg-blue-50">
                    <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                      <Calendar className="w-5 h-5" />
                      Dates clés
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Déclaration:</span>
                      <span className="font-bold">{sinistre.dateDeclaration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Réception:</span>
                      <span className="font-bold">{sinistre.dateReception}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Échéance:</span>
                      <span className="font-bold text-red-600">{sinistre.echeance}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader className="pb-3 bg-blue-50">
                    <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                      <Building className="w-5 h-5" />
                      Assuré
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="font-bold text-gray-900">{sinistre.assure.raisonSociale}</div>
                    <div className="text-gray-600">SIRET: {sinistre.assure.siret}</div>
                    <div className="text-gray-600">{sinistre.assure.secteurActivite}</div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader className="pb-3 bg-blue-50">
                    <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                      <FileText className="w-5 h-5" />
                      Contrat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="font-bold text-gray-900">{sinistre.contrat.numero}</div>
                    <div className="text-gray-600">{sinistre.contrat.produit}</div>
                    <div className="text-gray-600 font-semibold">Prime: {sinistre.contrat.prime}</div>
                  </CardContent>
                </Card>
              </div>

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

              {/* Détails du sinistre */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-blue-800">Informations chantier</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4">
                    <div>
                      <span className="text-sm font-bold text-gray-600">Type de chantier:</span>
                      <p className="text-gray-800 font-medium">{sinistre.sinistre.typeChantier}</p>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-600">Adresse des travaux:</span>
                      <p className="text-gray-800 font-medium">{sinistre.sinistre.adresseTravaux}</p>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-600">Date de réception:</span>
                      <p className="text-gray-800 font-medium">{sinistre.sinistre.dateReceptionTravaux}</p>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-600">Nature des dommages:</span>
                      <p className="text-gray-800 font-medium">{sinistre.sinistre.natureDommages}</p>
                    </div>
                  </CardContent>
                </Card>

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
              </div>
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
              {/* Documents */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-800">Documents contractuels et assurantiels</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {sinistre.documents.map((doc, index) => (
                      <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-bold">{doc.nom}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {doc.type} • {doc.date}
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
