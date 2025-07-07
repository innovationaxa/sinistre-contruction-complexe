
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
        return <CheckCircle className="h-6 w-6 text-white" />;
      case 'upcoming':
        return <Circle className="h-6 w-6 text-white fill-current" />;
      case 'pending':
        return <Circle className="h-6 w-6 text-white" />;
      default:
        return <Circle className="h-6 w-6 text-white" />;
    }
  };

  const getStatusStyles = (statut: string) => {
    switch (statut) {
      case 'completed':
        return {
          circle: 'bg-green-500',
          text: 'text-gray-900'
        };
      case 'upcoming':
        return {
          circle: 'bg-blue-500',
          text: 'text-gray-900'
        };
      case 'pending':
        return {
          circle: 'bg-gray-400',
          text: 'text-gray-500'
        };
      default:
        return {
          circle: 'bg-gray-400',
          text: 'text-gray-500'
        };
    }
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
          {/* Barre verticale continue */}
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200" />
          
          {timeline.map((event, index) => {
            const styles = getStatusStyles(event.statut);
            const isLast = index === timeline.length - 1;
            
            return (
              <div key={index} className={`relative flex items-start ${!isLast ? 'mb-8' : ''}`}>
                {/* Cercle avec icône */}
                <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${styles.circle} shadow-sm`}>
                  {getStatusIcon(event.statut)}
                </div>
                
                {/* Contenu de l'événement */}
                <div className="flex-1 ml-4 pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-semibold text-base ${styles.text}`}>
                      {event.titre}
                    </h4>
                    <span className={`text-sm font-medium ${styles.text}`}>
                      {event.date}
                    </span>
                  </div>
                  <p className={`text-sm ${styles.text}`}>
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
