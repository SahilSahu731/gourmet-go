"use client";

import { Category } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import SearchInput from "./SearchInput";

export default function HomeHero({ categories }: { categories: Category[] }) {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-orange-500/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge
            variant="outline"
            className="mb-4 border-orange-500/50 bg-orange-500/10 px-4 py-1 text-sm text-orange-400 backdrop-blur-md"
          >
            #1 Recipe App for Foodies
          </Badge>
          <h1 className="bg-linear-to-br from-white via-white to-zinc-500 bg-clip-text text-6xl font-black tracking-tighter text-transparent sm:text-8xl">
            Master the Art of <br />
            <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Cooking
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-zinc-400 sm:text-2xl"
        >
          Explore thousands of premium recipes, learn from the best chefs, and
          turn your kitchen into a culinary sanctuary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto w-full max-w-2xl pt-4"
        >
          <SearchInput />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-12"
        >
          <p className="mb-4 text-sm font-medium text-zinc-500 uppercase tracking-widest">
            Trending Categories
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.idCategory}
                href={`/explore?category=${cat.strCategory}`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-md transition-colors hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white"
                >
                  <Image
                    src={cat.strCategoryThumb}
                    alt={cat.strCategory}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full"
                  />
                  {cat.strCategory}
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
