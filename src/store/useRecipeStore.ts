import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  // Add other fields as needed, keeping it flexible for list vs detail views
}

interface RecipeStore {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (recipe) =>
        set((state) => {
          if (state.favorites.some((fav) => fav.idMeal === recipe.idMeal))
            return state;
          return { favorites: [...state.favorites, recipe] };
        }),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((recipe) => recipe.idMeal !== id),
        })),
      isFavorite: (id) =>
        get().favorites.some((recipe) => recipe.idMeal === id),
    }),
    {
      name: "recipe-storage",
    },
  ),
);
