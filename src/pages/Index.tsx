import { Link } from "react-router-dom";
import { StarField } from "@/components/StarField";
import { MessageSquare, History, Moon, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import moonBg from "@/assets/moon-bg.jpg";

const Index = () => {
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl w-full space-y-12 animate-fade-in-up">
          {/* Header with moon icon */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <Moon className="h-20 w-20 text-primary animate-float mx-auto" />
              <div className="absolute inset-0 bg-primary/30 blur-2xl animate-glow-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Quran Chatbot
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Welcome to your peaceful guide for exploring Islamic wisdom and the beautiful teachings of the Holy Quran
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Link to="/chatbot" className="group">
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                <CardContent className="p-8 space-y-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all" />
                    <MessageSquare className="h-12 w-12 text-primary relative z-10" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">Start Chatting</h2>
                  <p className="text-muted-foreground">
                    Ask questions and explore the Quran with our AI companion. Get thoughtful answers to deepen your understanding.
                  </p>
                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Begin your journey</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/history" className="group">
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                <CardContent className="p-8 space-y-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all" />
                    <History className="h-12 w-12 text-primary relative z-10" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">View History</h2>
                  <p className="text-muted-foreground">
                    Revisit your previous conversations and continue your spiritual learning journey from where you left off.
                  </p>
                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Browse past chats</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Footer text */}
          <div className="text-center pt-8">
            <p className="text-sm text-muted-foreground italic">
              "Read in the name of your Lord who created" - Quran 96:1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
