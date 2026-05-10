"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { useCartStore } from "@/features/cart/store/cart-store";

export function CartLink() {
  const cartItemsCount = useCartStore((state) =>
    state.lines.reduce((sum, line) => sum + line.quantity, 0),
  );

  return (
    <Link
      href={ROUTES.cart}
      className="relative inline-flex items-center gap-2 rounded-full px-3 py-2 transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--brand)]"
      aria-label={`Cart with ${cartItemsCount} items`}
    >
      <ShoppingCart size={15} />
      <span className="hidden sm:inline">Cart</span>
      {cartItemsCount > 0 ? (
        <span className="animate-pulse-soft absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent-strong)] px-1 text-[11px] font-semibold text-white">
          {cartItemsCount > 99 ? "99+" : cartItemsCount}
        </span>
      ) : null}
    </Link>
  );
}
