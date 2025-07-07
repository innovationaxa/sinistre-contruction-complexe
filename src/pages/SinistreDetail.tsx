import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FileText, User, Building, Calendar, AlertTriangle, Sparkles, Shield, Clock, TrendingUp, CheckCircle, Bot, Tag, FileCheck, Star, AlertCircle, Users, MapPin, Euro, Hammer, Brain, Target, Zap } from "lucide-react";

interface SinistreData {
  id: string;
  reference: string;
  statut: string;
  dateDeclaration: string;
  dateReception: string;
  echeance: string;
  
  // Informations Assuré
  assure: {
    raisonSociale: string;
    siret: string;
    secteurActivite: string;
    adresse: string;
    telephone: string;
    email: string;
  };
  
  // Informations Contrat
  contrat: {
    numero: string;
    produit: string;
    dateEffet: string;
    dateEcheance: string;
    prime: string;
    courtier: string;
    activitesCouvertes: string[];
  };
  
  // Informations Sinistre  
  sinistre: {
    description: string;
    typeChantier: string;
    adresseTravaux: string;
    dateReceptionTravaux: string;
    natureDommages: string;
    origineReclamation: string;
    maitreOuvrage: {
      nom: string;
      qualite: string;
      activite: string;
      prejudiceImateriel: string;
    };
  };

  // Travaux réalisés
  travauxRealises: {
    description: string;
    adresse: string;
    cout: string;
    dateRealisation: string;
    estCouvert: boolean;
    activiteContrat: string;
  }[];
  
  // Documents
  documents: {
    nom: string;
    type: string;
    date: string;
    originalName: string;
    aiRenamed: string;
    aiClassification: string;
    aiSummary: string;
    confidence: number;
  }[];

  // Désordres constatés
  desordres: {
    id: string;
    nature: string;
    cause: string;
    responsabilites: string[];
    enjeux: {
      materiel: string;
      immateriel: string;
      total: string;
    };
    gravite: "critique" | "majeur" | "modere";
    localisation: string;
    dateConstat: string;
  }[];
  
  aiGenerated: {
    description: boolean;
    surtype: boolean;
    evaluation: boolean;
  };
}

