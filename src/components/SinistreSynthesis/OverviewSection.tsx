import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Sparkles, Scale, Clock, TrendingUp, Bot } from "lucide-react";
import { ActeContentieux, AlerteIA, NextAction } from "@/types/sinistre";

interface OverviewSectionProps {
  syntheseIA: string;
  actesContentieux: ActeContentieux[];
  alertesIA: AlerteIA[];
  nextActions: NextAction[];
}

export function OverviewSection({ syntheseIA, actesContentieux, alertesIA, nextActions }: OverviewSectionProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "urgent": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "warning": return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <TrendingUp className="h-4 w-4 text-blue-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "urgent": return "bg-red-50";
      case "warning": return "bg-orange-50";
      default: return "bg-blue-50";
    }
  };

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "haute": return "bg-red-100 text-red-800";
      case "moyenne": return "bg-orange-100 text-orange-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  return (
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
              
              <p>
                <strong>🎯 Plan d'action :</strong> Mission d'expertise planifiée le 20/03/2024 avec l'expert mandaté. 
                Délai de traitement estimé selon nos standards internes : 45 jours ouvrés. 
                ⚠️ Attention particulière requise car risque d'expertise contradictoire de la part du maître d'ouvrage à anticiper selon le profil du dossier.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="h-4 w-4 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Actes contentieux</h3>
            </div>
            <div className="space-y-3">
              {actesContentieux.map((acte, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded border border-gray-100">
                  <div>
                    <p className="font-medium text-sm">{acte.type}</p>
                    <p className="text-xs text-gray-600">{acte.partie}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{acte.date}</p>
                    <Badge variant="outline" className="text-xs">
                      {acte.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne 2 - Alertes IA */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <h3 className="font-semibold text-gray-900">Alertes IA</h3>
          </div>
          <div className="space-y-4">
            {alertesIA.map((alerte) => (
              <div key={alerte.id} className={`p-3 rounded border border-gray-200 ${getAlertColor(alerte.type)} bg-white`}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alerte.type)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{alerte.titre}</h4>
                    <p className="text-xs text-gray-700 mb-2">{alerte.description}</p>
                    <p className="text-xs text-gray-600">{alerte.impact}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Bot className="h-3 w-3 text-purple-600" />
                      <span className="text-xs text-purple-700">{alerte.confidence}% confiance</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne 3 - Next Best Actions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <h3 className="font-semibold text-gray-900">Next Best Actions</h3>
          </div>
          <div className="space-y-4">
            {nextActions.map((action) => (
              <div key={action.id} className="p-3 border border-gray-200 rounded bg-white hover:shadow-sm transition-shadow cursor-pointer">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
