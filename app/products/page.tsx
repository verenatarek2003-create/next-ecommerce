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

const pillBase =
  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const categories = await productRepo.categories();
  const activeCategory = params.category;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-11 md:px-6 md:py-12">
      <header className="max-w-2xl space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">Shop</p>
        <h1 className="text-[2.125rem] font-semibold tracking-tight text-[var(--brand)] md:text-[2.5rem]">
          Verina boutique
        </h1>
        <p className="text-[15px] leading-relaxed text-[var(--muted)] md:text-base">
          Discover trending, graceful pieces with effortless styling and serene layouts.
        </p>
      </header>

      <section className="flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`${pillBase} ${
            !activeCategory
              ? "border-transparent bg-linear-to-r from-[#e11d74] to-[#aa1a5f] text-white shadow-[0_10px_32px_-10px_rgb(225_29_116_/0.52)]"
              : "border-[rgb(27_18_38_/0.08)] bg-[var(--surface)] text-[var(--muted)] shadow-[var(--shadow-xs)] hover:border-[rgb(225_29_116_/0.2)] hover:bg-[var(--accent-soft)] hover:text-[var(--brand)]"
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            className={`${pillBase} ${
              activeCategory === category.slug
                ? "border-transparent bg-linear-to-r from-[#e11d74] to-[#aa1a5f] text-white shadow-[0_10px_32px_-10px_rgb(225_29_116_/0.52)]"
                : "border-[rgb(27_18_38_/0.08)] bg-[var(--surface)] text-[var(--muted)] shadow-[var(--shadow-xs)] hover:border-[rgb(225_29_116_/0.2)] hover:bg-[var(--accent-soft)] hover:text-[var(--brand)]"
            }`}
            aria-current={activeCategory === category.slug ? "page" : undefined}
          >
            {category.name}
          </Link>
        ))}
      </section>

      <Suspense fallback={<div className="h-96 animate-pulse rounded-[1.25rem] bg-[var(--surface-muted)] shadow-inner ring-1 ring-[rgb(27_18_38_/0.04)]" />}>
        <ProductGridClient
          initialSearch={params.q ?? ""}
          initialCategory={params.category}
        />
      </Suspense>
    </main>
  );
}
