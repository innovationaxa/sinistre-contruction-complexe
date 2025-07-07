
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
        return <CheckCircle className="h-5 w-5 text-white" />;
      case 'upcoming':
        return <Circle className="h-5 w-5 text-white fill-current" />;
      case 'pending':
        return <Circle className="h-5 w-5 text-white" />;
      default:
        return <Circle className="h-5 w-5 text-white" />;
    }
  };

  const getStatusStyles = (statut: string) => {
    switch (statut) {
      case 'completed':
        return {
          circle: 'bg-gradient-to-r from-green-500 to-green-600 border-2 border-green-300',
          text: 'text-gray-900'
        };
      case 'upcoming':
        return {
          circle: 'bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-blue-300',
          text: 'text-gray-900'
        };
      case 'pending':
        return {
          circle: 'bg-gradient-to-r from-gray-400 to-gray-500 border-2 border-gray-300',
          text: 'text-gray-500'
        };
      default:
        return {
          circle: 'bg-gradient-to-r from-gray-400 to-gray-500 border-2 border-gray-300',
          text: 'text-gray-500'
        };
    }
  };

  const getProgressBarColor = (index: number, currentStatus: string) => {
    if (currentStatus === 'completed') {
      return 'bg-green-400';
    }
    if (index === 0) return 'bg-green-400';
    return 'bg-gray-200';
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-gray-600" />
          Timeline du sinistre
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="relative">
          {timeline.map((event, index) => {
            const styles = getStatusStyles(event.statut);
            const isLast = index === timeline.length - 1;
            
            return (
              <div key={index} className={`relative flex items-start ${!isLast ? 'mb-8' : ''}`}>
                {/* Barre verticale colorée selon le statut */}
                {!isLast && (
                  <div className={`absolute left-4 top-9 w-0.5 h-8 ${getProgressBarColor(index, event.statut)}`} />
                )}
                
                {/* Cercle avec icône et effet hover */}
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${styles.circle} shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md`}>
                  {getStatusIcon(event.statut)}
                </div>
                
                {/* Contenu de l'événement */}
                <div className="flex-1 ml-4 pt-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-semibold text-base ${styles.text} transition-colors duration-200`}>
                      {event.titre}
                    </h4>
                    <span className={`text-sm font-medium ${styles.text} bg-gray-50 px-2 py-1 rounded-md`}>
                      {event.date}
                    </span>
                  </div>
                  <p className={`text-sm ${styles.text} leading-relaxed`}>
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
