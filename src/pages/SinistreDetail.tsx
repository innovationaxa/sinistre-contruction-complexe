
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileText, Calendar, User, MapPin, Phone, Mail, Upload, Download, Eye, Bot, FileCheck, Tag, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";

const SinistreDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");

  // Sample data - replace with real data from API
  const sinistreData = {
    numero: `CON-2024-${id}`,
    date: "15/03/2024",
    type: "RC Décennale - Dégâts des eaux",
    statut: "En cours d'expertise",
    montantEstime: "15 000 €",
    assure: {
      nom: "BATIMEX SARL",
      adresse: "15 Avenue des Chantiers, 75015 Paris",
      telephone: "01 45 67 89 10",
      email: "contact@batimex.fr"
    },
    description: "Dégâts des eaux dans l'atelier principal suite à une rupture de canalisation. Dommages sur les équipements et le revêtement de sol.",
    documents: [
      {
        id: 1,
        name: "Déclaration de sinistre",
        type: "PDF",
        size: "1.2 MB",
        dateUpload: "15/03/2024",
        originalName: "declaration_sinistre_20240315.pdf",
        aiRenamed: "Declaration_Sinistre_BATIMEX_DégâtEaux_15032024.pdf",
        aiClassification: "Document juridique - Déclaration officielle",
        aiSummary: "Déclaration complète du sinistre dégât des eaux survenu le 15/03/2024 chez BATIMEX SARL. Document contient les circonstances détaillées, l'évaluation préliminaire des dégâts et les premières photos. Tous les champs obligatoires sont remplis correctement.",
        confidence: 95
      },
      {
        id: 2,
        name: "Photos des dégâts",
        type: "ZIP",
        size: "3.5 MB",
        dateUpload: "15/03/2024",
        originalName: "photos_degats.zip",
        aiRenamed: "Photos_Dégâts_BATIMEX_Inondation_Atelier_15032024.zip",
        aiClassification: "Documentation visuelle - Preuves dommages",
        aiSummary: "Archive contenant 12 photos haute résolution des dégâts causés par l'inondation dans l'atelier principal. Images montrent l'étendue des dégâts sur les équipements, le sol et les stocks. Qualité suffisante pour expertise.",
        confidence: 88
      },
      {
        id: 3,
        name: "Rapport d'expertise préliminaire",
        type: "PDF",
        size: "2.1 MB",
        dateUpload: "16/03/2024",
        originalName: "rapport_eval_prelim.pdf",
        aiRenamed: "Rapport_Evaluation_Préliminaire_Expert_Dubois_16032024.pdf",
        aiClassification: "Rapport d'expertise - Évaluation technique",
        aiSummary: "Rapport détaillé de l'expert M. Dubois suite à sa visite du 16/03. Analyse technique des causes de l'inondation, évaluation des dégâts par zone et estimation financière préliminaire de 15 000€. Recommandations pour les réparations urgentes.",
        confidence: 92
      },
      {
        id: 4,
        name: "Devis de réparation",
        type: "PDF",
        size: "0.8 MB",
        dateUpload: "16/03/2024",
        originalName: "devis_reparation.pdf",
        aiRenamed: "Devis_Réparation_Estimatif_Entreprise_Martin_16032024.pdf",
        aiClassification: "Document commercial - Devis travaux",
        aiSummary: "Devis détaillé de l'entreprise Martin BTP pour les travaux de remise en état. Inclut : assèchement, désinfection, remplacement revêtement sol, réparation équipements. Total estimé : 14 750€ HT.",
        confidence: 90
      }
    ],
    commentaires: [
      {
        id: 1,
        auteur: "Expert Dubois",
        date: "16/03/2024 14:30",
        contenu: "Expertise préliminaire effectuée. Dégâts importants mais réparables. Rapport complet à suivre."
      },
      {
        id: 2,
        auteur: "Gestionnaire Martin",
        date: "17/03/2024 09:15",
        contenu: "Dossier bien documenté. En attente du rapport d'expertise final pour validation du montant."
      }
    ]
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouveau commentaire:", newComment);
    setNewComment("");
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-50";
    if (confidence >= 80) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
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
          Retour à la liste
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">Détail du sinistre {sinistreData.numero}</h2>
      </div>
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* En-tête du dossier */}
          <Card>
            <CardHeader className="bg-blue-50 border-b border-blue-200">
              <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {sinistreData.numero} - {sinistreData.assure.nom}
              </CardTitle>
              <div className="flex gap-4 text-sm text-blue-700 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {sinistreData.date}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {sinistreData.assure.adresse}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {sinistreData.type}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Informations du sinistre</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Statut:</span> <Badge className="ml-2 bg-yellow-100 text-yellow-800">{sinistreData.statut}</Badge></div>
                    <div><span className="font-medium">Type:</span> {sinistreData.type}</div>
                    <div><span className="font-medium">Montant estimé:</span> {sinistreData.montantEstime}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Contact assuré</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      {sinistreData.assure.telephone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      {sinistreData.assure.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-700">{sinistreData.description}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Documents avec analyse IA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents du dossier
                  <Badge className="bg-purple-100 text-purple-800 ml-2">
                    <Bot className="h-3 w-3 mr-1" />
                    Analyse IA
                  </Badge>
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sinistreData.documents.map((doc) => (
                    <div key={doc.id} className="border-2 border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                      {/* En-tête du document */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                            <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                            <Badge variant="outline" className="text-xs text-gray-500">{doc.size}</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">Uploadé le {doc.dateUpload}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Analyse IA */}
                      <div className="space-y-3">
                        {/* Classification IA */}
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Tag className="h-3 w-3 text-purple-600" />
                            <span className="text-xs font-semibold text-purple-900">Classification IA</span>
                            <Badge className={`text-xs ${getConfidenceColor(doc.confidence)}`}>
                              {doc.confidence}% confiance
                            </Badge>
                          </div>
                          <p className="text-xs text-purple-800 font-medium">
                            {doc.aiClassification}
                          </p>
                        </div>

                        {/* Renommage IA */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <FileCheck className="h-3 w-3 text-blue-600" />
                            <span className="text-xs font-semibold text-blue-900">Renommage IA</span>
                          </div>
                          <div className="space-y-1">
                            <div>
                              <p className="text-xs text-gray-600">Original :</p>
                              <p className="text-xs text-gray-800 bg-gray-100 p-1 rounded font-mono">
                                {doc.originalName}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-blue-700">Suggéré :</p>
                              <p className="text-xs text-blue-800 bg-blue-100 p-1 rounded font-mono">
                                {doc.aiRenamed}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Synthèse IA */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="h-3 w-3 text-green-600" />
                            <span className="text-xs font-semibold text-green-900">Synthèse IA</span>
                            <Badge className={`text-xs ${getConfidenceColor(doc.confidence)}`}>
                              <Star className="h-2 w-2 mr-1" />
                              Analysé
                            </Badge>
                          </div>
                          <p className="text-xs text-green-800 leading-relaxed">
                            {doc.aiSummary}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Commentaires */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Commentaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sinistreData.commentaires.map((comment) => (
                    <div key={comment.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{comment.auteur}</span>
                        <span className="text-xs text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.contenu}</p>
                    </div>
                  ))}
                  
                  <form onSubmit={handleAddComment} className="border-t pt-4">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Ajouter un commentaire..."
                      className="mb-2"
                      rows={3}
                    />
                    <Button type="submit" size="sm">
                      Ajouter un commentaire
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

export default SinistreDetail;
