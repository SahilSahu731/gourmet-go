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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface IngredientButtonProps {
  ingredient: string;
  measure: string;
}

export default function AddToShoppingListButton({
  ingredient,
  measure,
}: IngredientButtonProps) {
  const addItem = useShoppingStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ name: `${ingredient} - ${measure}` });
    setAdded(true);
    toast.success(`Added ${ingredient} to shopping list`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleAdd}
      className="h-8 w-8 text-zinc-500 hover:text-orange-500 hover:bg-orange-500/10"
      title="Add to Shopping List"
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </motion.div>
        ) : (
          <motion.div
            key="plus"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Plus className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
