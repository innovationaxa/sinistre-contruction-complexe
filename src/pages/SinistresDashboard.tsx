
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, FileText, Calendar, User, Building } from "lucide-react";

const SinistresDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - incluant le nouveau sinistre créé
  const sinistres = [
    {
      id: "1",
      numero: "000020077733973",
      corporel: "RC et connexes",
      typeEvenement: "Construction - RC / RCD",
      dateSurvenance: "01/07/2015",
      produit: "Construction - RC / RCD",
      partieLesee: "LEPAGE EDEN",
      statut: "En cours",
      contrat: "000000982734404",
      assure: "LEPAGE EDEN",
      conseiller: "Helene HARRY LEON",
      casDeclaration: "RC/RCD : Avec expertise",
      dateOuverture: "30/07/2015",
      etapesGestion: "En cours d'expertise"
    },
    {
      id: "2",
      numero: "000020175600973",
      corporel: "RC et/ou dommages cours chantier",
      typeEvenement: "Construction - RC / RCD",
      dateSurvenance: "12/01/2017",
      produit: "Construction - RC / RCD",
      partieLesee: "EL MAHMOUD MARINE",
      statut: "Ébauche",
      contrat: "000005276749404",
      assure: "EL MAHMOUD MARINE",
      conseiller: "Helene HARRY LEON",
      casDeclaration: "Sans expertise : Demande d'informations",
      dateOuverture: "12/01/2017",
      etapesGestion: "Ébauche"
    },
    {
      id: "3",
      numero: "000020184868573",
      corporel: "RC et connexes",
      typeEvenement: "Construction - RC / RCD",
      dateSurvenance: "13/03/2017",
      produit: "Construction - RC / RCD",
      partieLesee: "GUILLOUX TAO",
      statut: "En cours",
      contrat: "000000673103004",
      assure: "GUILLOUX TAO",
      conseiller: "Helene HARRY LEON",
      casDeclaration: "RC/RCD : Avec expertise",
      dateOuverture: "13/03/2017",
      etapesGestion: "En cours d'expertise"
    },
    {
      id: "new",
      numero: "000020240101001",
      corporel: "RC et connexes",
      typeEvenement: "Construction - RC / RCD",
      dateSurvenance: new Date().toLocaleDateString("fr-FR"),
      produit: "Construction - RC / RCD",
      partieLesee: "Nouveau Client",
      statut: "En cours",
      contrat: "000000000000001",
      assure: "Entreprise de Bâtiment",
      conseiller: "Helene HARRY LEON",
      casDeclaration: "RC/RCD : En attente expertise",
      dateOuverture: new Date().toLocaleDateString("fr-FR"),
      etapesGestion: "Déclaration reçue"
    }
  ];

  const filteredSinistres = sinistres.filter(sinistre => {
    const matchesSearch = sinistre.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sinistre.assure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sinistre.partieLesee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || sinistre.statut.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en cours':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'clos':
        return 'bg-green-500 hover:bg-green-600';
      case 'ébauche':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'suspendu':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const stats = {
    total: sinistres.length,
    enCours: sinistres.filter(s => s.statut === "En cours").length,
    ebauche: sinistres.filter(s => s.statut === "Ébauche").length,
    nouveaux: sinistres.filter(s => s.id === "new").length
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sinistres</h1>
          <p className="text-gray-600">Gestion de vos dossiers sinistres</p>
        </div>
        <Link to="/sinistre/declaration">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle déclaration
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sinistres</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.enCours}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ébauches</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.ebauche}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.nouveaux}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filtres et recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par numéro, assuré, partie lésée..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="en cours">En cours</SelectItem>
                  <SelectItem value="ébauche">Ébauche</SelectItem>
                  <SelectItem value="clos">Clos</SelectItem>
                  <SelectItem value="suspendu">Suspendu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des sinistres</CardTitle>
          <CardDescription>
            {filteredSinistres.length} sinistre(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Numéro</TableHead>
                  <TableHead>Type d'événement</TableHead>
                  <TableHead>Date survenance</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Partie lésée</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Assuré</TableHead>
                  <TableHead>Conseiller</TableHead>
                  <TableHead>Cas déclaration</TableHead>
                  <TableHead>Date ouverture</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSinistres.map((sinistre) => (
                  <TableRow 
                    key={sinistre.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.location.href = `/sinistre/${sinistre.id}`}
                  >
                    <TableCell className="font-medium text-blue-600">
                      {sinistre.numero}
                    </TableCell>
                    <TableCell>{sinistre.typeEvenement}</TableCell>
                    <TableCell>{sinistre.dateSurvenance}</TableCell>
                    <TableCell>{sinistre.produit}</TableCell>
                    <TableCell className="font-medium">{sinistre.partieLesee}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(sinistre.statut)} text-white text-xs`}>
                        {sinistre.statut}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-blue-600 font-medium">{sinistre.assure}</TableCell>
                    <TableCell>{sinistre.conseiller}</TableCell>
                    <TableCell>{sinistre.casDeclaration}</TableCell>
                    <TableCell>{sinistre.dateOuverture}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SinistresDashboard;
