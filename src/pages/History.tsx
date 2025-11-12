import { Link } from "react-router-dom";
import { StarField } from "@/components/StarField";
import { ArrowLeft, MessageSquare, Calendar, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import moonBg from "@/assets/moon-bg.jpg";
import { useEffect, useState } from "react";

interface ChatHistoryItem {
  id: string;
  title: string;
  date: Date;
  preview: string;
  messageCount: number;
}

const History = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const storedHistory = localStorage.getItem("chatHistory");
    if (storedHistory) {
      const parsed: ChatHistoryItem[] = JSON.parse(storedHistory);
      // Convert date strings back to Date objects
      parsed.forEach((item) => (item.date = new Date(item.date)));
      setChatHistory(parsed);
    }
  }, []);

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
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Moon className="h-8 w-8 text-primary animate-float" />
                  <div className="absolute inset-0 bg-primary/30 blur-xl animate-glow-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Chat History</h1>
                  <p className="text-sm text-muted-foreground">Your spiritual journey</p>
                </div>
              </div>
              <Link to="/">
                <Button variant="secondary" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* History List */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-4 animate-fade-in-up">
            {chatHistory.length > 0 ? (
              chatHistory.map((chat) => (
                <Link key={chat.id} to={`/chatbot?conversation=${chat.id}`}>
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                          <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-lg font-semibold text-foreground">
                              {chat.title}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                              <Calendar className="h-3 w-3" />
                              {chat.date.toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {chat.preview}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {chat.messageCount} messages
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-12 text-center space-y-4">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto opacity-50" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      No conversations yet
                    </h3>
                    <p className="text-muted-foreground">
                      Start your first conversation to begin your journey
                    </p>
                  </div>
                  <Link to="/chatbot">
                    <Button className="mt-4">
                      Start Chatting
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
