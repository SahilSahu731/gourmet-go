"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center text-white selection:bg-orange-500/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute -inset-4 rounded-full bg-orange-500/10 blur-2xl" />
        <AlertCircle className="relative mb-6 h-20 w-20 text-orange-500" />
      </motion.div>

      <h2 className="mb-4 text-3xl font-black md:text-5xl">
        Kitchen Emergency!
      </h2>
      <p className="mb-8 max-w-md text-lg text-zinc-400">
        Something went wrong while preparing this page. Don&apos;t worry, even
        the best chefs have accidents.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => reset()}
          size="lg"
          className="rounded-full bg-orange-500 px-8 py-6 text-lg font-bold hover:bg-orange-600 transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          size="lg"
          className="rounded-full border-white/10 bg-white/5 px-8 py-6 text-lg font-bold hover:bg-white/10 hover:border-white/20 transition-all"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
