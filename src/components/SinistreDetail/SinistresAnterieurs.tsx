
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { History, Euro, TrendingUp, TrendingDown } from "lucide-react";

interface SinistreAnterieur {
  annee: string;
  garantie: string;
  montantRegle: number;
  montantProvision: number;
  statut: "regle" | "en_cours" | "ferme";
  reference: string;
}

const sinistresAnterieursData: SinistreAnterieur[] = [
  {
    annee: "2023",
    garantie: "Dommages à l'ouvrage",
    montantRegle: 25000,
    montantProvision: 5000,
    statut: "regle",
    reference: "RC-DECA-2023-045"
  },
  {
    annee: "2023",
    garantie: "Préjudice immatériel",
    montantRegle: 8000,
    montantProvision: 0,
    statut: "ferme",
    reference: "RC-DECA-2023-045"
  },
  {
    annee: "2022",
    garantie: "Dommages à l'ouvrage",
    montantRegle: 45000,
    montantProvision: 0,
    statut: "ferme",
    reference: "RC-DECA-2022-123"
  },
  {
    annee: "2024",
    garantie: "Dommages à l'ouvrage",
    montantRegle: 15000,
    montantProvision: 25000,
    statut: "en_cours",
    reference: "RC-DECA-2024-001"
  },
  {
    annee: "2024",
    garantie: "Préjudice immatériel",
    montantRegle: 12000,
    montantProvision: 8000,
    statut: "en_cours",
    reference: "RC-DECA-2024-001"
  }
];

export const SinistresAnterieurs = () => {
  const getStatutBadgeColor = (statut: string) => {
    switch (statut) {
      case "regle":
        return "bg-green-100 text-green-800";
      case "en_cours":
        return "bg-orange-100 text-orange-800";
      case "ferme":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatutText = (statut: string) => {
    switch (statut) {
      case "regle":
        return "Réglé";
      case "en_cours":
        return "En cours";
      case "ferme":
        return "Fermé";
      default:
        return "Inconnu";
    }
  };

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(montant);
  };

  // Calcul des totaux par année
  const totauxParAnnee = sinistresAnterieursData.reduce((acc, sinistre) => {
    if (!acc[sinistre.annee]) {
      acc[sinistre.annee] = { regle: 0, provision: 0 };
    }
    acc[sinistre.annee].regle += sinistre.montantRegle;
    acc[sinistre.annee].provision += sinistre.montantProvision;
    return acc;
  }, {} as Record<string, { regle: number; provision: number }>);

  const totalGeneral = Object.values(totauxParAnnee).reduce(
    (acc, curr) => ({
      regle: acc.regle + curr.regle,
      provision: acc.provision + curr.provision
    }),
    { regle: 0, provision: 0 }
  );

  return (
    <Card className="border-orange-200">
      <CardHeader className="pb-3 bg-orange-50">
        <CardTitle className="flex items-center gap-2 text-lg text-orange-800">
          <History className="w-5 h-5" />
          Informations sur les sinistres antérieurs
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          {/* Tableau détaillé */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Détail par année et garantie</h4>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Année</TableHead>
                    <TableHead className="font-semibold">Garantie</TableHead>
                    <TableHead className="font-semibold text-right">Montant réglé</TableHead>
                    <TableHead className="font-semibold text-right">Provision</TableHead>
                    <TableHead className="font-semibold text-center">Statut</TableHead>
                    <TableHead className="font-semibold">Référence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sinistresAnterieursData.map((sinistre, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{sinistre.annee}</TableCell>
                      <TableCell>{sinistre.garantie}</TableCell>
                      <TableCell className="text-right font-medium text-green-700">
                        {formatMontant(sinistre.montantRegle)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-orange-700">
                        {sinistre.montantProvision > 0 ? formatMontant(sinistre.montantProvision) : "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatutBadgeColor(sinistre.statut)}>
                          {getStatutText(sinistre.statut)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{sinistre.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Synthèse par année */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Synthèse par année</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(totauxParAnnee)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([annee, totaux]) => (
                  <div key={annee} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-center">
                      <h5 className="font-bold text-lg text-gray-900 mb-2">{annee}</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Réglé:</span>
                          <span className="font-bold text-green-600">{formatMontant(totaux.regle)}</span>
                        </div>
                        {totaux.provision > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Provision:</span>
                            <span className="font-bold text-orange-600">{formatMontant(totaux.provision)}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-800">Total:</span>
                            <span className="font-bold text-gray-900">
                              {formatMontant(totaux.regle + totaux.provision)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Résumé global */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Euro className="w-5 h-5" />
              Résumé global des sinistres antérieurs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Montants réglés</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{formatMontant(totalGeneral.regle)}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-600">Provisions en cours</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{formatMontant(totalGeneral.provision)}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Euro className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Total engagé</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatMontant(totalGeneral.regle + totalGeneral.provision)}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                <strong>Note :</strong> Ces données incluent tous les sinistres liés à l'assuré SARL Bâti Construct 
                depuis 2022. Les montants sont exprimés en euros TTC.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
