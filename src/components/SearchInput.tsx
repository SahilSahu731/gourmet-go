"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative mx-auto flex w-full max-w-2xl items-center"
    >
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
        <Input
          type="text"
          placeholder="Search for a recipe (e.g., Pasta, Chicken)..."
          className="h-14 w-full rounded-full border-white/10 bg-white/5 pl-12 pr-32 text-lg text-white backdrop-blur-md placeholder:text-zinc-500 focus-visible:ring-orange-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          className="absolute right-2 top-2 bottom-2 rounded-full bg-orange-500 px-6 font-semibold text-white hover:bg-orange-600"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
