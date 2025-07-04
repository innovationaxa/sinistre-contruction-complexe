import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Upload, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { TabsManager } from "@/components/TabsManager";

const SinistreDeclaration = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();

  const [formData, setFormData] = useState({
    assureur: "",
    numPolice: "",
    typeSinistre: "",
    dateSinistre: "",
    lieuSinistre: "",
    description: "",
    documents: [] as File[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prevData => ({
        ...prevData,
        documents: [...prevData.documents, ...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you would typically handle the form submission, like sending the data to an API
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <TabsManager />
      <div className="flex items-center gap-4 px-6 py-3 bg-white border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">Déclaration de sinistre</h2>
      </div>
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assureur">Assureur</Label>
                  <Input
                    type="text"
                    id="assureur"
                    name="assureur"
                    value={formData.assureur}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="numPolice">Numéro de police</Label>
                  <Input
                    type="text"
                    id="numPolice"
                    name="numPolice"
                    value={formData.numPolice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="typeSinistre">Type de sinistre</Label>
                <Select onValueChange={(value) => handleSelectChange(value, "typeSinistre")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="degats-des-eaux">Dégâts des eaux</SelectItem>
                    <SelectItem value="incendie">Incendie</SelectItem>
                    <SelectItem value="vol">Vol</SelectItem>
                    {/* Add more options as needed */}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateSinistre">Date du sinistre</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={fr}
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="lieuSinistre">Lieu du sinistre</Label>
                  <Input
                    type="text"
                    id="lieuSinistre"
                    name="lieuSinistre"
                    value={formData.lieuSinistre}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description du sinistre</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Décrivez les circonstances du sinistre"
                />
              </div>

              <div>
                <Label htmlFor="documents">
                  Documents justificatifs
                  <span className="ml-2 text-xs text-gray-500">
                    (Factures, constats, photos...)
                  </span>
                </Label>
                <Input
                  type="file"
                  id="documents"
                  name="documents"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label htmlFor="documents" className="inline-flex items-center space-x-2 bg-secondary text-secondary-foreground rounded-md px-4 py-2 hover:bg-secondary/80 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <span>Télécharger des fichiers</span>
                </Label>
                {formData.documents.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {formData.documents.map((file, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {file.name} - {(file.size / 1024).toFixed(2)} KB
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSubmit}>
              Envoyer la déclaration
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SinistreDeclaration;
