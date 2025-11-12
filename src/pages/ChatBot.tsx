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

  const [lastQuery, setLastQuery] = useState(""); 
  const [lastResponse, setLastResponse] = useState<any[]>([]); 
  const [lastIndex, setLastIndex] = useState(0); 

  const [searchParams] = useSearchParams();
  const backHref = searchParams.get("conversation") ? "/history" : "/";

  // ✅ Use Vite proxy endpoint instead of EC2 IP
  const API_URL = "https://constitutional-dean-routes-non.trycloudflare.com/query"; 

  const formatVerse = (v: any) => {
    return `📖 **Surah ${v.surah}, Ayah ${v.ayah}**\n\n` +
           `**Arabic:** ${v.arabic}\n\n` +
           `**English:** ${v.english}\n\n` +
           `**Tafsir:** ${v.tafsir}`;
  };

  const addBotMessage = (text: string) => {
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      const data = await response.json();
      let botText = "Sorry, I couldn't find an answer.";

      if (Array.isArray(data) && data.length > 0) {
        setLastResponse(data);
        setLastIndex(0);
        setLastQuery(text);

        const top = data[0];
        botText = formatVerse(top);
      } else if (data.message) {
        botText = data.message;
      }

      addBotMessage(botText);
    } catch (error) {
      console.error("Error calling backend:", error);
      addBotMessage("Sorry, something went wrong connecting to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (lastResponse.length === 0) return;
    const nextIndex = lastIndex + 1;
    if (nextIndex < lastResponse.length) {
      const v = lastResponse[nextIndex];
      addBotMessage(formatVerse(v));
      setLastIndex(nextIndex);
    } else {
      addBotMessage("No more verses.");
    }
  };

  const handlePrevious = () => {
    if (lastResponse.length === 0) return;
    const prevIndex = lastIndex - 1;
    if (prevIndex >= 0) {
      const v = lastResponse[prevIndex];
      addBotMessage(formatVerse(v));
      setLastIndex(prevIndex);
    } else {
      addBotMessage("Already at first verse.");
    }
  };

  const handleMore = () => {
    if (lastResponse.length === 0) return;
    const nextVerses = lastResponse.slice(lastIndex + 1, lastIndex + 6);
    if (nextVerses.length > 0) {
      nextVerses.forEach((v) => addBotMessage(formatVerse(v)));
      setLastIndex(lastIndex + nextVerses.length);
    } else {
      addBotMessage("No more verses.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${moonBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <StarField />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
                <p className="text-sm text-muted-foreground">
                  Your peaceful guide to Islamic wisdom
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.text}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
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

        {/* Input + navigation buttons */}
        <div className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 max-w-4xl flex flex-col gap-2">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            {lastResponse.length > 0 && (
              <div className="flex gap-2">
                <Button onClick={handlePrevious} disabled={lastIndex <= 0}>
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={lastIndex >= lastResponse.length - 1}>
                  Next
                </Button>
                <Button onClick={handleMore}>More</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
