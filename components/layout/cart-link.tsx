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
      className="relative inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-soft)] hover:text-[var(--brand)] hover:shadow-[var(--shadow-xs)]"
      aria-label={`Cart with ${cartItemsCount} items`}
    >
      <ShoppingCart size={15} strokeWidth={2} />
      <span className="hidden sm:inline">Cart</span>
      {cartItemsCount > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-linear-to-br from-[#e11d74] to-[#aa1a5f] px-1 text-[11px] font-semibold text-white shadow-[0_2px_8px_rgb(225_29_116_/0.45)] ring-2 ring-[var(--surface)]">
          {cartItemsCount > 99 ? "99+" : cartItemsCount}
        </span>
      ) : null}
    </Link>
  );
}
