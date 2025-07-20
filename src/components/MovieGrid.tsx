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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
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