"use client";

export default function ProductsError() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Unable to load products</h1>
      <p className="mt-2 text-zinc-600">Please refresh the page and try again.</p>
    </main>
  );
}
