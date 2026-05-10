import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4.125rem)] w-full max-w-md items-center px-4 py-10">
      <section className="w-full rounded-[1.5rem] border border-[rgb(27_18_38_/0.06)] bg-[var(--surface)]/90 p-8 shadow-[var(--shadow-card)] ring-1 ring-[rgb(225_29_116_/0.06)] backdrop-blur-md">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand)]">Create account</h1>
        <p className="mt-2 text-[15px] text-[var(--muted)]">Join Verina for a softer, curated shopping flow.</p>
        <RegisterForm />
      </section>
    </main>
  );
}
