
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, FileText, AlertTriangle, Clock, CheckCircle, Send, Calendar, User, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TabsManager } from "@/components/TabsManager";

const SinistreSynthesis = () => {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState("");

  // Timeline des événements
  const timelineEvents = [
    {
      id: 1,
      date: "2024-03-15",
      time: "14:30",
      title: "Ouverture du dossier",
      status: "completed",
      description: "Déclaration de sinistre reçue et dossier ouvert"
    },
    {
      id: 2,
      date: "2024-03-16",
      time: "09:00",
      title: "Première évaluation",
      status: "completed",
      description: "Évaluation préliminaire des dégâts effectuée"
    },
    {
      id: 3,
      date: "2024-03-20",
      time: "14:00",
      title: "Expertise prévue",
      status: "upcoming",
      description: "Rendez-vous avec l'expert prévu"
    },
    {
      id: 4,
      date: "2024-03-25",
      time: "",
      title: "Rapport d'expertise",
      status: "pending",
      description: "Attente du rapport d'expertise détaillé"
    }
  ];

  // Alertes critiques
  const alerts = [
    {
      id: 1,
      type: "urgent",
      title: "Pièces manquantes",
      description: "Factures de réparation manquantes",
      dueDate: "2024-03-22"
    },
    {
      id: 2,
      type: "warning",
      title: "Délai prescription",
      description: "Recours possible jusqu'au 15/09/2024",
      dueDate: "2024-09-15"
    },
    {
      id: 3,
      type: "info",
      title: "Suivi expertise",
      description: "Rapport d'expertise attendu",
      dueDate: "2024-03-28"
    }
  ];

  // Actions recommandées
  const nextActions = [
    {
      id: 1,
      title: "Demander les factures manquantes",
      priority: "high",
      description: "Contacter l'assuré pour obtenir les factures de réparation"
    },
    {
      id: 2,
      title: "Programmer la contre-expertise",
      priority: "medium",
      description: "Organiser une seconde expertise si nécessaire"
    },
    {
      id: 3,
      title: "Préparer le règlement",
      priority: "low",
      description: "Calculer le montant de l'indemnisation"
    }
  ];

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Message envoyé:", chatMessage);
    setChatMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "urgent": return "border-red-200 bg-red-50";
      case "warning": return "border-yellow-200 bg-yellow-50";
      case "info": return "border-blue-200 bg-blue-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
        <h2 className="text-lg font-semibold text-gray-900">Synthèse du dossier sinistre</h2>
      </div>
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* En-tête du dossier */}
          <Card>
            <CardHeader className="bg-blue-50 border-b border-blue-200">
              <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dossier CON-2024-789456 - Société BATIMEX SARL
              </CardTitle>
              <div className="flex gap-4 text-sm text-blue-700 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  15/03/2024
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  15 Avenue des Chantiers, 75015 Paris
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Dégâts des eaux
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline des événements */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Timeline des événements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timelineEvents.map((event, index) => (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${
                            event.status === 'completed' ? 'bg-green-500' :
                            event.status === 'upcoming' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`} />
                          {index < timelineEvents.length - 1 && (
                            <div className="w-px h-12 bg-gray-300 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{event.title}</span>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status === 'completed' ? 'Terminé' :
                               event.status === 'upcoming' ? 'À venir' : 'En attente'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {event.date} {event.time && `à ${event.time}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alertes critiques */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Alertes critiques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                        <p className="text-xs font-medium mt-2">Échéance: {alert.dueDate}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chat avec le dossier */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Chat avec le dossier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto">
                    <div className="space-y-3">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <p className="text-sm">Bonjour ! Je peux vous aider à analyser ce dossier sinistre. Que souhaitez-vous savoir ?</p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Posez votre question sur le dossier..."
                      className="flex-1"
                    />
                    <Button type="submit" size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Actions recommandées */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Actions recommandées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nextActions.map((action) => (
                    <div key={action.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{action.title}</h4>
                        <Badge className={getPriorityColor(action.priority)}>
                          {action.priority === 'high' ? 'Urgent' :
                           action.priority === 'medium' ? 'Moyen' : 'Faible'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{action.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SinistreSynthesis;
