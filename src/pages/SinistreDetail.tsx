import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, AlertTriangle, Clock, User, MapPin, Phone, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TabsManager } from "@/components/TabsManager";

const SinistreDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const sinistreData = {
    id: "CON-2024-789456",
    company: "BATIMEX SARL",
    creationDate: "15/03/2024",
    address: "15 Avenue des Chantiers, 75015 Paris",
    type: "Dégâts des eaux",
    status: "Ouvert",
    contactName: "Jean Dupont",
    contactPhone: "06 12 34 56 78",
    description: "Infiltration d'eau suite à une rupture de canalisation",
    documents: [
      { id: 1, name: "Déclaration de sinistre", type: "pdf" },
      { id: 2, name: "Constat amiable", type: "pdf" },
      { id: 3, name: "Photos des dégâts", type: "zip" },
    ],
    timeline: [
      { date: "15/03/2024", time: "10:00", event: "Déclaration de sinistre reçue" },
      { date: "16/03/2024", time: "14:00", event: "Première évaluation des dégâts" },
      { date: "18/03/2024", time: "11:00", event: "Contact avec l'assuré" },
    ],
    alerts: [
      { id: 1, type: "urgent", message: "Pièces justificatives manquantes" },
      { id: 2, type: "info", message: "Expertise en cours de planification" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <TabsManager />
      <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">Détail du sinistre CON-2024-789456</h2>
      </div>
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* En-tête du dossier */}
          <Card>
            <CardHeader className="bg-blue-50 border-b border-blue-200">
              <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dossier {sinistreData.id} - {sinistreData.company}
              </CardTitle>
              <div className="flex gap-4 text-sm text-blue-700 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {sinistreData.creationDate}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {sinistreData.address}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {sinistreData.type}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Informations de contact</h3>
                  <p className="text-gray-600">Nom: {sinistreData.contactName}</p>
                  <p className="text-gray-600">
                    Téléphone: <a href={`tel:${sinistreData.contactPhone}`} className="text-blue-600 hover:underline">
                      <Phone className="inline-block h-4 w-4 mr-1 align-middle" />
                      {sinistreData.contactPhone}
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                  <p className="text-gray-600">{sinistreData.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {sinistreData.documents.map((doc) => (
                  <li key={doc.id} className="text-gray-600">
                    <a href="#" className="text-blue-600 hover:underline">
                      {doc.name}
                    </a> ({doc.type})
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sinistreData.timeline.map((event, index) => (
                  <li key={index} className="text-gray-600">
                    <span className="font-medium">{event.date} {event.time && `à ${event.time}`}</span> - {event.event}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alertes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sinistreData.alerts.map((alert) => (
                  <li key={alert.id} className="text-gray-600">
                    <Badge variant={alert.type === "urgent" ? "destructive" : "secondary"}>
                      {alert.type}
                    </Badge> {alert.message}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SinistreDetail;
