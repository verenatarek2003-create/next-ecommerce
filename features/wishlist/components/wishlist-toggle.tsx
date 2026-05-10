"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/features/wishlist/store/wishlist-store";
import { cn } from "@/lib/utils";

export function WishlistToggle({ productId }: { productId: number }) {
  const { items, toggle } = useWishlistStore();
  const active = items.includes(productId);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => toggle(productId)}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(27_18_38_/0.08)] bg-[var(--surface)] text-[var(--muted)] shadow-[var(--shadow-xs)] transition-all duration-200 hover:scale-105 hover:border-[rgb(225_29_116_/0.25)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]",
        active &&
          "border-[rgb(225_29_116_/0.45)] bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-[0_4px_14px_rgb(225_29_116_/0.2)]",
      )}
    >
      <Heart size={15} fill={active ? "currentColor" : "none"} strokeWidth={2} />
    </button>
  );
}
