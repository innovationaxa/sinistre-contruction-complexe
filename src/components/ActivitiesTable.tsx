import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Activity {
  id: string;
  libelle: string;
  description: string;
  type: string;
  reference: string;
  motif: string;
  surtype: string;
  numeroContrat: string;
  typeProduit: string;
  courtier: string;
  assure: string;
  dateDeclaration: string;
  echeance: string;
  dateAffectation: string;
  aiGenerated: {
    description: boolean;
    surtype: boolean;
    motif: boolean;
  };
}

const mockActivities: Activity[] = [
  {
    id: "1",
    libelle: "Traiter la déclaration",
    description: "Sinistre amiable RC Décennale - Dommages structurels observés 3 ans après réception travaux",
    type: "Déclaration",
    reference: "RC-DECA-2024-001",
    motif: "Mise en cause RC Décennale",
    surtype: "Dommages ouvrage - Préjudice immatériel",
    numeroContrat: "DECA-2021-4567",
    typeProduit: "RC Décennale",
    courtier: "Agent AXA Lyon Centre",
    assure: "SARL Bâti Construct",
    dateDeclaration: "28/09/2024",
    echeance: "15/10/2024",
    dateAffectation: "02/10/2024",
    aiGenerated: {
      description: true,
      surtype: true,
      motif: false,
    },
  },
  {
    id: "2",
    libelle: "Traiter la déclaration",
    description: "Sinistre amiable RC Décennale - Infiltrations toiture causant perte exploitation commerciale",
    type: "Déclaration",
    reference: "RC-DECA-2024-002",
    motif: "Mise en cause RC Décennale",
    surtype: "Infiltrations - Perte d'exploitation",
    numeroContrat: "DECA-2020-8901",
    typeProduit: "RC Décennale",
    courtier: "Courtier Assur Pro",
    assure: "Entreprise Toiture Plus",
    dateDeclaration: "29/09/2024",
    echeance: "16/10/2024",
    dateAffectation: "03/10/2024",
    aiGenerated: {
      description: true,
      surtype: true,
      motif: true,
    },
  },
  {
    id: "3",
    libelle: "Traiter la déclaration",
    description: "Sinistre amiable RC Décennale - Fissures fondations impactant activité commerciale du MO",
    type: "Déclaration",
    reference: "RC-DECA-2024-003",
    motif: "Mise en cause RC Décennale",
    surtype: "Défauts fondations - CA perdu",
    numeroContrat: "DECA-2019-2345",
    typeProduit: "RC Décennale",
    courtier: "Agent AXA Marseille",
    assure: "Fondations Expert SARL",
    dateDeclaration: "30/09/2024",
    echeance: "17/10/2024",
    dateAffectation: "04/10/2024",
    aiGenerated: {
      description: true,
      surtype: false,
      motif: true,
    },
  },
];

export function ActivitiesTable() {
  const [activities] = useState<Activity[]>(mockActivities);
  const navigate = useNavigate();

  const AIIndicator = () => (
    <Sparkles className="w-3 h-3 text-purple-600 inline ml-1" />
  );

  const handleRowClick = (activityId: string) => {
    navigate(`/sinistre/${activityId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-300">
      <div className="p-4 border-b border-gray-300 bg-blue-50">
        <h2 className="text-lg font-bold text-gray-900">Activités de déclaration - RC Décennale</h2>
      </div>

      <ScrollArea className="w-full">
        <div className="min-w-[1400px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-100">
                <TableHead className="w-8 font-bold text-gray-900 text-xs">
                  <input type="checkbox" className="rounded border-2 border-gray-400" />
                </TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[120px]">Libellé</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[200px]">Description</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[80px]">Type</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[120px]">Référence</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[140px]">Motif</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[160px]">Surtype</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[100px]">Contrat</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[80px]">Produit</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[140px]">Courtier/Agent</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[140px]">Assuré</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[100px]">Date déclaration</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[80px]">Échéance</TableHead>
                <TableHead className="font-bold text-gray-900 text-xs min-w-[100px]">Date affectation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow 
                  key={activity.id} 
                  className="hover:bg-blue-50 border-b border-gray-200 cursor-pointer text-xs"
                  onClick={() => handleRowClick(activity.id)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded border-2 border-gray-400" />
                  </TableCell>
                  <TableCell className="font-semibold text-blue-700 hover:text-blue-900 hover:underline">
                    {activity.libelle}
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <div className="flex items-start">
                      <span className="text-xs text-gray-800 line-clamp-2">
                        {activity.description}
                      </span>
                      {activity.aiGenerated.description && <AIIndicator />}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-800 font-medium">{activity.type}</TableCell>
                  <TableCell className="font-mono text-xs text-gray-800 font-medium">{activity.reference}</TableCell>
                  <TableCell className="text-gray-800">
                    <div className="flex items-center">
                      {activity.motif}
                      {activity.aiGenerated.motif && <AIIndicator />}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-800">
                    <div className="flex items-center">
                      {activity.surtype}
                      {activity.aiGenerated.surtype && <AIIndicator />}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-800 font-medium">{activity.numeroContrat}</TableCell>
                  <TableCell className="text-gray-800">{activity.typeProduit}</TableCell>
                  <TableCell className="text-gray-800">{activity.courtier}</TableCell>
                  <TableCell className="text-gray-800 font-medium">{activity.assure}</TableCell>
                  <TableCell className="text-gray-800 font-medium">{activity.dateDeclaration}</TableCell>
                  <TableCell className="text-gray-800 font-medium">{activity.echeance}</TableCell>
                  <TableCell className="text-gray-800">{activity.dateAffectation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}
