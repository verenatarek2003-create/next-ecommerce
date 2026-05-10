export default function ProductLoading() {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 md:grid-cols-2">
      <div className="aspect-square animate-pulse rounded-xl bg-zinc-100" />
      <div className="space-y-3">
        <div className="h-6 w-2/3 animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-200" />
      </div>
    </main>
  );
}
