
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const SinistresAnterieurs = () => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        <p>Aucun sinistre antérieur enregistré pour ce dossier.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-600">Sinistres cette année</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">0 €</div>
          <div className="text-sm text-gray-600">Montant total réglé</div>
        </div>
      </div>
    </div>
  );
};
