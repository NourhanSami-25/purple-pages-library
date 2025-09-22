import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, BookOpen, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-primary p-4 rounded-full shadow-lg">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              404
            </CardTitle>
            <CardDescription className="text-lg">
              Oops! This page seems to have wandered off...
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist in our digital library. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button className="w-full sm:w-auto bg-gradient-primary hover:shadow-hover">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <Link to="/catalog">
                <Button variant="outline" className="w-full sm:w-auto">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Books
                </Button>
              </Link>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Need help? Try searching for books in our catalog or return to the homepage.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NotFound;
