import { getCategories, getRecipesByCategory, Category } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import RecipeGrid from "@/components/RecipeGrid";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; area?: string }>;
}) {
  const { category } = await searchParams;

  // Default to first category if nothing selected
  const categories = await getCategories();
  // const areas = await getAreas();
  // Commented out areas for now as we will focus on category filtering first for cleaner UI

  const activeCategory = category || categories[0]?.strCategory || "Beef";
  const recipes = await getRecipesByCategory(activeCategory);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="bg-zinc-950 pt-24 pb-12 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
            Explore <span className="text-orange-500">Global Flavors</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-zinc-400">
            Browse through our extensive collection of recipes categorized for
            your convenience. From Italian pasta to Japanese sushi, find your
            next craving here.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Top bar for categories */}
          <div className="w-full md:w-64 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 rounded-xl bg-zinc-900/50 p-4 border border-white/5 scrollbar-thin scrollbar-thumb-zinc-700">
              <h3 className="text-lg font-bold text-white mb-4 px-2">
                Categories
              </h3>
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                {categories.map((cat: Category) => (
                  <Link
                    key={cat.idCategory}
                    href={`/explore?category=${cat.strCategory}`}
                    scroll={false}
                  >
                    <div
                      className={`flex items-center gap-3 p-2 rounded-lg transition-all ${activeCategory === cat.strCategory ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "hover:bg-white/10 text-zinc-400 hover:text-white"}`}
                    >
                      <Image
                        src={cat.strCategoryThumb}
                        alt={cat.strCategory}
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain rounded-full bg-white/10 p-1"
                      />
                      <span className="font-medium">{cat.strCategory}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="bg-orange-500 w-2 h-8 rounded-full inline-block" />
                {activeCategory} Recipes
              </h2>
            </div>

            <RecipeGrid recipes={recipes} />
          </div>
        </div>
      </div>
    </main>
  );
}
