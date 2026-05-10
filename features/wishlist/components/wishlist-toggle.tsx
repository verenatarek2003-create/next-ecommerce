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
        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--muted)] transition-colors hover:bg-[var(--accent-soft)]",
        active && "border-[#EC4899] bg-[#FDE7F3] text-[#BE185D]",
      )}
    >
      <Heart size={14} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
