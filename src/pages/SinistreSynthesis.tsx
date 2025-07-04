
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, AlertTriangle, MessageSquare, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { SinistreTimeline } from "@/components/SinistreTimeline";
import { AlertsPanel } from "@/components/AlertsPanel";
import { ChatPanel } from "@/components/ChatPanel";
import { NextActionsPanel } from "@/components/NextActionsPanel";
import { toast } from "@/hooks/use-toast";

const SinistreSynthesis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  const [activeTab, setActiveTab] = useState("overview");

  // Données simulées du dossier
  const dossierData = {
    numero: "SIN-2024-001234",
    status: "En cours d'instruction",
    dateOuverture: "2024-03-15",
    montantEstime: formData?.estimationDommages || "125000",
    assure: formData?.nomAssure || "Société BATIMEX SARL",
    expert: "Cabinet EXPERTISE CONSEIL",
    gestionnaire: "Marie DUBOIS"
  };

  const handleExportDossier = () => {
    toast({
      title: "Export en cours",
      description: "Le dossier est en cours d'export au format PDF...",
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      
      <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la corbeille
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">
          Synthèse du dossier {dossierData.numero}
        </h1>
        <Badge variant="outline" className="ml-auto">
          {dossierData.status}
        </Badge>
      </div>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* En-tête du dossier */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Dossier de sinistre</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleExportDossier}>
                    <FileText className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Assuré</p>
                  <p className="font-medium">{dossierData.assure}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date d'ouverture</p>
                  <p className="font-medium">{dossierData.dateOuverture}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Montant estimé</p>
                  <p className="font-medium">{Number(dossierData.montantEstime).toLocaleString('fr-FR')} €</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expert assigné</p>
                  <p className="font-medium">{dossierData.expert}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Onglets de navigation */}
          <div className="flex space-x-1 bg-white p-1 rounded-lg border">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              onClick={() => setActiveTab("overview")}
              className="flex-1"
            >
              Vue d'ensemble
            </Button>
            <Button
              variant={activeTab === "timeline" ? "default" : "ghost"}
              onClick={() => setActiveTab("timeline")}
              className="flex-1"
            >
              Timeline
            </Button>
            <Button
              variant={activeTab === "alerts" ? "default" : "ghost"}
              onClick={() => setActiveTab("alerts")}
              className="flex-1"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alertes
            </Button>
            <Button
              variant={activeTab === "chat" ? "default" : "ghost"}
              onClick={() => setActiveTab("chat")}
              className="flex-1"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat IA
            </Button>
          </div>

          {/* Contenu des onglets */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <SinistreTimeline />
                <NextActionsPanel />
              </div>
              <div>
                <AlertsPanel />
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="max-w-4xl mx-auto">
              <SinistreTimeline detailed={true} />
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="max-w-4xl mx-auto">
              <AlertsPanel detailed={true} />
            </div>
          )}

          {activeTab === "chat" && (
            <div className="max-w-4xl mx-auto">
              <ChatPanel />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SinistreSynthesis;
