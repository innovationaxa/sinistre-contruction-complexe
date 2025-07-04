
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface Activity {
  id: string;
  libelle: string;
  description: string;
  type: string;
  reference: string;
  motif: string;
  statut: string;
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
    description: "Déclaration de sinistre auto suite à collision - Évaluation des dommages et coordination avec l'expert",
    type: "Courrier",
    reference: "0000007215042404",
    motif: "Avis d'ouverture",
    statut: "Ouverte",
    surtype: "Sinistre automobile",
    numeroContrat: "Construction",
    typeProduit: "Construction - RC / RCD",
    typeContrat: "Oui",
    enDelegation: "28/09/2016 11:37",
    dateArrivee: "01/10/2016",
    echeance: "02/07/2025",
    dateAffectation: "02/07/2025",
    aiGenerated: {
      description: true,
      surtype: true,
      motif: false,
    },
  },
  {
    id: "2",
    libelle: "Valider le règlement",
    description: "Contrôle automatisé du montant et validation des pièces justificatives - Prêt pour paiement",
    type: "Validation",
    reference: "0000007215042405",
    motif: "Demande de règlement",
    statut: "En cours",
    surtype: "Indemnisation habitation",
    numeroContrat: "Habitation",
    typeProduit: "Habitation - MRH",
    typeContrat: "Non",
    enDelegation: "29/09/2016 14:22",
    dateArrivee: "02/10/2016",
    echeance: "03/07/2025",
    dateAffectation: "03/07/2025",
    aiGenerated: {
      description: true,
      surtype: true,
      motif: true,
    },
  },
  {
    id: "3",
    libelle: "Expertise technique",
    description: "Mission d'expertise requise pour évaluation précise des dommages - Coordination avec expert externe",
    type: "Expertise",
    reference: "0000007215042406",
    motif: "Expertise requise",
    statut: "Planifiée",
    surtype: "Expertise bâtiment",
    numeroContrat: "Pro",
    typeProduit: "Professionnel - RC",
    typeContrat: "Oui",
    enDelegation: "30/09/2016 09:15",
    dateArrivee: "03/10/2016",
    echeance: "04/07/2025",
    dateAffectation: "04/07/2025",
    aiGenerated: {
      description: true,
      surtype: false,
      motif: true,
    },
  },
];

export function ActivitiesTable() {
  const [activities] = useState<Activity[]>(mockActivities);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Ouverte":
        return "bg-green-100 text-green-800";
      case "En cours":
        return "bg-blue-100 text-blue-800";
      case "Planifiée":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const AIIndicator = () => (
    <Sparkles className="w-3 h-3 text-purple-500 inline ml-1" />
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Ma Corbeille</h2>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm text-gray-600">Activités</span>
          <span className="text-sm text-gray-600">Toutes les activités</span>
          <span className="text-sm text-gray-600">Affecter</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead>Libellé</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Référence DARVA</TableHead>
              <TableHead>Motif</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Surtype</TableHead>
              <TableHead>Numéro du contrat</TableHead>
              <TableHead>Type de Produit</TableHead>
              <TableHead>Type du contrat</TableHead>
              <TableHead>En délégation</TableHead>
              <TableHead>Date d'arrivée</TableHead>
              <TableHead>Échéance</TableHead>
              <TableHead>Date d'affectation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id} className="hover:bg-gray-50">
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell className="font-medium text-blue-600 hover:underline cursor-pointer">
                  {activity.libelle}
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="flex items-start">
                    <span className="text-sm text-gray-700 line-clamp-2">
                      {activity.description}
                    </span>
                    {activity.aiGenerated.description && <AIIndicator />}
                  </div>
                </TableCell>
                <TableCell>{activity.type}</TableCell>
                <TableCell className="font-mono text-sm">{activity.reference}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {activity.motif}
                    {activity.aiGenerated.motif && <AIIndicator />}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(activity.statut)}>
                    {activity.statut}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {activity.surtype}
                    {activity.aiGenerated.surtype && <AIIndicator />}
                  </div>
                </TableCell>
                <TableCell>{activity.numeroContrat}</TableCell>
                <TableCell>{activity.typeProduit}</TableCell>
                <TableCell>{activity.typeContrat}</TableCell>
                <TableCell>{activity.enDelegation}</TableCell>
                <TableCell>{activity.dateArrivee}</TableCell>
                <TableCell>{activity.echeance}</TableCell>
                <TableCell>{activity.dateAffectation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
