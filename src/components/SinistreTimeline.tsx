
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, FileText, Users, Gavel } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "critical";
  icon: React.ReactNode;
  documents?: string[];
}

interface SinistreTimelineProps {
  detailed?: boolean;
}

export const SinistreTimeline = ({ detailed = false }: SinistreTimelineProps) => {
  const events: TimelineEvent[] = [
    {
      id: "1",
      date: "2024-03-15",
      title: "Ouverture du dossier",
      description: "Déclaration de sinistre reçue et dossier créé",
      status: "completed",
      icon: <FileText className="w-4 h-4" />,
      documents: ["Déclaration initiale", "Photos des dégâts"]
    },
    {
      id: "2",
      date: "2024-03-18",
      title: "Assignation expert",
      description: "Expert Cabinet EXPERTISE CONSEIL assigné au dossier",
      status: "completed",
      icon: <Users className="w-4 h-4" />
    },
    {
      id: "3",
      date: "2024-03-22",
      title: "Expertise sur site",
      description: "Visite d'expertise réalisée, rapport en attente",
      status: "in-progress",
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: "4",
      date: "2024-04-05",
      title: "Remise du rapport d'expertise",
      description: "Date limite pour la remise du rapport d'expertise",
      status: "pending",
      icon: <AlertCircle className="w-4 h-4" />
    },
    {
      id: "5",
      date: "2024-04-15",
      title: "Décision de règlement",
      description: "Analyse du rapport et décision sur le règlement",
      status: "pending",
      icon: <Gavel className="w-4 h-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-gray-100 text-gray-800 border-gray-200";
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in-progress": return <Clock className="w-5 h-5 text-blue-600" />;
      case "pending": return <Clock className="w-5 h-5 text-gray-600" />;
      case "critical": return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Timeline des événements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              {/* Ligne de connexion */}
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full border-2 ${getStatusColor(event.status)}`}>
                  {getStatusIcon(event.status)}
                </div>
                {index < events.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                )}
              </div>

              {/* Contenu */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <Badge variant="outline" className={getStatusColor(event.status)}>
                    {event.status === "completed" && "Terminé"}
                    {event.status === "in-progress" && "En cours"}
                    {event.status === "pending" && "En attente"}
                    {event.status === "critical" && "Critique"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <p className="text-xs text-gray-500">{event.date}</p>
                
                {detailed && event.documents && event.documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Documents associés :</p>
                    <div className="flex flex-wrap gap-1">
                      {event.documents.map((doc, docIndex) => (
                        <Badge key={docIndex} variant="secondary" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
