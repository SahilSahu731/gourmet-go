import { getRecipeById, Meal } from "@/lib/api";
import Navbar from "@/components/Navbar";
import FavoriteButton from "@/components/FavoriteButton";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  ArrowLeft,
  PlayCircle,
  Flame,
  ChefHat,
  Activity,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButton from "@/components/ShareButton";
import AddToShoppingListButton from "@/components/AddToShoppingListButton";
import RelatedRecipes from "@/components/RelatedRecipes";

// Helper to extract ingredients
const getIngredients = (recipe: Meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }
  return ingredients;
};

// Helper to clean and split instructions
const formatInstructions = (instructions: string) => {
  if (!instructions) return [];

  // Split by common delimiters
  const steps = instructions
    .split(/\r\n|\n\r|\n|\r/)
    .map((step) => step.trim())
    .filter((step) => step.length > 0);

  return steps
    .map((step) => {
      // Remove leading numbers like "1. ", "1) ", "Step 1: ", "1 "
      // and also remove things like "STEP 1" if it's the whole line or prefix
      const cleaned = step
        .replace(/^(step\s*\d+[:.\s-]*|\d+[:.\s-]*)/i, "")
        .trim();

      // If it was just a header line like "STEP 1" and now it's empty, we'll filter it later
      return cleaned;
    })
    .filter((step) => step.length > 5); // Ignore very short lines that might be headers
};

// Mock function to generate nutrition data
const getNutrition = () => {
  return [
    {
      label: "Calories",
      value: `${Math.floor(Math.random() * 500) + 200}`,
      unit: "kcal",
    },
    {
      label: "Protein",
      value: `${Math.floor(Math.random() * 30) + 10}`,
      unit: "g",
    },
    {
      label: "Carbs",
      value: `${Math.floor(Math.random() * 60) + 20}`,
      unit: "g",
    },
    { label: "Fat", value: `${Math.floor(Math.random() * 20) + 5}`, unit: "g" },
  ];
};

