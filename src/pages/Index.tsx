import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MovieGrid } from "@/components/MovieGrid";
import { useMovies } from "@/hooks/useMovies";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { movies, loading, error } = useMovies();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Filmes em Destaque</h2>
          <p className="text-muted-foreground">Descubra nossa seleção exclusiva de filmes</p>
        </div>
        
        {error ? (
          <div className="text-center py-12">
            <p className="text-destructive text-lg">{error}</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhum filme encontrado</p>
            <p className="text-muted-foreground text-sm mt-2">
              Os filmes serão exibidos aqui quando forem adicionados pelos administradores
            </p>
          </div>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </main>
    </div>
  );
};

export default Index;
