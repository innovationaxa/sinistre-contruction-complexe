
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, FileText, AlertTriangle, Clock, CheckCircle, Send, Calendar, User, MapPin, Star, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const SinistreSynthesis = () => {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState("");

  // Timeline des événements avec détails
  const timelineEvents = [
    {
      id: 1,
      date: "2024-03-15",
      time: "14:30",
      title: "Ouverture du dossier",
      status: "completed",
      description: "Déclaration de sinistre reçue et dossier ouvert",
      details: {
        importance: "Étape initiale du processus",
        documents: [
          { name: "Déclaration de sinistre", type: "PDF", size: "1.2 MB" },
          { name: "Photos des dégâts", type: "ZIP", size: "3.5 MB" }
        ],
        notes: "Dossier ouvert automatiquement suite à la réception de la déclaration en ligne. Première évaluation des dégâts basée sur les photos fournies."
      }
    },
    {
      id: 2,
      date: "2024-03-16",
      time: "09:00",
      title: "Première évaluation",
      status: "completed",
      description: "Évaluation préliminaire des dégâts effectuée",
      details: {
        importance: "Évaluation initiale des dommages",
        documents: [
          { name: "Rapport d'évaluation préliminaire", type: "PDF", size: "2.1 MB" },
          { name: "Devis de réparation estimatif", type: "PDF", size: "0.8 MB" }
        ],
        notes: "Montant estimé des dégâts : 15 000€. Nécessité d'une expertise approfondie confirmée."
      }
    },
    {
      id: 3,
      date: "2024-03-20",
      time: "14:00",
      title: "Expertise prévue",
      status: "upcoming",
      description: "Rendez-vous avec l'expert prévu",
      details: {
        importance: "Expertise technique détaillée",
        documents: [
          { name: "Convocation expertise", type: "PDF", size: "0.3 MB" }
        ],
        notes: "Rendez-vous fixé avec M. Dubois, expert agréé. Présence de l'assuré requise."
      }
    },
    {
      id: 4,
      date: "2024-03-25",
      time: "",
      title: "Rapport d'expertise",
      status: "pending",
      description: "Attente du rapport d'expertise détaillé",
      details: {
        importance: "Rapport technique final",
        documents: [],
        notes: "Rapport attendu dans les 5 jours suivant l'expertise. Déterminera le montant final de l'indemnisation."
      }
    }
  ];

  // Alertes critiques
  const alerts = [
    {
      id: 1,
      type: "urgent",
      title: "Pièces manquantes",
      description: "Factures de réparation manquantes",
      dueDate: "2024-03-22",
      impact: "Retard possible dans le règlement"
    },
    {
      id: 2,
      type: "warning",
      title: "Délai prescription",
      description: "Recours possible jusqu'au 15/09/2024",
      dueDate: "2024-09-15",
      impact: "Risque de perte de recours"
    },
    {
      id: 3,
      type: "info",
      title: "Suivi expertise",
      description: "Rapport d'expertise attendu",
      dueDate: "2024-03-28",
      impact: "Nécessaire pour finaliser le dossier"
    }
  ];

  // Actions recommandées
  const nextActions = [
    {
      id: 1,
      title: "Demander les factures manquantes",
      priority: "high",
      description: "Contacter l'assuré pour obtenir les factures de réparation",
      deadline: "2024-03-22",
      assignee: "Gestionnaire"
    },
    {
      id: 2,
      title: "Programmer la contre-expertise",
      priority: "medium",
      description: "Organiser une seconde expertise si nécessaire",
      deadline: "2024-03-30",
      assignee: "Expert"
    },
    {
      id: 3,
      title: "Préparer le règlement",
      priority: "low",
      description: "Calculer le montant de l'indemnisation",
      deadline: "2024-04-05",
      assignee: "Gestionnaire"
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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "urgent": return "🚨";
      case "warning": return "⚠️";
      case "info": return "ℹ️";
      default: return "📋";
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return "🔥";
      case "medium": return "📋";
      case "low": return "✅";
      default: return "📋";
    }
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

          {/* Alertes critiques - Mise en avant */}
          <Card className="border-l-4 border-l-red-500 shadow-lg">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-2 text-red-900">
                <AlertTriangle className="h-6 w-6" />
                🚨 Alertes critiques
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'urgent' ? 'border-l-red-500 bg-red-50' :
                    alert.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
                    'border-l-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          {getAlertIcon(alert.type)} {alert.title}
                        </h4>
                        <p className="text-gray-700 mt-1">{alert.description}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Impact:</strong> {alert.impact}
                        </p>
                        <p className="text-sm font-medium mt-2">
                          ⏰ Échéance: {alert.dueDate}
                        </p>
                      </div>
                      <Badge className={`${
                        alert.type === 'urgent' ? 'bg-red-500' :
                        alert.type === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      } text-white`}>
                        {alert.type === 'urgent' ? 'URGENT' :
                         alert.type === 'warning' ? 'ATTENTION' : 'INFO'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions recommandées - Mise en avant */}
          <Card className="border-l-4 border-l-green-500 shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <CheckCircle className="h-6 w-6" />
                ⭐ Actions recommandées
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4">
                {nextActions.map((action) => (
                  <div key={action.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        {getPriorityIcon(action.priority)} {action.title}
                      </h4>
                      <Badge className={getPriorityColor(action.priority)}>
                        {action.priority === 'high' ? 'URGENT' :
                         action.priority === 'medium' ? 'MOYEN' : 'FAIBLE'}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-2">{action.description}</p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>📅 Échéance: {action.deadline}</span>
                      <span>👤 Assigné à: {action.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Timeline des événements - Interactive */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timeline des événements
                </CardTitle>
                <p className="text-sm text-gray-600">Cliquez sur une étape pour voir les détails</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => (
                    <Dialog key={event.id}>
                      <DialogTrigger asChild>
                        <div className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full ${
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
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            {event.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">📋 Importance</h4>
                            <p className="text-sm text-gray-700">{event.details.importance}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">📄 Documents liés</h4>
                            {event.details.documents.length > 0 ? (
                              <div className="space-y-2">
                                {event.details.documents.map((doc, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">{doc.name}</span>
                                      <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-500">{doc.size}</span>
                                      <Button size="sm" variant="ghost">
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                      <Button size="sm" variant="ghost">
                                        <Download className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 italic">Aucun document associé</p>
                            )}
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">📝 Notes importantes</h4>
                            <p className="text-sm text-gray-700">{event.details.notes}</p>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date} {event.time && `à ${event.time}`}</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </CardContent>
            </Card>

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
          </div>
        </div>
      </main>
    </div>
  );
};

export default SinistreSynthesis;
