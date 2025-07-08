
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Document {
  id: string;
  nom: string;
  type: string;
  description: string;
  dateModification: string;
  taille: string;
}

interface DocumentViewerProps {
  document: Document;
}

export const DocumentViewer = ({ document }: DocumentViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6; // Simulé

  return (
    <div className="h-full flex flex-col">
      {/* Barre d'outils */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              →
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.max(50, zoom - 25))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-gray-600 min-w-[60px] text-center">
            {zoom}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.min(200, zoom + 25))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRotation((rotation + 90) % 360)}
          >
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Zone de visualisation */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div className="flex justify-center">
          <div
            className="bg-white shadow-lg border border-gray-300"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center',
              width: '595px',
              height: '842px', // Format A4
              transition: 'transform 0.2s ease-in-out'
            }}
          >
            {/* Contenu simulé du document PDF */}
            <div className="p-8 h-full">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                  <span className="font-bold text-lg">AXA</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">{document.nom}</h1>
                <p className="text-sm text-gray-600">Dossier sinistre ref R000001589</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-gray-800 mb-2">Nom Prénom (assuré)</h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Adresse de l'assuré</p>
                    <p>Code postal, Ville</p>
                    <p>Téléphone: XX XX XX XX XX</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Détails du sinistre</h3>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    <p className="mt-3">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded">
                  <h3 className="font-semibold text-gray-800 mb-2">Évaluation des dommages</h3>
                  <div className="text-sm text-gray-600">
                    <p>Montant estimé: <strong>XX XXX €</strong></p>
                    <p>Date d'expertise: XX/XX/XXXX</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 text-xs text-gray-400">
                Page {currentPage} / {totalPages}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
