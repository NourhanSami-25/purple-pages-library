import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Author {
  id: string;
  name: string;
  bio: string;
  bookCount: number;
  avatar?: string;
}

const ManageAuthors = () => {
  const { toast } = useToast();
  
  // Mock data - will be replaced with Supabase data
  const [authors, setAuthors] = useState<Author[]>([
    {
      id: "1",
      name: "J.K. Rowling",
      bio: "British author best known for the Harry Potter series.",
      bookCount: 12,
    },
    {
      id: "2", 
      name: "Stephen King",
      bio: "American author of horror, supernatural fiction, and suspense.",
      bookCount: 8,
    },
    {
      id: "3",
      name: "Agatha Christie", 
      bio: "English writer known for detective novels featuring Hercule Poirot.",
      bookCount: 15,
    },
  ]);

  const [formData, setFormData] = useState({ name: "", bio: "" });
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const resetForm = () => {
    setFormData({ name: "", bio: "" });
    setEditingAuthor(null);
  };

  const handleAddAuthor = () => {
    if (formData.name.trim()) {
      const newAuthor: Author = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        bookCount: 0,
      };
      setAuthors(prev => [...prev, newAuthor]);
      resetForm();
      setIsAddDialogOpen(false);
      toast({
        title: "Author Added",
        description: `"${newAuthor.name}" has been added to the library.`,
      });
    }
  };

  const handleEditAuthor = () => {
    if (editingAuthor && formData.name.trim()) {
      setAuthors(prev => prev.map(author => 
        author.id === editingAuthor.id 
          ? { ...author, name: formData.name.trim(), bio: formData.bio.trim() }
          : author
      ));
      resetForm();
      setIsEditDialogOpen(false);
      toast({
        title: "Author Updated",
        description: `Author information has been updated successfully.`,
      });
    }
  };

  const handleDeleteAuthor = (authorId: string, authorName: string) => {
    setAuthors(prev => prev.filter(author => author.id !== authorId));
    toast({
      title: "Author Deleted",
      description: `"${authorName}" has been removed from the library.`,
    });
  };

  const startEdit = (author: Author) => {
    setEditingAuthor(author);
    setFormData({ name: author.name, bio: author.bio });
    setIsEditDialogOpen(true);
  };

  const startAdd = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Authors</h1>
          <p className="text-muted-foreground mt-2">Add and manage authors in your digital library</p>
        </div>
        
        <Button onClick={startAdd} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Author
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Authors ({authors.length})
          </CardTitle>
          <CardDescription>
            Manage authors and their information
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            {authors.map((author) => (
              <div
                key={author.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={author.avatar} />
                    <AvatarFallback>
                      {author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-medium">{author.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {author.bio || "No biography available"}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {author.bookCount} books
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(author)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAuthor(author.id, author.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {authors.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No authors found. Add your first author to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Author Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Author</DialogTitle>
            <DialogDescription>
              Add a new author to your digital library.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="author-name">Author Name *</Label>
              <Input
                id="author-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter author name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author-bio">Biography</Label>
              <Textarea
                id="author-bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Enter author biography"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAuthor}>Add Author</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Author Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Author</DialogTitle>
            <DialogDescription>
              Update author information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-author-name">Author Name *</Label>
              <Input
                id="edit-author-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter author name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-author-bio">Biography</Label>
              <Textarea
                id="edit-author-bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Enter author biography"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAuthor}>Update Author</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAuthors;