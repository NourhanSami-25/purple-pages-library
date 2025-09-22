import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tags, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ManageTags = () => {
  const { toast } = useToast();
  
  // Mock data - will be replaced with Supabase data
  const [tags, setTags] = useState([
    { id: "1", name: "Fiction", bookCount: 45 },
    { id: "2", name: "Mystery", bookCount: 23 },
    { id: "3", name: "Fantasy", bookCount: 31 },
    { id: "4", name: "Science Fiction", bookCount: 19 },
    { id: "5", name: "Romance", bookCount: 27 },
    { id: "6", name: "Thriller", bookCount: 15 },
  ]);

  const [newTagName, setNewTagName] = useState("");
  const [editingTag, setEditingTag] = useState<{ id: string; name: string } | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag = {
        id: Date.now().toString(),
        name: newTagName.trim(),
        bookCount: 0
      };
      setTags(prev => [...prev, newTag]);
      setNewTagName("");
      setIsAddDialogOpen(false);
      toast({
        title: "Tag Added",
        description: `"${newTag.name}" has been added to the library.`,
      });
    }
  };

  const handleEditTag = () => {
    if (editingTag && editingTag.name.trim()) {
      setTags(prev => prev.map(tag => 
        tag.id === editingTag.id 
          ? { ...tag, name: editingTag.name.trim() }
          : tag
      ));
      setEditingTag(null);
      setIsEditDialogOpen(false);
      toast({
        title: "Tag Updated",
        description: `Tag has been updated successfully.`,
      });
    }
  };

  const handleDeleteTag = (tagId: string, tagName: string) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId));
    toast({
      title: "Tag Deleted",
      description: `"${tagName}" has been removed from the library.`,
    });
  };

  const startEdit = (tag: { id: string; name: string }) => {
    setEditingTag({ ...tag });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Tags</h1>
          <p className="text-muted-foreground mt-2">Organize and categorize your book collection</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tag</DialogTitle>
              <DialogDescription>
                Create a new tag to categorize books in your library.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-tag">Tag Name</Label>
                <Input
                  id="new-tag"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Enter tag name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTag}>Add Tag</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tags className="h-5 w-5" />
            All Tags ({tags.length})
          </CardTitle>
          <CardDescription>
            Manage tags used to categorize books
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="text-sm">
                    {tag.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {tag.bookCount} books
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(tag)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTag(tag.id, tag.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {tags.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tags found. Create your first tag to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Tag Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tag</DialogTitle>
            <DialogDescription>
              Update the tag name.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-tag">Tag Name</Label>
              <Input
                id="edit-tag"
                value={editingTag?.name || ""}
                onChange={(e) => setEditingTag(prev => prev ? { ...prev, name: e.target.value } : null)}
                placeholder="Enter tag name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTag}>Update Tag</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTags;