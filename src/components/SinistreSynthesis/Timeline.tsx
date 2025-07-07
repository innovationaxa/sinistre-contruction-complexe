
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
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'upcoming':
        return <Circle className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'completed':
        return 'bg-green-100 border-green-200';
      case 'upcoming':
        return 'bg-blue-50 border-blue-200';
      case 'pending':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
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
        <div className="space-y-3 w-full">
          {timeline.map((event, index) => (
            <div key={index} className={`w-full p-4 rounded-lg border ${getStatusColor(event.statut)}`}>
              <div className="flex items-start gap-4 w-full">
                <div className="flex flex-col items-center mt-1">
                  {getStatusIcon(event.statut)}
                  {index < timeline.length - 1 && (
                    <div className="w-px h-8 bg-gray-300 mt-2" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-base text-gray-900">{event.titre}</h4>
                    <span className="text-sm font-medium text-gray-600 whitespace-nowrap ml-4">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      event.statut === 'completed' ? 'bg-green-100 text-green-800' :
                      event.statut === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      event.statut === 'pending' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.statut === 'completed' ? 'Terminé' :
                       event.statut === 'upcoming' ? 'À venir' :
                       event.statut === 'pending' ? 'En attente' : 'Statut inconnu'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
