
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, Circle, AlertCircle } from "lucide-react";
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
        return <Circle className="h-4 w-4 text-white fill-current" />;
      case 'pending':
        return <Circle className="h-4 w-4 text-white" />;
      default:
        return <Circle className="h-4 w-4 text-white" />;
    }
  };

  const getStatusStyles = (statut: string) => {
    switch (statut) {
      case 'completed':
        return {
          circle: 'bg-gradient-to-br from-green-500 to-green-600 border-2 border-white shadow-lg',
          text: 'text-gray-900'
        };
      case 'upcoming':
        return {
          circle: 'bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white shadow-lg',
          text: 'text-gray-900'
        };
      case 'pending':
        return {
          circle: 'bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white shadow-lg',
          text: 'text-gray-500'
        };
      default:
        return {
          circle: 'bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white shadow-lg',
          text: 'text-gray-500'
        };
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-blue-600" />
          Timeline du sinistre
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-6 relative">
        {/* Barre continue centrée sur toute la hauteur */}
        <div className="absolute left-1/2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-green-400 via-blue-400 to-gray-300 transform -translate-x-1/2"></div>
        
        <div className="relative flex flex-col items-center">
          {timeline.map((event, index) => {
            const styles = getStatusStyles(event.statut);
            const isLast = index === timeline.length - 1;
            
            return (
              <div key={index} className={`relative flex flex-col items-center w-full ${!isLast ? 'mb-10' : ''}`}>
                {/* Cercle avec icône centré sur la barre */}
                <div className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-full ${styles.circle} transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer mb-4`}>
                  {getStatusIcon(event.statut)}
                </div>
                
                {/* Contenu de l'événement centré */}
                <div className="w-full max-w-md">
                  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold text-base ${styles.text} transition-colors duration-200`}>
                        {event.titre}
                      </h4>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        event.statut === 'completed' ? 'bg-green-100 text-green-800' :
                        event.statut === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {event.date}
                      </span>
                    </div>
                    <p className={`text-sm ${styles.text} leading-relaxed mb-3`}>
                      {event.description}
                    </p>
                    
                    {/* Indicateur de statut centré */}
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        event.statut === 'completed' ? 'bg-green-500' :
                        event.statut === 'upcoming' ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}></div>
                      <span className="text-xs text-gray-500 capitalize">
                        {event.statut === 'completed' ? 'Terminé' :
                         event.statut === 'upcoming' ? 'À venir' : 'En attente'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
