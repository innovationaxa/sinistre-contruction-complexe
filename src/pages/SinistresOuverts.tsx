
import { Header } from "@/components/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const SinistresOuverts = () => {
  const navigate = useNavigate();
  
  const sinistres = [
    {
      id: "RC/RCD-2024-001",
      dateDeclaration: "15/01/2024",
      typeIncident: "Dégât des eaux",
      statut: "En cours d'expertise",
      montantEstime: "3 500 €",
      expert: "Jean Dupont"
    },
    {
      id: "RC/RCD-2024-002", 
      dateDeclaration: "22/01/2024",
      typeIncident: "Incendie",
      statut: "Documents requis",
      montantEstime: "15 000 €",
      expert: "Marie Martin"
    },
    {
      id: "RC/RCD-2024-003",
      dateDeclaration: "28/01/2024", 
      typeIncident: "Vol",
      statut: "Enquête en cours",
      montantEstime: "2 800 €",
      expert: "Pierre Dubois"
    }
  ];

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "En cours d'expertise":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En cours d'expertise</Badge>;
      case "Documents requis":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Documents requis</Badge>;
      case "Enquête en cours":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Enquête en cours</Badge>;
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  const handleRowClick = (sinistreId: string) => {
    navigate(`/sinistre/synthesis/${sinistreId}`);
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <Header />
      <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Sinistres Ouverts</h2>
      </div>
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Sinistre</TableHead>
                <TableHead>Date de déclaration</TableHead>
                <TableHead>Type d'incident</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Montant estimé</TableHead>
                <TableHead>Expert assigné</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sinistres.map((sinistre) => (
                <TableRow 
                  key={sinistre.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(sinistre.id)}
                >
                  <TableCell className="font-medium text-blue-600">{sinistre.id}</TableCell>
                  <TableCell>{sinistre.dateDeclaration}</TableCell>
                  <TableCell>{sinistre.typeIncident}</TableCell>
                  <TableCell>{getStatusBadge(sinistre.statut)}</TableCell>
                  <TableCell className="font-semibold">{sinistre.montantEstime}</TableCell>
                  <TableCell>{sinistre.expert}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default SinistresOuverts;
