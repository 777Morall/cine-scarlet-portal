import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Star } from "lucide-react";
import { useMovies } from "@/hooks/useMovies";
import { Loader2 } from "lucide-react";

export default function MovieWatch() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movies, loading } = useMovies();

  const movie = movies.find(m => m.id === id);

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

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Filme não encontrado</h1>
            <Button onClick={() => navigate("/")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getEmbedUrl = (trailerUrl: string) => {
    if (!trailerUrl) return "";
    
    // Convert YouTube URL to embed format
    if (trailerUrl.includes("youtube.com/watch?v=")) {
      const videoId = trailerUrl.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    if (trailerUrl.includes("youtu.be/")) {
      const videoId = trailerUrl.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return trailerUrl;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate("/")} 
          variant="outline" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="max-w-6xl mx-auto">
          {/* Video Player */}
          <div className="relative w-full mb-8">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-card">
              {movie.trailer ? (
                <iframe
                  src={getEmbedUrl(movie.trailer)}
                  title={movie.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Trailer não disponível</p>
                </div>
              )}
            </div>
          </div>

          {/* Movie Info */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{movie.rating}/10</span>
                </div>
                <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                  {movie.genre}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">Sinopse</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.description}
                </p>
              </div>
            </div>

            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}