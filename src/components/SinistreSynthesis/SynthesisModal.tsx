
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

interface Document {
  id: string;
  nom: string;
  type: string;
  description: string;
  dateModification: string;
  taille: string;
}

interface SynthesisModalProps {
  document: Document | null;
  synthesis: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SynthesisModal = ({ document, synthesis, isOpen, onClose }: SynthesisModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-purple-800">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Synthèse IA - {document?.nom || "Document"}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-6">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {synthesis}
              </p>
            </div>
            
            {document && (
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Document :</strong> {document.nom}</p>
                <p><strong>Type :</strong> {document.type.toUpperCase()}</p>
                <p><strong>Taille :</strong> {document.taille}</p>
                <p><strong>Modifié le :</strong> {document.dateModification}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
