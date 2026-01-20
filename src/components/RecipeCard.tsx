"use client";

import { useRecipeStore } from "@/store/useRecipeStore";
import { Meal } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface RecipeCardProps {
  recipe: Meal;
  index?: number;
}

export default function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const isFavorited = useRecipeStore((state) =>
    state.favorites.some((f) => f.idMeal === recipe.idMeal),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/recipe/${recipe.idMeal}`}>
        <div className="group relative h-full overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 shadow-xl transition-all duration-300 hover:border-orange-500/30 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-orange-500/10">
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

            <div className="absolute right-4 top-4 z-10">
              {isFavorited && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  View Recipe
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-5">
            <div>
              <div className="mb-3 flex items-center justify-between">
                {recipe.strCategory && (
                  <Badge
                    variant="secondary"
                    className="bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
                  >
                    {recipe.strCategory}
                  </Badge>
                )}
                {recipe.strArea && (
                  <span className="flex items-center gap-1 text-xs text-zinc-400">
                    <MapPin className="h-3 w-3" /> {recipe.strArea}
                  </span>
                )}
              </div>
              <h3 className="line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-orange-400">
                {recipe.strMeal}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
