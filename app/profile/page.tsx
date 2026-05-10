import { auth } from "@/lib/auth";
import {
  DummyJsonCartRepository,
  DummyJsonUserRepository,
} from "@/core/infrastructure/repositories/dummyjson-repositories";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

const userRepo = new DummyJsonUserRepository();
const cartRepo = new DummyJsonCartRepository();

export default async function ProfilePage() {
  const session = await auth();
  const userId = Number(session?.user?.id ?? 1);
  const profile = await userRepo.byId(userId);
  const carts = await cartRepo.byUserId(userId);

  const card =
    "rounded-[1.35rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] ring-1 ring-[rgb(225_29_116_/0.06)] md:p-8";

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-11 md:px-6 md:py-12">
      <section className={card}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
              Signed in as
            </p>
            <h1 className="text-[2rem] font-semibold tracking-tight text-[var(--brand)]">Profile</h1>
          </div>
          <SignOutButton />
        </div>
        <dl className="mt-8 grid gap-4 text-[15px] sm:grid-cols-3">
          <div className="rounded-xl bg-[var(--surface-muted)] p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Name</dt>
            <dd className="mt-2 font-semibold text-[var(--foreground)]">
              {profile.firstName} {profile.lastName}
            </dd>
          </div>
          <div className="rounded-xl bg-[var(--surface-muted)] p-4 sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Email</dt>
            <dd className="mt-2 font-semibold text-[var(--foreground)]">{profile.email}</dd>
          </div>
          <div className="rounded-xl bg-[var(--surface-muted)] p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Role</dt>
            <dd className="mt-2 font-semibold capitalize text-[var(--foreground)]">{profile.role}</dd>
          </div>
        </dl>
      </section>

      <section className={card}>
        <h2 className="text-xl font-semibold tracking-tight text-[var(--brand)]">Order structure</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
          Dummy carts are surfaced as placeholders for orders to mirror a full commerce dashboard.
        </p>
        <ul className="mt-6 space-y-3">
          {carts.map((cart) => (
            <li
              key={cart.id}
              className="rounded-xl border border-[rgb(27_18_38_/0.06)] bg-[var(--surface-muted)] px-4 py-3 text-sm font-medium shadow-[var(--shadow-xs)]"
            >
              Cart #{cart.id} · {cart.totalProducts} items ·{" "}
              <span className="tabular-nums">${cart.total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
