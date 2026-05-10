export default function ProductsLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8">
      <div className="h-10 w-48 animate-pulse rounded bg-zinc-200" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="h-72 animate-pulse rounded-xl bg-zinc-100" />
        ))}
      </div>
    </main>
  );
}
