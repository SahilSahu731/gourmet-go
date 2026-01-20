import axios from "axios";

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null | undefined; // For dynamic ingredient access
}

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
});

export const getRecipesByName = async (name: string): Promise<Meal[]> => {
  const response = await api.get<{ meals: Meal[] }>(`/search.php?s=${name}`);
  return response.data.meals || [];
};

export const getRecipeById = async (id: string): Promise<Meal | null> => {
  const response = await api.get<{ meals: Meal[] }>(`/lookup.php?i=${id}`);
  return response.data.meals ? response.data.meals[0] : null;
};

export const getRandomRecipe = async (): Promise<Meal | null> => {
  const response = await api.get<{ meals: Meal[] }>("/random.php");
  return response.data.meals ? response.data.meals[0] : null;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<{ categories: Category[] }>("/categories.php");
  return response.data.categories || [];
};

export const getAreas = async (): Promise<{ strArea: string }[]> => {
  const response = await api.get<{ meals: { strArea: string }[] }>(
    "/list.php?a=list",
  );
  return response.data.meals || [];
};

export const getRecipesByCategory = async (
  category: string,
): Promise<Meal[]> => {
  const response = await api.get<{ meals: Meal[] }>(
    `/filter.php?c=${category}`,
  );
  return response.data.meals || [];
};

export default api;
