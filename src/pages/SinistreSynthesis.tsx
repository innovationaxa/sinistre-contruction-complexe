import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, AlertTriangle, Clock, CheckCircle, Send, Calendar, User, MapPin, Star, Download, Eye, Bot, FileCheck, Tag, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const SinistreSynthesis = () => {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Timeline des événements avec détails enrichis par IA
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
          { 
            name: "Déclaration de sinistre", 
            type: "PDF", 
            size: "1.2 MB",
            originalName: "declaration_sinistre_20240315.pdf",
            aiRenamed: "Declaration_Sinistre_BATIMEX_DégâtEaux_15032024.pdf",
            aiClassification: "Document juridique - Déclaration officielle",
            aiSummary: "Déclaration complète du sinistre dégât des eaux survenu le 15/03/2024 chez BATIMEX SARL. Document contient les circonstances détaillées, l'évaluation préliminaire des dégâts et les premières photos. Tous les champs obligatoires sont remplis correctement.",
            confidence: 95
          },
          { 
            name: "Photos des dégâts", 
            type: "ZIP", 
            size: "3.5 MB",
            originalName: "photos_degats.zip",
            aiRenamed: "Photos_Dégâts_BATIMEX_Inondation_Atelier_15032024.zip",
            aiClassification: "Documentation visuelle - Preuves dommages",
            aiSummary: "Archive contenant 12 photos haute résolution des dégâts causés par l'inondation dans l'atelier principal. Images montrent l'étendue des dégâts sur les équipements, le sol et les stocks. Qualité suffisante pour expertise.",
            confidence: 88
          }
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
          { 
            name: "Rapport d'évaluation préliminaire", 
            type: "PDF", 
            size: "2.1 MB",
            originalName: "rapport_eval_prelim.pdf",
            aiRenamed: "Rapport_Evaluation_Préliminaire_Expert_Dubois_16032024.pdf",
            aiClassification: "Rapport d'expertise - Évaluation technique",
            aiSummary: "Rapport détaillé de l'expert M. Dubois suite à sa visite du 16/03. Analyse technique des causes de l'inondation, évaluation des dégâts par zone et estimation financière préliminaire de 15 000€. Recommandations pour les réparations urgentes.",
            confidence: 92
          },
          { 
            name: "Devis de réparation estimatif", 
            type: "PDF", 
            size: "0.8 MB",
            originalName: "devis_reparation.pdf",
            aiRenamed: "Devis_Réparation_Estimatif_Entreprise_Martin_16032024.pdf",
            aiClassification: "Document commercial - Devis travaux",
            aiSummary: "Devis détaillé de l'entreprise Martin BTP pour les travaux de remise en état. Inclut : assèchement, désinfection, remplacement revêtement sol, réparation équipements. Total estimé : 14 750€ HT.",
            confidence: 90
          }
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
          { 
            name: "Convocation expertise", 
            type: "PDF", 
            size: "0.3 MB",
            originalName: "convocation.pdf",
            aiRenamed: "Convocation_Expertise_BATIMEX_Expert_Dubois_20032024.pdf",
            aiClassification: "Document administratif - Convocation officielle",
            aiSummary: "Convocation officielle pour l'expertise approfondie du 20/03/2024 à 14h00. Présence obligatoire de l'assuré et de son représentant. Liste des documents à apporter et procédure à suivre clairement définie.",
            confidence: 85
          }
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

  const questionSuggestions = [
    "Quel est le montant estimé des dégâts ?",
    "Quand aura lieu la prochaine expertise ?",
    "Quels documents sont encore manquants ?",
    "Quel est le délai de traitement prévu ?",
    "Y a-t-il des risques de franchise ?",
    "Le sinistre est-il couvert par la garantie ?",
    "Quand puis-je espérer le règlement ?",
    "Dois-je faire appel à un expert ?"
  ];

  // Récupération de tous les documents avec analyse IA
  const allDocuments = timelineEvents.flatMap(event => 
    event.details.documents.map(doc => ({
      ...doc,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time
    }))
  );

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Message envoyé:", chatMessage);
    setChatMessage("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setChatMessage(suggestion);
  };

  const handleDocumentChat = (doc: any) => {
    setSelectedDoc(doc);
    setChatMessages([
      {
        role: 'assistant',
        content: `Bonjour ! Je peux vous aider à analyser le document "${doc.name}". Que souhaitez-vous savoir sur ce document ?`
      }
    ]);
    setIsChatOpen(true);
  };

  const handleDocChatSubmit = (e: React.FormEvent, message: string) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { role: 'user' as const, content: message },
      { 
        role: 'assistant' as const, 
        content: `Concernant le document "${selectedDoc?.name}", voici ce que je peux vous dire : ${selectedDoc?.aiSummary}. Avez-vous d'autres questions spécifiques ?`
      }
    ];
    setChatMessages(newMessages);
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (confidence >= 80) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={() => navigate("/sinistres")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux sinistres
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">Synthèse du dossier sinistre RC Décennale</h2>
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
                  RC Décennale - Dégâts des eaux
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Onglets principaux */}
          <Tabs defaultValue="synthese" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="synthese">Synthèse</TabsTrigger>
              <TabsTrigger value="historique">Historique et documents</TabsTrigger>
            </TabsList>

            {/* Onglet Synthèse */}
            <TabsContent value="synthese" className="space-y-6">
              {/* Alertes - Mise en avant */}
              <Card className="border-l-4 border-l-red-500 shadow-lg">
                <CardHeader className="bg-red-50">
                  <CardTitle className="flex items-center gap-2 text-red-900">
                    <AlertTriangle className="h-6 w-6" />
                    🚨 Alertes
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
                {/* Timeline des événements - Interactive avec IA */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Timeline des événements
                      <Badge className="bg-purple-100 text-purple-800 ml-2">
                        <Bot className="h-3 w-3 mr-1" />
                        IA Enrichie
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-600">Cliquez sur une étape pour voir les détails et l'analyse IA</p>
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
                                  {event.details.documents.length > 0 && (
                                    <Badge variant="outline" className="text-xs">
                                      <Bot className="h-3 w-3 mr-1" />
                                      {event.details.documents.length} doc(s) analysé(s)
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{event.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {event.date} {event.time && `à ${event.time}`}
                                </p>
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-yellow-500" />
                                {event.title}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold text-sm text-gray-900 mb-2">📋 Importance</h4>
                                <p className="text-sm text-gray-700">{event.details.importance}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-sm text-gray-900 mb-4 flex items-center gap-2">
                                  📄 Documents liés 
                                  <Badge className="bg-purple-100 text-purple-800">
                                    <Bot className="h-3 w-3 mr-1" />
                                    Analyse IA
                                  </Badge>
                                </h4>
                                {event.details.documents.length > 0 ? (
                                  <div className="space-y-4">
                                    {event.details.documents.map((doc, idx) => (
                                      <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                                        {/* En-tête du document */}
                                        <div className="flex items-center justify-between mb-3">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-gray-500" />
                                            <span className="font-medium">{doc.name}</span>
                                            <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                                            <span className="text-xs text-gray-500">{doc.size}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Button size="sm" variant="ghost">
                                              <Eye className="h-3 w-3" />
                                            </Button>
                                            <Button size="sm" variant="ghost">
                                              <Download className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </div>

                                        {/* Classification IA */}
                                        <div className="mb-3">
                                          <div className="flex items-center gap-2 mb-2">
                                            <Tag className="h-4 w-4 text-purple-600" />
                                            <span className="text-sm font-medium text-purple-900">Classification IA</span>
                                            <Badge className={`text-xs ${getConfidenceColor(doc.confidence)}`}>
                                              {doc.confidence}% confiance
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-purple-800 bg-purple-50 p-2 rounded">
                                            {doc.aiClassification}
                                          </p>
                                        </div>

                                        {/* Renommage IA */}
                                        <div className="mb-3">
                                          <div className="flex items-center gap-2 mb-2">
                                            <FileCheck className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm font-medium text-blue-900">Renommage IA</span>
                                          </div>
                                          <div className="space-y-1">
                                            <p className="text-xs text-gray-600">
                                              <span className="font-medium">Original :</span> {doc.originalName}
                                            </p>
                                            <p className="text-xs text-blue-800 bg-blue-50 p-2 rounded">
                                              <span className="font-medium">Suggéré :</span> {doc.aiRenamed}
                                            </p>
                                          </div>
                                        </div>

                                        {/* Synthèse IA */}
                                        <div>
                                          <div className="flex items-center gap-2 mb-2">
                                            <Bot className="h-4 w-4 text-green-600" />
                                            <span className="text-sm font-medium text-green-900">Synthèse IA</span>
                                          </div>
                                          <p className="text-sm text-green-800 bg-green-50 p-3 rounded leading-relaxed">
                                            {doc.aiSummary}
                                          </p>
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
                            <p className="text-sm">Bonjour ! Je peux vous aider à analyser ce dossier sinistre RC Décennale. Que souhaitez-vous savoir ?</p>
                          </div>
                        </div>
                      </div>

                      {/* Suggestions de questions */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">💡 Questions suggérées :</p>
                        <div className="grid grid-cols-1 gap-2">
                          {questionSuggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="justify-start text-left h-auto py-2 px-3 text-sm hover:bg-blue-50 hover:border-blue-200"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
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
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Onglet Historique et documents */}
            <TabsContent value="historique" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Historique et documents du sinistre
                    <Badge className="bg-purple-100 text-purple-800 ml-2">
                      <Bot className="h-3 w-3 mr-1" />
                      {allDocuments.length} documents analysés par IA
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Tous les documents du dossier avec analyse IA complète : classification, renommage intelligent et synthèse détaillée
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allDocuments.map((doc, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                        {/* En-tête du document avec informations contextuelles */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-blue-600" />
                              <h3 className="text-base font-semibold text-gray-900">{doc.name}</h3>
                              <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                              <Badge variant="outline" className="text-xs text-gray-500">{doc.size}</Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {doc.eventDate} {doc.eventTime && `à ${doc.eventTime}`}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {doc.eventTitle}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              Voir
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              <Download className="h-3 w-3 mr-1" />
                              DL
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-7 px-2 text-xs"
                              onClick={() => handleDocumentChat(doc)}
                            >
                              <MessageCircle className="h-3 w-3 mr-1" />
                              Chat
                            </Button>
                          </div>
                        </div>

                        {/* Analyse IA - Disposition côte à côte */}
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          {/* Classification IA */}
                          <div className="bg-purple-50 border border-purple-200 rounded-md p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Tag className="h-3 w-3 text-purple-600" />
                              <span className="text-xs font-medium text-purple-900">Classification IA</span>
                            </div>
                            <p className="text-xs text-purple-800 font-medium mb-1">
                              {doc.aiClassification}
                            </p>
                            <div className="flex items-center text-xs text-purple-700">
                              <Bot className="h-2 w-2 mr-1" />
                              Auto-catégorisé
                            </div>
                          </div>

                          {/* Renommage IA */}
                          <div className="bg-blue-50 border border-blue-200 rounded-md p-2">
                            <div className="flex items-center gap-1 mb-1">
                              <FileCheck className="h-3 w-3 text-blue-600" />
                              <span className="text-xs font-medium text-blue-900">Renommage IA</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-blue-800 bg-blue-100 p-1 rounded text-center font-mono truncate" title={doc.aiRenamed}>
                                {doc.aiRenamed.length > 20 ? `${doc.aiRenamed.substring(0, 20)}...` : doc.aiRenamed}
                              </p>
                            </div>
                            <div className="flex items-center text-xs text-blue-700 mt-1">
                              <Bot className="h-2 w-2 mr-1" />
                              Renommage intelligent
                            </div>
                          </div>

                          {/* Score de confiance */}
                          <div className={`border rounded-md p-2 ${getConfidenceColor(doc.confidence)}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs font-medium">Confiance</span>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold mb-1">
                                {doc.confidence}%
                              </div>
                              <p className="text-xs">
                                {doc.confidence >= 90 ? 'Excellent' :
                                 doc.confidence >= 80 ? 'Bon' :
                                 'À vérifier'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Synthèse IA détaillée */}
                        <div className="bg-green-50 border border-green-200 rounded-md p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900">Synthèse IA</span>
                          </div>
                          <p className="text-xs text-green-800 leading-relaxed">
                            {doc.aiSummary}
                          </p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-green-200">
                            <div className="flex items-center text-xs text-green-700">
                              <Bot className="h-2 w-2 mr-1" />
                              Analyse auto
                            </div>
                            <Badge className="bg-green-100 text-green-800 text-xs h-4">
                              Vérifié ✓
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}

                    {allDocuments.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium mb-2">Aucun document trouvé</p>
                        <p className="text-sm">Les documents apparaîtront ici une fois ajoutés au dossier.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Dialog de chat avec document */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              Chat avec le document : {selectedDoc?.name}
            </DialogTitle>
            <p className="text-sm text-gray-600">
              Posez vos questions sur ce document et obtenez des réponses basées sur son analyse IA
            </p>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col min-h-0">
            {/* Zone de messages */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto min-h-[300px] max-h-[400px]">
              <div className="space-y-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Informations du document */}
            {selectedDoc && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">À propos de ce document</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-800">
                  <div><strong>Type :</strong> {selectedDoc.type}</div>
                  <div><strong>Taille :</strong> {selectedDoc.size}</div>
                  <div><strong>Classification :</strong> {selectedDoc.aiClassification}</div>
                  <div><strong>Confiance :</strong> {selectedDoc.confidence}%</div>
                </div>
              </div>
            )}

            {/* Zone de saisie */}
            <form 
              onSubmit={(e) => {
                const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
                handleDocChatSubmit(e, input.value);
                input.value = '';
              }}
              className="flex gap-2"
            >
              <Input
                name="message"
                placeholder="Posez votre question sur ce document..."
                className="flex-1"
                autoComplete="off"
              />
              <Button type="submit" size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SinistreSynthesis;
