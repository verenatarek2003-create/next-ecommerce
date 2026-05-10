"use client";

import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { DummyJsonProductRepository } from "@/core/infrastructure/repositories/dummyjson-repositories";
import { ProductCard } from "@/components/commerce/product-card";
import { useWishlistStore } from "@/features/wishlist/store/wishlist-store";
import { useCartStore } from "@/features/cart/store/cart-store";

const productRepo = new DummyJsonProductRepository();

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((s) => s.items);
  const add = useCartStore((s) => s.add);

  const query = useQuery({
    queryKey: ["wishlist-products", wishlistIds],
    queryFn: async () => {
      const products = await Promise.all(wishlistIds.map((id) => productRepo.byId(id)));
      return products;
    },
    enabled: wishlistIds.length > 0,
  });

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-11 md:px-6 md:py-12">
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">Saved</p>
        <h1 className="inline-flex items-center gap-3 text-[2rem] font-semibold tracking-tight text-[var(--brand)] md:text-[2.25rem]">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] shadow-[var(--shadow-xs)] ring-1 ring-[rgb(225_29_116_/0.1)]">
            <Heart size={22} strokeWidth={2} className="text-[var(--accent-strong)]" />
          </span>
          Wishlist
        </h1>
      </div>
      {!wishlistIds.length ? (
        <p className="rounded-[1.25rem] border border-dashed border-[rgb(27_18_38_/0.14)] bg-[var(--surface)] px-6 py-10 text-center text-[15px] text-[var(--muted)]">
          Your wishlist is empty — tap the heart on a product card to save it here.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {query.data?.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={add} />
          ))}
        </div>
      )}
    </main>
  );
}
