import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DummyJsonProductRepository } from "@/core/infrastructure/repositories/dummyjson-repositories";
import { ProductGridClient } from "@/features/products/components/product-grid-client";

export const metadata: Metadata = {
  title: "Products | Verina",
  description: "Shop premium products on Verina.",
};

const productRepo = new DummyJsonProductRepository();

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const categories = await productRepo.categories();
  const activeCategory = params.category;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 md:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Shop Verina</h1>
        <p className="text-zinc-600">Discover trending, elegant, and modern essentials.</p>
      </header>

      <section className="flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            !activeCategory
              ? "border-zinc-900 bg-zinc-900 text-white"
              : "border-zinc-300 hover:bg-zinc-50"
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              activeCategory === category.slug
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
            aria-current={activeCategory === category.slug ? "page" : undefined}
          >
            {category.name}
          </Link>
        ))}
      </section>

      <Suspense fallback={<div className="h-80 animate-pulse rounded-xl bg-zinc-100" />}>
        <ProductGridClient
          initialSearch={params.q ?? ""}
          initialCategory={params.category}
        />
      </Suspense>
    </main>
  );
}
