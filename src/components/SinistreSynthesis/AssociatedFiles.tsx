
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
        <div className="space-y-4">
          {dossiersAssocies.map((dossier) => (
            <button
              key={dossier.id}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer text-left"
              onClick={() => navigate(`/sinistre/synthesis/${dossier.id}`)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-base">{dossier.nom}</h4>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Réf:</span> {dossier.id} • <span className="font-medium">Assuré:</span> {dossier.assure}
              </div>
              
              <div className="flex items-start gap-3">
                <Star className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" fill="currentColor" />
                <p className="text-sm text-violet-600 leading-relaxed flex-1 italic opacity-80">{dossier.syntheseIA}</p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
