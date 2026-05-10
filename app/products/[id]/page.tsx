import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, RotateCcw, Star, Truck } from "lucide-react";
import { DummyJsonProductRepository } from "@/core/infrastructure/repositories/dummyjson-repositories";
import { formatPrice } from "@/lib/utils";
import { AddToCartPanel } from "@/features/cart/components/add-to-cart-panel";
import { ProductGallery } from "@/features/products/components/product-gallery";

const productRepo = new DummyJsonProductRepository();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await productRepo.byId(Number(id));
  return {
    title: `${product.title} | Verina`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);
  if (Number.isNaN(productId)) notFound();

  const product = await productRepo.byId(productId);
  const related = await productRepo.relatedByCategory(product.category, 4);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 md:px-6">
      <nav className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-800">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/products" className="hover:text-zinc-800">
          Products
        </Link>{" "}
        / <span className="text-zinc-700">{product.title}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery
          title={product.title}
          thumbnail={product.thumbnail}
          images={product.images}
        />

        <section className="space-y-5 md:sticky md:top-24 md:self-start">
          <p className="text-sm uppercase tracking-wider text-zinc-500">{product.category}</p>
          <h1 className="text-3xl font-semibold md:text-4xl">{product.title}</h1>
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Star size={14} className="fill-current text-[#B08D57]" />
            <span>{product.rating.toFixed(1)} rating</span>
            <span>•</span>
            <span>{product.reviews?.length ?? 0} reviews</span>
          </div>
          <p className="text-zinc-600">{product.description}</p>
          <p className="text-3xl font-semibold">{formatPrice(product.price)}</p>

          <div className="grid gap-2 rounded-xl border border-zinc-200 bg-white p-4 text-sm">
            <p className="inline-flex items-center gap-2 text-zinc-700">
              <Truck size={14} className="text-[#B08D57]" />
              {product.shippingInformation ?? "Fast shipping available"}
            </p>
            <p className="inline-flex items-center gap-2 text-zinc-700">
              <RotateCcw size={14} className="text-[#B08D57]" />
              {product.returnPolicy ?? "30 days return policy"}
            </p>
            <p className="inline-flex items-center gap-2 text-zinc-700">
              <BadgeCheck size={14} className="text-[#B08D57]" />
              {product.warrantyInformation ?? "Standard warranty included"}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <AddToCartPanel product={product} />
          </div>
        </section>
      </div>

      <section className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Specifications</h2>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-zinc-500">Brand</dt>
              <dd className="font-medium">{product.brand ?? "Verina Select"}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">SKU</dt>
              <dd className="font-medium">{product.sku ?? "N/A"}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Category</dt>
              <dd className="font-medium">{product.category}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Availability</dt>
              <dd className="font-medium">{product.stock > 0 ? "In stock" : "Out of stock"}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Customer reviews</h2>
          <div className="space-y-3">
            {(product.reviews ?? []).slice(0, 3).map((review) => (
              <article key={`${review.reviewerEmail}-${review.date}`} className="rounded-lg border border-zinc-200 p-3">
                <p className="text-xs text-zinc-500">{review.reviewerName}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#8C6E42]">
                  <Star size={12} className="fill-current" />
                  {review.rating}/5
                </p>
                <p className="mt-1 text-sm text-zinc-700">{review.comment}</p>
              </article>
            ))}
            {!(product.reviews?.length ?? 0) ? (
              <p className="text-sm text-zinc-600">No reviews yet.</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Related products</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {related.products
            .filter((item) => item.id !== product.id)
            .slice(0, 4)
            .map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="rounded-xl border border-zinc-200 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-100">
                  <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                </div>
                <p className="mt-2 line-clamp-1 text-sm font-medium">{item.title}</p>
                <p className="text-sm text-zinc-600">{formatPrice(item.price)}</p>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
