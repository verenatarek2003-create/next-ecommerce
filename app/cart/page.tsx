"use client";

import Image from "next/image";
import { useMemo } from "react";
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
      <main className="mx-auto w-full max-w-4xl px-4 py-12 text-center">
        <h1 className="inline-flex items-center gap-2 text-3xl font-semibold">
          <ShoppingCart />
          Your cart is empty
        </h1>
        <p className="mt-2 text-zinc-600">Add products to continue your Verina journey.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 md:grid-cols-[1fr_320px]">
      <section className="space-y-4">
        <h1 className="inline-flex items-center gap-2 text-3xl font-semibold">
          <ShoppingCart />
          Shopping cart
        </h1>
        {lines.map((line) => (
          <article
            key={line.id}
            className="flex items-center gap-4 rounded-xl border border-zinc-200 p-4"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-md bg-zinc-100">
              <Image src={line.thumbnail} alt={line.title} fill className="object-cover" />
            </div>
            <div className="flex-1 space-y-1">
              <h2 className="font-medium">{line.title}</h2>
              <p className="text-sm text-zinc-600">{formatPrice(line.price)}</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => updateQty(line.id, line.quantity - 1)}
                >
                  <Minus size={14} />
                </Button>
                <span>{line.quantity}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => updateQty(line.id, line.quantity + 1)}
                >
                  <Plus size={14} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => remove(line.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="h-fit rounded-xl border border-zinc-200 p-5 md:sticky md:top-24">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-zinc-200 pt-2 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
        <Button className="mt-4 w-full">Proceed to checkout</Button>
        <Button className="mt-2 w-full" variant="secondary" onClick={clear}>
          Clear cart
        </Button>
      </aside>
    </main>
  );
}
