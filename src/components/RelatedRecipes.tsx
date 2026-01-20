import { getRecipesByCategory, Meal } from "@/lib/api";
import RecipeCard from "@/components/RecipeCard";

export default async function RelatedRecipes({
  category,
  currentId,
}: {
  category: string;
  currentId: string;
}) {
  const recipes = await getRecipesByCategory(category);
  const related = recipes
    .filter((r) => r.idMeal !== currentId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-16 border-t border-white/5 bg-zinc-950/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          You Might Also Like
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((recipe, index) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
