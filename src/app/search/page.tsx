import { getRecipesByName, getRecipesByCategory, Meal } from "@/lib/api";
import Navbar from "@/components/Navbar";
import SearchInput from "@/components/SearchInput";
import RecipeGrid from "@/components/RecipeGrid";
import { ArrowLeft, Sparkles, Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; c?: string }>;
}) {
  const { q, c } = await searchParams;
  let recipes: Meal[] = [];
  let title = "";
  let subtitle = "";

  if (q) {
    recipes = await getRecipesByName(q);
    title = `Results for "${q}"`;
    subtitle = `Found ${recipes?.length || 0} matches for your search`;
  } else if (c) {
    recipes = await getRecipesByCategory(c);
    title = `${c} Recipes`;
    subtitle = `Browse our collection of ${c} dishes`;
  } else {
    title = "Search Recipes";
    subtitle = "Find your next culinary masterpiece";
  }

  // Handle API returning null for no results
  recipes = recipes || [];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <Navbar />

      <div className="relative bg-zinc-950 pt-28 pb-16 border-b border-white/5 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[128px] -z-10" />

        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />{" "}
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="border-orange-500/20 bg-orange-500/5 text-orange-400"
                >
                  <SearchIcon className="mr-1 h-3 w-3" /> Search
                </Badge>
                {c && (
                  <Badge
                    variant="outline"
                    className="border-white/10 bg-white/5 text-zinc-400"
                  >
                    Category: {c}
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-black text-white md:text-6xl tracking-tight mb-4">
                {title}
              </h1>
              <p className="text-lg text-zinc-400 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-500" />
                {subtitle}
              </p>
            </div>

            <div className="w-full lg:w-auto min-w-[300px]">
              <div className="bg-zinc-900/50 p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                <SearchInput />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {recipes.length > 0 ? (
          <RecipeGrid recipes={recipes} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] rounded-3xl border border-dashed border-white/10 bg-zinc-900/30 p-8 text-center">
            <div className="h-20 w-20 rounded-full bg-zinc-900 flex items-center justify-center mb-6 shadow-xl shadow-black/20">
              <SearchIcon className="h-8 w-8 text-zinc-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No results found
            </h2>
            <p className="text-zinc-500 max-w-md mx-auto mb-8">
              We couldn&apos;t find any recipes matching your criteria. Try
              adjusting your search or browse our categories.
            </p>
            <Link href="/explore">
              <button className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-full font-bold transition-colors">
                Browse Categories
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
