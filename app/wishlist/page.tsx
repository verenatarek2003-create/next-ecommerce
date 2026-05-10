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
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8">
      <h1 className="inline-flex items-center gap-2 text-3xl font-semibold">
        <Heart />
        Wishlist
      </h1>
      {!wishlistIds.length ? (
        <p className="text-zinc-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {query.data?.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={add} />
          ))}
        </div>
      )}
    </main>
  );
}
