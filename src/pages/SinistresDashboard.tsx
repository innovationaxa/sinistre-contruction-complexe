import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Eye, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Building,
  Plus,
  Download
} from "lucide-react";
import { Header } from "@/components/Header";

const SinistresDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const sinistres = [
    {
      id: "SIN-2024-789456",
      numeroContrat: "20041732073",
      chantier: "TEST",
      assure: "LOU APOLLINARY MARIAN TEDDIE",
      dateOuverture: "01/07/2025",
      dateSinistre: "30/06/2025",
      statut: "En cours",
      type: "Construction DO",
      enjeuFinancier: "Moyen",
      expert: "Non assigné",
      derniereAction: "Déclaration initiale",
      isNew: true
    },
    {
      id: "SIN-2024-789455",
      numeroContrat: "20041732072",
      chantier: "PROJ-001",
      assure: "MARTIN DUBOIS CONSTRUCTION",
      dateOuverture: "28/06/2025",
      dateSinistre: "25/06/2025",
      statut: "Expertise",
      type: "Construction DO",
      enjeuFinancier: "Élevé",
      expert: "EXPERTISE CONSEIL",
      derniereAction: "Rapport d'expertise reçu"
    },
    {
      id: "SIN-2024-789454",
      numeroContrat: "20041732071",
      chantier: "RENO-2024",
      assure: "ENTREPRISE RENOVATION PLUS",
      dateOuverture: "20/06/2025",
      dateSinistre: "18/06/2025",
      statut: "Règlement",
      type: "Rénovation",
      enjeuFinancier: "Faible",
      expert: "EXPERT BATIMENT SAS",
      derniereAction: "Provision accordée"
    },
    {
      id: "SIN-2024-789453",
      numeroContrat: "20041732070",
      chantier: "VILLA-MODERNE",
      assure: "CONSTRUCTEUR MODERNE SARL",
      dateOuverture: "15/06/2025",
      dateSinistre: "10/06/2025",
      statut: "Fermé",
      type: "Construction DO",
      enjeuFinancier: "Moyen",
      expert: "CABINET EXPERTISE",
      derniereAction: "Dossier clôturé"
    }
  ];

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "En cours":
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />{statut}</Badge>;
      case "Expertise":
        return <Badge className="bg-orange-100 text-orange-800"><AlertTriangle className="h-3 w-3 mr-1" />{statut}</Badge>;
      case "Règlement":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />{statut}</Badge>;
      case "Fermé":
        return <Badge className="bg-gray-100 text-gray-800"><XCircle className="h-3 w-3 mr-1" />{statut}</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const getEnjeuBadge = (enjeu: string) => {
    switch (enjeu) {
      case "Élevé":
        return <Badge variant="destructive">{enjeu}</Badge>;
      case "Moyen":
        return <Badge className="bg-yellow-100 text-yellow-800">{enjeu}</Badge>;
      case "Faible":
        return <Badge className="bg-green-100 text-green-800">{enjeu}</Badge>;
      default:
        return <Badge variant="secondary">{enjeu}</Badge>;
    }
  };

  const filteredSinistres = sinistres.filter(sinistre => {
    const matchesSearch = sinistre.numeroContrat.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sinistre.assure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sinistre.chantier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || sinistre.statut === filterStatus;
    const matchesType = filterType === "all" || sinistre.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: sinistres.length,
    enCours: sinistres.filter(s => s.statut === "En cours").length,
    expertise: sinistres.filter(s => s.statut === "Expertise").length,
    reglement: sinistres.filter(s => s.statut === "Règlement").length
  };

  const handleSinistreClick = (sinistre: any) => {
    // Pour le contrat 20041732072, rediriger vers la page de synthèse
    if (sinistre.numeroContrat === "20041732072") {
      navigate(`/sinistre/synthesis/${sinistre.id}`);
    } else {
      // Pour les autres, rediriger vers la page détail
      navigate(`/sinistre/${sinistre.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Dashboard Sinistres</h2>
          <Badge variant="secondary" className="ml-2">
            {stats.total} sinistres
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={() => navigate("/sinistre/declaration")} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau sinistre
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total sinistres</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En cours</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.enCours}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En expertise</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.expertise}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En règlement</p>
                  <p className="text-2xl font-bold text-green-600">{stats.reglement}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par contrat, assuré ou chantier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Expertise">Expertise</SelectItem>
                  <SelectItem value="Règlement">Règlement</SelectItem>
                  <SelectItem value="Fermé">Fermé</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Construction DO">Construction DO</SelectItem>
                  <SelectItem value="Rénovation">Rénovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Liste des sinistres ({filteredSinistres.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Contrat</TableHead>
                  <TableHead>Chantier</TableHead>
                  <TableHead>Assuré</TableHead>
                  <TableHead>Date ouverture</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Enjeu</TableHead>
                  <TableHead>Expert</TableHead>
                  <TableHead>Dernière action</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSinistres.map((sinistre) => (
                  <TableRow key={sinistre.id} className={sinistre.isNew ? "bg-blue-50" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {sinistre.numeroContrat}
                        {sinistre.isNew && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Nouveau
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        {sinistre.chantier}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="max-w-[200px] truncate">{sinistre.assure}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {sinistre.dateOuverture}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(sinistre.statut)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{sinistre.type}</Badge>
                    </TableCell>
                    <TableCell>
                      {getEnjeuBadge(sinistre.enjeuFinancier)}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {sinistre.expert}
                    </TableCell>
                    <TableCell className="max-w-[180px] truncate text-sm text-gray-600">
                      {sinistre.derniereAction}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSinistreClick(sinistre)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SinistresDashboard;
