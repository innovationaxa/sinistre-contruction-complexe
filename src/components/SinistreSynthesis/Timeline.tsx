import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, Circle, AlertCircle, User, FileText, Euro } from "lucide-react";
import { TimelineEvent } from "@/types/sinistre";
interface TimelineProps {
  timeline: TimelineEvent[];
}
export function Timeline({
  timeline
}: TimelineProps) {
  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-white" />;
      case 'upcoming':
        return <Clock className="h-3 w-3 text-white" />;
      case 'pending':
        return <Circle className="h-3 w-3 text-white" />;
      default:
        return <Circle className="h-3 w-3 text-white" />;
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
    return completedCount / total * 100;
  };
  return <Card className="w-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4 text-blue-600" />
          Timeline du sinistre
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 relative">
        {/* Barre de progression à gauche */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
          <div className="w-full bg-gradient-to-b from-green-500 to-blue-500 transition-all duration-500" style={{
          height: `${getProgressPercentage(timeline.length - 1, timeline.length)}%`
        }} />
        </div>
        
        <div className="space-y-4 pl-12">
          {timeline.map((event, index) => {
          const isLast = index === timeline.length - 1;
          return <div key={index} className="relative flex items-center">
                {/* Cercle de statut parfaitement centré sur la barre */}
                <div className={`absolute flex items-center justify-center w-6 h-6 rounded-full ${getStatusColor(event.statut)} shadow-sm hover:scale-105 transition-transform duration-200`} style={{
              left: '-3.25rem'
            }}>
                  {getStatusIcon(event.statut)}
                </div>
                
                {/* Contenu de l'événement */}
                <div className="w-full">
                  <div className={`bg-white rounded-md border shadow-sm hover:shadow-md transition-all duration-300 p-3 ${event.statut === 'completed' ? 'border-green-200' : event.statut === 'upcoming' ? 'border-blue-200' : 'border-gray-200'}`}>
                    
                    {/* En-tête avec date et statut */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-900">{event.date}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${event.statut === 'completed' ? 'bg-green-100 text-green-800' : event.statut === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                        {event.statut === 'completed' ? 'Terminé' : event.statut === 'upcoming' ? 'En cours' : 'À venir'}
                      </span>
                    </div>
                    
                    {/* Titre et description */}
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{event.titre}</h4>
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">{event.description}</p>
                    
                    {/* Informations détaillées */}
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5">
                        <User className="h-2.5 w-2.5 text-blue-600" />
                        <span className="text-gray-700">
                          <strong>Responsable:</strong> {event.acteur}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-2.5 w-2.5 text-orange-600" />
                        <span className="text-gray-700">
                          <strong>Durée:</strong> {event.duree}
                        </span>
                      </div>
                      
                      {event.details.montant}
                      
                      
                    </div>
                    
                    {/* Documents associés */}
                    {event.details.documents.length > 0}
                  </div>
                </div>
              </div>;
        })}
        </div>
        
        {/* Indicateur de progression en bas */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">
              {timeline.filter(e => e.statut === 'completed').length} / {timeline.length} étapes terminées
            </span>
          </div>
        </div>
      </CardContent>
    </Card>;
}