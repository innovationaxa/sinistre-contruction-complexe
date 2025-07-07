
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ExternalLink, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DossierAssocie } from "@/types/sinistre";

interface AssociatedFilesProps {
  dossiersAssocies: DossierAssocie[];
}

export function AssociatedFiles({ dossiersAssocies }: AssociatedFilesProps) {
  const navigate = useNavigate();

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
            <div
              key={dossier.id}
              className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => navigate(`/sinistre/synthesis/${dossier.id}`)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm text-gray-900">{dossier.nom}</h4>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="text-xs text-gray-600 mb-3">
                <span className="font-medium">Réf:</span> {dossier.id}
              </div>
              
              <div className="flex items-start gap-2">
                <Star className="h-3 w-3 text-violet-500 mt-0.5 flex-shrink-0" fill="currentColor" />
                <p className="text-xs text-violet-600 leading-relaxed flex-1 italic opacity-80">{dossier.syntheseIA}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
