
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, RefreshCw, FileText, CheckCircle } from "lucide-react";

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
  const [lastAnalyzedDoc, setLastAnalyzedDoc] = useState<string | null>(null);

  const generateSynthesis = async () => {
    if (!document) return;

    setIsLoading(true);
    
    // Simulation d'appel API pour générer la synthèse
    setTimeout(() => {
      const syntheses = {
        "DOC-001": `**Rapport d'expertise amiable**

**Type**: Rapport d'expertise technique
**Analysé le**: ${new Date().toLocaleDateString('fr-FR')}

**Points clés**
• Dégâts des eaux dans l'atelier principal
• Rupture de canalisation au 2ème étage
• Dommages matériels et arrêt d'activité

**Montants**
• Total estimé: 15 000 € TTC
• Dégâts matériels: 12 000 €
• Remise en état: 3 000 €
• Franchise: 500 €

**Responsabilités**
• Défaut d'entretien plomberie
• Partagée: 50% copropriété, 50% locataire
• Recours contre entreprise plomberie

**Actions**
• Prise en charge confirmée
• Délai règlement: 15 jours
• Travaux à programmer rapidement`,

        "DOC-002": `**Rapport complémentaire**

**Type**: Document complémentaire
**Analysé le**: ${new Date().toLocaleDateString('fr-FR')}

**Nouveaux éléments**
• Dommages cachés dans cloisons
• Problèmes d'humidité détectés
• Expertise structurelle approfondie

**Révision budgétaire**
• Montant révisé: 18 500 € TTC (+3 500 €)
• Traitement humidité: 2 000 €
• Réfection cloisons: 1 500 €

**Statut**
• Montant initial maintenu
• Complément sous étude
• Réponse attendue sous 5 jours`,

        "default": `**Synthèse du document**

**Document**: ${document.nom}
**Analysé le**: ${new Date().toLocaleDateString('fr-FR')}

**Informations**
• Type: ${document.type.toUpperCase()}
• Taille: ${document.taille}
• Modifié: ${document.dateModification}

**Analyse en cours**
L'IA analyse le contenu pour identifier les éléments clés, montants importants, responsabilités et actions à entreprendre.

Une synthèse détaillée sera disponible dans quelques instants.`
      };

      const selectedSynthesis = syntheses[document.id as keyof typeof syntheses] || syntheses.default;
      setSynthesis(selectedSynthesis);
      setLastAnalyzedDoc(document.id);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (document && document.id !== lastAnalyzedDoc) {
      generateSynthesis();
    }
  }, [document, lastAnalyzedDoc]);

  if (!document) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Synthèse IA
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Sélectionnez un document</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Synthèse IA
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={generateSynthesis}
            disabled={isLoading}
            className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">
          {document.nom}
        </p>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <ScrollArea className="h-full p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Analyse en cours...</p>
              </div>
            </div>
          ) : synthesis ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                <CheckCircle className="w-3 h-3" />
                <span>Synthèse générée</span>
              </div>

              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {synthesis.split('\n').map((line, index) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <h3 key={index} className="font-semibold text-gray-800 mt-4 mb-2">
                          {line.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (line.startsWith('• ')) {
                      return (
                        <div key={index} className="flex items-start gap-2 mb-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                          <span className="text-gray-700">{line.substring(2)}</span>
                        </div>
                      );
                    }
                    if (line.trim() === '') {
                      return <div key={index} className="h-2" />;
                    }
                    return (
                      <p key={index} className="text-gray-700 mb-2">
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Cliquez sur "Actualiser" pour générer la synthèse</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
