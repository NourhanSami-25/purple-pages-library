import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadBook = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    externalLink: "",
    tags: [] as string[],
    newTag: "",
    newAuthor: ""
  });

  // Mock data - will be replaced with Supabase data
  const existingAuthors = ["J.K. Rowling", "Stephen King", "Agatha Christie", "George Orwell"];
  const existingTags = ["Fiction", "Mystery", "Fantasy", "Science Fiction", "Romance", "Thriller"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will integrate with Supabase later
    toast({
      title: "Book Upload Submitted",
      description: "Book will be processed once database is connected.",
    });
    console.log("Book data:", formData);
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addNewTag = () => {
    if (formData.newTag.trim()) {
      addTag(formData.newTag.trim());
      setFormData(prev => ({ ...prev, newTag: "" }));
    }
  };

  const addNewAuthor = () => {
    if (formData.newAuthor.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        author: formData.newAuthor.trim(),
        newAuthor: ""
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload New Book</h1>
        <p className="text-muted-foreground mt-2">Add a new book to the digital library</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Book Information
          </CardTitle>
          <CardDescription>
            Fill in the details for the new book
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter book title"
                required
              />
            </div>

            {/* Author Selection */}
            <div className="space-y-4">
              <Label>Author *</Label>
              <Select value={formData.author} onValueChange={(value) => setFormData(prev => ({ ...prev, author: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an author" />
                </SelectTrigger>
                <SelectContent>
                  {existingAuthors.map(author => (
                    <SelectItem key={author} value={author}>{author}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Add New Author */}
              <div className="flex gap-2">
                <Input
                  value={formData.newAuthor}
                  onChange={(e) => setFormData(prev => ({ ...prev, newAuthor: e.target.value }))}
                  placeholder="Or add new author"
                />
                <Button type="button" onClick={addNewAuthor} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter book description"
                rows={4}
              />
            </div>

            {/* File Uploads */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Book PDF</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload PDF</p>
                  <Input type="file" accept=".pdf" className="mt-2" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload cover</p>
                  <Input type="file" accept="image/*" className="mt-2" />
                </div>
              </div>
            </div>

            {/* External Link */}
            <div className="space-y-2">
              <Label htmlFor="link">External Link (optional)</Label>
              <Input
                id="link"
                type="url"
                value={formData.externalLink}
                onChange={(e) => setFormData(prev => ({ ...prev, externalLink: e.target.value }))}
                placeholder="https://example.com/book-link"
              />
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <Label>Tags</Label>
              
              {/* Selected Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Existing Tags */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Select from existing tags:</p>
                <div className="flex flex-wrap gap-2">
                  {existingTags.filter(tag => !formData.tags.includes(tag)).map(tag => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Add New Tag */}
              <div className="flex gap-2">
                <Input
                  value={formData.newTag}
                  onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                  placeholder="Add new tag"
                />
                <Button type="button" onClick={addNewTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Upload Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadBook;
