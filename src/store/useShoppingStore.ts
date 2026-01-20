import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ShoppingItem {
  id: string;
  name: string;
  measure?: string;
  completed: boolean;
  recipeId?: string;
  recipeName?: string;
}

interface ShoppingStore {
  items: ShoppingItem[];
  addItem: (item: Omit<ShoppingItem, "id" | "completed">) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCompleted: () => void;
}

export const useShoppingStore = create<ShoppingStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: Math.random().toString(36).substr(2, 9),
              completed: false,
            },
          ],
        })),
      toggleItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item,
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCompleted: () =>
        set((state) => ({
          items: state.items.filter((item) => !item.completed),
        })),
    }),
    {
      name: "shopping-list-storage",
    },
  ),
);
