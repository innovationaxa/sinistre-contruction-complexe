
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, FileX, Calendar, Bell } from "lucide-react";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  dueDate?: string;
  priority: "high" | "medium" | "low";
  category: "pieces-manquantes" | "delais" | "prescription" | "expertise";
}

interface AlertsPanelProps {
  detailed?: boolean;
}

export const AlertsPanel = ({ detailed = false }: AlertsPanelProps) => {
  const alerts: Alert[] = [
    {
      id: "1",
      type: "critical",
      title: "Rapport d'expertise en retard",
      description: "Le rapport d'expertise devait être remis le 05/04/2024",
      dueDate: "2024-04-05",
      priority: "high",
      category: "delais"
    },
    {
      id: "2",
      type: "warning",
      title: "Pièce manquante",
      description: "Attestation d'assurance du témoin non fournie",
      priority: "medium",
      category: "pieces-manquantes"
    },
    {
      id: "3",
      type: "info",
      title: "Délai de prescription",
      description: "Délai de prescription pour recours dans 18 mois",
      dueDate: "2025-09-15",
      priority: "low",
      category: "prescription"
    },
    {
      id: "4",
      type: "warning",
      title: "Relance expert nécessaire",
      description: "Aucune nouvelle depuis 10 jours",
      priority: "medium",
      category: "expertise"
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "warning": return <Clock className="w-4 h-4 text-orange-600" />;
      case "info": return <Bell className="w-4 h-4 text-blue-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "border-l-red-500 bg-red-50";
      case "warning": return "border-l-orange-500 bg-orange-50";
      case "info": return "border-l-blue-500 bg-blue-50";
      default: return "border-l-gray-500 bg-gray-50";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="destructive">Urgent</Badge>;
      case "medium": return <Badge variant="secondary">Moyen</Badge>;
      case "low": return <Badge variant="outline">Faible</Badge>;
      default: return <Badge variant="outline">Faible</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "pieces-manquantes": return <FileX className="w-4 h-4" />;
      case "delais": return <Clock className="w-4 h-4" />;
      case "prescription": return <Calendar className="w-4 h-4" />;
      case "expertise": return <AlertTriangle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700">
          <AlertTriangle className="w-5 h-5" />
          Alertes et jalons critiques
          <Badge variant="secondary" className="ml-auto">
            {alerts.filter(a => a.type === "critical").length} critiques
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 border-l-4 rounded-r-lg ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {getAlertIcon(alert.type)}
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                </div>
                {getPriorityBadge(alert.priority)}
              </div>
              
              <p className="text-sm text-gray-600 mt-1 mb-2">{alert.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(alert.category)}
                  <span className="text-xs text-gray-500 capitalize">
                    {alert.category.replace('-', ' ')}
                  </span>
                </div>
                {alert.dueDate && (
                  <span className="text-xs text-gray-500">
                    Échéance: {alert.dueDate}
                  </span>
                )}
              </div>

              {detailed && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <Button size="sm" variant="outline" className="text-xs">
                    Marquer comme traité
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