const mockSinistreData: SinistreData = {
  id: "1",
  reference: "RC-DECA-2024-001",
  statut: "En cours de traitement",
  dateDeclaration: "28/09/2024",
  dateReception: "28/09/2024 14:30",
  echeance: "15/10/2024",
  
  assure: {
    raisonSociale: "SARL Bâti Construct",
    siret: "123 456 789 00012",
    secteurActivite: "Construction de bâtiments résidentiels et non résidentiels",
    adresse: "15 Avenue de la Construction, 69000 Lyon",
    telephone: "04 78 12 34 56",
    email: "contact@bati-construct.fr"
  },
  
  contrat: {
    numero: "DECA-2021-4567",
    produit: "RC Décennale Tous Corps d'État",
    dateEffet: "01/01/2021",
    dateEcheance: "31/12/2024",
    prime: "8 500 € HT/an",
    courtier: "Agent AXA Lyon Centre - M. Dubois",
    activitesCouvertes: [
      "Gros œuvre - Maçonnerie",
      "Second œuvre - Plâtrerie",
      "Second œuvre - Électricité",
      "Second œuvre - Plomberie",
      "Finitions - Carrelage",
      "Rénovation lourde"
    ]
  },
  
  sinistre: {
    description: "Sinistre amiable RC Décennale suite à l'apparition de dommages structurels 3 ans après la réception des travaux de rénovation d'un local commercial",
    typeChantier: "Rénovation lourde - Local commercial",
    adresseTravaux: "42 Rue du Commerce, 69002 Lyon",
    dateReceptionTravaux: "15/06/2021",
    natureDommages: "Fissures importantes dans les murs porteurs, affaissement partiel du plancher, infiltrations",
    origineReclamation: "Courrier du maître d'ouvrage reçu par l'assuré le 25/09/2024",
    maitreOuvrage: {
      nom: "SAS Commerce Plus",
      qualite: "Propriétaire exploitant",
      activite: "Commerce de détail - Prêt-à-porter",
      prejudiceImateriel: "Fermeture boutique 2 mois estimée = 45 000€ de CA perdu"
    }
  },

  travauxRealises: [
    {
      description: "Reprise des murs porteurs en maçonnerie",
      adresse: "42 Rue du Commerce, 69002 Lyon",
      cout: "32 000 € HT",
      dateRealisation: "Mars-Avril 2021",
      estCouvert: true,
      activiteContrat: "Gros œuvre - Maçonnerie"
    },
    {
      description: "Installation électrique complète",
      adresse: "42 Rue du Commerce, 69002 Lyon", 
      cout: "18 500 € HT",
      dateRealisation: "Mai 2021",
      estCouvert: true,
      activiteContrat: "Second œuvre - Électricité"
    },
    {
      description: "Plomberie et évacuations",
      adresse: "42 Rue du Commerce, 69002 Lyon",
      cout: "12 800 € HT",
      dateRealisation: "Mai 2021",
      estCouvert: true,
      activiteContrat: "Second œuvre - Plomberie"
    },
    {
      description: "Pose carrelage sol et faïence",
      adresse: "42 Rue du Commerce, 69002 Lyon",
      cout: "15 200 € HT",
      dateRealisation: "Juin 2021",
      estCouvert: true,
      activiteContrat: "Finitions - Carrelage"
    },
    {
      description: "Aménagement vitrine (hors garantie décennale)",
      adresse: "42 Rue du Commerce, 69002 Lyon",
      cout: "8 500 € HT",
      dateRealisation: "Juin 2021",
      estCouvert: false,
      activiteContrat: "Non couvert - Aménagements"
    }
  ],
  
  documents: [
    { 
      nom: "Courrier de mise en cause", 
      type: "Courrier", 
      date: "25/09/2024",
      originalName: "courrier_mise_en_cause.pdf",
      aiRenamed: "Courrier_MiseEnCause_CommercePlus_BatiConstruct_25092024.pdf",
      aiClassification: "Document juridique - Mise en demeure",
      aiSummary: "Courrier officiel de mise en cause de la société SARL Bâti Construct par SAS Commerce Plus. Document détaillant les dommages constatés 3 ans après réception des travaux de rénovation du local commercial. Mentions légales conformes, délais respectés. Demande d'indemnisation chiffrée incluant les préjudices matériels et immatériels.",
      confidence: 95
    },
    { 
      nom: "Photos des dommages", 
      type: "Photos", 
      date: "27/09/2024",
      originalName: "photos_degats.zip",
      aiRenamed: "Photos_Dommages_LocalCommercial_RueCommerce_27092024.zip",
      aiClassification: "Documentation visuelle - Preuves dommages",
      aiSummary: "Archive photographique complète des dommages structurels. 15 photos haute résolution montrant les fissures dans les murs porteurs, l'affaissement du plancher et les infiltrations d'eau. Documentation technique exploitable pour expertise. Géolocalisation et métadonnées temporelles présentes.",
      confidence: 92
    },
    { 
      nom: "Devis de réparation", 
      type: "Devis", 
      date: "28/09/2024",
      originalName: "devis_reparation.pdf",
      aiRenamed: "Devis_Réparation_Structurelle_EntrepriseBTP_Lyon_28092024.pdf",
      aiClassification: "Document commercial - Estimation travaux",
      aiSummary: "Devis détaillé établi par entreprise spécialisée en réparation structurelle. Montant total : 85 000€ HT incluant reprises en sous-œuvre, renforcement structure, étanchéité. Délais d'exécution : 6 semaines. Entreprise certifiée RGE, garanties décennales à jour.",
      confidence: 88
    },
    { 
      nom: "Attestation RC Décennale", 
      type: "Attestation", 
      date: "28/09/2024",
      originalName: "attestation_assurance.pdf",
      aiRenamed: "Attestation_RCDecennale_BatiConstruct_AXA_Validite2024.pdf",
      aiClassification: "Document contractuel - Attestation assurance",
      aiSummary: "Attestation d'assurance RC Décennale valide couvrant la période des travaux litigieux (2021-2031). Plafonds de garantie conformes : 500 000€ dommages ouvrage, 150 000€ préjudice immatériel. Aucune exclusion particulière identifiée. Document authentifié par signature électronique AXA.",
      confidence: 98
    }
  ],

  // Ajout des données des désordres
  desordres: [
    {
      id: "D001",
      nature: "Fissures structurelles dans les murs porteurs",
      cause: "Affaissement des fondations suite à un défaut d'étude de sol et de dimensionnement",
      responsabilites: ["SARL Bâti Construct - Maçonnerie", "Bureau d'études structure (sous-traitant)"],
      enjeux: {
        materiel: "52 000 €",
        immateriel: "25 000 €",
        total: "77 000 €"
      },
      gravite: "critique",
      localisation: "Murs porteurs - Rez-de-chaussée",
      dateConstat: "20/09/2024"
    },
    {
      id: "D002", 
      nature: "Affaissement du plancher principal",
      cause: "Sous-dimensionnement des poutrelles et défaut de mise en œuvre",
      responsabilites: ["SARL Bâti Construct - Gros œuvre"],
      enjeux: {
        materiel: "28 000 €",
        immateriel: "15 000 €",
        total: "43 000 €"
      },
      gravite: "majeur",
      localisation: "Plancher principal - Zone commerciale",
      dateConstat: "22/09/2024"
    },
    {
      id: "D003",
      nature: "Infiltrations d'eau par les joints de façade",
      cause: "Défaut d'étanchéité et vices de mise en œuvre des joints",
      responsabilites: ["SARL Bâti Construct - Étanchéité", "Entreprise de façadage (co-traitant)"],
      enjeux: {
        materiel: "8 500 €",
        immateriel: "5 000 €",
        total: "13 500 €"
      },
      gravite: "modere",
      localisation: "Façade principale - Joints de dilatation",
      dateConstat: "25/09/2024"
    }
  ],
  
  aiGenerated: {
    description: true,
    surtype: true,
    evaluation: true
  }
};

