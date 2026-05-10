"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/domain";

export interface CartLine {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  add: (product: Product, quantity?: number) => void;
  updateQty: (productId: number, quantity: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (product, quantity = 1) =>
        set((state) => {
          const current = state.lines.find((line) => line.id === product.id);
          if (current) {
            return {
              lines: state.lines.map((line) =>
                line.id === product.id
                  ? { ...line, quantity: line.quantity + quantity }
                  : line,
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity,
              },
            ],
          };
        }),
      updateQty: (productId, quantity) =>
        set((state) => ({
          lines: state.lines.map((line) =>
            line.id === productId ? { ...line, quantity: Math.max(1, quantity) } : line,
          ),
        })),
      remove: (productId) =>
        set((state) => ({ lines: state.lines.filter((line) => line.id !== productId) })),
      clear: () => set({ lines: [] }),
    }),
    { name: "verina-cart" },
  ),
);
