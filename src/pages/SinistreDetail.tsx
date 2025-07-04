
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, Calendar, MapPin, User, Building, AlertTriangle, Star, Brain, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";

const SinistreDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [status, setStatus] = useState("Ouvert");
  const [comment, setComment] = useState("");

  const sinistre = {
    id: "SIN-2024-789456",
    numeroContrat: "20041732073",
    chantier: "TEST",
    adresse: "11, RUE girardot, 93100 MONTREUIL",
    dateSinistre: "30/06/2025",
    dateDeclaration: "01/07/2025",
    type: "Construction DO",
    enjeuFinancier: "Moyen",
    presenceVictimes: "Non",
    nombreVictimes: 0,
    description: "Fissures importantes sur les murs porteurs suite à un affaissement du terrain."
  };

  // Type pour les documents avec propriétés AI
  type DocumentWithAI = {
    nom: string;
    type: string;
    date: string;
    aiClassification: {
      category: string;
      confidence: number;
      renamedAs: string;
      summary: string;
    };
  };

  const documentsWithAI: DocumentWithAI[] = [
    {
      nom: "Courrier_Declaration_Initial.pdf",
      type: "Courrier",
      date: "01/07/2025",
      aiClassification: {
        category: "Déclaration initiale",
        confidence: 95,
        renamedAs: "DECL_INITIALE_20250701.pdf",
        summary: "Première déclaration du sinistre par l'assuré décrivant les désordres constatés sur l'ouvrage et les circonstances de découverte."
      }
    },
    {
      nom: "Photos_Desordres_Batiment.zip",
      type: "Photos",
      date: "02/07/2025",
      aiClassification: {
        category: "Preuves visuelles",
        confidence: 98,
        renamedAs: "PHOTOS_DESORDRES_20250702.zip",
        summary: "Collection de photographies montrant l'étendue des dommages structurels, fissures murales et problèmes d'étanchéité identifiés."
      }
    },
    {
      nom: "Rapport_Expert_Technique.pdf",
      type: "Rapport",
      date: "05/07/2025",
      aiClassification: {
        category: "Expertise technique",
        confidence: 92,
        renamedAs: "EXPERTISE_TECH_20250705.pdf",
        summary: "Analyse technique détaillée des causes probables du sinistre, évaluation des réparations nécessaires et estimation des coûts."
      }
    },
    {
      nom: "Devis_Reparations_Entreprise.pdf",
      type: "Devis",
      date: "08/07/2025",
      aiClassification: {
        category: "Évaluation financière",
        confidence: 88,
        renamedAs: "DEVIS_REPARATIONS_20250708.pdf",
        summary: "Estimation chiffrée des travaux de remise en état par l'entreprise spécialisée, incluant matériaux et main-d'œuvre."
      }
    }
  ];

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    // Ici, vous pouvez ajouter la logique pour enregistrer le changement de statut dans votre backend
    console.log(`Statut changé en : ${newStatus}`);
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">Synthèse du contrat RC Décennale</h2>
      </div>
      <main className="flex-1 p-6">
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold">
              Sinistre N° {id}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Informations générales</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Numéro de contrat:</span> {sinistre.numeroContrat}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Chantier:</span> {sinistre.chantier}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Adresse:</span> {sinistre.adresse}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Date du sinistre:</span> {sinistre.dateSinistre}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Détails du sinistre</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Type:</span> {sinistre.type}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Enjeu financier:</span> {sinistre.enjeuFinancier}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Victimes:</span> {sinistre.presenceVictimes === "Oui" ? `${sinistre.nombreVictimes} victimes` : "Aucune victime"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Description:</span> {sinistre.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="historique">Historique & Documents</TabsTrigger>
            <TabsTrigger value="parties">Parties</TabsTrigger>
            <TabsTrigger value="suivi">Suivi</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Numéro de contrat: {sinistre.numeroContrat}</p>
                  <p>Chantier: {sinistre.chantier}</p>
                  <p>Adresse: {sinistre.adresse}</p>
                  {/* Ajoutez ici d'autres informations générales */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Parties impliquées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Assuré: Nom de l'assuré</p>
                  <p>Expert: Nom de l'expert</p>
                  {/* Ajoutez ici d'autres parties impliquées */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suivi" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suivi du sinistre</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Statut actuel</label>
                      <Select value={status} onValueChange={handleStatusChange}>
                        {/* Ajoutez ici les options de statut */}
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ouvert">Ouvert</SelectItem>
                          <SelectItem value="En cours">En cours</SelectItem>
                          <SelectItem value="Fermé">Fermé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ajouter un commentaire</label>
                      <textarea
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button className="mt-2">Enregistrer le commentaire</Button>
                    </div>
                  </div>
                  {/* Ajoutez ici d'autres éléments de suivi */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historique" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents du dossier
                  <Badge variant="secondary" className="ml-2">
                    <Brain className="h-3 w-3 mr-1" />
                    Traités par IA
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentsWithAI.map((doc, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900">{doc.nom}</h4>
                              <Star className="h-4 w-4 text-purple-600 fill-purple-600" />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Badge variant="outline" className="text-xs">
                                {doc.type}
                              </Badge>
                              <span>•</span>
                              <span>{doc.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="secondary" 
                            className={`mb-1 ${
                              doc.aiClassification.confidence >= 95 
                                ? 'bg-green-100 text-green-800' 
                                : doc.aiClassification.confidence >= 90 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {doc.aiClassification.confidence}% confiance
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-white/70 rounded-md p-3 mb-3 border-l-4 border-purple-400">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-purple-900 text-sm">Classification IA :</span>
                          <Badge className="bg-purple-100 text-purple-800 text-xs">
                            {doc.aiClassification.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-700 mb-2">
                          <strong>Renommé en :</strong> <code className="bg-gray-100 px-1 rounded text-xs">{doc.aiClassification.renamedAs}</code>
                        </div>
                        <div className="text-sm text-gray-700">
                          <strong>Synthèse :</strong> {doc.aiClassification.summary}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                        <Button variant="outline" size="sm">
                          Aperçu
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historique des actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Ajoutez ici l'historique des actions */}
                  <p>01/07/2025: Déclaration initiale reçue</p>
                  <p>05/07/2025: Expertise technique demandée</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SinistreDetail;
