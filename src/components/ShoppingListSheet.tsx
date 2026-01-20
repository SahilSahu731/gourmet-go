"use client";

import { useShoppingStore } from "@/store/useShoppingStore";
import {
  Copy,
  Plus,
  ShoppingBasket,
  Trash2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ShoppingListSheet() {
  const { items, addItem, toggleItem, removeItem, clearCompleted } =
    useShoppingStore();
  const [newItem, setNewItem] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    addItem({ name: newItem.trim() });
    setNewItem("");
    toast.success("Item added to shopping list");
  };

  const copyToClipboard = () => {
    const listText = items
      .map(
        (i) =>
          `${i.completed ? "[x]" : "[ ]"} ${i.name} ${i.measure ? `(${i.measure})` : ""}`,
      )
      .join("\n");
    navigator.clipboard.writeText(listText);
    toast.success("List copied to clipboard");
  };

  const activeCount = items.filter((i) => !i.completed).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-zinc-400 hover:bg-white/10 hover:text-white rounded-full"
        >
          <ShoppingBasket className="h-5 w-5" />
          {mounted && activeCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white ring-2 ring-black">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md border-l border-white/10 bg-zinc-950 text-white flex flex-col h-full">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold text-white flex items-center justify-between">
            <span>Shopping List</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              title="Copy List"
            >
              <Copy className="h-4 w-4 text-zinc-400 hover:text-white" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleAddItem} className="flex gap-2 mb-6">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add item (e.g. Milk)"
            className="bg-zinc-900 border-zinc-800 focus-visible:ring-orange-500"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        {mounted ? (
          <div className="flex-1 overflow-y-auto -mr-6 pr-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-zinc-500 text-center">
                <ShoppingBasket className="h-12 w-12 mb-4 opacity-20" />
                <p>Your list is empty.</p>
                <p className="text-sm">Add ingredients from recipes!</p>
              </div>
            ) : (
              <ul className="space-y-2">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="group flex items-center justify-between rounded-lg border border-white/5 bg-zinc-900/50 p-3 transition-colors hover:bg-zinc-900"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="shrink-0 text-zinc-400 hover:text-orange-500 transition-colors"
                        >
                          {item.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </button>
                        <div className="flex flex-col min-w-0">
                          <span
                            className={`truncate font-medium transition-all ${item.completed ? "text-zinc-600 line-through" : "text-zinc-200"}`}
                          >
                            {item.name}
                          </span>
                          {item.measure && (
                            <span className="text-xs text-zinc-500 truncate">
                              {item.measure}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        ) : null}

        {items.some((i) => i.completed) && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <Button
              variant="outline"
              className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
              onClick={clearCompleted}
            >
              Clear Completed
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
