import { getCategories, getRandomRecipe, Meal, Category } from "@/lib/api";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/HomeHero";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Utensils } from "lucide-react";

export default async function Home() {
  const categoriesData = getCategories();
  const randomRecipesData = Promise.all([
    getRandomRecipe(),
    getRandomRecipe(),
    getRandomRecipe(),
    getRandomRecipe(),
    getRandomRecipe(),
    getRandomRecipe(),
    getRandomRecipe(),
    getRandomRecipe(),
  ]);

  const [categories, randomRecipes] = await Promise.all([
    categoriesData,
    randomRecipesData,
  ]);

  // Filter out nulls
  const validRandomRecipes = randomRecipes.filter((r): r is Meal => r !== null);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <Navbar />

      <HomeHero categories={categories} />

      {/* Popular/Daily Inspiration Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <Flame className="h-5 w-5" />
              <span className="font-bold tracking-wider uppercase text-sm">
                Hot Picks
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Daily Inspiration
            </h2>
          </div>
          <Link
            href="/explore"
            className="group flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-orange-500"
          >
            View all recipes{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {validRandomRecipes.map((recipe, index) => (
            <RecipeCard
              key={`${recipe.idMeal}-${index}`}
              recipe={recipe}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Feature Bento Grid for Categories */}
      <section
        className="bg-zinc-950/50 py-24 relative overflow-hidden"
        id="categories"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-2 block">
              Curated Collections
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">
              Explore by Category
            </h2>
            <p className="text-zinc-400 text-lg">
              Dive into our diverse collection of culinary delights sorted by
              specific food categories.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
            {/* Large Featured Item */}
            {categories && categories[0] && (
              <Link
                href={`/explore?category=${categories[0].strCategory}`}
                className="col-span-2 row-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition-all hover:border-orange-500/50"
              >
                <Image
                  src={categories[0].strCategoryThumb}
                  alt={categories[0].strCategory}
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-2 block">
                    Featured Category
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {categories[0].strCategory}
                  </h3>
                  <p className="text-zinc-300 line-clamp-2 text-sm">
                    {categories[0].strCategoryDescription}
                  </p>
                </div>
              </Link>
            )}

            {categories.slice(1, 7).map((cat: Category) => (
              <Link
                key={cat.idCategory}
                href={`/explore?category=${cat.strCategory}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 flex flex-col items-center justify-center text-center transition-all hover:bg-zinc-800 hover:border-orange-500/30"
              >
                <div className="relative h-20 w-20 mb-4 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={cat.strCategoryThumb}
                    alt={cat.strCategory}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold text-white group-hover:text-orange-400">
                  {cat.strCategory}
                </h3>
              </Link>
            ))}

            <Link
              href="/explore"
              className="group relative overflow-hidden rounded-3xl border border-dashed border-white/20 bg-transparent p-6 flex flex-col items-center justify-center text-center transition-all hover:bg-white/5 hover:border-orange-500"
            >
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <ArrowRight className="h-6 w-6 text-zinc-400 group-hover:text-white" />
              </div>
              <span className="font-medium text-zinc-400 group-hover:text-white">
                View All Categories
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="relative rounded-[2.5rem] bg-zinc-900 overflow-hidden px-8 py-20 text-center md:px-20">
          <div className="absolute inset-0 bg-[url('https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/preview')] bg-cover opacity-10 bg-center" />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/80 to-transparent" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Start Cooking?
            </h2>
            <p className="text-xl text-zinc-400">
              Join our community of food lovers and start your culinary journey
              today.
            </p>
            <Link href="/explore">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-lg hover:shadow-orange-500/25">
                Find a Recipe
              </button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-black py-12 text-center text-zinc-500">
        <div className="flex items-center justify-center gap-2 mb-4 text-zinc-300">
          <Utensils className="h-5 w-5 text-orange-500" />
          <span className="font-bold text-lg">GourmetGo</span>
        </div>
        <p>&copy; {new Date().getFullYear()} GourmetGo. All rights reserved.</p>
      </footer>
    </main>
  );
}
