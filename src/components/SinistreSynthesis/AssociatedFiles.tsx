
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Star, ExternalLink, Bot, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DossierAssocie } from "@/types/sinistre";

interface AssociatedFilesProps {
  dossiersAssocies: DossierAssocie[];
}

export function AssociatedFiles({ dossiersAssocies }: AssociatedFilesProps) {
  const navigate = useNavigate();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getStatusColor = (statut: string) => {
    switch (statut.toLowerCase()) {
      case 'clos': return "bg-gray-100 text-gray-800";
      case 'en cours': return "bg-blue-100 text-blue-800";
      case 'récent': return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-blue-600" />
          Dossiers associés
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dossiersAssocies.map((dossier) => (
            <button
              key={dossier.id}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer text-left"
              onClick={() => navigate(`/sinistre/synthesis/${dossier.id}`)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm">{dossier.nom}</h4>
                <div className="flex items-center gap-2">
                  <Badge className={getScoreColor(dossier.score)}>
                    <Star className="h-3 w-3 mr-1" />
                    {dossier.score}
                  </Badge>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
              </div>

              {/* AI Summary */}
              <div className="mb-3 p-2 bg-blue-50 rounded-md">
                <div className="flex items-center gap-1 mb-1">
                  <Bot className="h-3 w-3 text-blue-600" />
                  <span className="text-xs font-medium text-blue-800">Synthèse IA</span>
                </div>
                <p className="text-xs text-blue-700 leading-relaxed">{dossier.syntheseIA}</p>
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{dossier.relation}</span>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(dossier.statut)}`}>
                    {dossier.statut}
                  </Badge>
                </div>
                
                {dossier.montantEstime && (
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <span className="font-medium">Montant:</span>
                    <span>{dossier.montantEstime}</span>
                  </div>
                )}
                
                {dossier.prochaineMilestone && (
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>{dossier.prochaineMilestone}</span>
                  </div>
                )}
                
                {dossier.risqueIdentifie && (
                  <div className="flex items-center gap-1 text-xs text-orange-600">
                    <AlertTriangle className="h-3 w-3" />
                    <span>{dossier.risqueIdentifie}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
