
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle, Bot, Send } from "lucide-react";
import { ChatMessage } from "@/types/sinistre";

interface AIChatProps {
  dossierReference: string;
}

export function AIChat({ dossierReference }: AIChatProps) {
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Bonjour ! Je peux vous aider à analyser ce dossier sinistre. Que souhaitez-vous savoir ?'
    }
  ]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { role: 'user' as const, content: chatMessage },
      { 
        role: 'assistant' as const, 
        content: `Concernant votre question sur "${chatMessage}", voici les informations disponibles dans le dossier : Le sinistre BATIMEX présente un montant estimé de 15 000€ avec une expertise programmée. Tous les éléments semblent conformes aux procédures standards.`
      }
    ];
    setChatMessages(newMessages);
    setChatMessage("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <Bot className="h-4 w-4 text-purple-600" />
          Chat IA
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px] p-0 flex flex-col" side="right">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-600" />
            Assistant IA - Dossier {dossierReference}
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t p-4 bg-white">
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Posez votre question sur le dossier..."
                className="flex-1"
              />
              <Button type="submit" size="sm" className="px-3">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
