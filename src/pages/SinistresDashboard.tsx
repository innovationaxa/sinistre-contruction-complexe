
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, FileText, Calendar, User, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const SinistresDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Données simulées des sinistres, incluant le nouveau créé
  const sinistres = [
    {
      id: "SIN-2024-789456",
      reference: "RC-DECA-2024-004",
      statut: "Ouvert",
      priorite: "Normale",
      dateDeclaration: "04/07/2025",
      dateOuverture: "04/07/2025",
      assure: "LOU APOLLINARY MARIAN TEDDIE",
      courtier: "ASS COURT CONSEILS SERVIC",
      description: "Sinistre Construction DO - Dommages structurels",
      montantReserve: "0 €",
      type: "RC Décennale",
      nouveau: true
    },
    {
      id: "SIN-2024-001",
      reference: "RC-DECA-2024-001",
      statut: "En cours d'expertise",
      priorite: "Normale",
      dateDeclaration: "28/09/2024",
      dateOuverture: "02/10/2024",
      assure: "SARL Bâti Construct",
      courtier: "Agent AXA Lyon Centre",
      description: "Sinistre amiable RC Décennale - Dommages structurels observés 3 ans après réception travaux",
      montantReserve: "150 000 €",
      type: "RC Décennale"
    },
    {
      id: "SIN-2024-002",
      reference: "RC-DECA-2024-002",
      statut: "Expertise terminée",
      priorite: "Élevée",
      dateDeclaration: "29/09/2024",
      dateOuverture: "03/10/2024",
      assure: "Entreprise Toiture Plus",
      courtier: "Courtier Assur Pro",
      description: "Sinistre amiable RC Décennale - Infiltrations toiture causant perte exploitation commerciale",
      montantReserve: "320 000 €",
      type: "RC Décennale"
    },
    {
      id: "SIN-2024-003",
      reference: "RC-DECA-2024-003",
      statut: "Règlement en cours",
      priorite: "Normale",
      dateDeclaration: "30/09/2024",
      dateOuverture: "04/10/2024",
      assure: "Fondations Expert SARL",
      courtier: "Agent AXA Marseille",
      description: "Sinistre amiable RC Décennale - Fissures fondations impactant activité commerciale du MO",
      montantReserve: "85 000 €",
      type: "RC Décennale"
    }
  ];

  // Filtrage des sinistres
  const filteredSinistres = sinistres.filter(sinistre => {
    const matchesSearch = sinistre.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sinistre.assure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sinistre.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sinistre.statut === statusFilter;
    const matchesPriority = priorityFilter === "all" || sinistre.priorite === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Statistiques
  const stats = {
    total: sinistres.length,
    ouvert: sinistres.filter(s => s.statut === "Ouvert").length,
    enCours: sinistres.filter(s => s.statut === "En cours d'expertise").length,
    termine: sinistres.filter(s => s.statut === "Expertise terminée" || s.statut === "Règlement en cours").length
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "Ouvert":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "En cours d'expertise":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "Expertise terminée":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Règlement en cours":
        return <TrendingUp className="w-4 h-4 text-purple-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Ouvert":
        return "bg-orange-100 text-orange-800";
      case "En cours d'expertise":
        return "bg-blue-100 text-blue-800";
      case "Expertise terminée":
        return "bg-green-100 text-green-800";
      case "Règlement en cours":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "Élevée":
        return "bg-red-100 text-red-800";
      case "Normale":
        return "bg-blue-100 text-blue-800";
      case "Faible":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Sinistres</h1>
        <Button onClick={() => navigate("/sinistre/declaration")} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle déclaration
        </Button>
      </div>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total sinistres</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ouverts</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.ouvert}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">En cours</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.enCours}</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Terminés</p>
                    <p className="text-2xl font-bold text-green-600">{stats.termine}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et recherche */}
          <Card>
            <CardHeader>
              <CardTitle>Filtres et recherche</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Rechercher par référence, assuré ou description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="Ouvert">Ouvert</SelectItem>
                    <SelectItem value="En cours d'expertise">En cours d'expertise</SelectItem>
                    <SelectItem value="Expertise terminée">Expertise terminée</SelectItem>
                    <SelectItem value="Règlement en cours">Règlement en cours</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les priorités</SelectItem>
                    <SelectItem value="Élevée">Élevée</SelectItem>
                    <SelectItem value="Normale">Normale</SelectItem>
                    <SelectItem value="Faible">Faible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des sinistres */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des sinistres ({filteredSinistres.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Assuré</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date ouverture</TableHead>
                    <TableHead>Montant réserve</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSinistres.map((sinistre) => (
                    <TableRow 
                      key={sinistre.id} 
                      className={`cursor-pointer hover:bg-gray-50 ${sinistre.nouveau ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                      onClick={() => navigate(`/sinistre/${sinistre.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium">{sinistre.reference}</span>
                          {sinistre.nouveau && (
                            <Badge className="bg-green-100 text-green-800 text-xs">Nouveau</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(sinistre.statut)}
                          <Badge className={`${getStatusColor(sinistre.statut)} text-xs`}>
                            {sinistre.statut}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getPriorityColor(sinistre.priorite)} text-xs`}>
                          {sinistre.priorite}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{sinistre.assure}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 max-w-xs truncate" title={sinistre.description}>
                          {sinistre.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{sinistre.dateOuverture}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-blue-600">{sinistre.montantReserve}</span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/sinistre/${sinistre.id}`);
                          }}
                        >
                          Voir détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SinistresDashboard;
