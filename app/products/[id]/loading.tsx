export default function ProductLoading() {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 md:grid-cols-2 md:gap-14 md:px-6 md:py-11">
      <div className="aspect-square animate-pulse rounded-[1.35rem] bg-linear-to-br from-[#fdf6fb] to-[#eae2ef] ring-1 ring-[rgb(27_18_38_/0.04)]" />
      <div className="space-y-5">
        <div className="h-14 w-[70%] animate-pulse rounded-xl bg-linear-to-br from-[#eae2ef] to-[#f4edf8]" />
        <div className="h-4 w-full animate-pulse rounded-lg bg-[var(--surface-muted)]" />
        <div className="h-4 w-[88%] animate-pulse rounded-lg bg-[var(--surface-muted)]" />
        <div className="h-10 w-[40%] animate-pulse rounded-xl bg-linear-to-br from-[#eae2ef] to-[#f4edf8]" />
      </div>
    </main>
  );
}
