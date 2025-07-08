
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentViewer } from "./DocumentViewer";
import { DocumentSynthesis } from "./DocumentSynthesis";
import { FileText, Download, Search, Eye, FileImage, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Document {
  id: string;
  nom: string;
  type: string;
  description: string;
  dateModification: string;
  taille: string;
}

interface DocumentsSectionProps {
  documents: Document[];
}

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocuments = documents.filter(doc => 
    doc.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  // Données des sinistres antérieurs
  const sinistresAnterieurs = [
    {
      annee: "2023",
      garanties: [
        { nom: "RC Décennale", montant: "12 000€", franchise: "500€" },
        { nom: "Dommages Ouvrage", montant: "8 500€", franchise: "750€" }
      ]
    },
    {
      annee: "2022", 
      garanties: [
        { nom: "RC Décennale", montant: "15 200€", franchise: "500€" },
        { nom: "RC Exploitation", montant: "3 400€", franchise: "300€" }
      ]
    },
    {
      annee: "2021",
      garanties: [
        { nom: "RC Décennale", montant: "9 800€", franchise: "500€" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <h2 className="text-lg font-semibold text-gray-900">Documents du dossier</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Rechercher un document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="liste" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50 m-0 rounded-none border-b">
            <TabsTrigger value="liste">Liste des documents</TabsTrigger>
            <TabsTrigger value="synthese">Chantier et désordre</TabsTrigger>
            <TabsTrigger value="visionneuse">Visionneuse</TabsTrigger>
          </TabsList>

          <TabsContent value="liste" className="p-6">
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedDocument(doc)}
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.nom}</h3>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{doc.dateModification}</p>
                      <p className="text-xs text-gray-500">{doc.taille}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="synthese" className="p-6 space-y-6">
            <DocumentSynthesis />
            
            {/* Section Sinistres antérieurs */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <h2 className="text-lg font-semibold text-gray-900">Information sur les sinistres antérieurs</h2>
                <div className="flex-1 h-px bg-gray-200 ml-4"></div>
              </div>

              <div className="space-y-4">
                {sinistresAnterieurs.map((annee, index) => (
                  <div key={annee.annee} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-blue-50 px-4 py-2 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Année {annee.annee}</h3>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                      <div className="grid grid-cols-3 gap-4 px-4 py-2 bg-gray-50 font-medium text-sm text-gray-700">
                        <div>Garantie</div>
                        <div>Montant réglé par année et par garantie</div>
                        <div>Montant de franchise réglé par l'assuré</div>
                      </div>
                      
                      {annee.garanties.map((garantie, gIndex) => (
                        <div key={gIndex} className="grid grid-cols-3 gap-4 px-4 py-3 text-sm">
                          <div className="font-medium text-gray-900">{garantie.nom}</div>
                          <div className="text-gray-700">{garantie.montant}</div>
                          <div className={`font-medium ${gIndex === 0 && index === 0 ? 'bg-yellow-200' : ''} px-2 py-1 rounded`}>
                            {garantie.franchise}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visionneuse" className="p-6">
            <DocumentViewer selectedDocument={selectedDocument} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
