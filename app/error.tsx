"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4.125rem)] w-full max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
        Error
      </p>
      <h1 className="mt-2 text-[2rem] font-semibold tracking-tight text-[var(--brand)]">Something went wrong</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">{error.message}</p>
      <Button className="mt-10 rounded-2xl px-10 py-6" type="button" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
