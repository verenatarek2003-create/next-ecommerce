"use client";

import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { lines, updateQty, remove, clear } = useCartStore();
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [lines],
  );
  const shipping = lines.length ? 10 : 0;
  const total = subtotal + shipping;

  if (!lines.length) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-16 text-center md:py-24">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-soft)] shadow-[var(--shadow-xs)] ring-1 ring-[rgb(225_29_116_/0.1)]">
          <ShoppingCart className="text-[var(--accent-strong)]" size={28} strokeWidth={2} />
        </span>
        <h1 className="mt-6 text-[2rem] font-semibold tracking-tight text-[var(--brand)]">Your cart is empty</h1>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--muted)]">
          Explore the collection and add pieces that match your feminine edit.
        </p>
        <Link href="/products" className="mt-8">
          <Button className="rounded-2xl px-8 py-6">Browse products</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 md:grid-cols-[1fr_minmax(260px,21rem)] md:gap-12 md:py-12">
      <section className="space-y-5">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">Checkout</p>
          <h1 className="inline-flex items-center gap-2.5 text-[2rem] font-semibold tracking-tight text-[var(--brand)]">
            <ShoppingCart size={26} strokeWidth={2} className="text-[var(--accent-strong)]" />
            Shopping cart
          </h1>
        </div>
        <div className="space-y-4">
          {lines.map((line) => (
            <article
              key={line.id}
              className="flex gap-5 rounded-[1.25rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-card-hover)] md:gap-6 md:p-5"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-[#fdf6fb] to-[#ebe2f3] md:h-28 md:w-28">
                <Image src={line.thumbnail} alt={line.title} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <h2 className="font-semibold tracking-tight text-[var(--brand)]">{line.title}</h2>
                <p className="text-sm font-semibold tabular-nums text-[var(--muted)]">{formatPrice(line.price)}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    aria-label={`Decrease ${line.title}`}
                    onClick={() => updateQty(line.id, line.quantity - 1)}
                  >
                    <Minus size={14} strokeWidth={2} />
                  </Button>
                  <span className="min-w-[1.75rem] text-center text-sm font-semibold tabular-nums">{line.quantity}</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    aria-label={`Increase ${line.title}`}
                    onClick={() => updateQty(line.id, line.quantity + 1)}
                  >
                    <Plus size={14} strokeWidth={2} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => remove(line.id)}>
                    <Trash2 size={14} strokeWidth={2} aria-hidden />
                    <span className="hidden sm:inline">Remove</span>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="h-fit rounded-[1.35rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface-muted)] p-6 shadow-[var(--shadow-card)] ring-1 ring-[rgb(225_29_116_/0.06)] md:sticky md:top-[5.5rem]">
        <h2 className="text-lg font-semibold tracking-tight text-[var(--brand)]">Order summary</h2>
        <div className="mt-5 space-y-3 border-b border-[rgb(27_18_38_/0.07)] pb-4 text-[15px] text-[var(--muted)]">
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span className="tabular-nums text-[var(--foreground)]">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Shipping</span>
            <span className="tabular-nums text-[var(--foreground)]">{formatPrice(shipping)}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-[17px] font-semibold text-[var(--brand)]">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(total)}</span>
        </div>
        <Button className="mt-6 w-full rounded-2xl py-6 font-semibold">Proceed to checkout</Button>
        <Button className="mt-3 w-full rounded-2xl" variant="secondary" onClick={clear}>
          Clear cart
        </Button>
      </aside>
    </main>
  );
}
