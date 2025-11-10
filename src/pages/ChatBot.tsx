import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { StarField } from "@/components/StarField";
import { Moon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import moonBg from "@/assets/moon-bg.jpg";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "السلام عليكم! Welcome to the Quran Chatbot. How may I assist you in your journey of understanding the Holy Quran today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const backHref = searchParams.get("conversation") ? "/history" : "/";

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your question. I'm here to help you explore the beautiful teachings of the Quran. This is a demo response - in a real implementation, this would connect to an AI service to provide meaningful answers about the Quran.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background with moon image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${moonBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Star field */}
      <StarField />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to={backHref} aria-label="Go back">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="relative">
                  <Moon className="h-8 w-8 text-primary animate-float" />
                  <div className="absolute inset-0 bg-primary/30 blur-xl animate-glow-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Quran Chatbot</h1>
                  <p className="text-sm text-muted-foreground">Your peaceful guide to Islamic wisdom</p>
                </div>
              </div>
              <Link to={backHref}>
                <Button variant="secondary" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                    <Moon className="h-4 w-4 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl bg-card border border-border px-4 py-3">
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 max-w-4xl">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
