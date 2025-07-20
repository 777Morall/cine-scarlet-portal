import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Movie {
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
  created_at: string;
  updated_at: string;
}

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setMovies(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar filmes';
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    loading,
    error,
    refetch: fetchMovies,
  };
}