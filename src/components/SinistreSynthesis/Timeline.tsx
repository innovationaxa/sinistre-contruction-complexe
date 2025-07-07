
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, Circle, AlertCircle, Star } from "lucide-react";
import { TimelineEvent } from "@/types/sinistre";

interface TimelineProps {
  timeline: TimelineEvent[];
}

export function Timeline({ timeline }: TimelineProps) {
  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-white" />;
      case 'upcoming':
        return <Circle className="h-6 w-6 text-white" />;
      case 'pending':
        return <AlertCircle className="h-6 w-6 text-white" />;
      default:
        return <Circle className="h-6 w-6 text-white" />;
    }
  };

  const getStatusStyles = (statut: string) => {
    switch (statut) {
      case 'completed':
        return {
          circle: 'bg-green-500 border-green-600',
          line: 'bg-green-300',
          card: 'bg-white border-green-200 shadow-sm'
        };
      case 'upcoming':
        return {
          circle: 'bg-blue-500 border-blue-600',
          line: 'bg-blue-300',
          card: 'bg-blue-50 border-blue-200 shadow-sm'
        };
      case 'pending':
        return {
          circle: 'bg-gray-400 border-gray-500',
          line: 'bg-gray-300',
          card: 'bg-gray-50 border-gray-300 opacity-75'
        };
      default:
        return {
          circle: 'bg-gray-400 border-gray-500',
          line: 'bg-gray-300',
          card: 'bg-gray-50 border-gray-300'
        };
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Star className="h-4 w-4 text-purple-600 fill-purple-600" />
          <Clock className="h-5 w-5 text-gray-600" />
          Timeline du sinistre
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div className="relative w-full">
          {timeline.map((event, index) => {
            const styles = getStatusStyles(event.statut);
            const isLast = index === timeline.length - 1;
            
            return (
              <div key={index} className="relative flex items-start w-full mb-8 last:mb-0">
                {/* Ligne verticale */}
                {!isLast && (
                  <div 
                    className={`absolute left-6 top-12 w-0.5 h-16 ${styles.line}`}
                    style={{ transform: 'translateX(-50%)' }}
                  />
                )}
                
                {/* Cercle avec icône */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${styles.circle} shadow-lg`}>
                  {getStatusIcon(event.statut)}
                </div>
                
                {/* Contenu de l'événement */}
                <div className={`flex-1 ml-6 p-4 rounded-lg border ${styles.card}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-semibold text-base ${event.statut === 'pending' ? 'text-gray-600' : 'text-gray-900'}`}>
                      {event.titre}
                    </h4>
                    <span className={`text-sm font-medium whitespace-nowrap ml-4 ${event.statut === 'pending' ? 'text-gray-500' : 'text-gray-700'}`}>
                      {event.date}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-3 ${event.statut === 'pending' ? 'text-gray-500' : 'text-gray-700'}`}>
                    {event.description}
                  </p>
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      event.statut === 'completed' ? 'bg-green-100 text-green-800' :
                      event.statut === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      event.statut === 'pending' ? 'bg-gray-100 text-gray-600' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.statut === 'completed' ? 'Terminé' :
                       event.statut === 'upcoming' ? 'En cours' :
                       event.statut === 'pending' ? 'En attente' : 'Statut inconnu'}
                    </span>
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
