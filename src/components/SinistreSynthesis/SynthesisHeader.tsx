
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DossierInfo } from "@/types/sinistre";
import { AIChat } from "./AIChat";

interface SynthesisHeaderProps {
  dossierInfo: DossierInfo;
}

export function SynthesisHeader({ dossierInfo }: SynthesisHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/sinistres")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dossier {dossierInfo.reference}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {dossierInfo.assure}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {dossierInfo.dateOuverture}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {dossierInfo.adresse}
              </span>
            </div>
          </div>
        </div>
        
        <AIChat dossierReference={dossierInfo.reference} />
      </div>
    </div>
  );
}
