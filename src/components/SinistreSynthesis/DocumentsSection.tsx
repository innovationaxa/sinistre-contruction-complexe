
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentViewer } from "./DocumentViewer";
import { DocumentChat } from "./DocumentChat";
import { DocumentSynthesis } from "./DocumentSynthesis";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export const DocumentsSection = ({
  documents
}: DocumentsSectionProps) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(documents[0] || null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="grid grid-cols-12 gap-6 min-h-[600px]">
      {/* Liste des documents à gauche */}
      <div className="col-span-3">
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Documents ({documents.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[500px] overflow-y-auto">
              {documents.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedDocument?.id === doc.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 rounded">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 truncate">{doc.nom}</h4>
                      <p className="text-xs text-gray-600 mt-1">{doc.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Modifié le {doc.dateModification}</span>
                        <span className="text-xs text-gray-500">{doc.taille}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visionneuse au centre */}
      <div className="col-span-6">
        <Card className="h-fit min-h-[600px]">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {selectedDocument ? selectedDocument.nom : 'Sélectionnez un document'}
              </CardTitle>
              <div className="flex items-center gap-2">
                {selectedDocument && (
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 min-h-[550px]">
            {selectedDocument ? (
              <DocumentViewer document={selectedDocument} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Sélectionnez un document pour le visualiser</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Synthèse IA à droite */}
      <div className="col-span-3">
        <DocumentSynthesis document={selectedDocument} />
      </div>

      {/* Chat IA modal/overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px]">
            <DocumentChat document={selectedDocument} onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
