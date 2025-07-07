
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, MessageCircle, AlertTriangle, CheckCircle, Clock, FileText, User, MapPin, Calendar, Bot, Sparkles, TrendingUp, Scale, Star, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";

const SinistreSynthesis = () => {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {
      role: 'assistant',
      content: 'Bonjour ! Je peux vous aider à analyser ce dossier sinistre. Que souhaitez-vous savoir ?'
    }
  ]);

  // Données du dossier
  const dossierInfo = {
    reference: "CON-2024-789456",
    assure: "Société BATIMEX SARL",
    typeContrat: "RC Décennale",
    dateOuverture: "15/03/2024",
    adresse: "15 Avenue des Chantiers, 75015 Paris",
    gestionnaire: "Marie Dubois"
  };

  // Synthèse IA
  const syntheseIA = "Sinistre RC Décennale suite à des dégâts des eaux survenus dans l'atelier principal de BATIMEX SARL. Montant estimé : 15 000€. Expertise programmée le 20/03/2024. Couverture confirmée, pas d'exclusion identifiée. Délai de traitement normal : 45 jours.";

  // Actes contentieux
  const actesContentieux = [
    {
      type: "Mise en demeure",
      date: "10/03/2024",
      status: "Reçue",
      partie: "Maître d'ouvrage"
    },
    {
      type: "Assignation",
      date: "En attente",
      status: "Potentielle",
      partie: "Tribunal de commerce"
    }
  ];

  // Alertes IA
  const alertesIA = [
    {
      id: 1,
      type: "urgent",
      titre: "Documents manquants",
      description: "Factures de réparation non fournies",
      impact: "Retard possible dans le règlement",
      confidence: 92
    },
    {
      id: 2,
      type: "warning",
      titre: "Incohérence montants",
      description: "Écart de 2 000€ entre devis initial et final",
      impact: "Vérification expertise requise",
      confidence: 87
    },
    {
      id: 3,
      type: "info",
      titre: "Délai prescription",
      description: "Recours possible jusqu'au 15/09/2024",
      impact: "Action préventive recommandée",
      confidence: 95
    }
  ];

  // Next Best Actions
  const nextActions = [
    {
      id: 1,
      action: "Relancer les factures manquantes",
      priorite: "haute",
      delai: "2 jours",
      assignee: "Gestionnaire",
      description: "Contacter l'assuré pour obtenir les justificatifs de réparation"
    },
    {
      id: 2,
      action: "Programmer contre-expertise",
      priorite: "moyenne",
      delai: "1 semaine",
      assignee: "Expert",
      description: "Organiser une seconde évaluation des dégâts"
    },
    {
      id: 3,
      action: "Vérifier garanties annexes",
      priorite: "basse",
      delai: "2 semaines",
      assignee: "Souscripteur",
      description: "Contrôler l'étendue des couvertures applicables"
    }
  ];

  // Dossiers associés
  const dossiersAssocies = [
    {
      id: "CON-2023-456123",
      nom: "BATIMEX - Sinistre antérieur",
      score: 85,
      relation: "Même assuré",
      statut: "Clos"
    },
    {
      id: "CON-2024-123789",
      nom: "Chantier Avenue des Chantiers",
      score: 72,
      relation: "Même adresse",
      statut: "En cours"
    },
    {
      id: "CON-2024-987456",
      nom: "Expert M. Dubois - Autres dossiers",
      score: 68,
      relation: "Même expert",
      statut: "Récent"
    }
  ];

  // Timeline
  const timeline = [
    {
      date: "15/03/2024 14:30",
      titre: "Ouverture du dossier",
      description: "Déclaration reçue et dossier créé",
      statut: "completed"
    },
    {
      date: "16/03/2024 09:00",
      titre: "Première évaluation",
      description: "Évaluation préliminaire effectuée",
      statut: "completed"
    },
    {
      date: "20/03/2024 14:00",
      titre: "Expertise programmée",
      description: "Rendez-vous avec expert M. Dubois",
      statut: "upcoming"
    },
    {
      date: "25/03/2024",
      titre: "Rapport d'expertise",
      description: "Réception du rapport technique",
      statut: "pending"
    }
  ];

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { role: 'user' as const, content: chatMessage },
      { 
        role: 'assistant' as const, 
        content: `Concernant votre question sur "${chatMessage}", voici les informations disponibles dans le dossier : Le sinistre BATIMEX présente un montant estimé de 15 000€ avec une expertise programmée. Tous les éléments semblent conformes aux procédures standards.`
      }
    ];
    setChatMessages(newMessages);
    setChatMessage("");
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "urgent": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "warning": return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <TrendingUp className="h-4 w-4 text-blue-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "urgent": return "border-red-200 bg-red-50";
      case "warning": return "border-orange-200 bg-orange-50";
      default: return "border-blue-200 bg-blue-50";
    }
  };

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "haute": return "bg-red-100 text-red-800";
      case "moyenne": return "bg-orange-100 text-orange-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      
      {/* En-tête du dossier */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/sinistres")}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dossier {dossierInfo.reference}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {dossierInfo.assure}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {dossierInfo.dateOuverture}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {dossierInfo.adresse}
                </span>
              </div>
            </div>
          </div>
          
          {/* Bouton Chat IA */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <Bot className="h-4 w-4 text-purple-600" />
                Chat IA
              </Button>
            </SheetTrigger>
            <SheetContent className="w-96">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  Assistant IA - Dossier {dossierInfo.reference}
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col h-full mt-6">
                <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto max-h-96">
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-200'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
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
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Partie supérieure - 3 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne 1 - Synthèse IA + Actes contentieux */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    Synthèse IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {syntheseIA}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Scale className="h-5 w-5 text-gray-600" />
                    Actes contentieux
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {actesContentieux.map((acte, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{acte.type}</p>
                          <p className="text-xs text-gray-600">{acte.partie}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{acte.date}</p>
                          <Badge variant="outline" className="text-xs">
                            {acte.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne 2 - Alertes IA */}
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Alertes IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alertesIA.map((alerte) => (
                      <div key={alerte.id} className={`p-4 rounded-lg border ${getAlertColor(alerte.type)}`}>
                        <div className="flex items-start gap-3">
                          {getAlertIcon(alerte.type)}
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{alerte.titre}</h4>
                            <p className="text-xs text-gray-700 mb-2">{alerte.description}</p>
                            <p className="text-xs text-gray-600">{alerte.impact}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <Bot className="h-3 w-3 text-purple-600" />
                              <span className="text-xs text-purple-700">{alerte.confidence}% confiance</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne 3 - Next Best Actions */}
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Next Best Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nextActions.map((action) => (
                      <div key={action.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">{action.action}</h4>
                          <Badge className={getPriorityColor(action.priorite)}>
                            {action.priorite}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-700 mb-2">{action.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>👤 {action.assignee}</span>
                          <span>⏱️ {action.delai}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Partie inférieure - 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dossiers associés */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Dossiers associés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dossiersAssocies.map((dossier) => (
                    <button
                      key={dossier.id}
                      className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer text-left"
                      onClick={() => navigate(`/sinistre/synthesis/${dossier.id}`)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{dossier.nom}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getScoreColor(dossier.score)}>
                            <Star className="h-3 w-3 mr-1" />
                            {dossier.score}
                          </Badge>
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{dossier.relation}</span>
                        <Badge variant="outline" className="text-xs">
                          {dossier.statut}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-gray-600" />
                  Timeline du dossier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          event.statut === 'completed' ? 'bg-green-500' :
                          event.statut === 'upcoming' ? 'bg-blue-500' : 'bg-gray-300'
                        }`} />
                        {index < timeline.length - 1 && (
                          <div className="w-px h-8 bg-gray-300 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-semibold text-sm">{event.titre}</h4>
                        <p className="text-xs text-gray-700 mt-1">{event.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                      </div>
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
