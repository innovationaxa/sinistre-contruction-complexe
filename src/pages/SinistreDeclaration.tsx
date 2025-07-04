
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

interface Desordre {
  id: string;
  libelle: string;
  nature: string;
  localisation: string;
}

interface PartieEnCause {
  id: string;
  nom: string;
  roles: string;
  adresse: string;
  ville: string;
  codePostal: string;
}

export default function SinistreDeclaration() {
  const navigate = useNavigate();
  
  // States pour tous les champs
  const [formData, setFormData] = useState({
    // Header
    numeroSinistre: "000020041327073",
    numeroContrat: "000000587648204",
    type: "Construction DO - Dommages Ouvrage",
    
    // Section 1 - Contacts
    modeDeclaration: "Courrier",
    declarant: "",
    declarationSensible: "Non",
    contactPlus: "Non",
    
    // Bénéficiaire principal
    beneficiaireType: "Même personne",
    beneficiaireNom: "",
    beneficiaireAdresse: "",
    beneficiaireEmail: "",
    beneficiaireTelephone: "",
    
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
    
    // Section 2 - Contexte
    codeChantier: "TEST",
    doc: "2013-04-01",
    montantChantier: "0",
    typeOuvrage: "",
    dateReceptionOuvrage: "",
    description: "",
    adresseSinistre: "11, RUE girardot, 93100 MONTREUIL",
    dateSinistre: "2025-06-30",
    dateOuverture: "2025-07-01",
    evenement: "Construction DO",
    
    // Informations complémentaires
    dateDeclaration: "",
    jourJ: "",
    enjeuFinancier: "",
    
    // Dommages corporels
    presenceVictimes: "Oui",
    nombreVictimes: "",
    
    // Garanties
    garantieObligatoire: true,
    
    // Section 3 - Sinistres connectés
    sinistresConnectes: "Non",
    
    // Section 4 - Filière
    potentiellementGrave: "Non",
    filiereRetenue: "Sinistre avec expertise",
    
    // Section 5 - Affectation
    modeGestion: "Collectif",
    groupeAffectation: "Corpo APA XPC 154233",
    ugOuverture: "XPC - Auto Corpo DC AXA Partenaires",
    ugCourante: "XPC - Auto Corpo DC AXA Partenaires",
    delegationGestionDO: "",
    commentaires: ""
  });

  const [desordres, setDesordres] = useState<Desordre[]>([]);
  const [partiesEnCause, setPartiesEnCause] = useState<PartieEnCause[]>([
    {
      id: "1",
      nom: "ASS COURT CONSEILS SERVIC",
      roles: "Intermédiaire",
      adresse: "5 RUE AZERTYAZER",
      ville: "PARIS",
      codePostal: "75009"
    },
    {
      id: "2", 
      nom: "LOU APOLLINARY MARIAN TEDDIE",
      roles: "Assuré, Déclarant, Partie lésée, Souscripteur",
      adresse: "RUE DE LA MARCHE",
      ville: "ARGENTON SUR CREUSE",
      codePostal: "36200"
    }
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const ajouterDesordre = () => {
    const nouveauDesordre: Desordre = {
      id: Date.now().toString(),
      libelle: "",
      nature: "",
      localisation: ""
    };
    setDesordres([...desordres, nouveauDesordre]);
  };

  const supprimerDesordre = (id: string) => {
    setDesordres(desordres.filter(d => d.id !== id));
  };

  const modifierDesordre = (id: string, field: keyof Desordre, value: string) => {
    setDesordres(desordres.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const ajouterPartie = () => {
    const nouvellePartie: PartieEnCause = {
      id: Date.now().toString(),
      nom: "",
      roles: "",
      adresse: "",
      ville: "",
      codePostal: ""
    };
    setPartiesEnCause([...partiesEnCause, nouvellePartie]);
  };

  const supprimerPartie = (id: string) => {
    setPartiesEnCause(partiesEnCause.filter(p => p.id !== id));
  };

  const modifierPartie = (id: string, field: keyof PartieEnCause, value: string) => {
    setPartiesEnCause(partiesEnCause.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* En-tête avec navigation */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                  </Button>
                  <h1 className="text-2xl font-bold text-gray-900">Formulaire de déclaration de sinistre AXA</h1>
                </div>
              </div>

              {/* Header du sinistre */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations du sinistre</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>N° sinistre</Label>
                    <Input 
                      value={formData.numeroSinistre}
                      onChange={(e) => handleInputChange('numeroSinistre', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>N° contrat</Label>
                    <Input 
                      value={formData.numeroContrat}
                      onChange={(e) => handleInputChange('numeroContrat', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Input 
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section 1: Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 1 : Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Déclaration */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Déclaration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label>Mode de déclaration</Label>
                        <Select value={formData.modeDeclaration} onValueChange={(value) => handleInputChange('modeDeclaration', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Courrier">Courrier</SelectItem>
                            <SelectItem value="Email">Email</SelectItem>
                            <SelectItem value="Téléphone">Téléphone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Déclarant</Label>
                        <Select value={formData.declarant} onValueChange={(value) => handleInputChange('declarant', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Déclaration sensible</Label>
                        <RadioGroup value={formData.declarationSensible} onValueChange={(value) => handleInputChange('declarationSensible', value)}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Oui" id="sens-oui" />
                            <Label htmlFor="sens-oui">Oui</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Non" id="sens-non" />
                            <Label htmlFor="sens-non">Non</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>Contact Plus</Label>
                        <RadioGroup value={formData.contactPlus} onValueChange={(value) => handleInputChange('contactPlus', value)}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Oui" id="contact-oui" />
                            <Label htmlFor="contact-oui">Oui</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Non" id="contact-non" />
                            <Label htmlFor="contact-non">Non</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  {/* Bénéficiaire principal */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Bénéficiaire principal</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Type</Label>
                        <RadioGroup value={formData.beneficiaireType} onValueChange={(value) => handleInputChange('beneficiaireType', value)}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Même personne" id="meme-personne" />
                            <Label htmlFor="meme-personne">Même personne</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Personne différente" id="personne-diff" />
                            <Label htmlFor="personne-diff">Personne différente</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <Label>Nom</Label>
                          <Input 
                            value={formData.beneficiaireNom}
                            onChange={(e) => handleInputChange('beneficiaireNom', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Adresse</Label>
                          <Input 
                            value={formData.beneficiaireAdresse}
                            onChange={(e) => handleInputChange('beneficiaireAdresse', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input 
                            type="email"
                            value={formData.beneficiaireEmail}
                            onChange={(e) => handleInputChange('beneficiaireEmail', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Téléphone</Label>
                          <Input 
                            type="tel"
                            value={formData.beneficiaireTelephone}
                            onChange={(e) => handleInputChange('beneficiaireTelephone', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Intermédiaire */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Intermédiaire</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <Label>Type</Label>
                        <Input 
                          value={formData.intermediaireType}
                          onChange={(e) => handleInputChange('intermediaireType', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Code population</Label>
                        <Input 
                          value={formData.intermediaireCodePopulation}
                          onChange={(e) => handleInputChange('intermediaireCodePopulation', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Nom</Label>
                        <Input 
                          value={formData.intermediaireNom}
                          onChange={(e) => handleInputChange('intermediaireNom', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Adresse</Label>
                        <Input 
                          value={formData.intermediaireAdresse}
                          onChange={(e) => handleInputChange('intermediaireAdresse', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Téléphone</Label>
                        <Input 
                          type="tel"
                          value={formData.intermediaireTelephone}
                          onChange={(e) => handleInputChange('intermediaireTelephone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Assuré */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Assuré</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label>Nom</Label>
                        <Input 
                          value={formData.assureNom}
                          onChange={(e) => handleInputChange('assureNom', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Adresse</Label>
                        <Input 
                          value={formData.assureAdresse}
                          onChange={(e) => handleInputChange('assureAdresse', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input 
                          type="email"
                          value={formData.assureEmail}
                          onChange={(e) => handleInputChange('assureEmail', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Téléphone</Label>
                        <Input 
                          type="tel"
                          value={formData.assureTelephone}
                          onChange={(e) => handleInputChange('assureTelephone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Contexte du sinistre */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 2 : Contexte du sinistre</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Détails */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Détails</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label>Code chantier</Label>
                        <Input 
                          value={formData.codeChantier}
                          onChange={(e) => handleInputChange('codeChantier', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>DOC</Label>
                        <Input 
                          type="date"
                          value={formData.doc}
                          onChange={(e) => handleInputChange('doc', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Montant du chantier</Label>
                        <Input 
                          type="number"
                          value={formData.montantChantier}
                          onChange={(e) => handleInputChange('montantChantier', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Type d'ouvrage</Label>
                        <Select value={formData.typeOuvrage} onValueChange={(value) => handleInputChange('typeOuvrage', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="type1">Type 1</SelectItem>
                            <SelectItem value="type2">Type 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Date réception ouvrage</Label>
                        <Input 
                          type="date"
                          value={formData.dateReceptionOuvrage}
                          onChange={(e) => handleInputChange('dateReceptionOuvrage', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label>Adresse sinistre</Label>
                        <Input 
                          value={formData.adresseSinistre}
                          onChange={(e) => handleInputChange('adresseSinistre', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Date du sinistre</Label>
                        <Input 
                          type="date"
                          value={formData.dateSinistre}
                          onChange={(e) => handleInputChange('dateSinistre', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Date d'ouverture</Label>
                        <Input 
                          type="date"
                          value={formData.dateOuverture}
                          onChange={(e) => handleInputChange('dateOuverture', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Événement</Label>
                        <Input 
                          value={formData.evenement}
                          onChange={(e) => handleInputChange('evenement', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea 
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Informations complémentaires */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Informations complémentaires</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Date de déclaration</Label>
                        <Input 
                          type="date"
                          value={formData.dateDeclaration}
                          onChange={(e) => handleInputChange('dateDeclaration', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Jour J</Label>
                        <Input 
                          type="date"
                          value={formData.jourJ}
                          onChange={(e) => handleInputChange('jourJ', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Enjeu Financier</Label>
                        <Select value={formData.enjeuFinancier} onValueChange={(value) => handleInputChange('enjeuFinancier', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="faible">Faible</SelectItem>
                            <SelectItem value="moyen">Moyen</SelectItem>
                            <SelectItem value="eleve">Élevé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Dommages corporels */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dommages corporels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Présence de victimes</Label>
                        <RadioGroup value={formData.presenceVictimes} onValueChange={(value) => handleInputChange('presenceVictimes', value)}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Oui" id="victimes-oui" />
                            <Label htmlFor="victimes-oui">Oui</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Non" id="victimes-non" />
                            <Label htmlFor="victimes-non">Non</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>Nombre de victimes</Label>
                        <Input 
                          type="number"
                          value={formData.nombreVictimes}
                          onChange={(e) => handleInputChange('nombreVictimes', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Désordres */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Désordres</h3>
                    <div className="space-y-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Libellé</TableHead>
                            <TableHead>Nature</TableHead>
                            <TableHead>Localisation</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {desordres.map((desordre) => (
                            <TableRow key={desordre.id}>
                              <TableCell>
                                <Input 
                                  value={desordre.libelle}
                                  onChange={(e) => modifierDesordre(desordre.id, 'libelle', e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  value={desordre.nature}
                                  onChange={(e) => modifierDesordre(desordre.id, 'nature', e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  value={desordre.localisation}
                                  onChange={(e) => modifierDesordre(desordre.id, 'localisation', e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => supprimerDesordre(desordre.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button onClick={ajouterDesordre} variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter ligne
                      </Button>
                    </div>
                  </div>

                  {/* Garanties */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Garanties</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="garantie-obligatoire"
                        checked={formData.garantieObligatoire}
                        onCheckedChange={(checked) => handleInputChange('garantieObligatoire', checked as boolean)}
                      />
                      <Label htmlFor="garantie-obligatoire">Garantie obligatoire</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Parties en cause */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 3 : Parties en cause</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Rôles</TableHead>
                        <TableHead>Adresse</TableHead>
                        <TableHead>Ville</TableHead>
                        <TableHead>Code postal</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {partiesEnCause.map((partie) => (
                        <TableRow key={partie.id}>
                          <TableCell>
                            <Input 
                              value={partie.nom}
                              onChange={(e) => modifierPartie(partie.id, 'nom', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              value={partie.roles}
                              onChange={(e) => modifierPartie(partie.id, 'roles', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              value={partie.adresse}
                              onChange={(e) => modifierPartie(partie.id, 'adresse', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              value={partie.ville}
                              onChange={(e) => modifierPartie(partie.id, 'ville', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              value={partie.codePostal}
                              onChange={(e) => modifierPartie(partie.id, 'codePostal', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => supprimerPartie(partie.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button onClick={ajouterPartie} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter contact
                  </Button>
                  
                  <div className="mt-6">
                    <Label>Sinistres connectés</Label>
                    <RadioGroup value={formData.sinistresConnectes} onValueChange={(value) => handleInputChange('sinistresConnectes', value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Oui" id="connectes-oui" />
                        <Label htmlFor="connectes-oui">Oui</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Non" id="connectes-non" />
                        <Label htmlFor="connectes-non">Non</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Section 4: Filière de traitement */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 4 : Filière de traitement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Potentiellement grave</Label>
                    <RadioGroup value={formData.potentiellementGrave} onValueChange={(value) => handleInputChange('potentiellementGrave', value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Oui" id="grave-oui" />
                        <Label htmlFor="grave-oui">Oui</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Non" id="grave-non" />
                        <Label htmlFor="grave-non">Non</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Filière retenue</Label>
                    <RadioGroup value={formData.filiereRetenue} onValueChange={(value) => handleInputChange('filiereRetenue', value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Arrêté" id="arrete" />
                        <Label htmlFor="arrete">Arrêté</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sinistre avec Téléexpertise" id="teleexpertise" />
                        <Label htmlFor="teleexpertise">Sinistre avec Téléexpertise</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sinistre avec expertise" id="expertise" />
                        <Label htmlFor="expertise">Sinistre avec expertise</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sinistre Avenant1" id="avenant1" />
                        <Label htmlFor="avenant1">Sinistre Avenant1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Contentieux : hors Grave" id="contentieux-hors" />
                        <Label htmlFor="contentieux-hors">Contentieux : hors Grave</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Contentieux : Grave" id="contentieux-grave" />
                        <Label htmlFor="contentieux-grave">Contentieux : Grave</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Gestion RCD CRAC" id="rcd-crac" />
                        <Label htmlFor="rcd-crac">Gestion RCD CRAC</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="RC/RCD : Avec expertise" id="rc-avec" />
                        <Label htmlFor="rc-avec">RC/RCD : Avec expertise</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="RC/RCD : Sans expertise" id="rc-sans" />
                        <Label htmlFor="rc-sans">RC/RCD : Sans expertise</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Section 5: Affectation */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 5 : Affectation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Mode de gestion</Label>
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
                    <div>
                      <Label>Groupe d'affectation</Label>
                      <Select value={formData.groupeAffectation} onValueChange={(value) => handleInputChange('groupeAffectation', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Corpo APA XPC 154233">Corpo APA XPC 154233</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>UG d'ouverture</Label>
                      <Select value={formData.ugOuverture} onValueChange={(value) => handleInputChange('ugOuverture', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XPC - Auto Corpo DC AXA Partenaires">XPC - Auto Corpo DC AXA Partenaires</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>UG Courante</Label>
                      <Input 
                        value={formData.ugCourante}
                        onChange={(e) => handleInputChange('ugCourante', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Délégation de gestion en DO</Label>
                      <Select value={formData.delegationGestionDO} onValueChange={(value) => handleInputChange('delegationGestionDO', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Commentaires</Label>
                    <Textarea 
                      value={formData.commentaires}
                      onChange={(e) => handleInputChange('commentaires', e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-4 py-6 border-t">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Annuler
                </Button>
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  Sauvegarder
                </Button>
                <Button className="bg-green-600 text-white hover:bg-green-700">
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
