import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock } from "lucide-react";

interface MovieCardProps {
  id: string;
  title: string;
  description: string;
  poster: string;
  genre: string;
  year: number;
  rating: number;
  duration: string;
  price: number;
  onClick?: () => void;
}

export function MovieCard({
  title,
  description,
  poster,
  genre,
  year,
  rating,
  duration,
  price,
  onClick
}: MovieCardProps) {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-border/50 bg-card backdrop-blur-sm overflow-hidden"
      onClick={onClick}
      style={{
        background: 'var(--gradient-card)',
        boxShadow: 'var(--cinema-shadow)'
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={poster}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            R$ {price.toFixed(2)}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-sm font-medium">{rating}/10</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 text-foreground line-clamp-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="border-primary/30 text-primary">
            {genre}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}