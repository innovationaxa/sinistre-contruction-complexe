
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Euro } from "lucide-react";

interface Garantie {
  nom: string;
  montant: string;
  franchise: string;
}

interface SinistreAnterieur {
  annee: string;
  garanties: Garantie[];
}

const sinistresAnterieurs: SinistreAnterieur[] = [
  {
    annee: "2023",
    garanties: [
      {
        nom: "RC Décennale",
        montant: "12 000€",
        franchise: "500€"
      },
      {
        nom: "Dommages Ouvrage",
        montant: "8 500€",
        franchise: "750€"
      }
    ]
  },
  {
    annee: "2022",
    garanties: [
      {
        nom: "RC Décennale",
        montant: "15 200€",
        franchise: "500€"
      },
      {
        nom: "RC Exploitation",
        montant: "3 400€",
        franchise: "300€"
      }
    ]
  },
  {
    annee: "2021",
    garanties: [
      {
        nom: "RC Décennale",
        montant: "9 800€",
        franchise: "500€"
      }
    ]
  }
];

export const SinistresAnterieurs = () => {
  const totalMontant = sinistresAnterieurs.reduce((total, annee) => {
    return total + annee.garanties.reduce((sousTotal, garantie) => {
      return sousTotal + parseInt(garantie.montant.replace(/[€\s]/g, '').replace(/\s/g, ''));
    }, 0);
  }, 0);

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg">Informations sur les sinistres antérieurs</CardTitle>
          <Badge variant="secondary" className="ml-auto">
            <Euro className="h-3 w-3 mr-1" />
            Total: {totalMontant.toLocaleString()}€
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sinistresAnterieurs.map((annee) => (
            <div key={annee.annee} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-900">Année {annee.annee}</h3>
                <Badge variant="outline">
                  {annee.garanties.length} garantie{annee.garanties.length > 1 ? 's' : ''}
                </Badge>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Garantie</TableHead>
                    <TableHead className="text-right">Montant réglé</TableHead>
                    <TableHead className="text-right">Franchise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {annee.garanties.map((garantie, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{garantie.nom}</TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        {garantie.montant}
                      </TableCell>
                      <TableCell className="text-right text-gray-600">
                        {garantie.franchise}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total pour {annee.annee}:</span>
                  <span className="font-semibold text-gray-900">
                    {annee.garanties.reduce((total, garantie) => {
                      return total + parseInt(garantie.montant.replace(/[€\s]/g, ''));
                    }, 0).toLocaleString()}€
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">Récapitulatif général</h4>
              <p className="text-sm text-blue-700">
                Montants réglés sur les 3 dernières années
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">
                {totalMontant.toLocaleString()}€
              </div>
              <div className="text-sm text-blue-700">
                {sinistresAnterieurs.reduce((total, annee) => total + annee.garanties.length, 0)} sinistres réglés
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
