"use client";

import Link from "next/link";

export default function ProductsError() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 md:py-14">
      <div className="rounded-[1.35rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">Catalog</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--brand)]">Unable to load products</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
          Please refresh the page or come back shortly.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block text-sm font-semibold text-[var(--accent-strong)] underline-offset-4 hover:underline"
        >
          Reload products →
        </Link>
      </div>
    </main>
  );
}
