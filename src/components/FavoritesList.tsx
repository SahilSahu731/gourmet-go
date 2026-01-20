"use client";

import { useRecipeStore } from "@/store/useRecipeStore";
import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FavoritesList() {
  const favorites = useRecipeStore((state) => state.favorites);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (favorites.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No Favorites Yet</h2>
        <p className="max-w-md text-zinc-400 mb-8">
          Start exploring delicious recipes and save them here for easy access
          later.
        </p>
        <Link href="/">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8">
            Browse Recipes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {favorites.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
}
