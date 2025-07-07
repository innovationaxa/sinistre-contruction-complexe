
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Star, ExternalLink } from "lucide-react";
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

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-blue-600" />
          Dossiers associés
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dossiersAssocies.map((dossier) => (
            <button
              key={dossier.id}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer text-left"
              onClick={() => navigate(`/sinistre/synthesis/${dossier.id}`)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{dossier.nom}</h4>
                <div className="flex items-center gap-2">
                  <Badge className={getScoreColor(dossier.score)}>
                    <Star className="h-3 w-3 mr-1" />
                    {dossier.score}
                  </Badge>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{dossier.relation}</span>
                <Badge variant="outline" className="text-xs">
                  {dossier.statut}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
