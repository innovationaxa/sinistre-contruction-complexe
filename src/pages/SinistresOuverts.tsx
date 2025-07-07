
import { Header } from "@/components/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const SinistresOuverts = () => {
  const navigate = useNavigate();
  
  const sinistres = [
    {
      id: "SIN-2024-001",
      dateDeclaration: "15/01/2024",
      typeContrat: "RC/RCD",
      statut: "Nouveau",
      montantEstime: "3 500 €",
      expert: "Jean Dupont",
      priorite: "haute"
    },
    {
      id: "SIN-2024-002", 
      dateDeclaration: "22/01/2024",
      typeContrat: "RC/RCD",
      statut: "Documents requis",
      montantEstime: "15 000 €",
      expert: "Marie Martin",
      priorite: "moyenne"
    },
    {
      id: "SIN-2024-003",
      dateDeclaration: "28/01/2024", 
      typeContrat: "RC/RCD",
      statut: "Enquête en cours",
      montantEstime: "2 800 €",
      expert: "Pierre Dubois",
      priorite: "basse"
    }
  ];

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Nouveau":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Nouveau</Badge>;
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

  const getPriorityIndicator = (priorite: string) => {
    switch (priorite) {
      case "haute":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-red-700 font-medium">Rouge</span>
          </div>
        );
      case "moyenne":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-orange-700 font-medium">Orange</span>
          </div>
        );
      case "basse":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-yellow-700 font-medium">Jaune</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span className="text-xs text-gray-500 font-medium">Neutre</span>
          </div>
        );
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
                <TableHead>Type de contrat</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Priorité</TableHead>
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
                  <TableCell>{sinistre.typeContrat}</TableCell>
                  <TableCell>{getStatusBadge(sinistre.statut)}</TableCell>
                  <TableCell>{getPriorityIndicator(sinistre.priorite)}</TableCell>
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
