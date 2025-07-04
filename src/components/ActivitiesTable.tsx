
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
  typeContrat: string;
  enDelegation: string;
  dateArrivee: string;
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
    description: "Déclaration de sinistre construction - Fissures apparues sur mur porteur suite aux intempéries",
    type: "Déclaration",
    reference: "0000007215042404",
    motif: "Déclaration de sinistre",
    surtype: "Dommages ouvrage construction",
    numeroContrat: "CONST-2024-001",
    typeProduit: "Construction - Dommages ouvrage",
    typeContrat: "Oui",
    enDelegation: "28/09/2024 11:37",
    dateArrivee: "01/10/2024",
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
    description: "Déclaration de malfaçons - Infiltrations d'eau par la toiture nouvellement construite",
    type: "Déclaration",
    reference: "0000007215042405",
    motif: "Déclaration de sinistre",
    surtype: "Malfaçons construction",
    numeroContrat: "CONST-2024-002",
    typeProduit: "Construction - RC Décennale",
    typeContrat: "Non",
    enDelegation: "29/09/2024 14:22",
    dateArrivee: "02/10/2024",
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
    description: "Déclaration de désordres structurels - Affaissement de plancher dans bâtiment neuf",  
    type: "Déclaration",
    reference: "0000007215042406",
    motif: "Déclaration de sinistre",
    surtype: "Défauts structurels",
    numeroContrat: "CONST-2024-003",
    typeProduit: "Construction - Tous risques chantier",
    typeContrat: "Oui",
    enDelegation: "30/09/2024 09:15",
    dateArrivee: "03/10/2024",
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

  const AIIndicator = () => (
    <Sparkles className="w-3 h-3 text-purple-600 inline ml-1" />
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-300">
      <div className="p-6 border-b border-gray-300">
        <h2 className="text-xl font-semibold text-gray-900">Activités de déclaration</h2>
        <div className="flex items-center gap-6 mt-3">
          <span className="text-sm font-medium text-gray-800">Activités</span>
          <span className="text-sm text-gray-700">Toutes les déclarations</span>
          <span className="text-sm text-gray-700">Affecter</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="w-12 font-semibold text-gray-900">
                <input type="checkbox" className="rounded border-2 border-gray-400" />
              </TableHead>
              <TableHead className="font-semibold text-gray-900">Libellé</TableHead>
              <TableHead className="font-semibold text-gray-900">Description</TableHead>
              <TableHead className="font-semibold text-gray-900">Type</TableHead>
              <TableHead className="font-semibold text-gray-900">Référence DARVA</TableHead>
              <TableHead className="font-semibold text-gray-900">Motif</TableHead>
              <TableHead className="font-semibold text-gray-900">Surtype</TableHead>
              <TableHead className="font-semibold text-gray-900">Numéro du contrat</TableHead>
              <TableHead className="font-semibold text-gray-900">Type de Produit</TableHead>
              <TableHead className="font-semibold text-gray-900">Type du contrat</TableHead>
              <TableHead className="font-semibold text-gray-900">En délégation</TableHead>
              <TableHead className="font-semibold text-gray-900">Date d'arrivée</TableHead>
              <TableHead className="font-semibold text-gray-900">Échéance</TableHead>
              <TableHead className="font-semibold text-gray-900">Date d'affectation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id} className="hover:bg-gray-50 border-b border-gray-200">
                <TableCell>
                  <input type="checkbox" className="rounded border-2 border-gray-400" />
                </TableCell>
                <TableCell className="font-medium text-blue-700 hover:text-blue-900 hover:underline cursor-pointer">
                  {activity.libelle}
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="flex items-start">
                    <span className="text-sm text-gray-800 line-clamp-2">
                      {activity.description}
                    </span>
                    {activity.aiGenerated.description && <AIIndicator />}
                  </div>
                </TableCell>
                <TableCell className="text-gray-800">{activity.type}</TableCell>
                <TableCell className="font-mono text-sm text-gray-800">{activity.reference}</TableCell>
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
                <TableCell className="text-gray-800">{activity.numeroContrat}</TableCell>
                <TableCell className="text-gray-800">{activity.typeProduit}</TableCell>
                <TableCell className="text-gray-800">{activity.typeContrat}</TableCell>
                <TableCell className="text-gray-800">{activity.enDelegation}</TableCell>
                <TableCell className="text-gray-800">{activity.dateArrivee}</TableCell>
                <TableCell className="text-gray-800">{activity.echeance}</TableCell>
                <TableCell className="text-gray-800">{activity.dateAffectation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
