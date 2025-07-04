
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";

export default function SinistreDeclaration() {
  const navigate = useNavigate();
  
  // Tous les champs pré-remplis par l'IA
  const [formData, setFormData] = useState({
    // Header
    numeroSinistre: "000020041327073",
    numeroContrat: "000000587648204",
    typeSinistre: "Construction DO - Dommages Ouvrage",
    
    // Contacts - Déclaration
    modeDeclaration: "Email",
    declarant: "Assuré principal",
    declarationSensible: "Non",
    contactPlus: "Oui",
    
    // Bénéficiaire principal
    beneficiaireType: "Personne différente",
    beneficiaireNom: "Marie Dubois",
    beneficiaireAdresse: "45 Avenue des Champs, 75008 Paris",
    beneficiaireEmail: "marie.dubois@email.fr",
    beneficiaireTelephone: "01 42 56 78 90",
    
    // Intermédiaire
    intermediaireType: "CABINET",
    intermediaireCodePopulation: "COURTAGE",
    intermediaireNom: "ASS COURT CONSEILS SERVIC",
    intermediaireAdresse: "5 RUE AZERTYAZER, 75009 PARIS",
    intermediaireTelephone: "01 01 01 01 01",
    
    // Assuré
    assureNom: "LOU APOLLINARY MARIAN TEDDIE",
    assureAdresse: "RUE DE LA MARCHE, 36200 ARGENTON SUR CREUSE",
    assureEmail: "ohvzjirfzn.tyrklr@orange.fr",
    assureTelephone: "02 12 12 80 20",
    
    // Contexte
    codeChantier: "CHANT-2024-789",
    doc: "15/03/2024",
    montantChantier: "850000",
    typeOuvrage: "Logement",
    dateReceptionOuvrage: "28/02/2024",
    description: "Fissures importantes apparues sur la façade nord du bâtiment suite à un tassement différentiel des fondations. Les désordres affectent l'étanchéité et la stabilité structurelle.",
    adresseSinistre: "11, RUE girardot, 93100 MONTREUIL",
    dateSinistre: "30/06/2025",
    dateOuverture: "01/07/2025",
    evenement: "Construction DO",
    dateDeclaration: "02/07/2025",
    jourJ: "03/07/2025",
    enjeuFinancier: "Élevé",
    presenceVictimes: "Non",
    nombreVictimes: "0",
    garantieObligatoire: true,
    
    // Filière
    potentiellementGrave: "Oui",
    filiereRetenue: "Sinistre avec expertise",
    
    // Affectation
    modeGestion: "Collectif",
    groupeAffectation: "Corpo APA XPC 154233",
    ugOuverture: "XPC - Auto Corpo DC AXA Partenaires",
    ugCourante: "XPC - Auto Corpo DC AXA Partenaires",
    delegationGestionDO: "Délégation Paris Île-de-France",
    commentaires: "Sinistre complexe nécessitant une expertise approfondie. Coordination avec les services techniques municipaux requise."
  });

  const [desordres, setDesordres] = useState([
    { libelle: "Fissures structurelles", nature: "Défaut de conception", localisation: "Façade nord - Étages 2 à 4" },
    { libelle: "Infiltrations d'eau", nature: "Défaut d'étanchéité", localisation: "Toiture terrasse - Angle sud-est" }
  ]);

  const [partiesEnCause] = useState([
    {
      nom: "ASS COURT CONSEILS SERVIC",
      roles: "Intermédiaire",
      adresse: "5 RUE AZERTYAZER",
      ville: "PARIS",
      codePostal: "75009"
    },
    {
      nom: "LOU APOLLINARY MARIAN TEDDIE", 
      roles: "Assuré, Déclarant, Partie lésée, Souscripteur",
      adresse: "RUE DE LA MARCHE",
      ville: "ARGENTON SUR CREUSE",
      codePostal: "36200"
    },
    {
      nom: "ENTREPRISE BATIMENT PLUS",
      roles: "Constructeur, Responsable",
      adresse: "12 RUE DE L'INDUSTRIE",
      ville: "MONTREUIL",
      codePostal: "93100"
    }
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addDesordre = () => {
    setDesordres([...desordres, { libelle: "", nature: "", localisation: "" }]);
  };

  const handleSubmit = () => {
    navigate("/");
  };

  const AIIndicator = () => (
    <Sparkles className="w-3 h-3 text-purple-600 inline ml-1" title="Pré-rempli par IA" />
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <div className="relative z-50">
          <Header />
        </div>
        
        <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200 relative z-40">
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
        
        <div className="flex flex-1 relative z-30">
          <AppSidebar />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header Info */}
              <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle className="text-xl flex items-center gap-2">
                    Informations du sinistre
                    <AIIndicator />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-blue-800 flex items-center gap-1">
                      N° sinistre <AIIndicator />
                    </Label>
                    <Input 
                      value={formData.numeroSinistre}
                      onChange={(e) => handleInputChange('numeroSinistre', e.target.value)}
                      className="font-mono font-bold bg-purple-50 border-purple-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-blue-800 flex items-center gap-1">
                      N° contrat <AIIndicator />
                    </Label>
                    <Input 
                      value={formData.numeroContrat}
                      onChange={(e) => handleInputChange('numeroContrat', e.target.value)}
                      className="font-mono font-bold bg-purple-50 border-purple-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-blue-800 flex items-center gap-1">
                      Type <AIIndicator />
                    </Label>
                    <Input 
                      value={formData.typeSinistre}
                      onChange={(e) => handleInputChange('typeSinistre', e.target.value)}
                      className="font-bold bg-purple-50 border-purple-200"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Formulaire principal */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    Déclaration de sinistre
                    <AIIndicator />
                  </CardTitle>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Tous les champs ont été pré-remplis par l'IA - Vous pouvez les modifier
                  </p>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  {/* Déclaration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="font-semibold flex items-center gap-1">
                        Mode de déclaration <AIIndicator />
                      </Label>
                      <Select value={formData.modeDeclaration} onValueChange={(value) => handleInputChange('modeDeclaration', value)}>
                        <SelectTrigger className="bg-purple-50 border-purple-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Courrier">Courrier</SelectItem>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Téléphone">Téléphone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold flex items-center gap-1">
                        Déclarant <AIIndicator />
                      </Label>
                      <Input 
                        value={formData.declarant}
                        onChange={(e) => handleInputChange('declarant', e.target.value)}
                        className="bg-purple-50 border-purple-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold flex items-center gap-1">
                        Déclaration sensible <AIIndicator />
                      </Label>
                      <RadioGroup value={formData.declarationSensible} onValueChange={(value) => handleInputChange('declarationSensible', value)} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Oui" />
                          <Label>Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Non" />
                          <Label>Non</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold flex items-center gap-1">
                        Contact Plus <AIIndicator />
                      </Label>
                      <RadioGroup value={formData.contactPlus} onValueChange={(value) => handleInputChange('contactPlus', value)} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Oui" />
                          <Label>Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Non" />
                          <Label>Non</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Bénéficiaire principal */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-1">
                      Bénéficiaire principal <AIIndicator />
                    </h3>
                    <RadioGroup value={formData.beneficiaireType} onValueChange={(value) => handleInputChange('beneficiaireType', value)} className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Même personne" />
                        <Label>Même personne</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Personne différente" />
                        <Label>Personne différente</Label>
                      </div>
                    </RadioGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Nom <AIIndicator />
                        </Label>
                        <Input 
                          value={formData.beneficiaireNom} 
                          onChange={(e) => handleInputChange('beneficiaireNom', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Email <AIIndicator />
                        </Label>
                        <Input 
                          type="email" 
                          value={formData.beneficiaireEmail} 
                          onChange={(e) => handleInputChange('beneficiaireEmail', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Adresse <AIIndicator />
                        </Label>
                        <Input 
                          value={formData.beneficiaireAdresse} 
                          onChange={(e) => handleInputChange('beneficiaireAdresse', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Téléphone <AIIndicator />
                        </Label>
                        <Input 
                          type="tel" 
                          value={formData.beneficiaireTelephone} 
                          onChange={(e) => handleInputChange('beneficiaireTelephone', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Intermédiaire */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-1">
                      Intermédiaire <AIIndicator />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-semibold">Type</Label>
                        <Input value={formData.intermediaireType} onChange={(e) => handleInputChange('intermediaireType', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Code population</Label>
                        <Input value={formData.intermediaireCodePopulation} onChange={(e) => handleInputChange('intermediaireCodePopulation', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Nom</Label>
                        <Input value={formData.intermediaireNom} onChange={(e) => handleInputChange('intermediaireNom', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Téléphone</Label>
                        <Input type="tel" value={formData.intermediaireTelephone} onChange={(e) => handleInputChange('intermediaireTelephone', e.target.value)} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="font-semibold">Adresse</Label>
                        <Input value={formData.intermediaireAdresse} onChange={(e) => handleInputChange('intermediaireAdresse', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Assuré */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">Assuré</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-semibold">Nom</Label>
                        <Input value={formData.assureNom} onChange={(e) => handleInputChange('assureNom', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Email</Label>
                        <Input type="email" value={formData.assureEmail} onChange={(e) => handleInputChange('assureEmail', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Adresse</Label>
                        <Input value={formData.assureAdresse} onChange={(e) => handleInputChange('assureAdresse', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Téléphone</Label>
                        <Input type="tel" value={formData.assureTelephone} onChange={(e) => handleInputChange('assureTelephone', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Contexte du sinistre */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-1">
                      Contexte du sinistre <AIIndicator />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Code chantier <AIIndicator />
                        </Label>
                        <Input 
                          value={formData.codeChantier} 
                          onChange={(e) => handleInputChange('codeChantier', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          DOC <AIIndicator />
                        </Label>
                        <Input 
                          type="date" 
                          value={formData.doc} 
                          onChange={(e) => handleInputChange('doc', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Montant du chantier <AIIndicator />
                        </Label>
                        <Input 
                          type="number" 
                          value={formData.montantChantier} 
                          onChange={(e) => handleInputChange('montantChantier', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Type d'ouvrage <AIIndicator />
                        </Label>
                        <Select value={formData.typeOuvrage} onValueChange={(value) => handleInputChange('typeOuvrage', value)}>
                          <SelectTrigger className="bg-purple-50 border-purple-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Logement">Logement</SelectItem>
                            <SelectItem value="Commerce">Commerce</SelectItem>
                            <SelectItem value="Industrie">Industrie</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Date réception ouvrage <AIIndicator />
                        </Label>
                        <Input 
                          type="date" 
                          value={formData.dateReceptionOuvrage} 
                          onChange={(e) => handleInputChange('dateReceptionOuvrage', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Date du sinistre</Label>
                        <Input type="date" value={formData.dateSinistre} onChange={(e) => handleInputChange('dateSinistre', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Date d'ouverture</Label>
                        <Input type="date" value={formData.dateOuverture} onChange={(e) => handleInputChange('dateOuverture', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Événement</Label>
                        <Input value={formData.evenement} onChange={(e) => handleInputChange('evenement', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Date de déclaration <AIIndicator />
                        </Label>
                        <Input 
                          type="date" 
                          value={formData.dateDeclaration} 
                          onChange={(e) => handleInputChange('dateDeclaration', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Jour J <AIIndicator />
                        </Label>
                        <Input 
                          type="date" 
                          value={formData.jourJ} 
                          onChange={(e) => handleInputChange('jourJ', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Enjeu Financier <AIIndicator />
                        </Label>
                        <Select value={formData.enjeuFinancier} onValueChange={(value) => handleInputChange('enjeuFinancier', value)}>
                          <SelectTrigger className="bg-purple-50 border-purple-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Faible">Faible</SelectItem>
                            <SelectItem value="Moyen">Moyen</SelectItem>
                            <SelectItem value="Élevé">Élevé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold">Adresse sinistre</Label>
                      <Input value={formData.adresseSinistre} onChange={(e) => handleInputChange('adresseSinistre', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold flex items-center gap-1">
                        Description <AIIndicator />
                      </Label>
                      <Textarea 
                        value={formData.description} 
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        className="bg-purple-50 border-purple-200"
                      />
                    </div>
                  </div>

                  {/* Dommages corporels */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-1">
                      Dommages corporels <AIIndicator />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Présence de victimes <AIIndicator />
                        </Label>
                        <RadioGroup value={formData.presenceVictimes} onValueChange={(value) => handleInputChange('presenceVictimes', value)} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Oui" />
                            <Label>Oui</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Non" />
                            <Label>Non</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Nombre de victimes <AIIndicator />
                        </Label>
                        <Input 
                          type="number" 
                          value={formData.nombreVictimes} 
                          onChange={(e) => handleInputChange('nombreVictimes', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Désordres */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-1">
                        Désordres <AIIndicator />
                      </h3>
                      <Button onClick={addDesordre} variant="outline" size="sm" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Ajouter ligne
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 p-2 text-left">Libellé</th>
                            <th className="border border-gray-200 p-2 text-left">Nature</th>
                            <th className="border border-gray-200 p-2 text-left">Localisation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {desordres.map((desordre, index) => (
                            <tr key={index}>
                              <td className="border border-gray-200 p-2">
                                <Input 
                                  value={desordre.libelle}
                                  onChange={(e) => {
                                    const newDesordres = [...desordres];
                                    newDesordres[index].libelle = e.target.value;
                                    setDesordres(newDesordres);
                                  }}
                                  className={index < 2 ? "bg-purple-50 border-purple-200" : ""}
                                />
                              </td>
                              <td className="border border-gray-200 p-2">
                                <Input 
                                  value={desordre.nature}
                                  onChange={(e) => {
                                    const newDesordres = [...desordres];
                                    newDesordres[index].nature = e.target.value;
                                    setDesordres(newDesordres);
                                  }}
                                  className={index < 2 ? "bg-purple-50 border-purple-200" : ""}
                                />
                              </td>
                              <td className="border border-gray-200 p-2">
                                <Input 
                                  value={desordre.localisation}
                                  onChange={(e) => {
                                    const newDesordres = [...desordres];
                                    newDesordres[index].localisation = e.target.value;
                                    setDesordres(newDesordres);
                                  }}
                                  className={index < 2 ? "bg-purple-50 border-purple-200" : ""}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Garanties */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-1">
                      Garanties <AIIndicator />
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="garantieObligatoire"
                        checked={formData.garantieObligatoire}
                        onCheckedChange={(checked) => handleInputChange('garantieObligatoire', checked as boolean)}
                      />
                      <Label htmlFor="garantieObligatoire" className="font-semibold flex items-center gap-1">
                        Garantie obligatoire <AIIndicator />
                      </Label>
                    </div>
                  </div>

                  {/* Parties en cause */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-1">
                        Parties en cause <AIIndicator />
                      </h3>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Ajouter contact
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <div className="bg-purple-50 border border-purple-200 rounded p-2 mb-2 flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-700">Parties identifiées automatiquement par l'IA</span>
                      </div>
                      <table className="w-full border border-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 p-2 text-left">Nom</th>
                            <th className="border border-gray-200 p-2 text-left">Rôles</th>
                            <th className="border border-gray-200 p-2 text-left">Adresse</th>
                            <th className="border border-gray-200 p-2 text-left">Ville</th>
                            <th className="border border-gray-200 p-2 text-left">Code postal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {partiesEnCause.map((partie, index) => (
                            <tr key={index} className="bg-purple-50">
                              <td className="border border-gray-200 p-2 font-medium">{partie.nom}</td>
                              <td className="border border-gray-200 p-2 text-sm">{partie.roles}</td>
                              <td className="border border-gray-200 p-2">{partie.adresse}</td>
                              <td className="border border-gray-200 p-2">{partie.ville}</td>
                              <td className="border border-gray-200 p-2">{partie.codePostal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Filière de traitement */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-1">
                      Filière de traitement <AIIndicator />
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Potentiellement grave <AIIndicator />
                        </Label>
                        <RadioGroup value={formData.potentiellementGrave} onValueChange={(value) => handleInputChange('potentiellementGrave', value)} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Oui" />
                            <Label>Oui</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Non" />
                            <Label>Non</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Filière retenue <AIIndicator />
                        </Label>
                        <RadioGroup value={formData.filiereRetenue} onValueChange={(value) => handleInputChange('filiereRetenue', value)} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Arrêté" />
                            <Label>Arrêté</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Sinistre avec Téléexpertise" />
                            <Label>Sinistre avec Téléexpertise</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Sinistre avec expertise" />
                            <Label>Sinistre avec expertise</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Sinistre Avenant1" />
                            <Label>Sinistre Avenant1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Contentieux : hors Grave" />
                            <Label>Contentieux : hors Grave</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Contentieux : Grave" />
                            <Label>Contentieux : Grave</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Gestion RCD CRAC" />
                            <Label>Gestion RCD CRAC</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="RC/RCD : Avec expertise" />
                            <Label>RC/RCD : Avec expertise</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="RC/RCD : Sans expertise" />
                            <Label>RC/RCD : Sans expertise</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  {/* Affectation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">Affectation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-semibold">Mode de gestion</Label>
                        <Select value={formData.modeGestion} onValueChange={(value) => handleInputChange('modeGestion', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Collectif">Collectif</SelectItem>
                            <SelectItem value="Individuel">Individuel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">Groupe d'affectation</Label>
                        <Select value={formData.groupeAffectation} onValueChange={(value) => handleInputChange('groupeAffectation', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Corpo APA XPC 154233">Corpo APA XPC 154233</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">UG d'ouverture</Label>
                        <Select value={formData.ugOuverture} onValueChange={(value) => handleInputChange('ugOuverture', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="XPC - Auto Corpo DC AXA Partenaires">XPC - Auto Corpo DC AXA Partenaires</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">UG Courante</Label>
                        <Input value={formData.ugCourante} onChange={(e) => handleInputChange('ugCourante', e.target.value)} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="font-semibold flex items-center gap-1">
                          Délégation de gestion en DO <AIIndicator />
                        </Label>
                        <Input 
                          value={formData.delegationGestionDO} 
                          onChange={(e) => handleInputChange('delegationGestionDO', e.target.value)}
                          className="bg-purple-50 border-purple-200"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-semibold flex items-center gap-1">
                        Commentaires <AIIndicator />
                      </Label>
                      <Textarea 
                        value={formData.commentaires} 
                        onChange={(e) => handleInputChange('commentaires', e.target.value)}
                        rows={3}
                        className="bg-purple-50 border-purple-200"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Annuler
                </Button>
                <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                  Sauvegarder
                </Button>
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                  Valider définitivement
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
