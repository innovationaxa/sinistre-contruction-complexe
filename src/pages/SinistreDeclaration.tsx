import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const SinistreDeclaration = () => {
  const navigate = useNavigate();
  
  // Section 1: Contacts
  const [declaration, setDeclaration] = useState({
    modeDeclaration: "Courrier",
    declarant: "",
    declarationSensible: "Non",
    contactPlus: "Non"
  });

  const [beneficiaire, setBeneficiaire] = useState({
    type: "Même personne",
    nom: "",
    adresse: "",
    email: "",
    telephone: ""
  });

  const [intermediaire] = useState({
    type: "CABINET",
    codePopulation: "COURTAGE",
    nom: "ASS COURT CONSEILS SERVIC",
    adresse: "5 RUE AZERTYAZER, 75009 PARIS",
    telephone: "01 01 01 01 01"
  });

  const [assure] = useState({
    nom: "LOU APOLLINARY MARIAN TEDDIE",
    adresse: "RUE DE LA MARCHE, 36200 ARGENTON SUR CREUSE",
    email: "ohvzjirfzn.tyrklr@orange.fr",
    telephone: "02 12 12 80 20"
  });

  // Section 2: Contexte du sinistre
  const [contexte, setContexte] = useState({
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
    dateDeclaration: "",
    jourJ: "",
    enjeuFinancier: "",
    presenceVictimes: "Oui",
    nombreVictimes: "0",
    garantieObligatoire: true
  });

  const [desordres, setDesordres] = useState([
    { libelle: "", nature: "", localisation: "" }
  ]);

  // Section 3: Parties en cause
  const [parties] = useState([
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
    }
  ]);

  const [sinistresConnectes, setSinistresConnectes] = useState("Non");

  // Section 4: Filière de traitement
  const [potentiellementGrave, setPotentiellementGrave] = useState("Non");
  const [filiereRetenue, setFiliereRetenue] = useState("Sinistre avec expertise");

  // Section 5: Affectation
  const [affectation] = useState({
    modeGestion: "Collectif",
    groupeAffectation: "Corpo APA XPC 154233",
    ugOuverture: "XPC - Auto Corpo DC AXA Partenaires",
    ugCourante: "XPC - Auto Corpo DC AXA Partenaires",
    delegationGestionDO: "",
    commentaires: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Rediriger vers le dashboard des sinistres au lieu de la page synthesis
    navigate("/sinistres/dashboard");
  };

  const addDesordre = () => {
    setDesordres([...desordres, { libelle: "", nature: "", localisation: "" }]);
  };

  // Composant pour les champs pré-remplis par IA
  const AIField = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`relative ${className}`}>
      <div className="absolute -top-1 -right-1 z-10">
        <div className="bg-purple-100 rounded-full p-1">
          <Star className="w-3 h-3 text-purple-600 fill-purple-600" />
        </div>
      </div>
      <div className="border-l-2 border-purple-400 pl-2 bg-purple-50/30 rounded-r">
        {children}
      </div>
    </div>
  );

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
          Retour à la liste
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">Déclaration de sinistre</h2>
      </div>
      <main className="flex-1 p-4">
        <Card className="max-w-6xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-200 pb-4">
            <CardTitle className="text-xl text-purple-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Déclaration de sinistre - Pré-rempli par IA
              <div className="flex items-center gap-1 text-sm font-normal text-purple-700 ml-2">
                <Star className="w-4 h-4 fill-purple-600 text-purple-600" />
                <span>Champs pré-remplis par IA</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Contacts */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">1. Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Déclaration */}
                  <div>
                    <h4 className="font-medium mb-2">Déclaration</h4>
                    <div className="grid grid-cols-4 gap-3 text-sm">
                      <AIField>
                        <div>
                          <Label>Mode de déclaration</Label>
                          <Select value={declaration.modeDeclaration} onValueChange={(value) => setDeclaration({...declaration, modeDeclaration: value})}>
                            <SelectTrigger className="h-8 bg-purple-50/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Courrier">Courrier</SelectItem>
                              <SelectItem value="Email">Email</SelectItem>
                              <SelectItem value="Téléphone">Téléphone</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </AIField>
                      <div>
                        <Label>Déclarant</Label>
                        <Select value={declaration.declarant} onValueChange={(value) => setDeclaration({...declaration, declarant: value})}>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="assure">Assuré</SelectItem>
                            <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <AIField>
                        <div>
                          <Label>Déclaration sensible</Label>
                          <RadioGroup value={declaration.declarationSensible} onValueChange={(value) => setDeclaration({...declaration, declarationSensible: value})} className="flex gap-4">
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="Oui" id="sens-oui" className="h-3 w-3" />
                              <Label htmlFor="sens-oui" className="text-xs">Oui</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="Non" id="sens-non" className="h-3 w-3" />
                              <Label htmlFor="sens-non" className="text-xs">Non</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Contact Plus</Label>
                          <RadioGroup value={declaration.contactPlus} onValueChange={(value) => setDeclaration({...declaration, contactPlus: value})} className="flex gap-4">
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="Oui" id="cp-oui" className="h-3 w-3" />
                              <Label htmlFor="cp-oui" className="text-xs">Oui</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="Non" id="cp-non" className="h-3 w-3" />
                              <Label htmlFor="cp-non" className="text-xs">Non</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </AIField>
                    </div>
                  </div>

                  {/* Bénéficiaire principal */}
                  <div>
                    <h4 className="font-medium mb-2">Bénéficiaire principal</h4>
                    <div className="grid grid-cols-5 gap-3 text-sm">
                      <AIField>
                        <div>
                          <Label>Type</Label>
                          <RadioGroup value={beneficiaire.type} onValueChange={(value) => setBeneficiaire({...beneficiaire, type: value})}>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="Même personne" id="meme" className="h-3 w-3" />
                              <Label htmlFor="meme" className="text-xs">Même personne</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="Personne différente" id="diff" className="h-3 w-3" />
                              <Label htmlFor="diff" className="text-xs">Personne différente</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </AIField>
                      <div>
                        <Label>Nom</Label>
                        <Input className="h-8 text-xs" value={beneficiaire.nom} onChange={(e) => setBeneficiaire({...beneficiaire, nom: e.target.value})} />
                      </div>
                      <div>
                        <Label>Adresse</Label>
                        <Input className="h-8 text-xs" value={beneficiaire.adresse} onChange={(e) => setBeneficiaire({...beneficiaire, adresse: e.target.value})} />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input type="email" className="h-8 text-xs" value={beneficiaire.email} onChange={(e) => setBeneficiaire({...beneficiaire, email: e.target.value})} />
                      </div>
                      <div>
                        <Label>Téléphone</Label>
                        <Input type="tel" className="h-8 text-xs" value={beneficiaire.telephone} onChange={(e) => setBeneficiaire({...beneficiaire, telephone: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  {/* Intermédiaire */}
                  <div>
                    <h4 className="font-medium mb-2">Intermédiaire</h4>
                    <div className="grid grid-cols-5 gap-3 text-sm">
                      <AIField>
                        <div>
                          <Label>Type</Label>
                          <Input className="h-8 text-xs bg-purple-50/50" value={intermediaire.type} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Code population</Label>
                          <Input className="h-8 text-xs bg-purple-50/50" value={intermediaire.codePopulation} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Nom</Label>
                          <Input className="h-8 text-xs bg-purple-50/50" value={intermediaire.nom} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Adresse</Label>
                          <Input className="h-8 text-xs bg-purple-50/50" value={intermediaire.adresse} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Téléphone</Label>
                          <Input type="tel" className="h-8 text-xs bg-purple-50/50" value={intermediaire.telephone} readOnly />
                        </div>
                      </AIField>
                    </div>
                  </div>

                  {/* Assuré */}
                  <div>
                    <h4 className="font-medium mb-2">Assuré</h4>
                    <div className="grid grid-cols-4 gap-3 text-sm">
                      <AIField>
                        <div>
                          <Label>Nom</Label>
                          <Input className="h-8 text-xs bg-purple-50/50" value={assure.nom} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Adresse</Label>
                          <Input className="h-8 text-xs bg-purple-50/50" value={assure.adresse} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" className="h-8 text-xs bg-purple-50/50" value={assure.email} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Téléphone</Label>
                          <Input type="tel" className="h-8 text-xs bg-purple-50/50" value={assure.telephone} readOnly />
                        </div>
                      </AIField>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Contexte du sinistre */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">2. Contexte du sinistre</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Détails */}
                  <div>
                    <h4 className="font-medium mb-2">Détails</h4>
                    <div className="grid grid-cols-4 gap-3 text-sm mb-3">
                      <AIField>
                        <div>
                          <Label>Code chantier</Label>
                          <Input className="h-8 text-xs bg-purple-50/50" value={contexte.codeChantier} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>DOC</Label>
                          <Input type="date" className="h-8 text-xs bg-purple-50/50" value={contexte.doc} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Montant du chantier</Label>
                          <Input type="number" className="h-8 text-xs bg-purple-50/50" value={contexte.montantChantier} readOnly />
                        </div>
                      </AIField>
                      <div>
                        <Label>Type d'ouvrage</Label>
                        <Select value={contexte.typeOuvrage} onValueChange={(value) => setContexte({...contexte, typeOuvrage: value})}>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="batiment">Bâtiment</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <Label>Date réception ouvrage</Label>
                        <Input type="date" className="h-8 text-xs" value={contexte.dateReceptionOuvrage} onChange={(e) => setContexte({...contexte, dateReceptionOuvrage: e.target.value})} />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea className="h-8 text-xs resize-none" value={contexte.description} onChange={(e) => setContexte({...contexte, description: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-sm">
                      <AIField>
                        <div>
                          <Label>Adresse sinistre</Label>
                          <Input className="h-8 text-xs bg-purple-50/50" value={contexte.adresseSinistre} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Date du sinistre</Label>
                          <Input type="date" className="h-8 text-xs bg-purple-50/50" value={contexte.dateSinistre} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Date d'ouverture</Label>
                          <Input type="date" className="h-8 text-xs bg-purple-50/50" value={contexte.dateOuverture} readOnly />
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Événement</Label>
                          <Input className="h-8 text-xs bg-purple-50/50" value={contexte.evenement} readOnly />
                        </div>
                      </AIField>
                    </div>
                  </div>

                  {/* Informations complémentaires */}
                  <div>
                    <h4 className="font-medium mb-2">Informations complémentaires</h4>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <Label>Date de déclaration</Label>
                        <Input type="date" className="h-8 text-xs" value={contexte.dateDeclaration} onChange={(e) => setContexte({...contexte, dateDeclaration: e.target.value})} />
                      </div>
                      <div>
                        <Label>Jour J</Label>
                        <Input type="date" className="h-8 text-xs" value={contexte.jourJ} onChange={(e) => setContexte({...contexte, jourJ: e.target.value})} />
                      </div>
                      <div>
                        <Label>Enjeu Financier</Label>
                        <Select value={contexte.enjeuFinancier} onValueChange={(value) => setContexte({...contexte, enjeuFinancier: value})}>
                          <SelectTrigger className="h-8">
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
                    <h4 className="font-medium mb-2">Dommages corporels</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <AIField>
                        <div>
                          <Label>Présence de victimes</Label>
                          <RadioGroup value={contexte.presenceVictimes} onValueChange={(value) => setContexte({...contexte, presenceVictimes: value})} className="flex gap-4">
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="Oui" id="vic-oui" className="h-3 w-3" />
                              <Label htmlFor="vic-oui" className="text-xs">Oui</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="Non" id="vic-non" className="h-3 w-3" />
                              <Label htmlFor="vic-non" className="text-xs">Non</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </AIField>
                      <AIField>
                        <div>
                          <Label>Nombre de victimes</Label>
                          <Input type="number" className="h-8 text-xs bg-purple-50/50" value={contexte.nombreVictimes} onChange={(e) => setContexte({...contexte, nombreVictimes: e.target.value})} />
                        </div>
                      </AIField>
                    </div>
                  </div>

                  {/* Désordres */}
                  <div>
                    <h4 className="font-medium mb-2">Désordres</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="h-8 text-xs">Libellé</TableHead>
                          <TableHead className="h-8 text-xs">Nature</TableHead>
                          <TableHead className="h-8 text-xs">Localisation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {desordres.map((desordre, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Input className="h-8 text-xs" value={desordre.libelle} onChange={(e) => {
                                const newDesordres = [...desordres];
                                newDesordres[index].libelle = e.target.value;
                                setDesordres(newDesordres);
                              }} />
                            </TableCell>
                            <TableCell>
                              <Input className="h-8 text-xs" value={desordre.nature} onChange={(e) => {
                                const newDesordres = [...desordres];
                                newDesordres[index].nature = e.target.value;
                                setDesordres(newDesordres);
                              }} />
                            </TableCell>
                            <TableCell>
                              <Input className="h-8 text-xs" value={desordre.localisation} onChange={(e) => {
                                const newDesordres = [...desordres];
                                newDesordres[index].localisation = e.target.value;
                                setDesordres(newDesordres);
                              }} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button type="button" variant="outline" size="sm" onClick={addDesordre} className="mt-2">
                      <Plus className="h-3 w-3 mr-1" />
                      Ajouter ligne
                    </Button>
                  </div>

                  {/* Garanties */}
                  <div>
                    <h4 className="font-medium mb-2">Garanties</h4>
                    <AIField className="inline-block">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="garantie" 
                          checked={contexte.garantieObligatoire} 
                          onCheckedChange={(checked) => setContexte({...contexte, garantieObligatoire: checked as boolean})}
                          className="h-3 w-3"
                        />
                        <Label htmlFor="garantie" className="text-xs">Garantie obligatoire</Label>
                      </div>
                    </AIField>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Parties en cause */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">3. Parties en cause</CardTitle>
                </CardHeader>
                <CardContent>
                  <AIField>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="h-8 text-xs">Nom</TableHead>
                          <TableHead className="h-8 text-xs">Rôles</TableHead>
                          <TableHead className="h-8 text-xs">Adresse</TableHead>
                          <TableHead className="h-8 text-xs">Ville</TableHead>
                          <TableHead className="h-8 text-xs">Code postal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parties.map((partie, index) => (
                          <TableRow key={index} className="bg-purple-50/30">
                            <TableCell className="text-xs">{partie.nom}</TableCell>
                            <TableCell className="text-xs">{partie.roles}</TableCell>
                            <TableCell className="text-xs">{partie.adresse}</TableCell>
                            <TableCell className="text-xs">{partie.ville}</TableCell>
                            <TableCell className="text-xs">{partie.codePostal}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AIField>
                  <div className="flex gap-4 mt-4">
                    <Button type="button" variant="outline" size="sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Ajouter contact
                    </Button>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs">Sinistres connectés :</Label>
                      <RadioGroup value={sinistresConnectes} onValueChange={setSinistresConnectes} className="flex gap-4">
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="Oui" id="conn-oui" className="h-3 w-3" />
                          <Label htmlFor="conn-oui" className="text-xs">Oui</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="Non" id="conn-non" className="h-3 w-3" />
                          <Label htmlFor="conn-non" className="text-xs">Non</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 4: Filière de traitement */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">4. Filière de traitement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <AIField>
                      <div>
                        <Label className="text-sm font-medium">Potentiellement grave</Label>
                        <RadioGroup value={potentiellementGrave} onValueChange={setPotentiellementGrave} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="Oui" id="grave-oui" className="h-3 w-3" />
                            <Label htmlFor="grave-oui" className="text-xs">Oui</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="Non" id="grave-non" className="h-3 w-3" />
                            <Label htmlFor="grave-non" className="text-xs">Non</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </AIField>
                    <AIField>
                      <div>
                        <Label className="text-sm font-medium">Filière retenue</Label>
                        <RadioGroup value={filiereRetenue} onValueChange={setFiliereRetenue} className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="Arrêté" id="arrete" className="h-3 w-3" />
                            <Label htmlFor="arrete" className="text-xs">Arrêté</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="Sinistre avec Téléexpertise" id="teleexp" className="h-3 w-3" />
                            <Label htmlFor="teleexp" className="text-xs">Sinistre avec Téléexpertise</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="Sinistre avec expertise" id="expertise" className="h-3 w-3" />
                            <Label htmlFor="expertise" className="text-xs">Sinistre avec expertise</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="Sinistre Avenant1" id="avenant" className="h-3 w-3" />
                            <Label htmlFor="avenant" className="text-xs">Sinistre Avenant1</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="Contentieux : hors Grave" id="cont-hors" className="h-3 w-3" />
                            <Label htmlFor="cont-hors" className="text-xs">Contentieux : hors Grave</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="Contentieux : Grave" id="cont-grave" className="h-3 w-3" />
                            <Label htmlFor="cont-grave" className="text-xs">Contentieux : Grave</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="Gestion RCD CRAC" id="rcd-crac" className="h-3 w-3" />
                            <Label htmlFor="rcd-crac" className="text-xs">Gestion RCD CRAC</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="RC/RCD : Avec expertise" id="rc-avec" className="h-3 w-3" />
                            <Label htmlFor="rc-avec" className="text-xs">RC/RCD : Avec expertise</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="RC/RCD : Sans expertise" id="rc-sans" className="h-3 w-3" />
                            <Label htmlFor="rc-sans" className="text-xs">RC/RCD : Sans expertise</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </AIField>
                  </div>
                </CardContent>
              </Card>

              {/* Section 5: Affectation */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">5. Affectation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <AIField>
                      <div>
                        <Label>Mode de gestion</Label>
                        <Select value={affectation.modeGestion}>
                          <SelectTrigger className="h-8 bg-purple-50/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Collectif">Collectif</SelectItem>
                            <SelectItem value="Individuel">Individuel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AIField>
                    <AIField>
                      <div>
                        <Label>Groupe d'affectation</Label>
                        <Select value={affectation.groupeAffectation}>
                          <SelectTrigger className="h-8 bg-purple-50/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Corpo APA XPC 154233">Corpo APA XPC 154233</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AIField>
                    <AIField>
                      <div>
                        <Label>UG d'ouverture</Label>
                        <Select value={affectation.ugOuverture}>
                          <SelectTrigger className="h-8 bg-purple-50/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="XPC - Auto Corpo DC AXA Partenaires">XPC - Auto Corpo DC AXA Partenaires</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AIField>
                    <AIField>
                      <div>
                        <Label>UG Courante</Label>
                        <Input className="h-8 text-xs bg-purple-50/50" value={affectation.ugCourante} readOnly />
                      </div>
                    </AIField>
                    <div>
                      <Label>Délégation de gestion en DO</Label>
                      <Select value={affectation.delegationGestionDO}>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oui">Oui</SelectItem>
                          <SelectItem value="non">Non</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Commentaires</Label>
                    <Textarea className="text-xs resize-none" rows={3} value={affectation.commentaires} placeholder="Commentaires additionnels..." />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4 pt-4">
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
  );
};

export default SinistreDeclaration;
