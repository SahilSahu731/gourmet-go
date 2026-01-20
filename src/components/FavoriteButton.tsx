"use client";

import { useRecipeStore, Recipe } from "@/store/useRecipeStore";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // Assuming sonner is installed (package.json showed it)

interface FavoriteButtonProps {
  recipe: Recipe;
}

export default function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const isFavorited = useRecipeStore((state) =>
    state.favorites.some((f) => f.idMeal === recipe.idMeal),
  );
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavorite(recipe.idMeal);
      toast.info("Removed from favorites");
    } else {
      addFavorite(recipe);
      toast.success("Added to favorites");
    }
  };

  if (!mounted) {
    return (
      <Button size="icon" variant="secondary" className="rounded-full">
        <Heart className="h-6 w-6 text-zinc-400" />
      </Button>
    );
  }

  return (
    <Button
      onClick={toggleFavorite}
      size="icon"
      variant="secondary"
      className={`rounded-full transition-all duration-300 ${
        isFavorited
          ? "bg-orange-500 hover:bg-orange-600"
          : "bg-white/10 hover:bg-white/20"
      }`}
    >
      <Heart
        className={`h-6 w-6 transition-colors ${
          isFavorited ? "fill-white text-white" : "text-white"
        }`}
      />
    </Button>
  );
}
