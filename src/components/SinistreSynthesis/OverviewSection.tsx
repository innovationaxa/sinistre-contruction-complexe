
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Sparkles, Scale, Clock, TrendingUp, Bot, FileText, Euro, Target } from "lucide-react";
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
            
            <div className="space-y-3 text-sm">
              {/* Section Contexte */}
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Contexte</h4>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>RC Décennale BATIMEX SARL</strong> - Dégâts des eaux atelier principal
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Déclaration à J+3 ans (délais respectés)</li>
                  <li>• Couverture confirmée, aucune exclusion</li>
                </ul>
              </div>

              {/* Section Enjeux */}
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-orange-500">
                <div className="flex items-center gap-2 mb-2">
                  <Euro className="h-4 w-4 text-orange-600" />
                  <h4 className="font-semibold text-orange-800">Enjeux financiers</h4>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Montant estimé</span>
                  <Badge className="bg-orange-100 text-orange-800 font-medium">15 000€</Badge>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Budget expertise : 2 500€</li>
                  <li>• Préjudice immatériel à évaluer</li>
                </ul>
              </div>

              {/* Section Stratégie */}
              <div className="bg-white/70 rounded-lg p-3 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <h4 className="font-semibold text-green-800">Plan d'action</h4>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• <strong>Expertise :</strong> 20/03/2024</li>
                  <li>• <strong>Délai standard :</strong> 45 jours</li>
                  <li>• <strong>Risque :</strong> Expertise contradictoire</li>
                </ul>
              </div>
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
