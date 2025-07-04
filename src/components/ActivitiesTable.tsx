
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <Sparkles className="w-3 h-3 text-purple-700 inline ml-1" />
  );

  const handleRowClick = (activityId: string) => {
    navigate(`/sinistre/${activityId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Activités de déclaration - RC Décennale</h2>
        <div className="flex items-center gap-4 lg:gap-6 mt-3 flex-wrap">
          <span className="text-sm font-bold text-gray-900">Sinistres amiables</span>
          <span className="text-sm font-medium text-gray-700">Mise en cause post-réception</span>
          <span className="text-sm font-medium text-gray-700">Préjudices immatériels</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-8 font-bold text-gray-900 text-xs">
                <input type="checkbox" className="rounded border-2 border-gray-500" />
              </TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[120px]">Libellé</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[200px]">Description</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[100px]">Type</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[140px]">Référence</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[180px]">Motif</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[200px]">Surtype</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[120px]">Contrat</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[100px]">Produit</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[150px]">Courtier/Agent</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[140px]">Assuré</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[110px]">Date déclaration</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[90px]">Échéance</TableHead>
              <TableHead className="font-bold text-gray-900 text-xs min-w-[110px]">Date affectation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow 
                key={activity.id} 
                className="hover:bg-blue-50 border-b border-gray-100 cursor-pointer"
                onClick={() => handleRowClick(activity.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()} className="py-3">
                  <input type="checkbox" className="rounded border-2 border-gray-500" />
                </TableCell>
                <TableCell className="font-bold text-blue-700 hover:text-blue-900 hover:underline text-xs py-3">
                  {activity.libelle}
                </TableCell>
                <TableCell className="max-w-[200px] py-3">
                  <div className="flex items-start">
                    <span className="text-xs text-gray-800 line-clamp-2 font-medium">
                      {activity.description}
                    </span>
                    {activity.aiGenerated.description && <AIIndicator />}
                  </div>
                </TableCell>
                <TableCell className="text-gray-800 font-medium text-xs py-3">{activity.type}</TableCell>
                <TableCell className="font-mono text-xs text-gray-800 font-bold py-3">{activity.reference}</TableCell>
                <TableCell className="text-gray-800 font-medium text-xs py-3">
                  <div className="flex items-center">
                    {activity.motif}
                    {activity.aiGenerated.motif && <AIIndicator />}
                  </div>
                </TableCell>
                <TableCell className="text-gray-800 font-medium text-xs py-3">
                  <div className="flex items-center">
                    {activity.surtype}
                    {activity.aiGenerated.surtype && <AIIndicator />}
                  </div>
                </TableCell>
                <TableCell className="text-gray-800 font-medium text-xs py-3">{activity.numeroContrat}</TableCell>
                <TableCell className="text-gray-800 font-medium text-xs py-3">{activity.typeProduit}</TableCell>
                <TableCell className="text-gray-800 font-medium text-xs py-3">{activity.courtier}</TableCell>
                <TableCell className="text-gray-800 font-medium text-xs py-3">{activity.assure}</TableCell>
                <TableCell className="text-gray-800 font-medium text-xs py-3">{activity.dateDeclaration}</TableCell>
                <TableCell className="text-gray-800 font-medium text-xs py-3">{activity.echeance}</TableCell>
                <TableCell className="text-gray-800 font-medium text-xs py-3">{activity.dateAffectation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
