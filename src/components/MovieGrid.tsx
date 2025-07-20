import { MovieCard } from "./MovieCard";

interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  genre: string;
  year: number;
  rating: number;
  duration: string;
  price: number;
  trailer?: string;
}

interface MovieGridProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export function MovieGrid({ movies, onMovieClick }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          {...movie}
          onClick={() => onMovieClick?.(movie)}
        />
      ))}
    </div>
  );
}