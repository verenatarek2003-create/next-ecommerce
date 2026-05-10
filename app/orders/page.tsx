import { auth } from "@/lib/auth";
import { DummyJsonCartRepository } from "@/core/infrastructure/repositories/dummyjson-repositories";

const cartRepo = new DummyJsonCartRepository();

export default async function OrdersPage() {
  const session = await auth();
  const userId = Number(session?.user?.id ?? 1);
  const carts = await cartRepo.byUserId(userId);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-4 px-4 py-8">
      <h1 className="text-3xl font-semibold">Orders</h1>
      <p className="text-sm text-zinc-600">
        Mock order history generated from DummyJSON carts for architecture scaffolding.
      </p>
      <ul className="space-y-3">
        {carts.map((cart) => (
          <li key={cart.id} className="rounded-xl border border-zinc-200 p-4">
            <p className="font-medium">Order reference #{cart.id}</p>
            <p className="text-sm text-zinc-600">
              {cart.totalProducts} products • ${cart.total.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
