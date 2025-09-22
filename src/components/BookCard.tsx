import { Star, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface BookCardProps {
  title: string;
  author: string;
  cover: string;
  rating: number;
  category: string;
  description?: string;
  isFeatured?: boolean;
}

const BookCard = ({ title, author, cover, rating, category, description, isFeatured = false }: BookCardProps) => {
  return (
    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 bg-gradient-card border-purple-light/20 ${
      isFeatured ? 'ring-2 ring-purple-secondary/30' : ''
    }`}>
      <CardContent className="p-0">
        {/* Book Cover */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={cover} 
            alt={`${title} cover`}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite Button */}
          <Button 
            size="sm" 
            variant="ghost" 
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-muted-foreground hover:text-primary transition-all duration-200"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Featured Badge */}
          {isFeatured && (
            <Badge className="absolute top-2 left-2 bg-gradient-primary text-white">
              Featured
            </Badge>
          )}

          {/* Category Badge */}
          <Badge 
            variant="secondary" 
            className="absolute bottom-2 left-2 bg-white/90 text-purple-dark"
          >
            {category}
          </Badge>
        </div>

        {/* Book Info */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">by {author}</p>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {rating.toFixed(1)}
            </span>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {/* Action Button */}
          <Link to="/book/1">
            <Button 
              className="w-full bg-gradient-primary hover:shadow-purple transition-all duration-200"
              size="sm"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;