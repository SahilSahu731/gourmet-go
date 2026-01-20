"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  UtensilsCrossed,
  Heart,
  Menu,
  Search,
  Compass,
  ChefHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecipeStore } from "@/store/useRecipeStore";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import ShoppingListSheet from "./ShoppingListSheet";

const navLinks = [
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Categories", href: "/#categories", icon: ChefHat },
];

export default function Navbar() {
  const favorites = useRecipeStore((state) => state.favorites);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/50 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/20"
          >
            <UtensilsCrossed className="h-6 w-6" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-white">
            Gourmet<span className="text-orange-500">Go</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative flex items-center gap-2 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  <link.icon
                    className={`h-4 w-4 transition-colors ${isActive ? "text-orange-500" : "group-hover:text-orange-400"}`}
                  />
                  <span className={isActive ? "text-white" : ""}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/search">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:bg-white/10 hover:text-white rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <ShoppingListSheet />
            <Link href="/favorites">
              <Button
                variant="ghost"
                className="relative group rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-orange-500/50"
              >
                <Heart className="mr-2 h-4 w-4 transition-colors group-hover:text-red-500" />
                <span>Favorites</span>
                {mounted && favorites.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white ring-2 ring-black">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] border-l border-white/10 bg-zinc-950/95 backdrop-blur-xl"
          >
            <div className="mt-8 flex flex-col gap-6">
              <Link href="/" className="text-xl font-bold text-white">
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-4 text-lg font-medium text-zinc-400 hover:text-orange-500"
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}
              <Link
                href="/search"
                className="flex items-center gap-4 text-lg font-medium text-zinc-400 hover:text-orange-500"
              >
                <Search className="h-5 w-5" />
                Search
              </Link>
              <Link
                href="/favorites"
                className="flex items-center gap-4 text-lg font-medium text-zinc-400 hover:text-orange-500"
              >
                <Heart className="h-5 w-5" />
                Favorites
                {mounted && favorites.length > 0 && (
                  <span className="ml-auto rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
