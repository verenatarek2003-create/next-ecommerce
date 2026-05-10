import { auth } from "@/lib/auth";
import { DummyJsonCartRepository } from "@/core/infrastructure/repositories/dummyjson-repositories";

const cartRepo = new DummyJsonCartRepository();

export default async function OrdersPage() {
  const session = await auth();
  const userId = Number(session?.user?.id ?? 1);
  const carts = await cartRepo.byUserId(userId);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-11 md:px-6 md:py-12">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">Fulfillment</p>
        <h1 className="text-[2rem] font-semibold tracking-tight text-[var(--brand)]">Orders</h1>
        <p className="max-w-xl text-[15px] leading-relaxed text-[var(--muted)]">
          Placeholder shipments derived from carts for scaffolding and layout.
        </p>
      </header>
      <ul className="space-y-4">
        {carts.map((cart) => (
          <li
            key={cart.id}
            className="rounded-[1.25rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-card-hover)]"
          >
            <p className="font-semibold tracking-tight text-[var(--brand)]">Reference #{cart.id}</p>
            <p className="mt-2 text-[15px] text-[var(--muted)]">
              {cart.totalProducts} items ·{" "}
              <span className="font-semibold tabular-nums text-[var(--foreground)]">${cart.total.toFixed(2)}</span>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
