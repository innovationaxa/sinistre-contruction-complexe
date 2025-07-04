
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Phone, Mail, FileText, Calendar, AlertTriangle, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NextAction {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "communication" | "documents" | "expertise" | "decision";
  icon: React.ReactNode;
  estimatedTime: string;
  dueDate?: string;
}

export const NextActionsPanel = () => {
  const nextActions: NextAction[] = [
    {
      id: "1",
      title: "Relancer l'expert",
      description: "Contacter Cabinet EXPERTISE CONSEIL pour le rapport en retard",
      priority: "high",
      category: "communication",
      icon: <Phone className="w-4 h-4" />,
      estimatedTime: "5 min",
      dueDate: "Aujourd'hui"
    },
    {
      id: "2",
      title: "Demander attestation témoin",
      description: "Relancer l'assuré pour l'attestation d'assurance du témoin",
      priority: "medium",
      category: "documents",
      icon: <FileText className="w-4 h-4" />,
      estimatedTime: "10 min"
    },
    {
      id: "3",
      title: "Programmer RDV expertise complémentaire",
      description: "Organiser une contre-expertise si nécessaire",
      priority: "low",
      category: "expertise",
      icon: <Calendar className="w-4 h-4" />,
      estimatedTime: "30 min"
    },
    {
      id: "4",
      title: "Préparer note de synthèse",
      description: "Rédiger la note pour le comité de décision",
      priority: "medium",
      category: "decision",
      icon: <FileText className="w-4 h-4" />,
      estimatedTime: "45 min"
    }
  ];

  const handleActionClick = (action: NextAction) => {
    toast({
      title: "Action initiée",
      description: `${action.title} - ${action.description}`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "communication": return <Phone className="w-4 h-4" />;
      case "documents": return <FileText className="w-4 h-4" />;
      case "expertise": return <Users className="w-4 h-4" />;
      case "decision": return <CheckCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Actions recommandées
          <Badge variant="secondary" className="ml-auto">
            {nextActions.filter(a => a.priority === "high").length} prioritaires
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {nextActions.map((action) => (
            <div
              key={action.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{action.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getPriorityColor(action.priority)}`}
                      >
                        {action.priority === "high" && "Urgent"}
                        {action.priority === "medium" && "Moyen"}
                        {action.priority === "low" && "Faible"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(action.category)}
                        <span className="capitalize">{action.category}</span>
                      </div>
                      <span>~{action.estimatedTime}</span>
                      {action.dueDate && (
                        <span className="text-red-600 font-medium">
                          Échéance: {action.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleActionClick(action)}
                  className="shrink-0"
                >
                  Faire
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
