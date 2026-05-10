import { auth } from "@/lib/auth";
import { DummyJsonCartRepository, DummyJsonUserRepository } from "@/core/infrastructure/repositories/dummyjson-repositories";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

const userRepo = new DummyJsonUserRepository();
const cartRepo = new DummyJsonCartRepository();

export default async function ProfilePage() {
  const session = await auth();
  const userId = Number(session?.user?.id ?? 1);
  const profile = await userRepo.byId(userId);
  const carts = await cartRepo.byUserId(userId);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-8">
      <section className="rounded-xl border border-zinc-200 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <SignOutButton />
        </div>
        <div className="mt-4 grid gap-2 text-sm">
          <p>
            <span className="font-medium">Name:</span> {profile.firstName} {profile.lastName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {profile.email}
          </p>
          <p>
            <span className="font-medium">Role:</span> {profile.role}
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold">Order history structure</h2>
        <p className="mt-2 text-sm text-zinc-600">
          DummyJSON does not provide true orders, so user carts are mapped as mock order history.
        </p>
        <ul className="mt-4 space-y-2">
          {carts.map((cart) => (
            <li key={cart.id} className="rounded-md border border-zinc-200 p-3 text-sm">
              Cart #{cart.id} - {cart.totalProducts} products - ${cart.total.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
