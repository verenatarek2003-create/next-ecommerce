import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, ChevronRight, RotateCcw, Star, Truck } from "lucide-react";
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

  const surface =
    "rounded-[1.35rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] shadow-[var(--shadow-card)]";

  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-10 md:space-y-14 md:px-6 md:py-11">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--muted)]">
        <Link href="/" className="font-medium transition hover:text-[var(--brand)]">
          Home
        </Link>
        <ChevronRight size={14} className="text-[var(--border)]" aria-hidden />
        <Link href="/products" className="font-medium transition hover:text-[var(--brand)]">
          Products
        </Link>
        <ChevronRight size={14} className="text-[var(--border)]" aria-hidden />
        <span className="line-clamp-1 max-w-[min(100%,20rem)] font-medium text-[var(--brand)]">{product.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <ProductGallery
          title={product.title}
          thumbnail={product.thumbnail}
          images={product.images}
        />

        <section className="space-y-6 md:sticky md:top-[5.5rem] md:self-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">{product.category}</p>
            <h1 className="mt-2 text-[2rem] font-semibold tracking-tight text-[var(--brand)] md:text-[2.5rem]">
              {product.title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 font-semibold text-[var(--accent-strong)]">
              <Star size={14} className="fill-[var(--highlight)] text-[var(--highlight)]" />
              {product.rating.toFixed(1)} rating
            </span>
            <span className="text-[var(--border)]">•</span>
            <span>{product.reviews?.length ?? 0} reviews</span>
          </div>
          <p className="text-[15px] leading-relaxed text-[var(--muted)]">{product.description}</p>
          <p className="font-semibold tracking-tight text-[2rem] tabular-nums text-[var(--foreground)]">{formatPrice(product.price)}</p>

          <div className={`${surface} grid gap-4 p-5 text-sm shadow-[var(--shadow-xs)]`}>
            <p className="inline-flex items-center gap-2.5 font-medium text-[var(--foreground)]">
              <Truck size={16} strokeWidth={2} className="text-[var(--accent-strong)]" />
              {product.shippingInformation ?? "Fast shipping available"}
            </p>
            <p className="inline-flex items-center gap-2.5 font-medium text-[var(--foreground)]">
              <RotateCcw size={16} strokeWidth={2} className="text-[var(--accent-strong)]" />
              {product.returnPolicy ?? "30 days return policy"}
            </p>
            <p className="inline-flex items-center gap-2.5 font-medium text-[var(--foreground)]">
              <BadgeCheck size={16} strokeWidth={2} className="text-[var(--accent-strong)]" />
              {product.warrantyInformation ?? "Standard warranty included"}
            </p>
          </div>

          <div className={`${surface} p-5`}>
            <AddToCartPanel product={product} />
          </div>
        </section>
      </div>

      <section className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:gap-10">
        <div className={`${surface} space-y-6 p-6 md:p-8`}>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--brand)]">Specifications</h2>
          <dl className="grid grid-cols-2 gap-5 text-[15px]">
            <div className="space-y-1">
              <dt className="text-sm text-[var(--muted)]">Brand</dt>
              <dd className="font-semibold text-[var(--foreground)]">{product.brand ?? "Verina Select"}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm text-[var(--muted)]">SKU</dt>
              <dd className="font-semibold text-[var(--foreground)]">{product.sku ?? "N/A"}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm text-[var(--muted)]">Category</dt>
              <dd className="font-semibold text-[var(--foreground)]">{product.category}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm text-[var(--muted)]">Availability</dt>
              <dd className="font-semibold text-[var(--foreground)]">{product.stock > 0 ? "In stock" : "Out of stock"}</dd>
            </div>
          </dl>
        </div>

        <div className={`${surface} space-y-6 p-6 md:p-8`}>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--brand)]">Customer reviews</h2>
          <div className="space-y-4">
            {(product.reviews ?? []).slice(0, 3).map((review) => (
              <article key={`${review.reviewerEmail}-${review.date}`} className="rounded-xl border border-[rgb(27_18_38_/0.06)] bg-[var(--surface-muted)] p-4 shadow-[var(--shadow-xs)]">
                <p className="text-xs font-medium text-[var(--muted)]">{review.reviewerName}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[var(--highlight)]">
                  <Star size={12} className="fill-[var(--highlight)]" />
                  {review.rating}/5
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--foreground)]">{review.comment}</p>
              </article>
            ))}
            {!(product.reviews?.length ?? 0) ? (
              <p className="text-sm text-[var(--muted)]">No reviews yet.</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-[1.75rem] font-semibold tracking-tight text-[var(--brand)] md:text-[2rem]">
          Related products
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {related.products
            .filter((item) => item.id !== product.id)
            .slice(0, 4)
            .map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="group rounded-[1.15rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] p-3 shadow-[var(--shadow-xs)] ring-1 ring-transparent transition hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:ring-[rgb(225_29_116_/0.1)]"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-linear-to-br from-[#fdf6fb] to-[#ebe2f3]">
                  <Image src={item.thumbnail} alt={item.title} fill className="object-cover transition duration-[0.95s] group-hover:scale-[1.04]" />
                </div>
                <p className="mt-3 line-clamp-1 font-semibold tracking-tight text-[var(--brand)]">{item.title}</p>
                <p className="mt-1 text-[15px] font-medium tabular-nums text-[var(--muted)]">{formatPrice(item.price)}</p>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
