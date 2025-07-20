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
  onClick
}: MovieCardProps) {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-0 bg-card overflow-hidden"
      onClick={onClick}
    >
      {/* Thumbnail with YouTube-style aspect ratio */}
      <div className="relative overflow-hidden">
        <div className="aspect-video w-full">
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2">
          <div className="bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {duration}
          </div>
        </div>
        
        {/* Rating overlay */}
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <div className="bg-black/80 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <CardContent className="p-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-tight">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{year}</span>
            <span>•</span>
            <Badge variant="outline" className="border-primary/30 text-primary text-xs px-2 py-0">
              {genre}
            </Badge>
          </div>
          
          <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}