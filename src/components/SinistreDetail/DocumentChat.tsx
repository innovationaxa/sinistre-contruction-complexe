
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare,
  Send,
  Bot,
  User,
  Sparkles
} from "lucide-react";

interface Document {
  id: number;
  name: string;
  type: string;
  description: string;
  modifiedDate: string;
  size: string;
  pages: number;
  url: string;
}

interface DocumentChatProps {
  document: Document;
}

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const DocumentChat = ({ document }: DocumentChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      content: `Bonjour ! Je suis là pour vous aider à analyser le document "${document.name}". Vous pouvez me poser des questions sur son contenu ou demander une synthèse.`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: `Merci pour votre question concernant "${document.name}". Basé sur l'analyse du document, voici les points clés que j'ai identifiés. Ce document de ${document.pages} pages contient des informations importantes sur ${document.description.toLowerCase()}.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSynthesis = () => {
    const synthesisMessage: ChatMessage = {
      id: messages.length + 1,
      role: 'user',
      content: "Génère une synthèse complète de ce document",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, synthesisMessage]);
    setIsLoading(true);

    // Simulate AI synthesis
    setTimeout(() => {
      const aiSynthesis: ChatMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: `## Synthèse du document "${document.name}"

**Type de document :** ${document.description}  
**Nombre de pages :** ${document.pages}  
**Date de modification :** ${document.modifiedDate}

### Points clés identifiés :
- Analyse technique approfondie des éléments présentés
- Conclusions et recommandations détaillées
- Évaluation des risques et impacts potentiels
- Propositions d'actions correctives

### Résumé exécutif :
Ce document présente une analyse complète avec des recommandations précises pour la suite des opérations. Les conclusions sont étayées par des données techniques solides.

*Cette synthèse a été générée automatiquement par IA.*`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiSynthesis]);
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
      <CardHeader className="pb-3 bg-blue-50 flex-shrink-0">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Chat IA Document
        </CardTitle>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {document.name.slice(0, 30)}...
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSynthesis}
            className="flex items-center gap-1 text-xs"
          >
            <Sparkles className="w-3 h-3" />
            Synthèse
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[450px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <div className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4 bg-white flex-shrink-0">
          <div className="flex gap-2">
            <Input
              placeholder="Posez une question sur le document..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
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
