
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { TimelineEvent } from "@/types/sinistre";

interface TimelineProps {
  timeline: TimelineEvent[];
}

export function Timeline({ timeline }: TimelineProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-gray-600" />
          Timeline du dossier
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  event.statut === 'completed' ? 'bg-green-500' :
                  event.statut === 'upcoming' ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
                {index < timeline.length - 1 && (
                  <div className="w-px h-8 bg-gray-300 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <h4 className="font-semibold text-sm">{event.titre}</h4>
                <p className="text-xs text-gray-700 mt-1">{event.description}</p>
                <p className="text-xs text-gray-500 mt-1">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
