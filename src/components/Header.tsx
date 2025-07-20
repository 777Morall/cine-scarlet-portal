import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film, Search, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CINEMA
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/movies" className="text-foreground hover:text-primary transition-colors">
              Filmes
            </Link>
            <Link to="/genres" className="text-foreground hover:text-primary transition-colors">
              Gêneros
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2 max-w-sm w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar filmes..."
                className="pl-10 bg-input border-border"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}