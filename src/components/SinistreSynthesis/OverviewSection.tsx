import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, CheckCircle, Sparkles, Scale, Clock, TrendingUp, Bot, Info, FileText } from "lucide-react";
import { ActeContentieux, AlerteIA, NextAction } from "@/types/sinistre";

interface OverviewSectionProps {
  syntheseIA: string;
  actesContentieux: ActeContentieux[];
  alertesIA: AlerteIA[];
  nextActions: NextAction[];
}

export function OverviewSection({
  syntheseIA,
  actesContentieux,
  alertesIA,
  nextActions
}: OverviewSectionProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-red-50";
      case "warning":
        return "bg-orange-50";
      default:
        return "bg-blue-50";
    }
  };

  const getAlertExplanation = (id: number) => {
    switch (id) {
      case 1:
        return "Détection automatique basée sur l'analyse des documents fournis. Le système n'a pas trouvé de justificatifs de réparation dans les pièces jointes du dossier, ce qui est requis pour le règlement.";
      case 2:
        return "Calcul automatique des délais basé sur la date de mission d'expertise (18/03/2024) et la date prévue de livraison du rapport. Le système suit les délais contractuels standards.";
      case 3:
        return "Analyse juridique automatique des délais de prescription. Calcul basé sur la date de survenance du sinistre et la réglementation en vigueur pour les actions en responsabilité décennale.";
      default:
        return "Analyse automatique basée sur les données du dossier et les règles métier configurées.";
    }
  };

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "haute":
        return "bg-red-100 text-red-800";
      case "moyenne":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <h2 className="text-lg font-semibold text-gray-900">Vue d'ensemble du dossier</h2>
            <div className="flex-1 h-px bg-gray-200 ml-4"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne 1 - Synthèse IA + Actes contentieux */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900 text-base">Synthèse IA du dossier</h3>
                </div>
                
                <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                  <p>
                    <strong>🏢 Contexte :</strong> Sinistre RC Décennale pour BATIMEX SARL suite à des dégâts des eaux survenus dans l'atelier principal du site parisien. 
                    La déclaration a été effectuée dans les délais réglementaires (J+3 après constat), la couverture d'assurance est confirmée sans exclusions particulières identifiées. 
                    Le dossier présente un profil de risque standard pour ce type de sinistre.
                  </p>
                  
                  <p>
                    <strong>💰 Enjeux financiers :</strong> Estimation initiale des dommages à <Badge className="bg-orange-100 text-orange-800 font-medium mx-1">15 000€</Badge>
                    avec un budget d'expertise alloué de 2 500€. Le préjudice immatériel (arrêt d'activité, perte d'exploitation) reste à quantifier précisément lors de l'expertise. 
                    Les premiers éléments suggèrent un impact limité sur la production.
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne 2 - Alertes IA */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <h3 className="font-semibold text-gray-900">Alertes IA</h3>
              </div>
              <div className="space-y-4">
                {alertesIA.map(alerte => <div key={alerte.id} className={`p-3 rounded border border-gray-200 ${getAlertColor(alerte.type)} bg-white relative`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                          <Info className="h-3.5 w-3.5 text-gray-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md p-4">
                        <p className="text-sm leading-relaxed">{getAlertExplanation(alerte.id)}</p>
                      </TooltipContent>
                    </Tooltip>
                    <div className="flex items-start gap-3 pr-8">
                      {getAlertIcon(alerte.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{alerte.titre}</h4>
                        <p className="text-xs text-gray-700 mb-2">{alerte.description}</p>
                        <p className="text-xs text-gray-600">{alerte.impact}</p>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Colonne 3 - Next Best Actions */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <h3 className="font-semibold text-gray-900">Next Best Actions</h3>
              </div>
              <div className="space-y-4">
                {nextActions.map(action => <div key={action.id} className="p-3 border border-gray-200 rounded bg-white hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{action.action}</h4>
                      <Badge className={getPriorityColor(action.priorite)}>
                        {action.priorite}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-700 mb-2">{action.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>👤 {action.assignee}</span>
                      <span>⏱️ {action.delai}</span>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
