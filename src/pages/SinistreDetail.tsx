
import { useParams } from "react-router-dom";
import { ArrowLeft, FileText, User, Calendar, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const SinistreDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sinistre #{id}</h1>
            <p className="text-gray-600">RC Décennale - Entreprise de bâtiment</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="synthese" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="synthese">Synthèse</TabsTrigger>
            <TabsTrigger value="contrat">Vie du contrat</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
            <TabsTrigger value="analyse">Analyse IA</TabsTrigger>
          </TabsList>

          <TabsContent value="synthese" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Déclaration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Date:</span> 15/03/2024</p>
                    <p><span className="font-medium">Canal:</span> Email</p>
                    <p><span className="font-medium">Urgence:</span> <Badge variant="destructive">Élevée</Badge></p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-green-600" />
                    Assuré
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Nom:</span> BTP Constructions SARL</p>
                    <p><span className="font-medium">Activité:</span> Gros œuvre</p>
                    <p><span className="font-medium">CA:</span> 2,5M€</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    Estimation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Montant:</span> 150 000€</p>
                    <p><span className="font-medium">Provision:</span> 120 000€</p>
                    <p><span className="font-medium">Franchise:</span> 3 000€</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Synthèse de la déclaration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">
                    <strong>Contexte :</strong> L'assuré BTP Constructions SARL a réalisé des travaux de gros œuvre 
                    pour un centre commercial en 2019. 5 ans après la réception des travaux, des fissures importantes 
                    sont apparues sur la structure porteuse, entraînant la fermeture temporaire du centre.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Dommages :</strong> Fissures structurelles, déformation de dalle, infiltrations d'eau. 
                    Le propriétaire (SCI Commerce Plus) réclame la réparation des dommages matériels ainsi que 
                    l'indemnisation de la perte d'exploitation des commerçants.
                  </p>
                  <p className="text-gray-700">
                    <strong>Enjeux :</strong> Mise en jeu de la garantie décennale, expertise technique nécessaire, 
                    préjudice immatériel important lié à la fermeture du centre commercial.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contrat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Garanties du contrat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>RC Décennale</span>
                      <Badge variant="secondary">5M€</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>RC Exploitation</span>
                      <Badge variant="secondary">1M€</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Dommages aux biens confiés</span>
                      <Badge variant="secondary">500K€</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Timeline du contrat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div>
                        <p className="font-medium">Souscription</p>
                        <p className="text-sm text-gray-600">01/01/2018</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <div>
                        <p className="font-medium">Dernier renouvellement</p>
                        <p className="text-sm text-gray-600">01/01/2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                      <div>
                        <p className="font-medium">Échéance</p>
                        <p className="text-sm text-gray-600">31/12/2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="historique" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sinistres précédents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium">Sinistre #2023-456</p>
                    <p className="text-sm text-gray-600">RC Exploitation - Indemnisé 15 000€</p>
                    <p className="text-xs text-gray-500">Résolu le 15/08/2023</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-medium">Sinistre #2022-789</p>
                    <p className="text-sm text-gray-600">Dommages matériels - Indemnisé 8 500€</p>
                    <p className="text-xs text-gray-500">Résolu le 03/12/2022</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analyse" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyse de conformité</CardTitle>
                <CardDescription>Vérification automatique des éléments du dossier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Garantie applicable</span>
                    <div className="flex items-center gap-2">
                      <Progress value={95} className="w-20" />
                      <Badge variant="secondary">95%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Délai de déclaration</span>
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="w-20" />
                      <Badge variant="secondary">Conforme</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Documents requis</span>
                    <div className="flex items-center gap-2">
                      <Progress value={70} className="w-20" />
                      <Badge variant="outline">Incomplet</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommandations IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm"><strong>Expertise technique :</strong> Mandater un expert structure dans les 48h</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm"><strong>Documents manquants :</strong> Réception des travaux, PV de livraison</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm"><strong>Provision recommandée :</strong> 120 000€ (basée sur sinistres similaires)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SinistreDetail;
