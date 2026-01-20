import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-center text-white">
      <h2 className="text-8xl font-black text-zinc-800">404</h2>
      <h3 className="mb-4 mt-8 text-2xl font-bold">Recipe Not Found</h3>
      <p className="mb-8 max-w-md text-zinc-400">
        The recipe you are looking for seems to have been eaten or does not
        exist.
      </p>
      <Link href="/">
        <Button className="rounded-full bg-orange-500 px-8 hover:bg-orange-600">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
