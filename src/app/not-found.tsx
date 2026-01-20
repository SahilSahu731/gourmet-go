"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChefHat, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center text-white selection:bg-orange-500/30 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <h2 className="text-9xl font-black text-white/5 drop-shadow-sm select-none">
          404
        </h2>
        <div className="absolute inset-0 flex items-center justify-center">
          <ChefHat className="h-24 w-24 text-orange-500" />
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-4 mt-8 text-3xl font-black md:text-5xl uppercase italic tracking-tight"
      >
        Recipe Not Found
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-12 max-w-md text-lg text-zinc-400"
      >
        The dish you are looking for seems to have been eaten or does not exist
        in our cookbook.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link href="/">
          <Button className="rounded-full bg-orange-500 px-10 py-7 text-xl font-black hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/25">
            <Home className="mr-3 h-6 w-6" />
            RETURN HOME
          </Button>
        </Link>
      </motion.div>

      <div className="mt-20 flex items-center gap-2 text-zinc-600">
        <span className="h-px w-8 bg-zinc-800" />
        <span className="text-xs font-black uppercase tracking-widest">
          GourmetGo
        </span>
        <span className="h-px w-8 bg-zinc-800" />
      </div>
    </div>
  );
}
