import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Expand } from "lucide-react";
import { SynthesisModal } from "./SynthesisModal";
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
export const DocumentSynthesis = ({
  document
}: DocumentSynthesisProps) => {
  const [synthesis, setSynthesis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!document) return;
    setIsLoading(true);
    setTimeout(() => {
      const syntheses = {
        "DOC-001": `Rapport d'expertise technique confirmant des dégâts des eaux dans l'atelier principal suite à rupture de canalisation.

Montant estimé : 15 000€ TTC
- Dégâts matériels : 12 000€
- Remise en état : 3 000€

Responsabilité partagée 50/50 entre copropriété et locataire. Prise en charge confirmée avec franchise 500€.

Délai d'intervention : 48h maximum pour éviter aggravation des dommages. Expertise contradictoire programmée dans 5 jours ouvrés.`,
        "DOC-002": `Rapport complémentaire révélant dommages cachés dans cloisons et problèmes d'humidité.

Montant révisé : 18 500€ TTC
- Supplément : 3 500€
- Traitement humidité : 2 000€
- Réfection cloisons : 1 500€

Complément d'expertise en cours d'étude. Nécessité d'intervention spécialisée pour traitement anti-humidité avant remise en état définitive.`,
        "default": `Document ${document.type.toUpperCase()} de ${document.taille} analysé.

Éléments identifiés :
- Montants et responsabilités en cours d'analyse
- Procédures réglementaires respectées
- Délais d'intervention conformes

Synthèse détaillée disponible après traitement complet du dossier.`
      };
      const selectedSynthesis = syntheses[document.id as keyof typeof syntheses] || syntheses.default;
      setSynthesis(selectedSynthesis);
      setIsLoading(false);
    }, 1500);
  }, [document]);
  if (!document) {
    return <Card className="h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2 text-purple-800">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Synthèse IA
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-500">
          Sélectionnez un document
        </CardContent>
      </Card>;
  }
  return <>
      <Card className="h-fit bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium flex items-center gap-2 text-purple-800">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Synthèse IA
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(true)} className="text-purple-600 hover:text-purple-800 hover:bg-purple-100">
              <Expand className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {isLoading ? <div className="flex items-center gap-2 text-sm text-purple-600">
              <div className="animate-spin w-4 h-4 border border-purple-300 border-t-purple-600 rounded-full"></div>
              Analyse en cours...
            </div> : <div className="text-sm text-gray-700 leading-relaxed max-h-40 overflow-hidden">
              <p className="line-clamp-6">
                {synthesis.split('\n').slice(0, 3).join('\n')}
              </p>
              {synthesis.split('\n').length > 3}
            </div>}
        </CardContent>
      </Card>

      <SynthesisModal document={document} synthesis={synthesis} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>;
};