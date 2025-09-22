import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, BookOpen, Heart, Star, Edit, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const UserDashboard = () => {
  const { toast } = useToast();
  
  // Mock user data - will be replaced with real user data from Supabase
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "March 2024",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userInfo.name,
    email: userInfo.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Mock stats - will come from Supabase
  const userStats = {
    favoriteBooks: 12,
    reviewsWritten: 8,
    booksRead: 45,
  };

  // Mock recent activity - will come from Supabase  
  const recentFavorites = [
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: "2", title: "1984", author: "George Orwell" },
    { id: "3", title: "Pride and Prejudice", author: "Jane Austen" },
  ];

  const handleSaveProfile = () => {
    if (editForm.newPassword && editForm.newPassword !== editForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      });
      return;
    }

    // Will integrate with Supabase for actual profile updates
    setUserInfo(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
    }));
    
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: userInfo.name,
      email: userInfo.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your profile and track your reading journey</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Info */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Your personal information and account settings
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={userInfo.avatar} />
                      <AvatarFallback className="text-lg">
                        {userInfo.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{userInfo.name}</h3>
                      <p className="text-muted-foreground">{userInfo.email}</p>
                      <p className="text-sm text-muted-foreground">Member since {userInfo.joinDate}</p>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                      </div>

                      <Separator />
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Change Password</h4>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            value={editForm.currentPassword}
                            onChange={(e) => setEditForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                              id="new-password"
                              type="password"
                              value={editForm.newPassword}
                              onChange={(e) => setEditForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input
                              id="confirm-password"
                              type="password"
                              value={editForm.confirmPassword}
                              onChange={(e) => setEditForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reading Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Favorites</span>
                    </div>
                    <Badge variant="secondary">{userStats.favoriteBooks}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Reviews</span>
                    </div>
                    <Badge variant="secondary">{userStats.reviewsWritten}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Books Read</span>
                    </div>
                    <Badge variant="secondary">{userStats.booksRead}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Favorites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentFavorites.map((book) => (
                      <div key={book.id} className="text-sm">
                        <p className="font-medium">{book.title}</p>
                        <p className="text-muted-foreground">by {book.author}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;