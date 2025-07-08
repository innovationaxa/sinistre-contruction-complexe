import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  FileText, 
  Users, 
  Building, 
  Calendar, 
  MapPin, 
  Euro, 
  AlertTriangle, 
  Eye,
  MessageSquare,
  Sparkles,
  Search,
  FileIcon,
  Download,
  Clock
} from "lucide-react";
import { DocumentViewer } from "@/components/SinistreDetail/DocumentViewer";

interface Sinistre {
  id: string;
  dateOuverture: string;
  gestionnaire: string;
  statut: "en cours" | "clos";
  adresse: string;
  type: string;
  montantEstime: number;
  actesContentieux: { type: string; date: string; statut: string; partie: string }[];
  alertes: { type: string; message: string }[];
}

const mockSinistres: Sinistre[] = [
  {
    id: "CON-2024-123456",
    dateOuverture: "15/03/2024",
    gestionnaire: "Marie Dubois",
    statut: "en cours",
    adresse: "15 Avenue des Chantiers, 75015 Paris",
    type: "RC Décennale",
    montantEstime: 15000,
    actesContentieux: [
      { type: "Mise en demeure", date: "10/03/2024", statut: "reçue", partie: "Maître d'ouvrage" },
      { type: "Assignation", date: "En attente", statut: "potentielle", partie: "Tribunal de commerce" },
    ],
    alertes: [
      { type: "urgent", message: "Factures manquantes" },
      { type: "warning", message: "Délai expertise dépassé" },
    ],
  },
];

const SinistreDetail = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sinistre = mockSinistres.find((s) => s.id === id);

  if (!sinistre) {
    return <div>Sinistre non trouvé.</div>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Documents mock data for the new tab
  const documents = [
    {
      id: 1,
      name: "Rapport Amiable de notre expert 2.pdf",
      type: "pdf",
      description: "Rapport amiable expert 2",
      modifiedDate: "22/06/2024",
      size: "2.4 MB",
      pages: 15,
      url: "/lovable-uploads/fbb1a0f1-cfac-4121-89eb-ac10dab0d39f.png"
    },
    {
      id: 2,
      name: "Rapport Amiable de notre expert 1.pdf",
      type: "pdf", 
      description: "Rapport amiable expert 1",
      modifiedDate: "22/06/2024",
      size: "1.8 MB",
      pages: 12,
      url: "/lovable-uploads/fbb1a0f1-cfac-4121-89eb-ac10dab0d39f.png"
    },
    {
      id: 3,
      name: "CB Expert 6 108 REJ.pdf",
      type: "pdf",
      description: "Rapport sur la réjection",
      modifiedDate: "18/06/2024", 
      size: "3.2 MB",
      pages: 8,
      url: "/lovable-uploads/fbb1a0f1-cfac-4121-89eb-ac10dab0d39f.png"
    },
    {
      id: 4,
      name: "Jugement PDF",
      type: "pdf",
      description: "Jugement du tribunal",
      modifiedDate: "15/06/2024",
      size: "1.1 MB", 
      pages: 5,
      url: "/lovable-uploads/fbb1a0f1-cfac-4121-89eb-ac10dab0d39f.png"
    },
    {
      id: 5,
      name: "CB Expert 2.pdf",
      type: "pdf",
      description: "Rapport complémentaire",
      modifiedDate: "12/06/2024",
      size: "2.7 MB",
      pages: 18,
      url: "/lovable-uploads/fbb1a0f1-cfac-4121-89eb-ac10dab0d39f.png"
    }
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with sinistre info */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Sinistre #{id}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Ouvert le 15/03/2024
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Marie Dubois
                  </span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                En cours
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Informations générales</TabsTrigger>
              <TabsTrigger value="chantier">Chantier et désordres</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong>Type:</strong> {sinistre.type}
                    </div>
                    <div>
                      <strong>Adresse:</strong> {sinistre.adresse}
                    </div>
                    <div>
                      <strong>Montant estimé:</strong> {sinistre.montantEstime} €
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actes contentieux</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {sinistre.actesContentieux.map((acte, index) => (
                      <li key={index} className="mb-2">
                        <strong>{acte.type}</strong> - {acte.date} ({acte.statut}, {acte.partie})
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alertes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {sinistre.alertes.map((alerte, index) => (
                      <li key={index} className="mb-2">
                        <AlertTriangle className="inline-block w-4 h-4 mr-1" />
                        {alerte.message} ({alerte.type})
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3 bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                    <Clock className="w-5 h-5" />
                    Dates clés
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul>
                    <li>Ouverture: 15/03/2024</li>
                    <li>Expertise: 22/03/2024</li>
                    <li>Consolidation: 15/04/2024</li>
                    <li>Clôture: 30/04/2024</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chantier" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations sur le chantier</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Informations détaillées sur le chantier et les désordres associés.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <DocumentViewer documents={filteredDocuments} />
            </TabsContent>

            <TabsContent value="historique" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historique du sinistre</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Historique complet des événements et actions liées au sinistre.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SinistreDetail;
