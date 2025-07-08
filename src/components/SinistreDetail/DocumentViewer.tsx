
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  FileIcon,
  Download,
  MessageSquare,
  Sparkles,
  Eye,
  Calendar,
  FileText
} from "lucide-react";
import { DocumentChat } from "./DocumentChat";

interface Document {
  id: number;
  name: string;
  type: string;
  description: string;
  modifiedDate: string;
  size: string;
  pages: number;
  url: string;
}

interface DocumentViewerProps {
  documents: Document[];
}

export const DocumentViewer = ({ documents }: DocumentViewerProps) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(documents[0] || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChat, setShowChat] = useState(false);

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
    setShowChat(false);
  };

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  const handleSynthesis = () => {
    setShowChat(true);
    // Logic to generate AI synthesis would go here
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[800px]">
      {/* Documents List - Left Column */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documents ({documents.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Documents List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedDocument?.id === document.id
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white hover:bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => handleDocumentSelect(document)}
                >
                  <div className="flex items-start gap-3">
                    <FileIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {document.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {document.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{document.modifiedDate}</span>
                        <span>•</span>
                        <span>{document.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Viewer - Right Columns */}
      <div className="lg:col-span-3">
        {selectedDocument ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Document Preview */}
            <div className={`${showChat ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-4`}>
              <Card className="h-full">
                <CardHeader className="pb-3 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      {selectedDocument.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSynthesis}
                        className="flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Synthèse IA
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleChatToggle}
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Chat IA
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <Badge variant="secondary">{selectedDocument.type.toUpperCase()}</Badge>
                    <span>{selectedDocument.pages} pages</span>
                    <span>{selectedDocument.size}</span>
                    <span>Modifié le {selectedDocument.modifiedDate}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-gray-100 h-[600px] flex items-center justify-center rounded-b-lg">
                    <div className="text-center space-y-4">
                      <img
                        src={selectedDocument.url}
                        alt="Document preview"
                        className="max-w-full max-h-[500px] mx-auto rounded-lg shadow-lg"
                      />
                      <p className="text-gray-600">
                        Aperçu du document - Page 1 sur {selectedDocument.pages}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat IA - Conditional */}
            {showChat && (
              <div className="lg:col-span-1">
                <DocumentChat document={selectedDocument} />
              </div>
            )}
          </div>
        ) : (
          <Card className="h-full">
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FileIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Aucun document sélectionné</p>
                <p>Sélectionnez un document dans la liste pour le visualiser</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
