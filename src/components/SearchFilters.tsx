import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface SearchFiltersProps {
  onSearchChange?: (search: string) => void;
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
}

const SearchFilters = ({ onSearchChange, onCategoryChange, onSortChange }: SearchFiltersProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const categories = [
    "All Categories",
    "Fiction",
    "Non-Fiction", 
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
    "Biography",
    "History",
    "Technology"
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
    { value: "title", label: "Title A-Z" },
    { value: "author", label: "Author A-Z" }
  ];

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange?.(value);
  };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchValue("");
    onSearchChange?.("");
    onCategoryChange?.("All Categories");
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-card border border-purple-light/20">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input 
          placeholder="Search by title, author, or keyword..." 
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 h-12 text-base bg-white/50 border-purple-light/30 focus:border-primary"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Category Filter */}
        <div className="flex-1 min-w-[200px]">
          <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-white/50 border-purple-light/30">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="flex-1 min-w-[200px]">
          <Select onValueChange={onSortChange}>
            <SelectTrigger className="bg-white/50 border-purple-light/30">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter Button */}
        <Button variant="outline" className="border-purple-light/30 hover:bg-purple-glow/20">
          <Filter className="h-4 w-4 mr-2" />
          Advanced
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge 
              key={filter}
              variant="secondary" 
              className="bg-purple-glow text-purple-dark"
            >
              {filter}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 hover:bg-transparent"
                onClick={() => removeFilter(filter)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-primary"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;