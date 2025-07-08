import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Phone, Mail, Building, AlertTriangle, Clock, CheckCircle, FileText, TrendingUp, Bot, Sparkles } from "lucide-react";
import { ActivitiesTable } from "@/components/ActivitiesTable";
import { SinistresAnterieurs } from "@/components/SinistreDetail/SinistresAnterieurs";

const SinistreDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("generale");

  // Mock data for demonstration
  const dossierInfo = {
    reference: "SIN-2024-001",
    dateOuverture: "15/01/2024",
    statut: "En cours",
    typeSinistre: "Dégâts des eaux",
    adresse: "123 Rue de la Paix, 75001 Paris",
    assure: "ABC Assurance",
    expert: "Cabinet Dupont",
    gestionnaire: "M. Martin"
  };

  const chantierInfo = {
    adresseChantier: "456 Avenue des Champs-Élysées, 75008 Paris",
    dateDebut: "01/05/2023",
    dateFinPrevue: "31/12/2024",
    descriptionDesordres: "Infiltrations importantes suite à de fortes pluies",
    photos: [
      "url_photo_1.jpg",
      "url_photo_2.jpg",
      "url_photo_3.jpg"
    ]
  };

  const activitiesData = [
    {
      id: 1,
      date: "16/01/2024",
      description: "Contact initial avec l'assuré",
      type: "Appel téléphonique",
      utilisateur: "M. Martin"
    },
    {
      id: 2,
      date: "18/01/2024",
      description: "Envoi de la demande d'expertise",
      type: "Email",
      utilisateur: "M. Martin"
    },
    {
      id: 3,
      date: "22/01/2024",
      description: "Réception du rapport d'expertise",
      type: "Document",
      utilisateur: "Cabinet Dupont"
    }
  ];

  const analysesIA = [
    {
      id: 1,
      titre: "Abandon de chantier - Garantie RC Décennale",
      description: "Le chantier n'est pas terminé car notre assuré a abandonné le chantier\n==> Dans ces circonstances, la garantie Responsabilité Décénale du contrat de l'assuré ne peut trouver application\n==> Les garanties en cours de chantier ne peuvent également trouver application. En effet, ces garanties ne peuvent trouver application que pour des dommages matériels accidentels et non pour des malfaçons et des non finitions.",
      type: "critique",
      confidence: 95,
      impact: "Exclusion de garantie majeure"
    },
    {
      id: 2,
      titre: "Garanties charpente et couverture - Contrat de remplacement",
      description: "Les travaux de charpente et de couverture ne sont pas garantis sur les CP de mars 2012. Ils le sont en revanche dans le contrat de remplacement du 01/07/2012. Il convient donc de recueillir le document officiel d'ouverture du chantier pour vérifier si la date d'ouverture est postérieure ou non au 01/07/2012 afin de déterminer si le contrat de remplacement peut trouver application",
      type: "attention",
      confidence: 88,
      impact: "Vérification contractuelle nécessaire"
    }
  ];

  const getAnalyseColor = (type: string) => {
    switch (type) {
      case "critique":
        return "bg-red-50 border-red-200";
      case "attention":
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getAnalyseIcon = (type: string) => {
    switch (type) {
      case "critique":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "attention":
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">
                Dossier Sinistre: {dossierInfo.reference}
              </h2>
              <p className="text-sm text-gray-500">
                Ouvert le {dossierInfo.dateOuverture} - Statut:{" "}
                <Badge variant="secondary">{dossierInfo.statut}</Badge>
              </p>
            </div>
            <div className="space-x-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Voir les documents
              </Button>
              <Button>
                <User className="w-4 h-4 mr-2" />
                Contacter l'assuré
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="generale">Informations générales</TabsTrigger>
              <TabsTrigger value="chantier">Chantier et désordres</TabsTrigger>
              <TabsTrigger value="analyse">Analyse IA</TabsTrigger>
              <TabsTrigger value="activites">Activités</TabsTrigger>
            </TabsList>

            <TabsContent value="generale" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations clés</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{dossierInfo.adresse}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span>Assuré: {dossierInfo.assure}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Gestionnaire: {dossierInfo.gestionnaire}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Expert</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{dossierInfo.expert}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>01 23 45 67 89</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>expert@cabinet.fr</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Historique Sinistres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SinistresAnterieurs />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="chantier" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations sur le chantier</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>Adresse: {chantierInfo.adresseChantier}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        Début: {chantierInfo.dateDebut} - Fin prévue:{" "}
                        {chantierInfo.dateFinPrevue}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">
                        Description des désordres:
                      </h4>
                      <p className="text-sm text-gray-700">
                        {chantierInfo.descriptionDesordres}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analyse" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      Analyses IA du dossier
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysesIA.map((analyse) => (
                        <div
                          key={analyse.id}
                          className={`p-4 rounded-lg border-2 ${getAnalyseColor(analyse.type)}`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            {getAnalyseIcon(analyse.type)}
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">
                                Alerte {analyse.id} - {analyse.titre}
                              </h3>
                              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                {analyse.description}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Confiance: {analyse.confidence}%
                              </Badge>
                              <span className="text-xs text-gray-600">
                                Impact: {analyse.impact}
                              </span>
                            </div>
                            <Bot className="h-4 w-4 text-purple-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activites" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activités récentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ActivitiesTable data={activitiesData} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SinistreDetail;