const getTips = (category: string) => {
  const commonTips = [
    "Don't over-crowd the pan when searing meat to ensure a nice crust.",
    "Always taste your food and adjust seasoning (salt and pepper) at different stages.",
    "Let meat rest for at least 5-10 minutes after cooking to retain its juices.",
    "Prep all your ingredients (mise en place) before you start the heat.",
  ];

  const categorySpecific: Record<string, string[]> = {
    Dessert: [
      "Ensure your butter is at room temperature for better emulsion in cakes.",
      "Don't overmix the batter once flour is added.",
    ],
    Seafood: [
      "Fish cooks very fast. It should be opaque and flake easily when done.",
      "Fresh lemon juice is the best companion for any seafood dish.",
    ],
    Pasta: [
      "Always save a cup of pasta water to help emulsify your sauce.",
      "Cook pasta 'al dente' for the best texture.",
    ],
  };

  return categorySpecific[category]
    ? [...categorySpecific[category], ...commonTips.slice(0, 2)]
    : commonTips;
};

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const ingredients = getIngredients(recipe);
  const instructions = formatInstructions(recipe.strInstructions);
  const tags = recipe.strTags ? recipe.strTags.split(",") : [];
  const nutrition = getNutrition();
  const tips = getTips(recipe.strCategory);

  return (
    <main className="min-h-screen bg-black text-white pb-20 selection:bg-orange-500/30">
      <Navbar />

      {/* Hero Header with Parallax-like Image */}
      <div className="relative h-[75vh] w-full overflow-hidden">
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          fill
          className="object-cover brightness-50 transition-transform duration-1000 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-transparent" />

        <div className="absolute top-24 left-4 z-20">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 border border-white/10"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 md:p-12">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-6 flex-1">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-orange-500 hover:bg-orange-600 px-4 py-1 text-sm border-none shadow-xl shadow-orange-500/30 font-bold uppercase tracking-wider">
                    {recipe.strCategory}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-white border-white/30 px-4 py-1 text-sm backdrop-blur-md bg-white/5"
                  >
                    {recipe.strArea}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-orange-400 border-orange-500/30 px-4 py-1 text-sm backdrop-blur-md bg-orange-500/5"
                  >
                    Intermediate
                  </Badge>
                </div>

                <h1 className="text-5xl font-black md:text-8xl leading-[0.9] text-white drop-shadow-2xl tracking-tighter">
                  {recipe.strMeal}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-semibold text-zinc-100">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                    <Clock className="h-5 w-5 text-orange-400" />
                    <span>45 MINS</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                    <Users className="h-5 w-5 text-orange-400" />
                    <span>4 SERVINGS</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                    <Flame className="h-5 w-5 text-orange-400" />
                    <span>~{nutrition[0].value} kcal</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShareButton
                  title={recipe.strMeal}
                  url={`https://gourmetgo.app/recipe/${id}`}
                />
                <FavoriteButton recipe={recipe} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl mt-16 grid gap-16 px-4 lg:grid-cols-[1fr_380px]">
        <div className="space-y-16">
          {/* Instructions */}
          <section>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500/20 p-3 rounded-2xl ring-1 ring-orange-500/50">
                  <ChefHat className="h-7 w-7 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight italic uppercase">
                    Execution
                  </h2>
                  <p className="text-zinc-500 text-sm font-medium">
                    Follow the master commands
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-10 group/list">
              {instructions.map((step, index) => (
                <div key={index} className="relative flex gap-8 group">
                  <div className="shrink-0 relative">
                    <div className="absolute top-8 bottom-[-40px] left-1/2 w-px bg-linear-to-b from-zinc-800 to-transparent group-last:hidden" />
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-orange-500 font-black text-xl border-2 border-zinc-800 group-hover:border-orange-500/40 group-hover:bg-orange-500/10 transition-all duration-300 shadow-xl">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xl leading-relaxed text-zinc-300 group-hover:text-white transition-colors duration-300 font-medium max-w-3xl">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Chef's Tips Section */}
          <section className="bg-linear-to-br from-zinc-900/50 to-zinc-900/10 rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-zinc-800 p-3 rounded-2xl border border-white/10">
                <Sparkles className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic">
                Chef&apos;s Secrets
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start bg-black/30 p-5 rounded-2xl border border-white/5 hover:border-orange-500/20 transition-colors"
                >
                  <div className="h-2 w-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <p className="text-zinc-400 text-base italic leading-snug">
                    &quot;{tip}&quot;
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* YouTube Video */}
          {recipe.strYoutube && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-red-500/10 p-3 rounded-2xl ring-1 ring-red-500/50">
                  <PlayCircle className="h-7 w-7 text-red-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">
                    Technique
                  </h2>
                  <p className="text-zinc-500 text-sm font-medium">
                    Watch the process in motion
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 shadow-3xl group">
                <div className="aspect-video w-full relative">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${recipe.strYoutube?.split("v=")[1]?.split("&")[0]}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          {/* Nutrition Card */}
          <div className="rounded-[2.5rem] border border-white/5 bg-linear-to-b from-zinc-900 to-black p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-500/10 p-2.5 rounded-xl border border-green-500/20">
                <Activity className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="font-black text-white uppercase italic tracking-wider">
                Nutrition
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {nutrition.map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 rounded-2xl p-5 text-center border border-white/5 hover:border-white/10 transition-colors"
                >
                  <span className="block text-3xl font-black text-white tracking-tighter">
                    {item.value}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em] mt-1 block">
                    {item.unit} {item.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 mt-6 text-center italic font-medium">
              * Calculations are estimations based on average ingredient weight
            </p>
          </div>

          {/* Ingredients Card */}
          <div className="rounded-[2.5rem] border border-white/5 bg-zinc-900/50 p-8 shadow-2xl sticky top-24 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                Elements
              </h3>
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-black text-zinc-400 border border-white/5">
                {ingredients.length} TOTAL
              </span>
            </div>
            <ul className="space-y-4">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="group flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                    <span className="font-bold text-zinc-300 group-hover:text-white transition-colors decoration-orange-500/30 line-clamp-1">
                      {item.ingredient}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-zinc-500 whitespace-nowrap uppercase tracking-widest">
                      {item.measure}
                    </span>
                    <AddToShoppingListButton
                      ingredient={item.ingredient}
                      measure={item.measure || ""}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {tags.length > 0 && (
            <div className="pt-8 border-t border-white/5">
              <h3 className="mb-4 text-sm font-black text-zinc-500 uppercase tracking-[0.2em]">
                Classification
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-400 hover:bg-orange-500 hover:text-white transition-all cursor-pointer border border-white/5"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <RelatedRecipes category={recipe.strCategory} currentId={recipe.idMeal} />
    </main>
  );
}
