"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/features/cart/store/cart-store";
import type { Product } from "@/types/domain";
import { Button } from "@/components/ui/button";

export function AddToCartPanel({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Quantity</p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            <Minus size={14} />
          </Button>
          <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setQuantity((prev) => Math.min(product.stock || 99, prev + 1))}
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>
      <Button
        className="w-full gap-2"
        onClick={() => {
          add(product, quantity);
          const totalItems = useCartStore
            .getState()
            .lines.reduce((sum, line) => sum + line.quantity, 0);
          toast.success(`${product.title} added`, {
            description: `Cart now has ${totalItems} item${totalItems > 1 ? "s" : ""}.`,
          });
        }}
      >
        <ShoppingCart size={15} />
        Add to cart
      </Button>
      <p className="text-xs text-zinc-500">Stock: {product.stock} items available</p>
    </div>
  );
}
