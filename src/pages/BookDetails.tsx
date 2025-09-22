import { useParams } from "react-router-dom";
import { ArrowLeft, Heart, Download, ExternalLink, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

// Mock book data - in a real app, this would come from an API
const mockBook = {
  id: "1",
  title: "The Art of Digital Design",
  author: "Sarah Chen",
  cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  description: "A comprehensive guide to modern digital design principles, covering everything from user interface fundamentals to advanced interaction patterns. This book provides practical insights and real-world examples that every designer should know.",
  rating: 4.5,
  totalReviews: 127,
  categories: ["Design", "Technology", "UI/UX"],
  downloadUrl: "#",
  externalUrl: "https://example.com/book",
  publishedYear: 2023,
  pages: 342
};

const mockReviews = [
  {
    id: "1",
    user: "Alex Johnson",
    rating: 5,
    comment: "Excellent book! The examples are practical and the explanations are clear. Highly recommended for anyone in the design field.",
    date: "2024-01-15"
  },
  {
    id: "2", 
    user: "Maria Rodriguez",
    rating: 4,
    comment: "Great resource with lots of valuable insights. Some chapters could be more detailed, but overall a solid read.",
    date: "2024-01-10"
  },
  {
    id: "3",
    user: "David Kim",
    rating: 5,
    comment: "This book changed my approach to digital design. The author's expertise really shows through.",
    date: "2024-01-05"
  }
];

const BookDetails = () => {
  const { id } = useParams();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/catalog">
          <Button variant="ghost" className="mb-6 text-purple-dark hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Catalog
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover & Actions */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden bg-gradient-card border-purple-light/20">
              <CardContent className="p-0">
                <img 
                  src={mockBook.cover} 
                  alt={`${mockBook.title} cover`}
                  className="w-full h-96 object-cover"
                />
                <div className="p-6 space-y-4">
                  <Button className="w-full bg-gradient-primary hover:shadow-purple">
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Favorites
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button variant="outline" className="flex-1" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Link
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Author */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{mockBook.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">by {mockBook.author}</p>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mockBook.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="bg-purple-light/20 text-purple-dark">
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">{renderStars(mockBook.rating)}</div>
                <span className="text-sm text-muted-foreground">
                  {mockBook.rating} ({mockBook.totalReviews} reviews)
                </span>
              </div>

              {/* Book Details */}
              <div className="text-sm text-muted-foreground space-x-4">
                <span>Published: {mockBook.publishedYear}</span>
                <span>Pages: {mockBook.pages}</span>
              </div>
            </div>

            {/* Description */}
            <Card className="bg-gradient-card border-purple-light/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-foreground">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{mockBook.description}</p>
              </CardContent>
            </Card>

            {/* Write Review Form */}
            <Card className="bg-gradient-card border-purple-light/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-foreground">Write a Review</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Rating</label>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Comment</label>
                    <Textarea 
                      placeholder="Share your thoughts about this book..."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Button className="bg-gradient-primary hover:shadow-purple">
                    Submit Review
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="bg-gradient-card border-purple-light/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-foreground">Reviews ({mockReviews.length})</h2>
                <div className="space-y-4">
                  {mockReviews.map((review, index) => (
                    <div key={review.id}>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-purple-light/20 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-purple-dark" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-foreground">{review.user}</span>
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                      {index < mockReviews.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;