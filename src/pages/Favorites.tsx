import { Heart, Trash2, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

// Mock favorites data - in a real app, this would come from user's database
const mockFavorites = [
  {
    id: "1",
    title: "The Art of Digital Design",
    author: "Sarah Chen",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    rating: 4.5,
    category: "Design",
    dateAdded: "2024-01-15"
  },
  {
    id: "2",
    title: "JavaScript: The Definitive Guide",
    author: "David Flanagan",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    rating: 4.8,
    category: "Programming",
    dateAdded: "2024-01-10"
  },
  {
    id: "3",
    title: "Clean Architecture",
    author: "Robert C. Martin",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    rating: 4.7,
    category: "Software Engineering",
    dateAdded: "2024-01-05"
  },
  {
    id: "4",
    title: "The Psychology of Color",
    author: "Eva Heller",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    rating: 4.3,
    category: "Psychology",
    dateAdded: "2024-01-01"
  }
];

const Favorites = () => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleRemoveFavorite = (bookId: string) => {
    // In a real app, this would remove from database
    console.log('Remove favorite:', bookId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
            <Heart className="h-8 w-8 mr-3 text-red-500 fill-current" />
            My Favorites
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your personal collection of favorite books. Keep track of the books you love and want to revisit.
          </p>
        </div>

        {/* Empty State */}
        {mockFavorites.length === 0 ? (
          <Card className="max-w-md mx-auto bg-gradient-card border-purple-light/20">
            <CardContent className="p-8 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-4">
                Start adding books to your favorites to see them here.
              </p>
              <Link to="/catalog">
                <Button className="bg-gradient-primary hover:shadow-purple">
                  Browse Books
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                You have <span className="font-semibold text-foreground">{mockFavorites.length}</span> favorite books
              </p>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockFavorites.map((book) => (
                <Card 
                  key={book.id} 
                  className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 bg-gradient-card border-purple-light/20"
                >
                  <CardContent className="p-0">
                    {/* Book Cover */}
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={book.cover} 
                        alt={`${book.title} cover`}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Remove Button */}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white text-muted-foreground transition-all duration-200"
                        onClick={() => handleRemoveFavorite(book.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      {/* Category Badge */}
                      <Badge 
                        variant="secondary" 
                        className="absolute bottom-2 left-2 bg-white/90 text-purple-dark"
                      >
                        {book.category}
                      </Badge>
                    </div>

                    {/* Book Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center space-x-1">
                          {renderStars(book.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">
                          {book.rating.toFixed(1)}
                        </span>
                      </div>

                      {/* Date Added */}
                      <p className="text-xs text-muted-foreground mb-4">
                        Added on {new Date(book.dateAdded).toLocaleDateString()}
                      </p>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Link to={`/book/${book.id}`} className="flex-1">
                          <Button 
                            className="w-full bg-gradient-primary hover:shadow-purple transition-all duration-200"
                            size="sm"
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Want to add more books?</h3>
              <div className="flex justify-center space-x-4">
                <Link to="/catalog">
                  <Button variant="outline" className="border-purple-light text-purple-dark hover:bg-purple-light/10">
                    Browse Catalog
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="bg-gradient-primary hover:shadow-purple">
                    Discover New Books
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Favorites;