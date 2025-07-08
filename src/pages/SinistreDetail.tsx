
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, User, Phone, Mail, Building, FileText, AlertTriangle, CheckCircle, Clock, Euro, Eye } from "lucide-react";
import { SinistresAnterieurs } from "@/components/SinistreDetail/SinistresAnterieurs";

const SinistreDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Données simulées du sinistre
  const sinistreData = {
    reference: `SIN-2024-${id}`,
    statut: "En cours d'expertise",
    dateDeclaration: "15/03/2024",
    dateOccurrence: "12/03/2024",
    garantie: "RC Décennale",
    montantEstime: "25 000€",
    assure: {
      nom: "Société BATIMEX SARL",
      adresse: "15 Avenue des Chantiers, 75015 Paris",
      telephone: "01 45 67 89 12",
      email: "contact@batimex-sarl.fr",
      gestionnaire: "Marie Dubois"
    },
    description: "Dégâts des eaux survenus dans l'atelier principal suite à une rupture de canalisation. Dommages constatés sur les équipements de production et le stock de matériaux.",
    expert: {
      nom: "Jean-Pierre Martin",
      telephone: "01 56 78 90 34",
      email: "jp.martin@expertise-assurance.fr"
    },
    documents: [
      { nom: "Déclaration de sinistre", type: "PDF", taille: "1.2 MB" },
      { nom: "Photos des dégâts", type: "ZIP", taille: "15.8 MB" },
      { nom: "Devis réparation", type: "PDF", taille: "650 KB" },
      { nom: "Rapport expert", type: "PDF", taille: "2.1 MB" }
    ],
    timeline: [
      { date: "12/03/2024", action: "Occurrence du sinistre", statut: "completed" },
      { date: "15/03/2024", action: "Déclaration reçue", statut: "completed" },
      { date: "18/03/2024", action: "Mission d'expertise", statut: "completed" },
      { date: "22/03/2024", action: "Expertise sur site", statut: "current" },
      { date: "À venir", action: "Rapport d'expertise", statut: "pending" },
      { date: "À venir", action: "Décision de règlement", statut: "pending" }
    ]
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "En cours d'expertise":
        return "bg-orange-100 text-orange-800";
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      case "Réglé":
        return "bg-green-100 text-green-800";
      case "Refusé":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimelineIcon = (statut: string) => {
    switch (statut) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "current":
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* En-tête du sinistre */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Sinistre {sinistreData.reference}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">{sinistreData.assure.nom}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(sinistreData.statut)}>
                    {sinistreData.statut}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Synthèse IA
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Onglets */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-blue-50 border-blue-200">
              <TabsTrigger value="overview" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Vue d'ensemble
              </TabsTrigger>
              <TabsTrigger value="chantier" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Chantier et désordres
              </TabsTrigger>
              <TabsTrigger value="timeline" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Chronologie
              </TabsTrigger>
              <TabsTrigger value="documents" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informations générales */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Informations générales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Date d'occurrence</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{sinistreData.dateOccurrence}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Date de déclaration</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{sinistreData.dateDeclaration}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Garantie</label>
                      <p className="text-gray-900 mt-1">{sinistreData.garantie}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Montant estimé</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Euro className="h-4 w-4 text-green-600" />
                        <span className="text-gray-900 font-semibold">{sinistreData.montantEstime}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-gray-900 mt-1 text-sm leading-relaxed">{sinistreData.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Informations assuré */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      Informations assuré
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Nom</label>
                      <p className="text-gray-900 mt-1">{sinistreData.assure.nom}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Adresse</label>
                      <div className="flex items-start gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-900 text-sm">{sinistreData.assure.adresse}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Téléphone</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{sinistreData.assure.telephone}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{sinistreData.assure.email}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Gestionnaire</label>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{sinistreData.assure.gestionnaire}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="chantier" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations chantier et désordres</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Les informations détaillées sur le chantier et les désordres constatés seront affichées ici.
                  </p>
                </CardContent>
              </Card>
              
              <SinistresAnterieurs />
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chronologie du sinistre</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sinistreData.timeline.map((event, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-gray-200">
                        {getTimelineIcon(event.statut)}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{event.action}</h4>
                          <p className="text-sm text-gray-600">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documents associés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sinistreData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{doc.nom}</h4>
                          <p className="text-sm text-gray-600">{doc.type} • {doc.taille}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
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
