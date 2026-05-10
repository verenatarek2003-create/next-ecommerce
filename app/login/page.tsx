import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4.125rem)] w-full max-w-md items-center px-4 py-10">
      <section className="w-full rounded-[1.5rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)]/90 p-8 shadow-[var(--shadow-card)] ring-1 ring-[rgb(225_29_116_/0.06)] backdrop-blur-md">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand)]">Welcome back</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">
          Sign in to continue shopping on Verina.
        </p>
        <div className="mt-7">
          <LoginForm />
        </div>
        <p className="mt-6 text-sm text-[var(--muted)]">
          New to Verina?{" "}
          <Link
            href="/register"
            className="font-semibold text-[var(--accent-strong)] hover:underline"
          >
            Create account
          </Link>
        </p>
      </section>
    </main>
  );
}
