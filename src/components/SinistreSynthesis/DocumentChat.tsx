
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, X, Bot, User } from "lucide-react";

interface Document {
  id: string;
  nom: string;
  type: string;
  description: string;
  dateModification: string;
  taille: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface DocumentChatProps {
  document: Document | null;
  onClose: () => void;
}

export const DocumentChat = ({ document, onClose }: DocumentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !document) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulation de réponse IA
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Concernant le document "${document.nom}", je peux vous aider à analyser son contenu. Ce document semble contenir des informations importantes sur le dossier sinistre. Que souhaitez-vous savoir spécifiquement ?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSynthesis = async () => {
    if (!document) return;

    const synthesisMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: "Génère une synthèse de ce document",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, synthesisMessage]);
    setIsLoading(true);

    // Simulation de synthèse IA
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `**Synthèse automatique du document "${document.nom}"**

📋 **Type de document**: Rapport d'expertise

🔍 **Points clés identifiés**:
- Évaluation des dommages structurels
- Estimation des coûts de réparation
- Analyse des causes du sinistre
- Recommandations techniques

💰 **Aspects financiers**:
- Montant des dommages évalué
- Répartition des responsabilités
- Impact sur les garanties

⚠️ **Points d'attention**:
- Délais de traitement à respecter
- Documents complémentaires requis
- Expertise contradictoire recommandée

Cette synthèse est générée automatiquement. Pour une analyse plus approfondie, n'hésitez pas à poser des questions spécifiques.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            Chat IA
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        {document && (
          <p className="text-sm text-gray-600 truncate">
            Document: {document.nom}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Zone des messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">
                Commencez une conversation sur ce document ou demandez une synthèse automatique.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="p-2 bg-purple-100 rounded-full shrink-0">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  {message.type === 'user' && (
                    <div className="p-2 bg-blue-100 rounded-full shrink-0">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                      <span className="text-sm text-gray-600">IA en train de réfléchir...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Zone de saisie */}
        <div className="border-t p-4 space-y-3">
          <Button
            onClick={handleSynthesis}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            disabled={!document || isLoading}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Synthèse IA
          </Button>

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez une question sur ce document..."
              disabled={!document || isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || !document || isLoading}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