// Données supplémentaires pour les nouveaux onglets
const autresIntervenants = [
  {
    nom: "Entreprise Électro Plus SARL",
    role: "Électricien principal",
    assureurRC: "AXA France",
    numeroContratRC: "RC-2021-8901",
    assureurDO: "MAIF",
    numeroContratDO: "DO-2021-4562",
    plafondDO: "300 000 €",
    dateEffetDO: "01/01/2021",
    statusAssuranceRC: "active",
    statusAssuranceDO: "active"
  },
  {
    nom: "Plomberie Moderne SAS",
    role: "Plombier-chauffagiste",
    assureurRC: "AXA France",
    numeroContratRC: "RC-2021-8902",
    assureurDO: "SMABTP",
    numeroContratDO: "DO-2021-7834",
    plafondDO: "500 000 €",
    dateEffetDO: "15/02/2021",
    statusAssuranceRC: "active",
    statusAssuranceDO: "active"
  },
  {
    nom: "Carrelage Expert EURL",
    role: "Carreleur",
    assureurRC: "AXA France",
    numeroContratRC: "RC-2021-8903",
    assureurDO: "MAAF",
    numeroContratDO: "DO-2021-9123",
    plafondDO: "200 000 €",
    dateEffetDO: "01/03/2021",
    statusAssuranceRC: "active",
    statusAssuranceDO: "expire_bientot"
  }
];

const sinistresChantier = [
  {
    id: "SIN-001",
    reference: "RC-DECA-2024-001",
    statut: "En cours",
    dateDeclaration: "28/09/2024",
    intervenant: "SARL Bâti Construct",
    garanties: [
      {
        nom: "Dommages à l'ouvrage",
        plafond: 500000,
        engage: 77000,
        reserve: 80000,
        resteAPayer: 423000
      },
      {
        nom: "Préjudice immatériel",
        plafond: 150000,
        engage: 45000,
        reserve: 50000,
        resteAPayer: 100000
      }
    ]
  },
  {
    id: "SIN-002",
    reference: "RC-ELEC-2024-002",
    statut: "Fermé",
    dateDeclaration: "15/08/2024",
    intervenant: "Entreprise Électro Plus SARL",
    garanties: [
      {
        nom: "Dommages à l'ouvrage",
        plafond: 300000,
        engage: 12000,
        reserve: 0,
        resteAPayer: 288000
      }
    ]
  }
];

// Données pour l'analyse IA
const activitesAnalysis = {
  declared: [
    { activity: "Gros œuvre - Maçonnerie", status: "declared", coverage: "covered" },
    { activity: "Second œuvre - Plâtrerie", status: "declared", coverage: "covered" },
    { activity: "Second œuvre - Électricité", status: "declared", coverage: "covered" },
    { activity: "Second œuvre - Plomberie", status: "declared", coverage: "covered" },
    { activity: "Finitions - Carrelage", status: "declared", coverage: "covered" },
    { activity: "Rénovation lourde", status: "declared", coverage: "covered" }
  ],
  guaranteed: [
    { activity: "Gros œuvre - Maçonnerie", status: "guaranteed", coverage: "active" },
    { activity: "Second œuvre - Plâtrerie", status: "guaranteed", coverage: "active" },
    { activity: "Second œuvre - Électricité", status: "guaranteed", coverage: "active" },
    { activity: "Second œuvre - Plomberie", status: "guaranteed", coverage: "active" },
    { activity: "Finitions - Carrelage", status: "guaranteed", coverage: "active" },
    { activity: "Rénovation lourde", status: "guaranteed", coverage: "active" },
    { activity: "Étanchéité", status: "guaranteed", coverage: "available" },
    { activity: "Chauffage", status: "guaranteed", coverage: "available" }
  ]
};

const dossiersAssocies = [
  {
    id: "DOSS-001",
    reference: "RC-DECA-2024-001",
    type: "Principal",
    probabilite: 95,
    statut: "En cours",
    impact: "Majeur",
    description: "Dossier principal - Dommages structurels"
  },
  {
    id: "DOSS-002", 
    reference: "RC-ELEC-2024-002",
    type: "Connexe",
    probabilite: 75,
    statut: "Surveillé",
    impact: "Modéré",
    description: "Risque de réclamation électricité"
  },
  {
    id: "DOSS-003",
    reference: "RC-PLOM-2024-003", 
    type: "Potentiel",
    probabilite: 35,
    statut: "Veille",
    impact: "Faible",
    description: "Surveillance plomberie préventive"
  }
];

