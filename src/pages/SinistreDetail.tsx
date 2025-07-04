import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, User, Calendar, MapPin, AlertTriangle, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";

const SinistreDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Données simulées du sinistre
  const sinistre = {
    id: id || "SIN-2024-001",
    reference: "RC-DECA-2024-001",
    statut: "En cours d'expertise",
    priorite: "Normale",
    dateDeclaration: "28/09/2024",
    dateOuverture: "02/10/2024",
    assure: "SARL Bâti Construct",
    courtier: "Agent AXA Lyon Centre",
    adresse: "123 Rue de la Construction, 69000 Lyon",
    description: "Sinistre amiable RC Décennale - Dommages structurels observés 3 ans après réception travaux",
    montantReserve: "150 000 €",
    expert: "Cabinet Expertise BTP"
  };

  // Documents avec classification IA
  const documents = [
    {
      nom: "Déclaration initiale",
      type: "PDF",
      date: "28/09/2024"
    },
    {
      nom: "Photos des dommages",
      type: "Images",
      date: "29/09/2024"
    },
    {
      nom: "Rapport d'expertise préliminaire",
      type: "PDF",
      date: "05/10/2024"
    },
    {
      nom: "Devis de réparation",
      type: "PDF",
      date: "10/10/2024"
    }
  ];

  // ... keep existing code (timeline, parties, and other state)
  const timeline = [
    { date: "28/09/2024", evenement: "Déclaration du sinistre", statut: "Terminé" },
    { date: "02/10/2024", evenement: "Ouverture du dossier", statut: "Terminé" },
    { date: "05/10/2024", evenement: "Affectation à l'expert", statut: "Terminé" },
    { date: "10/10/2024", evenement: "Expertise en cours", statut: "En cours" },
    { date: "25/10/2024", evenement: "Rapport d'expertise attendu", statut: "À venir" }
  ];

  const parties = [
    { nom: "SARL Bâti Construct", role: "Assuré", contact: "contact@bati-construct.fr" },
    { nom: "Cabinet Expertise BTP", role: "Expert", contact: "expert@cabinet-btp.fr" },
    { nom: "Maître d'ouvrage", role: "Déclarant", contact: "mo@projet-construction.fr" }
  ];

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
        <h2 className="text-lg font-semibold text-gray-900">Dossier sinistre {sinistre.reference}</h2>
        <Badge variant={sinistre.statut === "En cours d'expertise" ? "default" : "secondary"}>
          {sinistre.statut}
        </Badge>
      </div>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* En-tête du sinistre */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{sinistre.reference}</CardTitle>
                  <p className="text-gray-600 mt-1">{sinistre.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Montant de réserve</p>
                  <p className="text-2xl font-bold text-blue-600">{sinistre.montantReserve}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Assuré</p>
                    <p className="font-medium">{sinistre.assure}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Date déclaration</p>
                    <p className="font-medium">{sinistre.dateDeclaration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Lieu</p>
                    <p className="font-medium">{sinistre.adresse}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Expert</p>
                    <p className="font-medium">{sinistre.expert}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Onglets de contenu */}
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="timeline">Chronologie</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="parties">Parties</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Chronologie du sinistre</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeline.map((etape, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          etape.statut === "Terminé" ? "bg-green-500" :
                          etape.statut === "En cours" ? "bg-blue-500" : "bg-gray-300"
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium">{etape.evenement}</p>
                          <p className="text-sm text-gray-500">{etape.date}</p>
                        </div>
                        <Badge variant={
                          etape.statut === "Terminé" ? "default" :
                          etape.statut === "En cours" ? "secondary" : "outline"
                        }>
                          {etape.statut}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Documents du dossier</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-purple-600">
                    <Sparkles className="w-4 h-4" />
                    <span>Classifiés par IA</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="font-medium">{doc.nom}</p>
                            <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parties" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Parties impliquées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {parties.map((partie, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{partie.nom}</p>
                          <p className="text-sm text-gray-500">{partie.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{partie.contact}</p>
                          <Button variant="outline" size="sm" className="mt-1">
                            Contacter
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Actions disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="justify-start h-auto p-4 flex-col items-start">
                      <span className="font-medium">Planifier expertise</span>
                      <span className="text-sm text-gray-600">Programmer une visite d'expertise</span>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 flex-col items-start">
                      <span className="font-medium">Ajouter document</span>
                      <span className="text-sm text-gray-600">Joindre un nouveau document</span>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 flex-col items-start">
                      <span className="font-medium">Contacter parties</span>
                      <span className="text-sm text-gray-600">Envoyer une communication</span>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 flex-col items-start">
                      <span className="font-medium">Modifier statut</span>
                      <span className="text-sm text-gray-600">Changer l'état du dossier</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SinistreDetail;
