import Navigation from "@/components/Navigation";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, TrendingUp, Star, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Featured books data
  const featuredBooks = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=center",
      rating: 4.5,
      category: "Fiction",
      description: "Between life and death there is a library...",
      isFeatured: true
    },
    {
      title: "Dune",
      author: "Frank Herbert", 
      cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop&crop=center",
      rating: 4.8,
      category: "Science Fiction",
      description: "A stunning blend of adventure and mysticism...",
      isFeatured: true
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center",
      rating: 4.9,
      category: "Non-Fiction",
      description: "An easy and proven way to build good habits...",
      isFeatured: true
    },
    {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center",
      rating: 4.3,
      category: "Mystery",
      description: "The record-breaking thriller sensation...",
      isFeatured: true
    }
  ];

  const categories = [
    { name: "Fiction", count: "2,341", icon: BookOpen, color: "bg-purple-primary" },
    { name: "Science Fiction", count: "856", icon: Star, color: "bg-purple-secondary" },
    { name: "Non-Fiction", count: "1,923", icon: TrendingUp, color: "bg-purple-light" },
    { name: "Mystery", count: "1,234", icon: Users, color: "bg-accent" },
    { name: "Romance", count: "1,567", icon: BookOpen, color: "bg-purple-primary" },
    { name: "Fantasy", count: "987", icon: Star, color: "bg-purple-secondary" }
  ];

  const stats = [
    { label: "Total Books", value: "10K+", icon: BookOpen },
    { label: "Active Readers", value: "5K+", icon: Users },
    { label: "Categories", value: "20+", icon: Star },
    { label: "New This Month", value: "150+", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-glow/20 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Discover Your Next
              </span>
              <br />
              <span className="text-foreground">Great Read</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore thousands of books across all genres. From bestsellers to hidden gems, 
              find your perfect book in our digital library.
            </p>
            
            {/* Hero Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search for books, authors, or topics..." 
                  className="pl-12 h-14 text-lg bg-white/80 border-purple-light/30 focus:border-primary shadow-card"
                />
                <Button 
                  size="lg" 
                  className="absolute right-2 top-2 bg-gradient-primary hover:shadow-hover"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-hover text-white px-8"
                >
                  Browse All Books
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-purple-light/50 hover:bg-purple-glow/20 px-8"
              >
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-purple">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Books</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our curators. These books are trending, 
              highly rated, and loved by our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredBooks.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/catalog">
              <Button 
                variant="outline" 
                size="lg"
                className="border-purple-light/50 hover:bg-purple-glow/20"
              >
                View All Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-r from-purple-glow/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Browse Categories</h2>
            <p className="text-muted-foreground">
              Explore books by your favorite genres and discover new interests.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link key={index} to="/catalog" className="group">
                <div className="bg-white/80 rounded-lg p-6 text-center hover:shadow-hover transition-all duration-300 group-hover:-translate-y-1 border border-purple-light/20">
                  <div className={`${category.color} p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center shadow-card`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.count} books</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-dark/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with New Arrivals
          </h2>
          <p className="text-purple-glow mb-8 text-lg">
            Get notified about new books, featured collections, and exclusive content.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/20 border-white/30 text-white placeholder:text-purple-glow focus:border-white"
              />
              <Button 
                className="bg-white text-primary hover:bg-purple-glow hover:text-white"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 py-12 border-t border-purple-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-primary p-2 rounded-lg shadow-purple">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Digital Library
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Discover, read, and share your favorite books with our community.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Digital Library. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;