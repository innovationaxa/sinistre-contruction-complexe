
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, Circle, AlertCircle, User, FileText, Euro } from "lucide-react";
import { TimelineEvent } from "@/types/sinistre";

interface TimelineProps {
  timeline: TimelineEvent[];
}

export function Timeline({ timeline }: TimelineProps) {
  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-white" />;
      case 'upcoming':
        return <Clock className="h-4 w-4 text-white" />;
      case 'pending':
        return <Circle className="h-4 w-4 text-white" />;
      default:
        return <Circle className="h-4 w-4 text-white" />;
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'completed':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getProgressPercentage = (index: number, total: number) => {
    const completedCount = timeline.slice(0, index + 1).filter(event => event.statut === 'completed').length;
    return (completedCount / total) * 100;
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-blue-600" />
          Timeline du sinistre
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 relative">
        {/* Ligne de progression centrale */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2">
          <div 
            className="w-full bg-gradient-to-b from-green-500 to-blue-500 transition-all duration-500"
            style={{ height: `${getProgressPercentage(timeline.length - 1, timeline.length)}%` }}
          />
        </div>
        
        <div className="space-y-8">
          {timeline.map((event, index) => {
            const isLeft = index % 2 === 0;
            const isLast = index === timeline.length - 1;
            
            return (
              <div key={index} className="relative flex items-center">
                {/* Cercle de statut centré */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full ${getStatusColor(event.statut)} shadow-lg hover:scale-110 transition-transform duration-200`}>
                  {getStatusIcon(event.statut)}
                </div>
                
                {/* Contenu de l'événement - alternance gauche/droite */}
                <div className={`w-5/12 ${isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                  <div className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all duration-300 p-4 ${
                    event.statut === 'completed' ? 'border-green-200 bg-green-50/30' :
                    event.statut === 'upcoming' ? 'border-blue-200 bg-blue-50/30' :
                    'border-gray-200'
                  }`}>
                    
                    {/* En-tête avec date et statut */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-900">{event.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.statut === 'completed' ? 'bg-green-100 text-green-800' :
                        event.statut === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {event.statut === 'completed' ? 'Terminé' :
                         event.statut === 'upcoming' ? 'En cours' : 'À venir'}
                      </span>
                    </div>
                    
                    {/* Titre et description */}
                    <h4 className="font-semibold text-base text-gray-900 mb-2">{event.titre}</h4>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{event.description}</p>
                    
                    {/* Informations détaillées */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-blue-600" />
                        <span className="text-gray-700">
                          <strong>Responsable:</strong> {event.acteur}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-orange-600" />
                        <span className="text-gray-700">
                          <strong>Durée:</strong> {event.duree}
                        </span>
                      </div>
                      
                      {event.details.montant && (
                        <div className="flex items-center gap-2">
                          <Euro className="h-3 w-3 text-green-600" />
                          <span className="text-gray-700">
                            <strong>Montant:</strong> {event.details.montant}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <FileText className="h-3 w-3 text-purple-600" />
                        <span className="text-gray-700">
                          <strong>Délai:</strong> {event.details.delaiReglementaire}
                        </span>
                      </div>
                    </div>
                    
                    {/* Documents associés */}
                    {event.details.documents.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex flex-wrap gap-1">
                          {event.details.documents.map((doc, docIndex) => (
                            <span key={docIndex} className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Indicateur de progression en bas */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">
              {timeline.filter(e => e.statut === 'completed').length} / {timeline.length} étapes terminées
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
