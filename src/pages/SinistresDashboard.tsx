
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const SinistresDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const sinistres = [
    {
      id: "20041732073",
      type: "Construction DO",
      statut: "Déclaration en cours",
      dateOuverture: "01/07/2025",
      dateDeclaration: "29/08/2025",
      chantier: "TEST",
      assure: "LOU APOLLINARY MARIAN TEDDIE",
      courtier: "ASS COURT CONSEILS SERVIC",
      evenement: "Dommages Ouvrage",
      enjeuFinancier: "Moyen",
      expertise: "Avec expertise"
    },
    {
      id: "20041732074",
      type: "RC Décennale",
      statut: "En expertise",
      dateOuverture: "15/06/2025",
      dateDeclaration: "20/06/2025",
      chantier: "PROJ001",
      assure: "ENTREPRISE MARTIN SAS",
      courtier: "CABINET DURAND",
      evenement: "Fissures structurelles",
      enjeuFinancier: "Élevé",
      expertise: "Expertise en cours"
    },
    {
      id: "20041732075",
      type: "Construction DO",
      statut: "Clos",
      dateOuverture: "10/05/2025",
      dateDeclaration: "12/05/2025",
      chantier: "VILLA_02",
      assure: "SARL CONSTRUCTION PLUS",
      courtier: "ASSURANCES CONSEIL",
      evenement: "Infiltrations d'eau",
      enjeuFinancier: "Faible",
      expertise: "Expertise terminée"
    }
  ];

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Déclaration en cours":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En cours</Badge>;
      case "En expertise":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Expertise</Badge>;
      case "Clos":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Clos</Badge>;
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  const handleSinistreClick = (sinistreId: string) => {
    if (sinistreId === "20041732073") {
      navigate(`/sinistre/synthesis/${sinistreId}`);
    }
  };

  const filteredSinistres = sinistres.filter(sinistre => {
    const matchesSearch = sinistre.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sinistre.assure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sinistre.chantier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sinistre.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* En-tête */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sinistres en cours</h1>
              <p className="text-gray-600">Gestion et suivi de vos déclarations</p>
            </div>
            <Button onClick={() => navigate("/sinistre/declaration")} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle déclaration
            </Button>
          </div>

          {/* Filtres et recherche */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par numéro, assuré ou chantier..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="Déclaration en cours">En cours</SelectItem>
                    <SelectItem value="En expertise">En expertise</SelectItem>
                    <SelectItem value="Clos">Clos</SelectItem>
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
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">N° Sinistre</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Statut</TableHead>
                      <TableHead className="font-semibold">Date ouverture</TableHead>
                      <TableHead className="font-semibold">Chantier</TableHead>
                      <TableHead className="font-semibold">Assuré</TableHead>
                      <TableHead className="font-semibold">Courtier</TableHead>
                      <TableHead className="font-semibold">Événement</TableHead>
                      <TableHead className="font-semibold">Enjeu</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSinistres.map((sinistre, index) => (
                      <TableRow 
                        key={sinistre.id}
                        className={`hover:bg-gray-50 ${index === 0 ? 'cursor-pointer bg-blue-50/30' : ''}`}
                        onClick={() => index === 0 && handleSinistreClick(sinistre.id)}
                      >
                        <TableCell className="font-medium text-blue-600">
                          {sinistre.id}
                        </TableCell>
                        <TableCell>{sinistre.type}</TableCell>
                        <TableCell>{getStatusBadge(sinistre.statut)}</TableCell>
                        <TableCell>{sinistre.dateOuverture}</TableCell>
                        <TableCell className="font-medium">{sinistre.chantier}</TableCell>
                        <TableCell>{sinistre.assure}</TableCell>
                        <TableCell className="text-sm text-gray-600">{sinistre.courtier}</TableCell>
                        <TableCell className="text-sm">{sinistre.evenement}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            sinistre.enjeuFinancier === "Élevé" ? "text-red-700 border-red-200" :
                            sinistre.enjeuFinancier === "Moyen" ? "text-orange-700 border-orange-200" :
                            "text-green-700 border-green-200"
                          }>
                            {sinistre.enjeuFinancier}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{sinistres.filter(s => s.statut === "Déclaration en cours").length}</div>
                <div className="text-sm text-gray-600">En cours</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">{sinistres.filter(s => s.statut === "En expertise").length}</div>
                <div className="text-sm text-gray-600">En expertise</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{sinistres.filter(s => s.statut === "Clos").length}</div>
                <div className="text-sm text-gray-600">Clos</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">{sinistres.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinistresDashboard;
