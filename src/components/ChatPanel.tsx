
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, FileText, Calendar } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
  attachments?: string[];
}

export const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Bonjour ! Je suis votre assistant IA pour ce dossier de sinistre. Je peux vous aider à analyser les documents, répondre à vos questions sur le dossier, ou vous suggérer les prochaines actions à entreprendre. Comment puis-je vous aider ?",
      timestamp: "2024-03-15T10:00:00"
    },
    {
      id: "2",
      type: "user",
      content: "Peux-tu me résumer l'état d'avancement du dossier ?",
      timestamp: "2024-03-15T10:01:00"
    },
    {
      id: "3",
      type: "ai",
      content: "Voici un résumé de l'état d'avancement du dossier SIN-2024-001234 :\n\n✅ **Ouverture** : Dossier ouvert le 15/03/2024\n✅ **Expert assigné** : Cabinet EXPERTISE CONSEIL\n🔄 **Expertise** : En cours depuis le 22/03/2024\n⚠️ **Rapport d'expertise** : En retard (échéance dépassée du 05/04/2024)\n\n**Points d'attention :**\n- Relance de l'expert nécessaire\n- Attestation d'assurance du témoin manquante\n\n**Prochaines étapes recommandées :**\n1. Relancer l'expert par téléphone\n2. Demander l'attestation manquante à l'assuré",
      timestamp: "2024-03-15T10:02:00",
      attachments: ["Rapport d'avancement", "Liste des pièces manquantes"]
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulation d'une réponse IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Je traite votre demande. Basé sur l'analyse des documents du dossier et des informations disponibles, voici ma réponse...",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const suggestedQuestions = [
    "Quels sont les documents manquants ?",
    "Quel est le montant probable du règlement ?",
    "Y a-t-il des risques de recours ?",
    "Quand puis-je espérer clôturer le dossier ?"
  ];

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Chat avec le dossier
          <Badge variant="secondary" className="ml-auto">
            IA Assistante
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Zone de messages */}
        <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}
            >
              {message.type === "ai" && (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs">
                        <FileText className="w-3 h-3" />
                        <span>{attachment}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="text-xs opacity-70 mt-1">
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
              
              {message.type === "user" && (
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Questions suggérées */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Questions suggérées :</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setNewMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Zone de saisie */}
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez votre question sur le dossier..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
