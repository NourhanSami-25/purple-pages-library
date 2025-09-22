import { useState } from "react";
import Navigation from "@/components/Navigation";
import SearchFilters from "@/components/SearchFilters";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Grid, List } from "lucide-react";

const BookCatalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  // Mock book data
  const books = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=center",
      rating: 4.5,
      category: "Fiction",
      description: "Between life and death there is a library, and within that library, the shelves go on forever."
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop&crop=center",
      rating: 4.8,
      category: "Science Fiction",
      description: "A stunning blend of adventure and mysticism, environmentalism and politics."
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop&crop=center",
      rating: 4.6,
      category: "Romance",
      description: "A witty comedy of manners that follows the relationship between Elizabeth Bennet and Mr. Darcy."
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop&crop=center",
      rating: 4.7,
      category: "Non-Fiction",
      description: "Timeless lessons on wealth, greed, and happiness doing well with money."
    },
    {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center",
      rating: 4.3,
      category: "Mystery",
      description: "The record-breaking, multimillion copy bestselling thriller and TikTok sensation."
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center",
      rating: 4.9,
      category: "Non-Fiction",
      description: "An easy and proven way to build good habits and break bad ones."
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&crop=center",
      rating: 4.7,
      category: "Fantasy",
      description: "A classic tale of adventure, dragons, dwarves, and a reluctant hero named Bilbo Baggins."
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop&crop=center",
      rating: 4.4,
      category: "History",
      description: "A brief history of humankind that challenges everything we thought we knew."
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&crop=center",
      rating: 4.2,
      category: "Fiction",
      description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
    },
    {
      title: "Steve Jobs",
      author: "Walter Isaacson",
      cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop&crop=center",
      rating: 4.5,
      category: "Biography",
      description: "The definitive portrait of an extraordinary man and the many myths surrounding him."
    },
    {
      title: "The Handmaid's Tale",
      author: "Margaret Atwood",
      cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop&crop=center",
      rating: 4.1,
      category: "Fiction",
      description: "A chilling tale of a dystopian future where women have lost all their rights."
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=400&fit=crop&crop=center",
      rating: 4.6,
      category: "Technology",
      description: "A handbook of agile software craftsmanship for the professional programmer."
    }
  ];

  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

  const handleSearchChange = (search: string) => {
    console.log('Search:', search);
    // Implement search logic
  };

  const handleCategoryChange = (category: string) => {
    console.log('Category:', category);
    // Implement category filter logic
  };

  const handleSortChange = (sort: string) => {
    console.log('Sort:', sort);
    // Implement sort logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-glow/20 to-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Book Catalog</h1>
          <p className="text-muted-foreground">
            Discover your next great read from our extensive collection
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters 
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* View Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + booksPerPage, books.length)} of {books.length} books
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gradient-primary' : ''}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-gradient-primary' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Books Grid */}
        <div className={`grid gap-6 mb-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {currentBooks.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="border-purple-light/30"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'bg-gradient-primary' : 'border-purple-light/30'}
            >
              {i + 1}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="border-purple-light/30"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCatalog;