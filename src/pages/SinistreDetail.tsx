
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, MapPin, User, Building, FileText, AlertCircle, Clock, Euro, Users } from "lucide-react";
import { Header } from "@/components/Header";

const SinistreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  const sinistre = {
    id: id || "20041732073",
    type: "Construction DO",
    statut: "Déclaration en cours",
    dateOuverture: "01/07/2025",
    dateDeclaration: "29/08/2025",
    chantier: "TEST",
    assure: "LOU APOLLINARY MARIAN TEDDIE",
    courtier: "ASS COURT CONSEILS SERVIC",
    evenement: "Dommages Ouvrage",
    enjeuFinancier: "Moyen",
    expertise: "Avec expertise",
    description: "Sinistre concernant des dommages sur l'ouvrage TEST. L'assuré LOU APOLLINARY MARIAN TEDDIE a déclaré des désordres nécessitant une expertise approfondie.",
    adresse: "RUE DE LA MARCHE, 36200 ARGENTON SUR CREUSE",
    montantEstime: "45 000 €",
    expert: "Cabinet EXPERTISE PLUS",
    dateExpertise: "15/09/2025",
    parties: [
      "LOU APOLLINARY MARIAN TEDDIE (Assuré)",
      "ENTREPRISE MARTIN SAS (Sous-traitant)",
      "CABINET DURAND (Expert)"
    ]
  };

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Déclaration en cours":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En cours</Badge>;
      case "En expertise":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Expertise</Badge>;
      case "Clos":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Clos</Badge>;
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  const getEnjeuBadge = (enjeu: string) => {
    switch (enjeu) {
      case "Élevé":
        return <Badge variant="outline" className="text-red-700 border-red-200">Élevé</Badge>;
      case "Moyen":
        return <Badge variant="outline" className="text-orange-700 border-orange-200">Moyen</Badge>;
      case "Faible":
        return <Badge variant="outline" className="text-green-700 border-green-200">Faible</Badge>;
      default:
        return <Badge variant="outline">{enjeu}</Badge>;
    }
  };

  // Mock documents with AI classifications
  const documents = [
    {
      nom: "Déclaration initiale",
      type: "PDF",
      date: "29/08/2025"
    },
    {
      nom: "Photos des dommages",
      type: "Images",
      date: "30/08/2025"
    },
    {
      nom: "Rapport d'expertise préliminaire",
      type: "PDF",
      date: "05/09/2025"
    },
    {
      nom: "Correspondance avec l'assuré",
      type: "Email",
      date: "10/09/2025"
    }
  ];

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
        <h2 className="text-lg font-semibold text-gray-900">Détail du sinistre {sinistre.id}</h2>
      </div>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* En-tête du sinistre */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-gray-900">Sinistre N° {sinistre.id}</CardTitle>
                  <p className="text-gray-600 mt-1">{sinistre.type} - {sinistre.evenement}</p>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(sinistre.statut)}
                  {getEnjeuBadge(sinistre.enjeuFinancier)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date d'ouverture</p>
                    <p className="font-medium">{sinistre.dateOuverture}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date déclaration</p>
                    <p className="font-medium">{sinistre.dateDeclaration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Montant estimé</p>
                    <p className="font-medium">{sinistre.montantEstime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Expert</p>
                    <p className="font-medium">{sinistre.expert}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Informations générales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Informations générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 text-sm">{sinistre.description}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Assuré</p>
                      <p className="font-medium">{sinistre.assure}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Courtier</p>
                      <p className="font-medium">{sinistre.courtier}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Adresse</p>
                      <p className="font-medium">{sinistre.adresse}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parties impliquées */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Parties impliquées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sinistre.parties.map((partie, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{partie}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents du dossier ({documents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {documents.map((doc, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{doc.nom}</h4>
                    <p className="text-xs text-gray-500">{doc.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Générer rapport
                </Button>
                <Button variant="outline">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Marquer comme urgent
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Programmer expertise
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SinistreDetail;
