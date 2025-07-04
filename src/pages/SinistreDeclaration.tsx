import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const SinistreDeclaration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numeroContrat: "CON-2024-789456",
    nomAssure: "Société BATIMEX SARL",
    adresseSinistre: "15 Avenue des Chantiers, 75015 Paris",
    dateSinistre: "2024-03-15",
    heureSinistre: "14:30",
    typeSinistre: "degats-eaux",
    circonstances: "Rupture de canalisation dans les fondations du bâtiment en construction causant un affaissement du terrain et endommageant les structures adjacentes. L'incident s'est produit pendant les travaux de terrassement.",
    degatsConstates: "Affaissement du sol sur 20m², fissures dans le mur de soutènement, inondation du sous-sol du bâtiment voisin",
    estimationDommages: "125000",
    temoinNom: "Jean MARTIN",
    temoinTelephone: "06.12.34.56.78",
    temoinAdresse: "22 Rue de la Paix, 75015 Paris",
    interventionSecours: "oui",
    organismeSecours: "Pompiers de Paris - Intervention n°2024-0315-142",
    photosJointes: "oui",
    documentsJoints: "Rapport d'expertise préliminaire, photos des dégâts, plan de situation"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
    // Rediriger vers la page de synthèse
    navigate('/sinistre/synthese');
  };

  const AIField = ({ children, field }: { children: React.ReactNode; field: string }) => (
    <div className="relative">
      {children}
      <Sparkles className="absolute top-2 right-2 h-4 w-4 text-purple-500" />
    </div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <Header />
        <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
          <SidebarTrigger className="border-2 border-blue-600 hover:bg-blue-50 text-blue-700" />
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Button>
          <h2 className="text-lg font-semibold text-gray-900">Déclaration de sinistre</h2>
        </div>
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-6">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="bg-blue-50 border-b border-blue-200">
                <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  Déclaration de sinistre - Pré-rempli par IA
                </CardTitle>
                <p className="text-blue-700 text-sm">
                  Les champs marqués d'une étoile ✨ ont été pré-remplis par l'IA. Vous pouvez les modifier si nécessaire.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AIField field="numeroContrat">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="numeroContrat" className="text-sm font-medium">
                          Numéro de contrat
                        </Label>
                        <Input
                          id="numeroContrat"
                          value={formData.numeroContrat}
                          onChange={(e) => handleInputChange("numeroContrat", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </AIField>

                    <AIField field="nomAssure">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="nomAssure" className="text-sm font-medium">
                          Nom de l'assuré
                        </Label>
                        <Input
                          id="nomAssure"
                          value={formData.nomAssure}
                          onChange={(e) => handleInputChange("nomAssure", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </AIField>

                    <AIField field="adresseSinistre">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="adresseSinistre" className="text-sm font-medium">
                          Adresse du sinistre
                        </Label>
                        <Input
                          id="adresseSinistre"
                          value={formData.adresseSinistre}
                          onChange={(e) => handleInputChange("adresseSinistre", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </AIField>

                    <div className="grid grid-cols-2 gap-4">
                      <AIField field="dateSinistre">
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <Label htmlFor="dateSinistre" className="text-sm font-medium">
                            Date du sinistre
                          </Label>
                          <Input
                            id="dateSinistre"
                            type="date"
                            value={formData.dateSinistre}
                            onChange={(e) => handleInputChange("dateSinistre", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </AIField>

                      <AIField field="heureSinistre">
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <Label htmlFor="heureSinistre" className="text-sm font-medium">
                            Heure du sinistre
                          </Label>
                          <Input
                            id="heureSinistre"
                            type="time"
                            value={formData.heureSinistre}
                            onChange={(e) => handleInputChange("heureSinistre", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </AIField>
                    </div>

                    <AIField field="typeSinistre">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="typeSinistre" className="text-sm font-medium">
                          Type de sinistre
                        </Label>
                        <Select value={formData.typeSinistre} onValueChange={(value) => handleInputChange("typeSinistre", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="incendie">Incendie</SelectItem>
                            <SelectItem value="degats-eaux">Dégâts des eaux</SelectItem>
                            <SelectItem value="vol">Vol</SelectItem>
                            <SelectItem value="vandalisme">Vandalisme</SelectItem>
                            <SelectItem value="catastrophe-naturelle">Catastrophe naturelle</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AIField>
                  </div>

                  <AIField field="circonstances">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <Label htmlFor="circonstances" className="text-sm font-medium">
                        Circonstances du sinistre
                      </Label>
                      <Textarea
                        id="circonstances"
                        value={formData.circonstances}
                        onChange={(e) => handleInputChange("circonstances", e.target.value)}
                        className="mt-1 min-h-[100px]"
                        placeholder="Décrivez les circonstances du sinistre..."
                      />
                    </div>
                  </AIField>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AIField field="degatsConstates">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="degatsConstates" className="text-sm font-medium">
                          Dégâts constatés
                        </Label>
                        <Textarea
                          id="degatsConstates"
                          value={formData.degatsConstates}
                          onChange={(e) => handleInputChange("degatsConstates", e.target.value)}
                          className="mt-1"
                          placeholder="Décrivez les dégâts constatés..."
                        />
                      </div>
                    </AIField>

                    <AIField field="estimationDommages">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="estimationDommages" className="text-sm font-medium">
                          Estimation des dommages (€)
                        </Label>
                        <Input
                          id="estimationDommages"
                          type="number"
                          value={formData.estimationDommages}
                          onChange={(e) => handleInputChange("estimationDommages", e.target.value)}
                          className="mt-1"
                          placeholder="Montant estimé"
                        />
                      </div>
                    </AIField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AIField field="temoinNom">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="temoinNom" className="text-sm font-medium">
                          Nom du témoin
                        </Label>
                        <Input
                          id="temoinNom"
                          value={formData.temoinNom}
                          onChange={(e) => handleInputChange("temoinNom", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </AIField>

                    <AIField field="temoinTelephone">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="temoinTelephone" className="text-sm font-medium">
                          Téléphone du témoin
                        </Label>
                        <Input
                          id="temoinTelephone"
                          value={formData.temoinTelephone}
                          onChange={(e) => handleInputChange("temoinTelephone", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </AIField>

                    <AIField field="temoinAdresse">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="temoinAdresse" className="text-sm font-medium">
                          Adresse du témoin
                        </Label>
                        <Input
                          id="temoinAdresse"
                          value={formData.temoinAdresse}
                          onChange={(e) => handleInputChange("temoinAdresse", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </AIField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AIField field="interventionSecours">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="interventionSecours" className="text-sm font-medium">
                          Intervention des secours
                        </Label>
                        <Select value={formData.interventionSecours} onValueChange={(value) => handleInputChange("interventionSecours", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oui">Oui</SelectItem>
                            <SelectItem value="non">Non</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AIField>

                    <AIField field="organismeSecours">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="organismeSecours" className="text-sm font-medium">
                          Organisme de secours
                        </Label>
                        <Input
                          id="organismeSecours"
                          value={formData.organismeSecours}
                          onChange={(e) => handleInputChange("organismeSecours", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </AIField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AIField field="photosJointes">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="photosJointes" className="text-sm font-medium">
                          Photos jointes
                        </Label>
                        <Select value={formData.photosJointes} onValueChange={(value) => handleInputChange("photosJointes", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oui">Oui</SelectItem>
                            <SelectItem value="non">Non</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AIField>

                    <AIField field="documentsJoints">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label htmlFor="documentsJoints" className="text-sm font-medium">
                          Documents joints
                        </Label>
                        <Textarea
                          id="documentsJoints"
                          value={formData.documentsJoints}
                          onChange={(e) => handleInputChange("documentsJoints", e.target.value)}
                          className="mt-1"
                          placeholder="Liste des documents joints..."
                        />
                      </div>
                    </AIField>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t">
                    <Button type="button" variant="outline" onClick={() => navigate("/")}>
                      Annuler
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Soumettre la déclaration
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SinistreDeclaration;
