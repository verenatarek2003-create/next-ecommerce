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
    <article className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-[#FFF1F8]">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#BE185D]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-[var(--brand)]">
            {product.rating.toFixed(1)} ★
          </span>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-sm font-semibold text-[var(--brand)]">
            {product.title}
          </h3>
          <p className="line-clamp-2 text-sm text-[var(--muted)]">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold">{formatPrice(product.price)}</span>
            <span className="text-xs text-[#B9A5B8] line-through">
              {formatPrice(oldPrice)}
            </span>
          </div>
          <div className="flex items-center gap-2">
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
