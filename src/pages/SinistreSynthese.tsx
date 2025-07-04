
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  ArrowLeft, 
  AlertTriangle, 
  Clock, 
  MessageCircle, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Send,
  Calendar,
  Users,
  Eye,
  TrendingUp,
  Shield
} from "lucide-react";

const SinistreSynthese = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      message: "Bonjour ! Je suis votre assistant IA pour ce dossier sinistre. Vous pouvez me poser des questions sur les documents, les délais, ou les prochaines étapes."
    }
  ]);

  // Données simulées du dossier créé à partir de la déclaration
  const dossierData = {
    reference: "SIN-2024-000789",
    statut: "Ouvert - En cours d'instruction",
    dateOuverture: "04/07/2025",
    dateEcheance: "18/07/2025",
    estimationDommages: "125 000 €"
  };

  const timelineEvents = [
    {
      date: "04/07/2025 09:00",
      title: "Ouverture du dossier",
      description: "Dossier créé automatiquement suite à la déclaration",
      status: "completed",
      type: "ouverture"
    },
    {
      date: "04/07/2025 10:30",
      title: "Notification courtier",
      description: "Courtier informé par email de l'ouverture du sinistre",
      status: "completed",
      type: "notification"
    },
    {
      date: "05/07/2025",
      title: "Mission d'expertise",
      description: "Expert désigné - M. Dubois (expertise@axa-partners.fr)",
      status: "in-progress",
      type: "expertise"
    },
    {
      date: "12/07/2025",
      title: "Rapport d'expertise",
      description: "Date prévue de réception du rapport préliminaire",
      status: "pending",
      type: "rapport"
    },
    {
      date: "18/07/2025",
      title: "Échéance première position",
      description: "Délai réglementaire pour une première position",
      status: "pending",
      type: "echeance"
    }
  ];

  const alertes = [
    {
      type: "critique",
      titre: "Échéance proche",
      description: "Première position requise avant le 18/07/2025",
      delai: "14 jours restants",
      icon: AlertTriangle
    },
    {
      type: "attention",
      titre: "Documents manquants",
      description: "Photos complémentaires à demander à l'assuré",
      delai: "Non bloquant",
      icon: FileText
    },
    {
      type: "info",
      titre: "Expert désigné",
      description: "Confirmation de mission envoyée à l'expert",
      delai: "En attente retour",
      icon: Users
    }
  ];

  const nextActions = [
    {
      titre: "Contacter l'expert",
      description: "Confirmer la date de visite sur site",
      priorite: "haute",
      delai: "2 jours",
      icon: Eye
    },
    {
      titre: "Demander photos complémentaires",
      description: "Photos de l'état initial du chantier",
      priorite: "moyenne",
      delai: "5 jours",
      icon: FileText
    },
    {
      titre: "Vérifier garanties",
      description: "Contrôler l'adéquation garanties/dommages",
      priorite: "moyenne",
      delai: "7 jours",
      icon: Shield
    },
    {
      titre: "Constituer provision",
      description: "Estimer et constituer la provision initiale",
      priorite: "normale",
      delai: "10 jours",
      icon: TrendingUp
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newChatHistory = [
      ...chatHistory,
      { type: "user", message: chatMessage },
      { 
        type: "ai", 
        message: "Je vais analyser votre question concernant ce dossier. Basé sur les documents disponibles, voici ma réponse..." 
      }
    ];

    setChatHistory(newChatHistory);
    setChatMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "in-progress": return <Clock className="w-4 h-4 text-blue-600" />;
      case "pending": return <Clock className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critique": return "border-red-200 bg-red-50";
      case "attention": return "border-orange-200 bg-orange-50";
      case "info": return "border-blue-200 bg-blue-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "haute": return "bg-red-100 text-red-800";
      case "moyenne": return "bg-orange-100 text-orange-800";
      case "normale": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <Header />
        <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
          <SidebarTrigger className="border-2 border-blue-600 hover:bg-blue-50 text-blue-700" />
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
            <h1 className="text-xl font-bold text-gray-900">Synthèse du Dossier Sinistre</h1>
            <p className="text-sm text-gray-600">Réf. {dossierData.reference}</p>
          </div>
          <div className="ml-auto">
            <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold">
              {dossierData.statut}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Informations principales */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Date d'ouverture</p>
                        <p className="font-bold">{dossierData.dateOuverture}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">Échéance</p>
                        <p className="font-bold text-orange-600">{dossierData.dateEcheance}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Estimation</p>
                        <p className="font-bold">{dossierData.estimationDommages}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Garantie</p>
                        <p className="font-bold">RC Décennale</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Timeline des événements */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Clock className="w-5 h-5" />
                      Timeline des Événements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {timelineEvents.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            {getStatusIcon(event.status)}
                            {index < timelineEvents.length - 1 && (
                              <div className="w-px h-8 bg-gray-300 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{event.title}</h4>
                              <Badge className={getStatusColor(event.status)} variant="secondary">
                                {event.status === 'completed' ? 'Terminé' : 
                                 event.status === 'in-progress' ? 'En cours' : 'À venir'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                            <p className="text-xs text-gray-500">{event.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Système d'alertes */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <AlertTriangle className="w-5 h-5" />
                      Alertes & Jalons Critiques
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    {alertes.map((alerte, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alerte.type)}`}>
                        <div className="flex items-start gap-3">
                          <alerte.icon className="w-5 h-5 mt-0.5 text-current" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{alerte.titre}</h4>
                            <p className="text-sm text-gray-700 mb-1">{alerte.description}</p>
                            <p className="text-xs font-medium text-gray-600">{alerte.delai}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Chat avec le dossier */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <MessageCircle className="w-5 h-5" />
                      Chat avec le Dossier
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-64 overflow-y-auto p-4 space-y-3">
                      {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            msg.type === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Posez votre question sur ce dossier..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage} size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Best Actions */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <CheckCircle2 className="w-5 h-5" />
                      Prochaines Actions Recommandées
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    {nextActions.map((action, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <action.icon className="w-5 h-5 mt-0.5 text-blue-600" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{action.titre}</h4>
                              <Badge className={getPriorityColor(action.priorite)} variant="secondary">
                                {action.priorite}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-1">{action.description}</p>
                            <p className="text-xs text-gray-500">Délai recommandé: {action.delai}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

              </div>

            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SinistreSynthese;
