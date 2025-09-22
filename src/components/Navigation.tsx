import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, User, Menu, Shield } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-light/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-purple">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Digital Library
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/catalog" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/catalog') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Book Catalog
            </Link>
            <Link 
              to="/favorites" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/favorites') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Favorites
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search books, authors..." 
                className="pl-10 bg-white/50 border-purple-light/30 focus:border-primary"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="hidden md:flex bg-gradient-primary hover:shadow-hover">
                Register
              </Button>
            </Link>
            <Link to="/admin/upload">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-light/20">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search books, authors..." 
                  className="pl-10 bg-white/50 border-purple-light/30"
                />
              </div>
              
              {/* Mobile Navigation Links */}
              <Link 
                to="/" 
                className={`text-sm font-medium py-2 ${
                  isActive('/') ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/catalog" 
                className={`text-sm font-medium py-2 ${
                  isActive('/catalog') ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Catalog
              </Link>
              <Link 
                to="/favorites" 
                className={`text-sm font-medium py-2 ${
                  isActive('/favorites') ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
              
              {/* Mobile User Actions */}
              <div className="flex space-x-2 pt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button size="sm" className="w-full bg-gradient-primary">
                    Register
                  </Button>
                </Link>
              </div>
              
              {/* Mobile Admin Access */}
              <Link 
                to="/admin/upload" 
                className="text-sm font-medium py-2 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-4 w-4" />
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;