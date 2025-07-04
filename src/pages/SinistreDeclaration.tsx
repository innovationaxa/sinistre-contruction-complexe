import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Upload, FileText, AlertTriangle, Building, User, Calendar, MapPin, Euro, Phone, Mail } from "lucide-react";

interface FormData {
  // Informations générales
  numeroContrat: string;
  dateDeclaration: string;
  natureSinistre: string;
  
  // Informations sur l'assuré
  raisonSociale: string;
  siret: string;
  adresseAssure: string;
  telephoneAssure: string;
  emailAssure: string;
  
  // Informations sur le sinistre
  dateSinistre: string;
  lieuSinistre: string;
  descriptionSinistre: string;
  circonstances: string;
  
  // Informations sur les dommages
  natureDommages: string;
  montantEstime: string;
  
  // Informations sur les tiers
  tiersImpliques: boolean;
  nomTiers: string;
  adresseTiers: string;
  
  // Documents
  documentsJoints: string[];
}

export default function SinistreDeclaration() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    numeroContrat: "",
    dateDeclaration: new Date().toISOString().split('T')[0],
    natureSinistre: "",
    raisonSociale: "",
    siret: "",
    adresseAssure: "",
    telephoneAssure: "",
    emailAssure: "",
    dateSinistre: "",
    lieuSinistre: "",
    descriptionSinistre: "",
    circonstances: "",
    natureDommages: "",
    montantEstime: "",
    tiersImpliques: false,
    nomTiers: "",
    adresseTiers: "",
    documentsJoints: []
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    navigate("/");
  };

  const steps = [
    "Informations générales",
    "Détails du sinistre", 
    "Dommages et tiers",
    "Documents et validation"
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <Header />
        <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
          <SidebarTrigger className="border-2 border-blue-600 hover:bg-blue-50 text-blue-700" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Formulaire de déclaration de sinistre AXA</h1>
        </div>
        
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Progress indicator */}
              <Card className="border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                          index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {step}
                        </span>
                        {index < steps.length - 1 && (
                          <div className={`w-12 h-0.5 mx-4 ${
                            index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Tabs value={currentStep.toString()} className="space-y-6">
                <TabsContent value="0" className="space-y-6">
                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <FileText className="w-5 h-5" />
                        Informations générales
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="numeroContrat" className="font-semibold">Numéro de contrat *</Label>
                          <Input
                            id="numeroContrat"
                            value={formData.numeroContrat}
                            onChange={(e) => handleInputChange('numeroContrat', e.target.value)}
                            placeholder="Ex: DECA-2021-4567"
                            className="border-2 border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateDeclaration" className="font-semibold">Date de déclaration *</Label>
                          <Input
                            id="dateDeclaration"
                            type="date"
                            value={formData.dateDeclaration}
                            onChange={(e) => handleInputChange('dateDeclaration', e.target.value)}
                            className="border-2 border-gray-300"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="natureSinistre" className="font-semibold">Nature du sinistre *</Label>
                        <Select onValueChange={(value) => handleInputChange('natureSinistre', value)}>
                          <SelectTrigger className="border-2 border-gray-300">
                            <SelectValue placeholder="Sélectionnez la nature du sinistre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rc-decennale">RC Décennale</SelectItem>
                            <SelectItem value="rc-professionnelle">RC Professionnelle</SelectItem>
                            <SelectItem value="dommages-ouvrage">Dommages Ouvrage</SelectItem>
                            <SelectItem value="tous-risques-chantier">Tous Risques Chantier</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <Building className="w-5 h-5" />
                        Informations sur l'assuré
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="raisonSociale" className="font-semibold">Raison sociale *</Label>
                        <Input
                          id="raisonSociale"
                          value={formData.raisonSociale}
                          onChange={(e) => handleInputChange('raisonSociale', e.target.value)}
                          placeholder="Ex: SARL Bâti Construct"
                          className="border-2 border-gray-300"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="siret" className="font-semibold">SIRET *</Label>
                          <Input
                            id="siret"
                            value={formData.siret}
                            onChange={(e) => handleInputChange('siret', e.target.value)}
                            placeholder="Ex: 123 456 789 00012"
                            className="border-2 border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telephoneAssure" className="font-semibold">Téléphone *</Label>
                          <Input
                            id="telephoneAssure"
                            value={formData.telephoneAssure}
                            onChange={(e) => handleInputChange('telephoneAssure', e.target.value)}
                            placeholder="Ex: 04 78 12 34 56"
                            className="border-2 border-gray-300"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="adresseAssure" className="font-semibold">Adresse *</Label>
                          <Textarea
                            id="adresseAssure"
                            value={formData.adresseAssure}
                            onChange={(e) => handleInputChange('adresseAssure', e.target.value)}
                            placeholder="Adresse complète"
                            className="border-2 border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emailAssure" className="font-semibold">Email *</Label>
                          <Input
                            id="emailAssure"
                            type="email"
                            value={formData.emailAssure}
                            onChange={(e) => handleInputChange('emailAssure', e.target.value)}
                            placeholder="contact@entreprise.fr"
                            className="border-2 border-gray-300"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="1" className="space-y-6">
                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <AlertTriangle className="w-5 h-5" />
                        Détails du sinistre
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dateSinistre" className="font-semibold">Date du sinistre *</Label>
                          <Input
                            id="dateSinistre"
                            type="date"
                            value={formData.dateSinistre}
                            onChange={(e) => handleInputChange('dateSinistre', e.target.value)}
                            className="border-2 border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lieuSinistre" className="font-semibold">Lieu du sinistre *</Label>
                          <Input
                            id="lieuSinistre"
                            value={formData.lieuSinistre}
                            onChange={(e) => handleInputChange('lieuSinistre', e.target.value)}
                            placeholder="Adresse où s'est produit le sinistre"
                            className="border-2 border-gray-300"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="descriptionSinistre" className="font-semibold">Description du sinistre *</Label>
                        <Textarea
                          id="descriptionSinistre"
                          value={formData.descriptionSinistre}
                          onChange={(e) => handleInputChange('descriptionSinistre', e.target.value)}
                          placeholder="Décrivez précisément ce qui s'est passé"
                          rows={4}
                          className="border-2 border-gray-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="circonstances" className="font-semibold">Circonstances détaillées *</Label>
                        <Textarea
                          id="circonstances"
                          value={formData.circonstances}
                          onChange={(e) => handleInputChange('circonstances', e.target.value)}
                          placeholder="Expliquez les circonstances qui ont mené au sinistre"
                          rows={4}
                          className="border-2 border-gray-300"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="2" className="space-y-6">
                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <Euro className="w-5 h-5" />
                        Dommages et préjudices
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="natureDommages" className="font-semibold">Nature des dommages *</Label>
                        <Textarea
                          id="natureDommages"
                          value={formData.natureDommages}
                          onChange={(e) => handleInputChange('natureDommages', e.target.value)}
                          placeholder="Décrivez précisément les dommages constatés"
                          rows={3}
                          className="border-2 border-gray-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="montantEstime" className="font-semibold">Montant estimé des dommages</Label>
                        <Input
                          id="montantEstime"
                          value={formData.montantEstime}
                          onChange={(e) => handleInputChange('montantEstime', e.target.value)}
                          placeholder="Ex: 50 000 €"
                          className="border-2 border-gray-300"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <User className="w-5 h-5" />
                        Tiers impliqués
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tiersImpliques"
                          checked={formData.tiersImpliques}
                          onCheckedChange={(checked) => handleInputChange('tiersImpliques', checked as boolean)}
                        />
                        <Label htmlFor="tiersImpliques" className="font-semibold">
                          Des tiers sont-ils impliqués dans ce sinistre ?
                        </Label>
                      </div>
                      
                      {formData.tiersImpliques && (
                        <div className="space-y-4 pl-6 border-l-2 border-blue-200">
                          <div className="space-y-2">
                            <Label htmlFor="nomTiers" className="font-semibold">Nom/Raison sociale du tiers</Label>
                            <Input
                              id="nomTiers"
                              value={formData.nomTiers}
                              onChange={(e) => handleInputChange('nomTiers', e.target.value)}
                              placeholder="Nom du tiers impliqué"
                              className="border-2 border-gray-300"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="adresseTiers" className="font-semibold">Adresse du tiers</Label>
                            <Textarea
                              id="adresseTiers"
                              value={formData.adresseTiers}
                              onChange={(e) => handleInputChange('adresseTiers', e.target.value)}
                              placeholder="Adresse complète du tiers"
                              className="border-2 border-gray-300"
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="3" className="space-y-6">
                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <Upload className="w-5 h-5" />
                        Documents justificatifs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Glissez-déposez vos fichiers ici ou</p>
                        <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                          Parcourir les fichiers
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">
                          Formats acceptés: PDF, JPG, PNG, DOC, DOCX (max 10 Mo par fichier)
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Documents recommandés :</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Photos des dommages</li>
                          <li>• Devis de réparation</li>
                          <li>• Courrier de mise en cause</li>
                          <li>• Attestation d'assurance</li>
                          <li>• Procès-verbal de réception des travaux</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <FileText className="w-5 h-5" />
                        Validation et envoi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Récapitulatif de votre déclaration</h4>
                        <div className="text-sm space-y-1">
                          <p><span className="font-medium">Contrat:</span> {formData.numeroContrat || "Non renseigné"}</p>
                          <p><span className="font-medium">Nature:</span> {formData.natureSinistre || "Non renseignée"}</p>
                          <p><span className="font-medium">Assuré:</span> {formData.raisonSociale || "Non renseigné"}</p>
                          <p><span className="font-medium">Date du sinistre:</span> {formData.dateSinistre || "Non renseignée"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="certify" />
                        <Label htmlFor="certify" className="text-sm">
                          Je certifie sur l'honneur l'exactitude des informations fournies et m'engage à communiquer tout élément complémentaire qui me serait demandé.
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="border-2 border-gray-300"
                >
                  Précédent
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-2 border-gray-300"
                  >
                    Sauvegarder le brouillon
                  </Button>
                  
                  {currentStep < steps.length - 1 ? (
                    <Button
                      onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Suivant
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer la déclaration"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
