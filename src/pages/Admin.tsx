import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Film, Plus, LogOut, Edit, Trash2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { Movie } from "@/hooks/useMovies";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    poster: "",
    genre: "",
    year: new Date().getFullYear(),
    rating: 0,
    duration: "",
    price: 10.00,
    trailer: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      } else {
        fetchMovies();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchMovies = async () => {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMovies(data || []);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar filmes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      poster: "",
      genre: "",
      year: new Date().getFullYear(),
      rating: 0,
      duration: "",
      price: 10.00,
      trailer: ""
    });
    setEditingMovie(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMovie) {
        const { error } = await supabase
          .from('movies')
          .update(formData)
          .eq('id', editingMovie.id);

        if (error) throw error;
        
        toast({
          title: "Sucesso!",
          description: "Filme atualizado com sucesso",
        });
      } else {
        const { error } = await supabase
          .from('movies')
          .insert([formData]);

        if (error) throw error;
        
        toast({
          title: "Sucesso!",
          description: "Filme adicionado com sucesso",
        });
      }
      
      resetForm();
      fetchMovies();
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao salvar filme",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (movie: Movie) => {
    setFormData({
      title: movie.title,
      description: movie.description,
      poster: movie.poster,
      genre: movie.genre,
      year: movie.year,
      rating: movie.rating,
      duration: movie.duration,
      price: movie.price,
      trailer: movie.trailer || ""
    });
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este filme?")) return;
    
    try {
      const { error } = await supabase
        .from('movies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Sucesso!",
        description: "Filme excluído com sucesso",
      });
      
      fetchMovies();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir filme",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Film className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
                <p className="text-sm text-muted-foreground">Gerencie os filmes do catálogo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
              >
                Ver Site
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">Filmes</h2>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Filme
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8 border-border/50" style={{ background: 'var(--gradient-card)' }}>
            <CardHeader>
              <CardTitle>{editingMovie ? "Editar Filme" : "Adicionar Novo Filme"}</CardTitle>
              <CardDescription>
                Preencha as informações do filme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Título do filme"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Gênero"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Ano"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    required
                  />
                  <Input
                    placeholder="Duração (ex: 2h 30min)"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    placeholder="Avaliação (0-10)"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    required
                  />
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Preço"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <Input
                  placeholder="URL da capa do filme"
                  value={formData.poster}
                  onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                  required
                />
                <Input
                  placeholder="URL do trailer (opcional)"
                  value={formData.trailer}
                  onChange={(e) => setFormData({ ...formData, trailer: e.target.value })}
                />
                <Textarea
                  placeholder="Descrição do filme"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    {editingMovie ? "Atualizar" : "Adicionar"} Filme
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <Card key={movie.id} className="border-border/50" style={{ background: 'var(--gradient-card)' }}>
                <div className="relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">
                    R$ {movie.price.toFixed(2)}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {movie.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <Badge variant="outline">{movie.genre}</Badge>
                    <span className="text-sm text-muted-foreground">{movie.year}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">★ {movie.rating}/10</span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(movie)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(movie.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}