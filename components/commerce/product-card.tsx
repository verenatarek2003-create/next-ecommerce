import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/domain";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WishlistToggle } from "@/features/wishlist/components/wishlist-toggle";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const oldPrice = product.price / Math.max(0.1, 1 - product.discountPercentage / 100);

  return (
    <article className="group overflow-hidden rounded-[1.25rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] shadow-[var(--shadow-card)] ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:ring-[rgb(225_29_116_/0.12)]">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-linear-to-br from-[#fff5fa] via-[#fef8fc] to-[#f3e8f5]">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#2a1528]/[0.08] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-[rgb(255_255_255_/0.65)] bg-[rgb(255_255_255_/0.88)] px-2.5 py-1 text-xs font-semibold text-[var(--brand)] shadow-[var(--shadow-xs)] backdrop-blur-sm">
            {product.rating.toFixed(1)} ★
          </span>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-[var(--brand)]">
            {product.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-base font-semibold tabular-nums text-[var(--foreground)]">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs tabular-nums text-[var(--muted)] line-through opacity-80">
              {formatPrice(oldPrice)}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <WishlistToggle productId={product.id} />
            {onAddToCart ? (
              <Button size="sm" onClick={() => onAddToCart(product)}>
                <ShoppingCart size={14} />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
