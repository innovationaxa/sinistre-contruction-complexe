
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, FileText, MapPin, User } from "lucide-react";

const SinistreDetail = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would come from an API
  const sinistre = {
    id: id || "1",
    numero: "000020077733973",
    type: "Construction - RC / RCD",
    statut: "En cours",
    dateCreation: "2024-01-15",
    dateSurvenance: "2024-01-10",
    assure: "LEPAGE EDEN",
    conseiller: "Helene HARRY LEON",
    description: "Sinistre construction avec dommages matériels",
    produit: "Construction - RC / RCD",
    partieLesee: "LEPAGE EDEN",
    contrat: "000000982734404",
    casDeclaration: "RC/RCD : Avec expertise",
    dateOuverture: "30/07/2015",
    etapesGestion: "En cours d'expertise"
  };

  const documents = [
    {
      nom: "Déclaration initiale",
      type: "PDF",
      date: "2024-01-15"
    },
    {
      nom: "Photos des dégâts",
      type: "Images",
      date: "2024-01-16"
    },
    {
      nom: "Rapport d'expertise",
      type: "PDF",
      date: "2024-01-20"
    },
    {
      nom: "Devis de réparation",
      type: "PDF",
      date: "2024-01-22"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en cours':
        return 'bg-yellow-500';
      case 'clos':
        return 'bg-green-500';
      case 'suspendu':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Détail du sinistre</h1>
        <p className="text-gray-600">Numéro: {sinistre.numero}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Type d'événement</label>
                  <p className="text-sm text-gray-900">{sinistre.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Statut</label>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(sinistre.statut)} text-white`}>
                      {sinistre.statut}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date de survenance</label>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {sinistre.dateSurvenance}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date de création</label>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {sinistre.dateCreation}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Assuré</label>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {sinistre.assure}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Conseiller</label>
                  <p className="text-sm text-gray-900">{sinistre.conseiller}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-sm text-gray-900 mt-1">{sinistre.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar avec informations complémentaires */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contrat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Numéro</label>
                  <p className="text-sm text-gray-900">{sinistre.contrat}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Produit</label>
                  <p className="text-sm text-gray-900">{sinistre.produit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gestion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Cas de déclaration</label>
                  <p className="text-sm text-gray-900">{sinistre.casDeclaration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Étapes de gestion</label>
                  <p className="text-sm text-gray-900">{sinistre.etapesGestion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Documents */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Documents associés</CardTitle>
          <CardDescription>
            Liste des documents liés à ce sinistre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{doc.nom}</p>
                    <p className="text-xs text-gray-500">{doc.type}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {doc.date}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SinistreDetail;
