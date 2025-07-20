import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

export function HeroSection() {
  return (
    <div 
      className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden"
      style={{
        background: 'var(--gradient-hero)',
      }}
    >
      {/* Background overlay with cinema pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              hsl(var(--primary)) 2px,
              hsl(var(--primary)) 4px
            )`
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          CINEMA
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-foreground">
          Seus Filmes Favoritos
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Descubra e assista aos melhores filmes em alta qualidade. 
          Sua experiência cinematográfica começa aqui.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
            style={{ boxShadow: 'var(--cinema-glow)' }}
          >
            <Play className="w-5 h-5 mr-2" />
            Explorar Filmes
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg"
          >
            <Info className="w-5 h-5 mr-2" />
            Saiba Mais
          </Button>
        </div>
      </div>
    </div>
  );
}