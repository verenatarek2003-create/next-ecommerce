export default function ProductsLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-11 md:px-6 md:py-12">
      <div className="h-48 max-w-xl animate-pulse rounded-[1.25rem] bg-linear-to-br from-[#fdf6fb] to-[#eae4ef]" />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="aspect-[7/11] animate-pulse rounded-[1.25rem] bg-linear-to-br from-[#fdf6fb] to-[#eae2ef] ring-1 ring-[rgb(27_18_38_/0.04)]"
          />
        ))}
      </div>
    </main>
  );
}
