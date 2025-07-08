
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface DocumentSynthesisProps {
  document: Document | null;
}

export const DocumentSynthesis = ({ document }: DocumentSynthesisProps) => {
  const [synthesis, setSynthesis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!document) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const syntheses = {
        "DOC-001": `Rapport d'expertise technique confirmant des dégâts des eaux dans l'atelier principal suite à rupture de canalisation. Montant estimé 15 000€ TTC incluant dégâts matériels (12 000€) et remise en état (3 000€). Responsabilité partagée 50/50 entre copropriété et locataire. Prise en charge confirmée avec franchise 500€.`,

        "DOC-002": `Rapport complémentaire révélant dommages cachés dans cloisons et problèmes d'humidité. Montant révisé à 18 500€ TTC avec supplément de 3 500€ pour traitement humidité (2 000€) et réfection cloisons (1 500€). Complément en cours d'étude.`,

        "default": `Document ${document.type.toUpperCase()} de ${document.taille} analysé. Identification des éléments clés, montants et responsabilités en cours. Synthèse détaillée disponible après traitement.`
      };

      const selectedSynthesis = syntheses[document.id as keyof typeof syntheses] || syntheses.default;
      setSynthesis(selectedSynthesis);
      setIsLoading(false);
    }, 1500);
  }, [document]);

  if (!document) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Synthèse IA
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-500">
          Sélectionnez un document
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Synthèse IA
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-full">
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="animate-spin w-4 h-4 border border-gray-300 border-t-gray-600 rounded-full"></div>
              Analyse en cours...
            </div>
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">
              {synthesis}
            </p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