export default function SinistreDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const sinistre = mockSinistreData;

  const AIIndicator = () => (
    <Sparkles className="w-4 h-4 text-purple-600 inline ml-1" />
  );

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-600 bg-green-50 border-green-200";
    if (confidence >= 90) return "text-blue-600 bg-blue-50 border-blue-200";
    if (confidence >= 85) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getGraviteColor = (gravite: "critique" | "majeur" | "modere") => {
    switch (gravite) {
      case "critique":
        return "border-red-500 bg-red-50";
      case "majeur":
        return "border-orange-500 bg-orange-50";
      case "modere":
        return "border-yellow-500 bg-yellow-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  const getGraviteBadgeColor = (gravite: "critique" | "majeur" | "modere") => {
    switch (gravite) {
      case "critique":
        return "bg-red-100 text-red-800";
      case "majeur":
        return "bg-orange-100 text-orange-800";
      case "modere":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const ComparisonRow = ({ label, contractValue, declarationValue, isMatch }: {
    label: string;
    contractValue: string;
    declarationValue: string;
    isMatch: boolean;
  }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-sm font-medium text-gray-600 w-32">{label}:</span>
      <div className="flex items-center gap-4 flex-1">
        <div className="flex-1">
          <span className="text-sm text-gray-800">{contractValue}</span>
          <span className="text-xs text-gray-500 block">Contrat</span>
        </div>
        <div className="flex items-center">
          {isMatch ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600" />
          )}
        </div>
        <div className="flex-1">
          <span className="text-sm text-gray-800">{declarationValue}</span>
          <span className="text-xs text-gray-500 block">Déclaration</span>
        </div>
      </div>
    </div>
  );

  // Calcul des montants par gravité
  const montantsParGravite = sinistre.desordres.reduce((acc, desordre) => {
    const montant = parseFloat(desordre.enjeux.total.replace(/[€\s]/g, '').replace(',', '.'));
    acc[desordre.gravite] = (acc[desordre.gravite] || 0) + montant;
    return acc;
  }, {} as Record<string, number>);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expire_bientot":
        return "bg-orange-100 text-orange-800";
      case "expire":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "expire_bientot":
        return "Expire bientôt";
      case "expire":
        return "Expirée";
      default:
        return "Inconnue";
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "bg-red-100 text-red-800 border-red-200";
    if (probability >= 60) return "bg-orange-100 text-orange-800 border-orange-200";
    if (probability >= 40) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getActivityStatusIcon = (status: string, coverage: string) => {
    if (status === "declared" && coverage === "covered") {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    if (status === "guaranteed" && coverage === "active") {
      return <Shield className="w-4 h-4 text-blue-600" />;
    }
    if (status === "guaranteed" && coverage === "available") {
      return <Clock className="w-4 h-4 text-gray-500" />;
    }
    return <AlertCircle className="w-4 h-4 text-orange-600" />;
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la corbeille
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Synthèse de la déclaration et du contrat</h1>
          <p className="text-sm text-gray-600">Réf. {sinistre.reference}</p>
        </div>
        <div className="ml-auto">
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-semibold">
            {sinistre.statut}
          </Badge>
        </div>
      </div>
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="synthese" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-blue-50 border-blue-200">
              <TabsTrigger value="synthese" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Contrat et garanties</TabsTrigger>
              <TabsTrigger value="contrat" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Désordres</TabsTrigger>
              <TabsTrigger value="historique" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Autres intervenants et Chantier</TabsTrigger>
              <TabsTrigger value="analyse" className="font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">Analyse IA</TabsTrigger>
            </TabsList>

            <TabsContent value="synthese" className="space-y-6">
              {/* Comparaison Souscripteur/Assuré vs Déclaration */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3 bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                    <Users className="w-5 h-5" />
                    Comparaison Souscripteur / Déclarant
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ComparisonRow 
                    label="Raison sociale"
                    contractValue={sinistre.assure.raisonSociale}
                    declarationValue={sinistre.assure.raisonSociale}
                    isMatch={true}
                  />
                  <ComparisonRow 
                    label="SIRET"
                    contractValue={sinistre.assure.siret}
                    declarationValue={sinistre.assure.siret}
                    isMatch={true}
                  />
                  <ComparisonRow 
                    label="Adresse"
                    contractValue={sinistre.assure.adresse}
                    declarationValue={sinistre.assure.adresse}
                    isMatch={true}
                  />
                  <ComparisonRow 
                    label="Secteur d'activité"
                    contractValue={sinistre.assure.secteurActivite}
                    declarationValue={sinistre.assure.secteurActivite}
                    isMatch={true}
                  />
                </CardContent>
              </Card>

              {/* Timeline de la vie du contrat */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3 bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                    <Clock className="w-5 h-5" />
                    Timeline de la vie du contrat
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="relative">
                    {/* Barre de progression verticale */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-orange-500"></div>
                    
                    <div className="space-y-4 pl-10">
                      {/* Souscription */}
                      <div className="relative flex items-center">
                        <div className="absolute -left-8 w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="bg-white rounded border border-green-200 p-3 w-full shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">Souscription du contrat</h4>
                            <Badge className="bg-green-100 text-green-800 text-xs">Actif</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">Date d'effet: {sinistre.contrat.dateEffet}</p>
                          <div className="text-xs text-gray-500">
                            <span>Prime: {sinistre.contrat.prime} • Produit: {sinistre.contrat.produit}</span>
                          </div>
                        </div>
                      </div>

                      {/* Travaux couverts */}
                      <div className="relative flex items-center">
                        <div className="absolute -left-8 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="bg-white rounded border border-blue-200 p-3 w-full shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">Réception des travaux</h4>
                            <Badge className="bg-blue-100 text-blue-800 text-xs">Couvert</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">Date de réception: {sinistre.sinistre.dateReceptionTravaux}</p>
                          <div className="text-xs text-gray-500">
                            <span>Début période garantie décennale • Chantier: {sinistre.sinistre.typeChantier}</span>
                          </div>
                        </div>
                      </div>

                      {/* Sinistre */}
                      <div className="relative flex items-center">
                        <div className="absolute -left-8 w-3 h-3 bg-orange-600 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="bg-white rounded border border-orange-200 p-3 w-full shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">Déclaration du sinistre</h4>
                            <Badge className="bg-orange-100 text-orange-800 text-xs">En cours</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">Date de déclaration: {sinistre.dateDeclaration}</p>
                          <div className="text-xs text-gray-500">
                            <span>Réf: {sinistre.reference} • Échéance traitement: {sinistre.echeance}</span>
                          </div>
                        </div>
                      </div>

                      {/* Échéance contrat */}
                      <div className="relative flex items-center">
                        <div className="absolute -left-8 w-3 h-3 bg-gray-400 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="bg-white rounded border border-gray-200 p-3 w-full shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">Échéance du contrat</h4>
                            <Badge className="bg-gray-100 text-gray-600 text-xs">À venir</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">Date d'échéance: {sinistre.contrat.dateEcheance}</p>
                          <div className="text-xs text-gray-500">
                            <span>Fin de couverture (garantie décennale continue jusqu'en 2031)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des travaux réalisés */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3 bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                    <Hammer className="w-5 h-5" />
                    Travaux réalisés et couverture contractuelle
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Description des travaux</TableHead>
                        <TableHead className="w-[200px]">Adresse</TableHead>
                        <TableHead className="w-[120px]">Coût</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead className="w-[200px]">Activité contrat</TableHead>
                        <TableHead className="w-[100px]">Couverture</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sinistre.travauxRealises.map((travail, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {travail.description}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {travail.adresse}
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            <div className="flex items-center gap-1">
                              <Euro className="w-3 h-3" />
                              {travail.cout}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {travail.dateRealisation}
                          </TableCell>
                          <TableCell className="text-sm">
                            {travail.activiteContrat}
                          </TableCell>
                          <TableCell>
                            {travail.estCouvert ? (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Couvert
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Non couvert
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {/* Résumé des coûts */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Total des travaux</p>
                        <p className="text-xl font-bold text-gray-900">87 000 € HT</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600">Travaux couverts</p>
                        <p className="text-xl font-bold text-green-700">78 500 € HT</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-red-600">Travaux non couverts</p>
                        <p className="text-xl font-bold text-red-700">8 500 € HT</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Garanties du contrat */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Shield className="w-5 h-5" />
                    Garanties du contrat
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-bold text-gray-900">Dommages à l'ouvrage</p>
                          <p className="text-sm text-gray-600">Plafond: 500 000 €</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-bold text-gray-900">Préjudice immatériel</p>
                          <p className="text-sm text-gray-600">Plafond: 150 000 €</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-bold text-gray-900">Frais de démolition</p>
                          <p className="text-sm text-gray-600">Inclus dans le plafond principal</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-bold text-gray-900">Frais d'expertise</p>
                          <p className="text-sm text-gray-600">Pris en charge par AXA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contrat" className="space-y-6">
              {/* Liste des désordres constatés */}
              <Card className="border-red-200">
                <CardHeader className="pb-3 bg-red-50">
                  <CardTitle className="flex items-center gap-2 text-lg text-red-800">
                    <AlertTriangle className="w-5 h-5" />
                    Liste des désordres constatés
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {/* Résumé des montants par gravité */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Synthèse des enjeux par niveau de gravité</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-red-100 rounded-lg">
                        <p className="text-sm font-medium text-red-600">Critique</p>
                        <p className="text-lg font-bold text-red-800">{montantsParGravite.critique?.toLocaleString() || 0} €</p>
                        <p className="text-xs text-red-600">{sinistre.desordres.filter(d => d.gravite === 'critique').length} désordre(s)</p>
                      </div>
                      <div className="text-center p-3 bg-orange-100 rounded-lg">
                        <p className="text-sm font-medium text-orange-600">Majeur</p>
                        <p className="text-lg font-bold text-orange-800">{montantsParGravite.majeur?.toLocaleString() || 0} €</p>
                        <p className="text-xs text-orange-600">{sinistre.desordres.filter(d => d.gravite === 'majeur').length} désordre(s)</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-100 rounded-lg">
                        <p className="text-sm font-medium text-yellow-600">Modéré</p>
                        <p className="text-lg font-bold text-yellow-800">{montantsParGravite.modere?.toLocaleString() || 0} €</p>
                        <p className="text-xs text-yellow-600">{sinistre.desordres.filter(d => d.gravite === 'modere').length} désordre(s)</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                      <p className="text-sm font-medium text-gray-600">Total des enjeux</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Object.values(montantsParGravite).reduce((a, b) => a + b, 0).toLocaleString()} €
                      </p>
                    </div>
                  </div>

                  {/* Liste détaillée des désordres */}
                  <div className="space-y-4">
                    {sinistre.desordres.map((desordre, index) => (
                      <div key={desordre.id} className={`border-l-4 rounded-lg p-4 ${getGraviteColor(desordre.gravite)}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{desordre.nature}</h3>
                              <Badge className={`text-xs ${getGraviteBadgeColor(desordre.gravite)}`}>
                                {desordre.gravite.charAt(0).toUpperCase() + desordre.gravite.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Référence:</span> {desordre.id} • 
                              <span className="font-medium"> Constaté le:</span> {desordre.dateConstat}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Localisation:</span> {desordre.localisation}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{desordre.enjeux.total}</p>
                            <p className="text-xs text-gray-500">Enjeu total</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {/* Cause */}
                          <div className="bg-white bg-opacity-60 rounded-lg p-3">
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Cause identifiée
                            </h4>
                            <p className="text-sm text-gray-700">{desordre.cause}</p>
                          </div>

                          {/* Responsabilités */}
                          <div className="bg-white bg-opacity-60 rounded-lg p-3">
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Responsabilités engagées
                            </h4>
                            <ul className="space-y-1">
                              {desordre.responsabilites.map((resp, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Enjeux détaillés */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Euro className="w-4 h-4" />
                            Détail des enjeux financiers
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-white bg-opacity-60 rounded p-3 text-center">
                              <p className="text-sm font-medium text-gray-600">Préjudice matériel</p>
                              <p className="text-lg font-bold text-gray-900">{desordre.enjeux.materiel}</p>
                            </div>
                            <div className="bg-white bg-opacity-60 rounded p-3 text-center">
                              <p className="text-sm font-medium text-gray-600">Préjudice immatériel</p>
                              <p className="text-lg font-bold text-gray-900">{desordre.enjeux.immateriel}</p>
                            </div>
                            <div className="bg-white bg-opacity-60 rounded p-3 text-center">
                              <p className="text-sm font-medium text-gray-600">Total</p>
                              <p className="text-lg font-bold text-gray-900">{desordre.enjeux.total}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historique" className="space-y-6">
              {/* Autres intervenants assurés chez AXA */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Users className="w-5 h-5" />
                    Autres intervenants assurés AXA
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Intervenant</TableHead>
                        <TableHead className="w-[150px]">Rôle</TableHead>
                        <TableHead className="w-[120px]">RC (AXA)</TableHead>
                        <TableHead className="w-[200px]">Assureur DO</TableHead>
                        <TableHead className="w-[150px]">Plafond DO</TableHead>
                        <TableHead className="w-[120px]">Statut DO</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {autresIntervenants.map((intervenant, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <div>
                              <p className="font-semibold text-gray-900">{intervenant.nom}</p>
                              <p className="text-xs text-gray-500">Contrat: {intervenant.numeroContratRC}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {intervenant.role}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              AXA
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            <div>
                              <p className="font-medium text-gray-900">{intervenant.assureurDO}</p>
                              <p className="text-xs text-gray-500">{intervenant.numeroContratDO}</p>
                              <p className="text-xs text-gray-500">Effet: {intervenant.dateEffetDO}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-gray-900">
                            {intervenant.plafondDO}
                          </TableCell>
                          <TableCell>
                            <Badge className={`text-xs ${getStatusBadgeColor(intervenant.statusAssuranceDO)}`}>
                              {getStatusText(intervenant.statusAssuranceDO)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Section Chantier - Sinistres associés */}
              <Card className="border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <Building className="w-5 h-5" />
                    Chantier - Sinistres associés
                    <Badge className="bg-orange-100 text-orange-800 ml-2">
                      42 Rue du Commerce, Lyon
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-6">
                    {sinistresChantier.map((sinistre, index) => (
                      <div key={sinistre.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                        {/* En-tête du sinistre */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{sinistre.reference}</h3>
                              <p className="text-sm text-gray-600">
                                Déclaré le {sinistre.dateDeclaration} • {sinistre.intervenant}
                              </p>
                            </div>
                          </div>
                          <Badge className={`${
                            sinistre.statut === "En cours" ? "bg-orange-100 text-orange-800" : 
                            sinistre.statut === "Fermé" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {sinistre.statut}
                          </Badge>
                        </div>

                        {/* Garanties avec jauges */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Garanties et reste à payer
                          </h4>
                          {sinistre.garanties.map((garantie, gIndex) => {
                            const pourcentageUtilise = (garantie.engage + garantie.reserve) / garantie.plafond * 100;
                            const pourcentageEngage = garantie.engage / garantie.plafond * 100;
                            const pourcentageReserve = garantie.reserve / garantie.plafond * 100;
                            
                            return (
                              <div key={gIndex} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-medium text-gray-900">{garantie.nom}</h5>
                                  <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">
                                      Reste: {garantie.resteAPayer.toLocaleString()} €
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      sur {garantie.plafond.toLocaleString()} €
                                    </p>
                                  </div>
                                </div>
                                
                                {/* Barre de progression avec segments */}
                                <div className="space-y-2">
                                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                    {/* Montant engagé */}
                                    <div 
                                      className="absolute left-0 h-full bg-red-500"
                                      style={{ width: `${pourcentageEngage}%` }}
                                    ></div>
                                    {/* Réserve */}
                                    <div 
                                      className="absolute h-full bg-orange-500"
                                      style={{ 
                                        left: `${pourcentageEngage}%`,
                                        width: `${pourcentageReserve}%` 
                                      }}
                                    ></div>
                                    {/* Reste disponible */}
                                    <div 
                                      className="absolute right-0 h-full bg-green-500"
                                      style={{ width: `${100 - pourcentageUtilise}%` }}
                                    ></div>
                                  </div>
                                  
                                  {/* Légende */}
                                  <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-4">
                                      <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                                        <span className="text-gray-600">
                                          Engagé: {garantie.engage.toLocaleString()} €
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-orange-500 rounded"></div>
                                        <span className="text-gray-600">
                                          Réserve: {garantie.reserve.toLocaleString()} €
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                                        <span className="text-gray-600">
                                          Disponible: {garantie.resteAPayer.toLocaleString()} €
                                        </span>
                                      </div>
                                    </div>
                                    <span className="font-medium text-gray-700">
                                      {pourcentageUtilise.toFixed(1)}% utilisé
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Résumé global du chantier */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Résumé global du chantier
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Sinistres</p>
                        <p className="text-xl font-bold text-gray-900">{sinistresChantier.length}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-red-600">Total engagé</p>
                        <p className="text-xl font-bold text-red-700">
                          {sinistresChantier.reduce((acc, s) => 
                            acc + s.garanties.reduce((gAcc, g) => gAcc + g.engage, 0), 0
                          ).toLocaleString()} €
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-orange-600">Total réserves</p>
                        <p className="text-xl font-bold text-orange-700">
                          {sinistresChantier.reduce((acc, s) => 
                            acc + s.garanties.reduce((gAcc, g) => gAcc + g.reserve, 0), 0
                          ).toLocaleString()} €
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600">Reste disponible</p>
                        <p className="text-xl font-bold text-green-700">
                          {sinistresChantier.reduce((acc, s) => 
                            acc + s.garanties.reduce((gAcc, g) => gAcc + g.resteAPayer, 0), 0
                          ).toLocaleString()} €
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analyse" className="space-y-6">
              {/* Synthèse de la déclaration */}
              <Card className="border-purple-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Brain className="w-5 h-5" />
                    Synthèse de la déclaration
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informations clés */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Informations clés du sinistre
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Type de chantier:</span>
                          <span className="text-sm text-gray-900">{sinistre.sinistre.typeChantier}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Date réception:</span>
                          <span className="text-sm text-gray-900">{sinistre.sinistre.dateReceptionTravaux}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Délai déclaration:</span>
                          <span className="text-sm text-green-700 font-medium">3 ans (conforme)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600">Nature dommages:</span>
                          <span className="text-sm text-red-700 font-medium">Structurels</span>
                        </div>
                      </div>
                    </div>

                    {/* Évaluation IA */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        Évaluation IA automatique
                      </h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-800">Conformité déclaration</span>
                            <Badge className="bg-green-100 text-green-800">95%</Badge>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-800">Couverture contractuelle</span>
                            <Badge className="bg-blue-100 text-blue-800">100%</Badge>
                          </div>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-orange-800">Complexité dossier</span>
                            <Badge className="bg-orange-100 text-orange-800">Élevée</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Résumé automatique */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Résumé automatique IA
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong>Sinistre décennal conforme :</strong> Dommages structurels graves survenus 3 ans après réception des travaux de rénovation d'un local commercial. 
                      Les désordres (fissures, affaissement, infiltrations) relèvent clairement de la garantie décennale. 
                      <strong>Enjeu total estimé : 133 500€</strong> répartis entre dommages matériels (85 500€) et préjudice immatériel (48 000€). 
                      La couverture contractuelle est adéquate avec des plafonds de 500 000€ (DO) et 150 000€ (PI). 
                      <strong>Recommandation :</strong> Expertise technique urgente et constitution de provision à 80 000€.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Comparaison activités déclarées vs garanties */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Target className="w-5 h-5" />
                    Comparaison Activités Déclarées vs Garanties Contractuelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Activités déclarées */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FileCheck className="w-4 h-4" />
                        Activités déclarées dans le sinistre
                      </h4>
                      <div className="space-y-2">
                        {activitesAnalysis.declared.map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2">
                              {getActivityStatusIcon(activity.status, activity.coverage)}
                              <span className="text-sm font-medium text-gray-900">{activity.activity}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800 text-xs">Couvert</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activités garanties */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Activités garanties au contrat
                      </h4>
                      <div className="space-y-2">
                        {activitesAnalysis.guaranteed.map((activity, index) => (
                          <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                            activity.coverage === "active" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
                          }`}>
                            <div className="flex items-center gap-2">
                              {getActivityStatusIcon(activity.status, activity.coverage)}
                              <span className="text-sm font-medium text-gray-900">{activity.activity}</span>
                            </div>
                            <Badge className={`text-xs ${
                              activity.coverage === "active" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                            }`}>
                              {activity.coverage === "active" ? "Mobilisée" : "Disponible"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Analyse des écarts */}
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Analyse des écarts et opportunités
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">✓ Parfaite concordance</h5>
                        <p className="text-sm text-gray-700">
                          Toutes les activités déclarées sont garanties au contrat. 
                          Aucun écart de couverture identifié.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">🎯 Garanties mobilisables</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• <strong>Étanchéité :</strong> Disponible pour infiltrations</li>
                          <li>• <strong>Chauffage :</strong> Non sollicitée dans ce dossier</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Probabilités des dossiers associés */}
              <Card className="border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <TrendingUp className="w-5 h-5" />
                    Probabilités des Dossiers Associés en Cours
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {dossiersAssocies.map((dossier, index) => (
                      <div key={dossier.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{dossier.reference}</h4>
                              <p className="text-sm text-gray-600">{dossier.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getProbabilityColor(dossier.probabilite)}>
                              {dossier.probabilite}% probabilité
                            </Badge>
                            <Badge variant="outline">{dossier.statut}</Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Type: <strong>{dossier.type}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Impact: <strong>{dossier.impact}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={dossier.probabilite} className="flex-1" />
                            <span className="text-sm font-medium text-gray-900">{dossier.probabilite}%</span>
                          </div>
                        </div>

                        {/* Détail par probabilité */}
                        {dossier.probabilite >= 80 && (
                          <div className="mt-3 p-3 bg-red-50 rounded border-l-4 border-red-500">
                            <p className="text-sm text-red-800">
                              <strong>Risque élevé :</strong> Surveillance active recommandée. Constitution de provision conseillée.
                            </p>
                          </div>
                        )}
                        {dossier.probabilite >= 60 && dossier.probabilite < 80 && (
                          <div className="mt-3 p-3 bg-orange-50 rounded border-l-4 border-orange-500">
                            <p className="text-sm text-orange-800">
                              <strong>Risque modéré :</strong> Suivi régulier nécessaire. Évaluation périodique du risque.
                            </p>
                          </div>
                        )}
                        {dossier.probabilite < 60 && (
                          <div className="mt-3 p-3 bg-green-50 rounded border-l-4 border-green-500">
                            <p className="text-sm text-green-800">
                              <strong>Risque faible :</strong> Surveillance de routine suffisante.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Synthèse globale */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Synthèse Prédictive IA
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">1</p>
                        <p className="text-sm text-gray-600">Dossier à risque élevé</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">1</p>
                        <p className="text-sm text-gray-600">Dossier à risque modéré</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">1</p>
                        <p className="text-sm text-gray-600">Dossier à risque faible</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-sm text-gray-700 text-center">
                        <strong>Recommandation globale :</strong> Focus sur RC-ELEC-2024-002 (75% de probabilité). 
                        Provision suggérée : 15 000€ pour l'ensemble des risques connexes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Bouton d'ouverture du sinistre */}
          <div className="flex justify-center py-6 border-t border-gray-200 mt-8">
            <Button 
              onClick={() => navigate('/sinistre/declaration')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
            >
              Ouvrir le sinistre
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
