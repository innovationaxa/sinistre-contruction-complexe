
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, RefreshCw, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";

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
        "DOC-001": `**Synthèse du rapport d'expertise amiable**

📋 **Type de document**: Rapport d'expertise technique
📅 **Date d'analyse**: ${new Date().toLocaleDateString('fr-FR')}

## 🔍 **Points clés identifiés**
• **Nature du sinistre**: Dégâts des eaux dans l'atelier principal
• **Origine**: Rupture de canalisation au niveau du 2ème étage
• **Impact**: Dommages matériels et arrêt partiel de l'activité

## 💰 **Évaluation financière**
• **Montant total estimé**: 15 000 € TTC
• **Répartition**: 
  - Dégâts matériels: 12 000 €
  - Nettoyage/remise en état: 3 000 €
• **Franchise applicable**: 500 €

## ⚠️ **Responsabilités**
• **Cause**: Défaut d'entretien de la plomberie
• **Responsabilité**: Partagée (50% copropriété, 50% locataire)
• **Recours possibles**: Contre l'entreprise de plomberie

## 📊 **Recommandations**
• ✅ Prise en charge confirmée sous réserve de franchise
• ⏰ Délai de règlement estimé: 15 jours
• 🔧 Travaux de réparation à programmer rapidement
• 📋 Expertise contradictoire non nécessaire

## 🎯 **Actions prioritaires**
1. Validation du devis de réparation
2. Accord de prise en charge définitive
3. Programmation des travaux
4. Suivi du règlement`,

        "DOC-002": `**Synthèse du rapport d'expertise amiable (complément)**

📋 **Document complémentaire au rapport principal**
📅 **Date d'analyse**: ${new Date().toLocaleDateString('fr-FR')}

## 🔍 **Éléments nouveaux**
• **Expertise approfondie**: Analyse structurelle complémentaire
• **Découverte**: Dommages cachés dans les cloisons
• **Extension**: Problèmes d'humidité détectés

## 💰 **Révision budgétaire**
• **Montant révisé**: 18 500 € TTC (+3 500 €)
• **Nouveaux postes**:
  - Traitement humidité: 2 000 €
  - Réfection cloisons: 1 500 €

## ⚠️ **Points d'attention**
• **Délai**: Extension de 10 jours supplémentaires
• **Expertise**: Contre-expertise recommandée
• **Garanties**: Vérification des extensions de garantie

## 📊 **Statut de prise en charge**
• ✅ Montant initial maintenu
• 🔍 Complément sous étude
• ⏰ Réponse attendue sous 5 jours`,

        "default": `**Synthèse automatique du document**

📋 **Document**: ${document.nom}
📅 **Analysé le**: ${new Date().toLocaleDateString('fr-FR')}

## 🔍 **Analyse en cours**
L'IA analyse actuellement le contenu de ce document pour identifier:
• Les éléments clés du dossier
• Les montants et dates importantes
• Les responsabilités et garanties
• Les actions à entreprendre

## 📊 **Informations disponibles**
• **Type**: ${document.type.toUpperCase()}
• **Taille**: ${document.taille}
• **Dernière modification**: ${document.dateModification}

## ⏰ **Synthèse détaillée**
Une analyse approfondie sera disponible dans quelques instants. Cette synthèse comprendra:
- L'évaluation des risques
- Les recommandations d'actions
- L'impact sur le dossier sinistre
- Les délais et procédures à suivre`
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
            <p>Sélectionnez un document pour voir sa synthèse</p>
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
                <p className="text-xs text-gray-500 mt-1">Génération de la synthèse IA</p>
              </div>
            </div>
          ) : synthesis ? (
            <div className="space-y-4">
              {/* Indicateur de fraîcheur */}
              <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                <CheckCircle className="w-3 h-3" />
                <span>Synthèse générée il y a quelques instants</span>
              </div>

              {/* Contenu de la synthèse */}
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
                    if (line.startsWith('## ')) {
                      return (
                        <h4 key={index} className="font-medium text-gray-700 mt-3 mb-2 flex items-center gap-2">
                          {line.includes('🔍') && <AlertCircle className="w-4 h-4 text-blue-500" />}
                          {line.includes('💰') && <div className="w-4 h-4 bg-yellow-500 rounded-full" />}
                          {line.includes('⚠️') && <AlertCircle className="w-4 h-4 text-orange-500" />}
                          {line.includes('📊') && <div className="w-4 h-4 bg-green-500 rounded" />}
                          {line.includes('🎯') && <div className="w-4 h-4 bg-purple-500 rounded-full" />}
                          {line.includes('⏰') && <Clock className="w-4 h-4 text-gray-500" />}
                          {line.replace(/## .*?(🔍|💰|⚠️|📊|🎯|⏰)/, '').replace(/\*\*/g, '').trim()}
                        </h4>
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
