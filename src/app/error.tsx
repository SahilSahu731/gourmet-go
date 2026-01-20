"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

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
    <div className="flex h-screen flex-col items-center justify-center bg-black text-center text-white">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <Button
        onClick={() => reset()}
        variant="outline"
        className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
      >
        Try again
      </Button>
    </div>
  );
}
