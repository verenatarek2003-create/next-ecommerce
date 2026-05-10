"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useProductsQuery } from "@/features/products/hooks/use-products-query";
import { ProductCard } from "@/components/commerce/product-card";
import { useCartStore } from "@/features/cart/store/cart-store";
import type { Product } from "@/types/domain";

interface ProductGridClientProps {
  initialSearch?: string;
  initialCategory?: string;
}

export function ProductGridClient({
  initialSearch = "",
  initialCategory,
}: ProductGridClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<string>("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const add = useCartStore((s) => s.add);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const filters = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      category: initialCategory,
      sortBy,
      order,
      limit: 12,
      skip: 0,
    }),
    [debouncedSearch, initialCategory, sortBy, order],
  );

  const query = useProductsQuery(filters);
  const products = query.data?.products ?? [];

  return (
    <section className="space-y-6">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 rounded-md border border-zinc-300 px-3"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-10 rounded-md border border-zinc-300 px-3"
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          className="h-10 rounded-md border border-zinc-300 px-3"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {query.isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="h-72 animate-pulse rounded-xl bg-zinc-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(selectedProduct) => {
                add(selectedProduct, 1);
                const totalItems = useCartStore
                  .getState()
                  .lines.reduce((sum, line) => sum + line.quantity, 0);
                toast.success(`${selectedProduct.title} added`, {
                  description: `Cart now has ${totalItems} item${totalItems > 1 ? "s" : ""}.`,
                });
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
