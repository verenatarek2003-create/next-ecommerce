"use client";

export default function ProductError() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Product unavailable</h1>
      <p className="mt-2 text-zinc-600">
        We could not load this product at the moment. Please retry.
      </p>
    </main>
  );
}
