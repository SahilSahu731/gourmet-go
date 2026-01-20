"use client";

import { Meal } from "@/lib/api";
import RecipeCard from "@/components/RecipeCard";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SortAsc, SortDesc, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecipeGridProps {
  recipes: Meal[];
  title?: string;
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loadingMore, setLoadingMore] = useState(false);

  // Filter and sort recipes
  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // Filter by local search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(lowerQuery),
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.strMeal.localeCompare(b.strMeal);
      } else {
        return b.strMeal.localeCompare(a.strMeal);
      }
    });

    return result;
  }, [recipes, searchQuery, sortOrder]);

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecipes.length;

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate network delay for better UX feel
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setLoadingMore(false);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Controls Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-zinc-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm sticky top-24 z-30">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Filter recipes..."
            className="bg-zinc-800 border-zinc-700 pl-9 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">
            {filteredRecipes.length} recipes
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="mr-2 h-4 w-4" />
                ) : (
                  <SortDesc className="mr-2 h-4 w-4" />
                )}
                Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-zinc-900 border-zinc-800 text-zinc-200"
            >
              <DropdownMenuItem
                onClick={() => setSortOrder("asc")}
                className="cursor-pointer focus:bg-zinc-800"
              >
                <SortAsc className="mr-2 h-4 w-4" /> Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortOrder("desc")}
                className="cursor-pointer focus:bg-zinc-800"
              >
                <SortDesc className="mr-2 h-4 w-4" /> Name (Z-A)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Grid */}
      {visibleRecipes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.idMeal}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <RecipeCard recipe={recipe} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-zinc-900/30 text-center p-8">
          <Search className="h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">
            No recipes found
          </h3>
          <p className="text-zinc-500 max-w-sm">
            We couldn&apos;t find any recipes matching &quot;{searchQuery}
            &quot;. Try a different search term or select another category.
          </p>
          <Button
            variant="link"
            className="mt-4 text-orange-500"
            onClick={() => setSearchQuery("")}
          >
            Clear Filter
          </Button>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center py-8">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            size="lg"
            className="relative min-w-[150px] bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-all hover:scale-105 active:scale-95"
          >
            {loadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-orange-500" />
                Loading...
              </>
            ) : (
              "Load More Recipes"
            )}

            {/* Progress indicators */}
            <span className="absolute -bottom-6 text-xs text-zinc-500">
              Showing {visibleRecipes.length} of {filteredRecipes.length}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
